import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { selectProject, fetchProject, updateProject, clearProjectErrors} from '../../store/projects'

export default function EditProjectForm() {
    const dispatch = useDispatch();
    const {projectId} = useParams();
    const history = useHistory();
    let projectData = useSelector(selectProject(projectId))
    const [project, setProject] = useState(projectData)
    const errors = useSelector(state => state.errors.project);


    useEffect(
        () => { setProject(projectData) },
        [projectData]
    )

    useEffect(() => {
        if (projectId){
            dispatch(fetchProject(projectId))
        }
    }, [projectId])

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateProject(project))
        .then(dispatch(clearProjectErrors()))
        if(project.title){
            
            history.push('/home')
        }
    }
    // console.log("debug",project)
    return (
        <div>
                {project && (
                    <div>
                        <form className="create-project-form">
                        <div className='errors'>{errors?.title}</div>
                            <label>
                            Project Title :
                            <input
                                className="form-field"
                                type="text"
                                placeholder="title"
                                value={project.title}
                                onChange={(e) => { setProject({ ...project, title: e.target.value }) }}
                                required
                                />
                            </label>

                            <label>
                                Description:
                            <input
                                className="form-field"
                                type="text"
                                placeholder="description"
                                value={project.description}
                                onChange={(e) => { setProject({ ...project, description: e.target.value }) }}
                                />
                            </label>

                            <label>
                                Deadline:
                            <input
                                className="form-field"
                                type="date"
                                value={project.deadline}
                                onChange={(e) => { setProject({ ...project, deadline: e.target.value }) }}
                                />
                            </label>
                            <button onClick={handleSubmit}>Submit</button>   
                        </form>
                        
                    </div>
                    
                )}
        </div>
    )
        // <h1>history</h1>
}
