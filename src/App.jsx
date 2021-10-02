import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Trash from './pages/Trash';
import AuthProvider from './contexts/AuthContext';
import SnackbarProvider from './contexts/SnackbarContext';

function App() {
  return (
    <SnackbarProvider>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/home" component={Home} />
              <Route path="/trash" component={Trash} />
            </Switch>
          </AuthProvider>
        </Router>
      </SnackbarProvider>
  );
}

export default App;
