import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import projectsReducer, { deleteProject, fetchProject, selectProject, selectProjects } from '../../store/projects'
import { SideBar } from '../MainPage/SideBar'
import './Project.css'
import Tasks from '../Tasks/Tasks'
import CreateTaskForm from '../TaskForms/CreateTaskForm'
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button} from "@mui/material"
import { deleteTask, fetchProjectTasks, selectProjectTasks, updateTask } from '../../store/tasks';
import { useTransition, animated, useSpring, config } from "react-spring";
import Checkbox from '@mui/material/Checkbox';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { LinearProgressProps } from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { useState } from 'react'
import { useRef } from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import ProgressBar from './ProgressBar'
import { Row } from 'antd'
// import 'bootstrap/dist/css/bootstrap.min.css';








const Project = () => {
  const sessionUser = useSelector(state=> state.session.user)
  const { projectId }  = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const tasksData = useSelector(selectProjectTasks(projectId))
  const project = useSelector(selectProject(projectId))
  ///react spring implmentation again
  const props = useSpring({
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: 100 },
    reset: true,
    config: config.slow
  })





  useEffect(()=>{
    dispatch(fetchProjectTasks(projectId))
  },[projectId])

  useEffect(()=>{
    dispatch(fetchProject(projectId))
  },[projectId])


  function handleTaskCheckboxClick(task) {
    const isChecked = document.getElementById(`checkbox_${task._id}`).checked
    const newTask = { ...task };
    newTask.completed = isChecked;
    dispatch(updateTask(newTask))
  }

  if(!project){
    return null
  }

  if(!tasksData){
    return null
  }


  //  let tasks = tasksData.filter((task)=> task.project === projectId || task.project._id === projectId)

   let tasks = tasksData.filter((task)=> {
    if(!task.project){
      return null;
    } else {return task.project === projectId || task.project._id === projectId}
   })

   let total = 0;
   let complete = 0; 

   tasks.forEach(task => {
    if(task){
      total+=1
    }
   })

   tasks.forEach(task=>{

    if(task.completed === true){
      complete += 1 
    }
   })

   function percentage(){
    return Math.floor(complete/total * 100)
   }


   





  return tasks && (
    <div className='projectPage-container'>
        <SideBar/>
        <div className='project-right-container'>
          <div className='project-top'>
            <div className='project-title'>
              <h1>Project: <span>{project.title}</span></h1>
            </div>
            <ProgressBar percentage={percentage}/>
            <div className='function-icons'>
              <div className='edit-icon'>
              <Button onClick={() => history.push(`/projects/${projectId}/edit`)}>
              <EditIcon fontSize='large'/>Edit Project
              </Button>
              </div>
              <div className='delete-icon'>
              <Button onClick={() => dispatch(deleteProject(projectId))}>
              <DeleteForeverIcon fontSize='large'/>Delete Project
              </Button>
              </div>
            </div>
          </div>


          <div className='project-bottom'>
              <div className='Card'>
                <h3>In Progress</h3>
                <CreateTaskForm className='create-task-button'/>
                <div className='task-Cards'>
                  {tasks.map((task, i)=> (
                    !task.completed && (
                    <animated.div
                    className='task-card'
                    style={props}
                    key={i}>
                      <div className='taskCard-info'>
                        <h2 className='taskCard-title'>{task.title}</h2>
                      </div>
                      <div className='taskCard-content'>
                        <p className='taskCard-description'>{task.description}</p>
                      </div>
                      <div className="taskCard-functions">
                        <Button onClick={() => history.push(`/projects/${projectId}/${task._id}`)}>Edit Task
                          <EditIcon />
                        </Button>
                        <Checkbox checked={task.completed} id={`checkbox_${task._id}`} onChange={() => handleTaskCheckboxClick(task)} color="success" />
                        <Button onClick={() => dispatch(deleteTask(task._id))}>Delete Task
                          <DeleteForeverIcon />
                        </Button>
                      </div>
                    </animated.div>)
                  ))}
                </div>


              </div>
              <div className='Card'>
                <h3>Done</h3>

                <div className='task-Cards'>
                  {tasks.map((task, i)=> (
                    task.completed && (
                    <animated.div
                    className='task-card'
                    style={props}
                    key={i}>
                      <div className='taskCard-info'>
                        <h4 className='taskCard-title'>{task.title}</h4>
                      </div>
                      <div className='taskCard-content'>
                        <p className='taskCard-description'>{task.description}</p>
                      </div>
                      <div className="taskCard-functions">
                        <Button onClick={() => history.push(`/projects/${task.project}/${task._id}`)}>Edit Task
                          <EditIcon />
                        </Button>
                        <Checkbox checked={task.completed} id={`checkbox_${task._id}`} onChange={() => handleTaskCheckboxClick(task)} color="success" />
                        <Button onClick={() => dispatch(deleteTask(task._id))}>Delete Task
                          <DeleteForeverIcon />
                        </Button>
                      </div>
                    </animated.div>)
                  ))}
                </div>
              </div>
        </div>
        </div>
    </div>
  )
}

export default Project









// }

// export default Tasks;
