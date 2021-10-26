import { makeStyles } from '@material-ui/core';
import { useEffect, useMemo } from 'react';

import { Layout, NotesList, TrashIcon } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { useNotes } from '../hooks/useNotes';

const useStyles = makeStyles({
    trashContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '16px'
    },
    trashIcon: {
        width: '100px',
        height: '100px'
    }
})

export default function Trash() {
    const { currentUser } = useAuth();
    const { notes, getNotes, updateNote, deleteNote } = useNotes();
    const classes = useStyles();

    useEffect(() => {
        if (!notes.length) {
            getNotes(currentUser?.uid);
        }
    }, [notes, getNotes, currentUser.uid]);

    const filteredNotes = useMemo(() => {
        return notes.filter(note => note.isDeleted);
    }, [notes]);

    return (
        <Layout>
            {filteredNotes.length ? (
                <NotesList
                    notes={filteredNotes}
                    updateNote={updateNote}
                    deleteNote={deleteNote}
                />
            ) : (
                <div className={classes.trashContainer}>
                    <TrashIcon classes={classes.trashIcon} />
                    <h1>No Notes in Trash</h1>
                </div>
            )}
        </Layout>
    )
}
