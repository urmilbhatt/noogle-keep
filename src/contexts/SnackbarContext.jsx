import { Snackbar } from '@material-ui/core';
import React from 'react'

const SnackbarContext = React.createContext()

export const useSnackbar = () => {
    return React.useContext(SnackbarContext);
}

const generateGenericState = (open = false, message = '') => {
    return {
      open,
      vertical: 'bottom',
      horizontal: 'left',
      message,
    }
  }

function SnackbarProvider({ children }) {
    const [snackbarState, setSnackbarState] = React.useState(generateGenericState);

    const { vertical, horizontal, open, message } = snackbarState;
  
    const handleClose = () => {
      setSnackbarState(generateGenericState())
    }
  
    const generateSnackbarMessage = (message) => {
      setSnackbarState(generateGenericState(true, message))
      setTimeout(() => {
        handleClose();
      }, 3000);
    }

    return (
        <>
            <SnackbarContext.Provider value={generateSnackbarMessage}>
                {children}
            </SnackbarContext.Provider>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={message}
                key={vertical + horizontal}
            />
        </>
    )
}

export default SnackbarProvider;