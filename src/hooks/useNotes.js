import { useCallback, useReducer } from 'react';
import { database } from '../config/firebase';

const ACTIONS = {
    GET_NOTES: 'GET_NOTES',
    ADD_NOTES: 'ADD_NOTES',
    UPDATE_NOTES: 'UPDATE_NOTES',
    DELETE_NOTES: 'DELETE_NOTES',
}

function reducer(state, action) {
    switch(action.type) {
        case ACTIONS.GET_NOTES: {
            return {
                ...state,
                notes: action.payload
            }
        }

        case ACTIONS.ADD_NOTES: {
            return {
                ...state,
                notes: [
                    ...state.notes,
                    action.payload
                ]
            }
        }

        case ACTIONS.UPDATE_NOTES: {
            return {
                ...state,
                notes: [...state.notes.map(note => {
                    if (note.id === action.payload.id) {
                        return action.payload
                    }
                    return note;
                })]
            }
        }

        case ACTIONS.DELETE_NOTES: {
            return {
                ...state,
                notes: [...state.notes.filter(note => note.id !== action.payload.id )],
            }
        }

        default:
            return state;
    }
}

const initialState = {
    notes: [],
    trash: []
}

export function useNotes() {
    const [{ notes }, dispatch] = useReducer(reducer, initialState);

    const getNotes = useCallback(() => {
        let data = [];

        database.notes.get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => data.push(database.formatDoc(doc)))
                dispatch({ type: ACTIONS.GET_NOTES, payload: data });
            });
    }, [dispatch]);

    const addNotes = useCallback((note) => {
        // dispatch({ type: ACTIONS.ADD_NOTES, payload: note });
        return database.notes.add(note).then(() => {
            dispatch({ type: ACTIONS.ADD_NOTES, payload: note });
        });
    }, [dispatch]);

    const updateNote = useCallback((note) => {
        return database.notes.doc(note.id).update(note).then(() => {
            dispatch({ type: ACTIONS.UPDATE_NOTES, payload: note })
        });
    }, [dispatch]);

    const deleteNote = useCallback((note) => {
        return database.notes.doc(note.id).delete().then(() => {
            dispatch({ type: ACTIONS.DELETE_NOTES, payload: note })
        });
    }, [dispatch]);

    return { notes, getNotes, addNotes, updateNote, deleteNote }
}