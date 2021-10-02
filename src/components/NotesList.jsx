import React, { useMemo } from 'react'
import { Container, makeStyles } from '@material-ui/core';
import Note from './Note.jsx';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
        paddingTop: '24px'
    }
})

export default function NotesList({
    notes,
    updateNote,
    deleteNote,
    editNote,
    setEditNote
}) {
    const classes = useStyles();
    const OptimizedNotesList = useMemo(() => {
        return notes.map((note) => {
            return (
                <Note
                    key={note.id}
                    note={note}
                    isSelected={Boolean(editNote) && note.id === editNote.id}
                    updateNote={updateNote}
                    deleteNote={deleteNote}
                    setEditNote={setEditNote}
                />
            );
        })
    }, [notes, updateNote, deleteNote, setEditNote, editNote]);

    return (
        <Container className={classes.container}>
            {OptimizedNotesList}
        </Container>
    )
}
