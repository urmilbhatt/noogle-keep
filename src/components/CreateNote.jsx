import { useEffect, useState } from "react";
import { Container, makeStyles, Paper, InputBase, Button } from "@material-ui/core";
import Swatch from './Swatch.jsx';
import { useAuth } from "../contexts/AuthContext";
import { useColor } from "../hooks/useColor.js";
import { database } from '../config/firebase';
import { DEFAULT_COLOR } from "../config/constants.js";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        margin: '32px auto 16px auto'
    },
    paper: {
        width: '600px',
        maxHeight: '600px',
        overflow: 'auto',
        height: '136px',
        backgroundColor: '#fff',
        borderColor: '#e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 3px 5px rgb(0 0 0 / 20%)',
        padding: '10px 12px 15px',
        marginTop: '8px',
        position: 'relative',
    },
    inputBase: {
      width: '100%',
      height: 'auto',
      overflowY: 'auto',
    },
    input: {
        letterSpacing: '.00625em',
        fontFamily: 'Google Sans ,Roboto,Arial,sans-serif',
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: '1.5rem',
        padding: '10px 12px 15px',
        direction: 'ltr',
        width: '100%',
        overflowWrap: 'break',
        color: 'rgb(128, 134, 139)',
    },
    inputContainer: {
        width: '100%',
    },
    footerContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(0,0,0,.54)',
        justifyContent: 'space-between',
        flexWrap: 'wrap-reverse',
        fontSize: '12px',
        lineHeight: '26px',
        margin: '4px 0',
        borderColor: 'transparent',
        transition: 'background-color .218s ease-in-out,box-shadow .218s ease-in-out',
    },
    createButton: {
        color: 'rgba(0,0,0,0.87)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        letterSpacing: '.01785714em',
        fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
        fontSize: '.875rem',
        fontWeight: 500,
        lineHeight: '1.25rem',
        height: '36px',
        padding: '8px 24px',
        borderRadius: '4px',
        marginRight: '15px',
        border: '2px solid #000'
    }
}))

export default function CreateNote({ addNotes, updateNote, editNote, setEditNote }) {
    const classes = useStyles();
    const { currentUser } = useAuth();
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [color, setColor] = useColor(DEFAULT_COLOR);

    useEffect(() => {
        if (editNote) {
            const { title, note, color: editedColor } = editNote;
            setTitle(title);
            setNote(note);
            setColor(editedColor);
        }
    }, [editNote, setColor])

    const handleSubmit = async () => {
        if (!(title.trim() || note.trim())) return;

        try {
            if (editNote) {
                await updateNote({
                    ...editNote,
                    title,
                    note,
                    color,
                });
                setEditNote(null);
            } else {
                await addNotes({
                    userId: currentUser.uid,
                    title,
                    note,
                    color,
                    isDeleted: false,
                    createdAt: database.getCurremtTimestamp(),
                });
            }
            setTitle('');
            setNote('');
            setColor(DEFAULT_COLOR);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <Container className={classes.container}>
            <Paper elevation={4} className={classes.paper} style={{ backgroundColor: color }}>
                <div className={classes.inputContainer}>
                    <InputBase
                        className={classes.inputBase}
                        inputProps={{
                            'aria-label': 'naked',
                            className: 'input',
                            placeholder: "Title",
                            value: title,
                            onChange: (event) => setTitle(event.target.value)
                        }}
                    />
                    <InputBase
                        className={classes.inputBase}
                        multiline
                        inputProps={{
                            'aria-label': 'naked',
                            className: 'input',
                            placeholder: "Take a note...",
                            value: note,
                            onChange: (event) => setNote(event.target.value)
                        }}
                    />
                </div>
                <div className={classes.footerContainer}>
                    <Swatch swatchColor={color} onChangeHandler={setColor} /> 
                    <Button type="submit" onClick={handleSubmit} size="small" className={classes.createButton}>
                        {editNote ? 'Update' : 'Create'}
                    </Button>
                </div>
            </Paper>
        </Container>
    )
}
