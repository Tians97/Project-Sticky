import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar'

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import { getCurrentUser } from './store/session';
import { SideBar } from './components/MainPage/SideBar';
import Projects from './components/Projects/Projects';
import Project from './components/Project/Project'
import CreateTask from './components/TaskForms/CreateTask';
import EditTask from './components/TaskForms/EditTask';

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
        <AuthRoute exact path='/' component={LoginForm} />
        <ProtectedRoute exact path='/home' component={MainPage} />
        <ProtectedRoute exact path='/projects' component={Projects} />
        <ProtectedRoute exact path='/projects/:projectId' component={Project} />
        <ProtectedRoute exact path='/projects/:projectId/createtasks' component={CreateTask} />
        <AuthRoute exact path='/login' component={LoginForm} />
        <AuthRoute exact path='/signup' component={SignupForm} />
      </Switch>
    </>
  );
}

export default App;
