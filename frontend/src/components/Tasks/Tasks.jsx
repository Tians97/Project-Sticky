import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { SideBar } from '../MainPage/SideBar';
import './Tasks.css';
import logo from '../../assets/demo-user.png'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { fetchUserTasks, selectUserOpenTasks, updateTask } from '../../store/tasks';
import { deleteTask } from '../../store/tasks';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Footer from '../Footer/Footer';

const Tasks = ({ id, title, description, deadline }) => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const tasks = useSelector(selectUserOpenTasks());

    useEffect(() => {
        dispatch(fetchUserTasks(sessionUser._id))
    }, [sessionUser._id])

    function handleTaskCheckboxClick(task) {
        const isChecked = document.getElementById(`checkbox_${task._id}`).checked
        const newTask = { ...task };
        newTask.completed = isChecked;
        dispatch(updateTask(newTask));
    }
    
    function taskComparetor(t1, t2){
        if (t1.project?.title?.toLowerCase() > t2.project?.title?.toLowerCase()){
            return 1;
        } 
        if (t1.project?.title === t2.project?.title) {
            return (t1.deadline >= t2.deadline) ? 1 : -1;
        } 
        return -1;
    }

    return (
        <>
        <div className='main-container'>
            <SideBar />
            <div className='task-container'>
                <TableContainer component={Paper}>
                    <Table className='task-table' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Project</TableCell>
                                <TableCell align="center">Task</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Deadline</TableCell>
                                <TableCell align="center">Completed</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.sort(taskComparetor).map((task) => (task.project && (
                                <TableRow
                                    key={task.title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{task.project?.title}</TableCell>
                                    <TableCell align="center">{task.title}</TableCell>
                                    <TableCell align="center"><p className='tasks-description'>{task.description}</p></TableCell>
                                    <TableCell align="center">{task.deadline.slice(0,10)}</TableCell>
                                    <TableCell align='center'>
                                        <Checkbox checked={task.completed} id={`checkbox_${task._id}`} onChange={() => handleTaskCheckboxClick(task)} color="success" />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Button onClick={() => history.push(`/projects/${task.project}/${task._id}`)}>
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={() => dispatch(deleteTask(task._id))}>
                                            <DeleteForeverIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
        <div id='foot'>
                    <Footer />
        </div>
        </>
    )
}

export default Tasks;
