import { Link, useParams } from "react-router-dom";
import "./TicketCard.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  fetchProjects,
  selectProjects,
  createProject,
  selectProject,
} from "../../store/projects";
import { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";





const TicketCard = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user); //grabbing sessionUser from session state
  const projects = useSelector(selectProjects(sessionUser._id));
  // projects filtered by sessionUserId
  //for create a project
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(null);


  //using react spring
  const transition = useTransition(projects, {
    from: { x: -100, y: 800, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x:100, y:800, opacity: 0 },  
  });


  ////react spring

  useEffect(() => {
    dispatch(fetchProjects(sessionUser._id));
  }, [sessionUser]);

  if (!projects.length) {
    return null;
  }

  // if(projects.length){
  //   projects.filter((project)=> project.creator._id ? project.creator._id === sessionUser._id : null)
  // }

  // project create

  // console.log(today)

  let today = new Date().toISOString();

  const handleSubmit = (e) => {
    e.preventDefault();

    const proj = {
      title,
      description,
      creator: sessionUser._id,
      deadline: today,
    };
    dispatch(createProject(proj));
  };

  ///

  return (
    <>
      <div className="card-container">
        <div className="cards">

          {transition(( style, project, i )=>(
            <animated.div className='card' style={style} key={i}>
              <div className="card-info">
                <div className="card-title">
                  <Link to={`/projects/${project._id}`}>
                    <div className="card-top">
                      <div className="card-top-decor">
                        <CircularProgress fontSize='small' value={40} color="green">
                          <CircularProgressLabel>40%</CircularProgressLabel>
                        </CircularProgress>
                      </div>
                      <h4 className="project-title">{project.title}</h4>
                    </div>
                  </Link>
                </div>
                <div className="project-content">
                  <p className="description">{project.description}</p>
                </div>

                <div className="project-bot">
                  {/* <p className="deadline">Deadline: {project.deadline}</p> */}
                  <div className="card-functions">
                    <Button>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => dispatch(deleteProject(project._id))}>
                      <DeleteForeverIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </animated.div>
          ))}

          {/* {projects.map((project, i) => (
            <div className="card" key={i}>
              <div className="card-info">
                <div className="card-title">
                  <Link to={`/projects/${project._id}`}>
                    <div className="card-top">
                      <div className="card-top-decor">
                        <CircularProgress fontSize='small' value={40} color="green">
                          <CircularProgressLabel>40%</CircularProgressLabel>
                        </CircularProgress>
                      </div>
                      <h4 className="project-title">{project.title}</h4>
                    </div>
                  </Link>
                </div>
                <div className="project-content">
                  <p className="description">{project.description}</p>
                </div>

                <div className="project-bot">
                  <div className="card-functions">
                    <Button>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => dispatch(deleteProject(project._id))}>
                      <DeleteForeverIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
        
        

      </div>
    </>
  );
};

export default TicketCard;
