import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar'

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import { getCurrentUser } from './store/session';
import Project from './components/Projects/Project';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getCurrentUser()).then(()=> setLoaded(true))
  },[dispatch]);



  return loaded && (
    <>
      <NavBar/>
      <Switch>
        <ProtectedRoute exact path='/home' component={MainPage} />
        <ProtectedRoute exact path='/projects' component={Project} />
        <AuthRoute exact path='/login' component={LoginForm} />
        <AuthRoute exact path='/signup' component={SignupForm} />
      </Switch>
    </>
  );
}

export default App;
