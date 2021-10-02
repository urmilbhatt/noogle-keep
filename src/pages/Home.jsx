import React, { useEffect, useMemo, useState } from 'react';
import { Layout, CreateNote, NotesList } from '../components';
import { useNotes } from '../hooks/useNotes';

export default function Home() {
    const [editNote, setEditNote] = useState(null);
    const { notes, getNotes, addNotes, updateNote, deleteNote } = useNotes();

    useEffect(() => {
        getNotes();
    }, [getNotes]);

    const filteredNotes = useMemo(() => {
        return notes.filter(note => !note.isDeleted)
    }, [notes]);

    return (
        <Layout>
            <CreateNote
                addNotes={addNotes}
                setEditNote={setEditNote}
                editNote={editNote}
                updateNote={updateNote}
            />
            <NotesList
                notes={filteredNotes}
                updateNote={updateNote}
                deleteNote={deleteNote}
                editNote={editNote}
                setEditNote={setEditNote}
            />
        </Layout>
    )
}
