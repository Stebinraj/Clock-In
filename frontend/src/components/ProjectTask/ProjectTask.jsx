import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProjectTask = (props) => {

    const [projectLabel, setProjectLabel] = useState('');
    const [projectLabelError, setProjectLabelError] = useState('');
    const [projectLabelColor, setProjectLabelColor] = useState(null);
    const [taskLabel, setTaskLabel] = useState('');
    const [taskLabelError, setTaskLabelError] = useState('');
    const [taskLabelColor, setTaskLabelColor] = useState(null);
    const [projectData, setProjectData] = useState([]);
    const [taskData, setTaskData] = useState([]);
    const [projectClicked, setProjectClicked] = useState(false);
    const [taskClicked, setTaskClicked] = useState(false);
    const token = sessionStorage.getItem('Token');
    const textRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

    // add project
    const sendProject = async (e) => {
        try {
            e.preventDefault();
            if (validateProject()) {
                const response = await axios.post('http://localhost:5000/api/project', { projectLabel, token });
                console.log(response);
                if (response.data.projectLabel) {
                    alert('Project Added Successfully');
                    setProjectLabel('');
                    getProject();
                }
                else {
                    alert('Unsuccessful');
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // // add tasks
    const sendTask = async (e) => {
        try {
            e.preventDefault();
            if (validateTask()) {
                const response = await axios.post('http://localhost:5000/api/task', { taskLabel, token });
                if (response.data.taskLabel) {
                    alert('Task Added Successfully');
                    setTaskLabel('');
                    getTask();
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // fetch project
    const getProject = async () => {
        try {
            const project = await axios.post('http://localhost:5000/api/projects', { token });
            setProjectData(project.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    // fetch task
    const getTask = async () => {
        try {
            const task = await axios.post('http://localhost:5000/api/tasks', { token });
            setTaskData(task.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    // project validation
    const validateProject = () => {
        if (projectLabel === "") {
            setProjectLabelError('Fields Cannot be Empty !!!');
            setProjectLabelColor('red');
            return false;
        }
        else if (!textRegex.test(projectLabel)) {
            setProjectLabelError('Invalid Value !!!');
            setProjectLabelColor('red');
            return false;
        }
        else {
            setProjectLabelError('');
            setProjectLabelColor(null);
            return true;
        }
    }

    // task validation
    const validateTask = () => {
        if (taskLabel === "") {
            setTaskLabelError('Fields Cannot be Empty !!!');
            setTaskLabelColor('red');
            return false;
        }
        else if (!textRegex.test(taskLabel)) {
            setTaskLabelError('Invalid Value !!!');
            setTaskLabelColor('red');
            return false;
        }
        else {
            setTaskLabelError('');
            setTaskLabelColor(null);
            return true;
        }
    };


    useEffect(() => {
        // fetch project
        const getProject = async () => {
            try {
                const project = await axios.post('http://localhost:5000/api/projects', { token });
                setProjectData(project.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getProject();

        // fetch task
        const getTask = async () => {
            try {
                const task = await axios.post('http://localhost:5000/api/tasks', { token });
                setTaskData(task.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getTask();
    }, [token])

    return (
        <>
            {(props.roles === "admin" && props.token) ? (
                <>
                    <main className="container mt-3">
                        <div className="row">
                            <section className="col-lg-6">
                                <h2 className="section-header">Add Project</h2>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Enter Project Name" onChange={(e) => { setProjectLabel(e.target.value); setProjectLabelError(''); setProjectLabelColor(''); setProjectClicked(false); }} value={projectLabel} />
                                    <em style={{ color: `${projectLabelColor}` }}>{projectLabelError}</em>
                                </div>
                                {projectClicked ? (
                                    <>
                                        <button className="btn btn-primary mt-2">Add project</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-primary mt-2" onClick={(e) => { sendProject(e); setProjectClicked(true) }}>Add project</button>
                                    </>
                                )}
                                <h2 className="section-header">Available Projects</h2>
                                <ul className="list-group">
                                    {projectData.sort((a, b) => a.projectLabel.localeCompare(b.projectLabel)).map((value, index) => {
                                        return (
                                            <li className="list-group-item" key={index}>{value.projectLabel}</li>
                                        )
                                    })}
                                </ul>
                            </section>
                            <section className="col-lg-6">
                                <h2 className="section-header">Add Task</h2>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Enter task name" onChange={(e) => { setTaskLabel(e.target.value); setTaskLabelColor(''); setTaskLabelError(''); setTaskClicked(false) }} value={taskLabel} />
                                    <em style={{ color: `${taskLabelColor}` }}>{taskLabelError}</em>
                                </div>
                                {taskClicked ? (
                                    <>
                                        <button className="btn btn-primary mt-2">Add task</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-primary mt-2" onClick={(e) => { sendTask(e); setTaskClicked(true) }}>Add task</button>
                                    </>
                                )}
                                <h2 className="section-header">Available Tasks</h2>
                                <ul className="list-group">
                                    {taskData.sort((a, b) => a.taskLabel.localeCompare(b.taskLabel)).map((value, index) => {
                                        return (
                                            <li className="list-group-item" key={index}>{value.taskLabel}</li>
                                        )
                                    })}
                                </ul>
                            </section>
                        </div>
                    </main>
                </>
            ) : (null)}
        </>
    )
}

export default ProjectTask