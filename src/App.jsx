import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Trash from './pages/Trash';
import AuthProvider from './contexts/AuthContext';
import SnackbarProvider from './contexts/SnackbarContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <SnackbarProvider>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/trash" component={Trash} />
          </Switch>
        </AuthProvider>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
