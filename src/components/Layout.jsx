import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NotesIcon, TrashIcon } from './Icons';
import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  appBar: {
    backgroundColor: 'rgba(255,255,255,1)',
    color: 'rgb(0,0,0)',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: 'inset 0 -1px 0 0 #dadce0',
  },
  toolbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    color: '#5f6368',
    opacity: 1,
    cursor: 'pointer'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  paper: {
      paddingTop: '60px',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const sidebarList = [
  {
      text: 'Notes',
      icon: <NotesIcon />,
      path: '/home',
  },
  {
      text: 'Trash',
      icon: <TrashIcon />,
      path: '/trash',
  }
];

export default function Layout({ children }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { signOut } = useAuth();
    const history = useHistory();
    const { pathname } = useLocation();

    function handleRoute(path) {
        history.push(path);   
    }

    function logout() {
      history.push('/');
      signOut();
    }

    return (
      <div className={classes.root}>
        <AppBar
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar className={classes.toolbarContainer}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setOpen(!open)}
                    edge="start"
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                  onClick={() => history.push('/home')}
                  variant="h6"
                  noWrap
                  className={classes.title}
                >
                    Noogle Keep
                </Typography>
                <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx(classes.paper, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <List>
                {sidebarList.map(item => (
                    <ListItem
                      button
                      key={item.text}
                      className={classes.listItem}
                      style={{
                        backgroundColor: pathname === item.path ? '#feefc3' : '',
                      }}
                      onClick={() => handleRoute(item.path)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
        <main className={classes.content}>
          {children}
        </main>
      </div>
    )
}
