import { useState } from 'react';
import { Redirect } from 'react-router';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles({
    container: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        backgroundColor: '#333'
    },
    paper: {
        width: '450px',
        height: '250px',
        padding: '8px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
    },
    field: {
        marginTop: '8px',
        marginBottom: '8px',
    },
    noogle: {
        fontSize: '2rem',
        textAlign: 'center'
    },
    g: {
        color: '#4285f4'
    },
    o1: {
        color: '#ea4335'
    },
    o2: {
        color: '#fbbc05'
    },
    l: {
        color: '#34a853'
    },
    e: {
        color: '#ea4335'
    },
    error: {
        backgroundColor: '#d94e4c',
        colur:'#333'
    },
    siginBtnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '90px',
    }
});

export default function SignIn() {
    const classes = useStyles();
    const { signInWithGoogle, currentUser } = useAuth();
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        try {
            setLoading(true);
            signInWithGoogle();
        } catch(err) {
            console.error(err);
        }
        setLoading(false);
    }

    if (currentUser) return <Redirect to="/home" />

    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <Typography variant="h1" className={classes.noogle}>
                    <span className={classes.g}>N</span>
                    <span className={classes.o1}>o</span>
                    <span className={classes.o2}>o</span>
                    <span className={classes.g}>g</span>
                    <span className={classes.l}>l</span>
                    <span className={classes.e}>e</span>
                    {` `}
                    <span>Notes</span>
                </Typography>
                <div className={classes.siginBtnContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        Login with Google
                    </Button>
                </div>
            </Paper>
        </div>
    )
}
