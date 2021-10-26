import React, { useEffect, useMemo, useState } from 'react';
import { Layout, CreateNote, NotesList } from '../components';
import { useAuth } from '../contexts/AuthContext';
import { useNotes } from '../hooks/useNotes';

export default function Home(props) {
    const [editNote, setEditNote] = useState(null);
    const { currentUser } = useAuth();
    const { notes, getNotes, addNotes, updateNote, deleteNote } = useNotes();

    useEffect(() => {
        getNotes(currentUser?.uid);
    }, [getNotes, currentUser?.uid]);

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
                setEditNote={setEditNote}
            />
        </Layout>
    )
}
