import React, { memo, useState } from 'react'
import {
    Card, CardContent, Typography, IconButton, makeStyles, Tooltip
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrashOutlined';
import Swatch from './Swatch';
import { useSnackbar } from '../contexts/SnackbarContext';
import { useColor } from '../hooks/useColor';
import { DEFAULT_COLOR } from '../config/constants'

const useStyles = makeStyles(theme => ({
    card: {
        width: '100%', maxHeight: 250, height: '100%', margin: 16, maxWidth: 240,
        position: 'relative', cursor: 'pointer', padding: '8px',
        border: '2px solid #000'
    },
    cardContent: {
        height: '70%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: '300px',
        textOverflow: 'ellipsis',
    },
    actionsContainer: {
        width: '100%',
        height: '20%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        visibility: ((showActions) => showActions ? 'visible' : 'hidden')
    }
}))

function Note({ note, updateNote, deleteNote, setEditNote }) {
    const [showActions, setShowActions] = useState(false);
    const classes = useStyles({ showActions });

    const generateSnackbarMessage = useSnackbar();

    const [color, setColor] = useColor(note.color || DEFAULT_COLOR);

    function handleColorChange(color) {
        setColor(color);
        updateNote({
            ...note,
            color
        });
    }

    return (
        <Card
            onClick={() => {
                setEditNote(note)
            }}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            className={classes.card}
            style={{ backgroundColor: color, overflow: 'inherit' }}
        >
            <CardContent className={classes.cardContent}>
                <Typography>
                    {note.title}
                </Typography>
                <Typography>
                    {note.note}
                </Typography>
            </CardContent>
            <div className={classes.actionsContainer}>
                {!note.isDeleted ? (
                        <Swatch
                            swatchColor={color}
                            onChangeHandler={(color) => handleColorChange(color)}
                        />
                    ) : (
                        <Tooltip title="Restore">
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateNote({ ...note, isDeleted: false });
                                    generateSnackbarMessage('Note Restored');
                                }}
                            >
                                <RestoreFromTrashIcon />
                            </IconButton>
                        </Tooltip>
                    )
                }
                <Tooltip title={!note.isDeleted ? 'Move to Trash' : 'Delete forever'}>
                    <IconButton
                        onClick={(e) => {
                        e.stopPropagation();
                        if (!note.isDeleted) {
                            updateNote({ ...note, isDeleted: true });
                            generateSnackbarMessage('Note trashed');
                        } else {
                            deleteNote(note);
                        }
                    }}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </div>   
      </Card>
    )
}

export default memo(Note);
