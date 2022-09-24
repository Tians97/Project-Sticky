import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { createTask, fetchUserTasks, selectUserTasks } from "../../store/tasks";



const CreateTask = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector((state)=> state.session.user);
    const tasks = useSelector(selectUserTasks())
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState(1);
    const { projectId } = useParams();

    console.log(sessionUser._id)


    const handleSubmit = (e) =>{
        e.preventDefault();
        const taskData ={
            title,
            description,
            deadline,
            priority,
            project: projectId,
            creator: sessionUser._id
        }
        console.log(taskData)
        dispatch(createTask(taskData))
    }

    // useEffect(()=>{
    //     dispatch(fetchUserTasks())
    // },[])
    

    return(
        <>
        <h1>Create Task</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}/>
            <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)}/>
            <input type="date" value={deadline} onChange={(e)=> setDeadline(e.target.value)}/>
            
            <label>Choose a priority level:</label>
            <select value={priority} onChange={(e)=> setPriority(e.target.value)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
            <input type="submit" value="Create Task"/>
        </form>
        
        </>
    )
    
    
    
}

export default CreateTask;