import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProjectTask = (props) => {

    const [projectLabel, setProjectLabel] = useState('');
    const [taskLabel, setTaskLabel] = useState('');
    const [projectData, setProjectData] = useState([]);
    const [taskData, setTaskData] = useState([]);
    const token = sessionStorage.getItem('Token');

    // add project
    const sendProject = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('/api/project', { projectLabel, token });
            console.log(response);
            if (response.data.projectLabel) {
                alert('Project Added Successfully');
                setProjectLabel('');
                getProject();
            }
            else {
                alert('Unsuccessful');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // // add tasks
    const sendTask = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('/api/task', { taskLabel, token });
            if (response.data.taskLabel) {
                alert('Task Added Successfully');
                setTaskLabel('');
                getTask();
            } else {
                alert('Unsuccessful')
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // fetch project
    const getProject = async () => {
        try {
            const project = await axios.post('/api/projects', { token });
            setProjectData(project.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    // fetch task
    const getTask = async () => {
        try {
            const task = await axios.post('/api/tasks', { token });
            setTaskData(task.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        // fetch project
        const getProject = async () => {
            try {
                const project = await axios.post('/api/projects', { token });
                setProjectData(project.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getProject();

        // fetch task
        const getTask = async () => {
            try {
                const task = await axios.post('/api/tasks', { token });
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
                                    <input className="form-control" type="text" placeholder="Enter Project Name" onChange={(e) => { setProjectLabel(e.target.value) }} value={projectLabel} />
                                </div>
                                <button className="btn btn-primary mt-2" onClick={(e) => { sendProject(e) }}>Add project</button>
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
                                    <input className="form-control" type="text" placeholder="Enter task name" onChange={(e) => { setTaskLabel(e.target.value) }} value={taskLabel} />
                                </div>
                                <button className="btn btn-primary mt-2" onClick={(e) => { sendTask(e) }}>Add task</button>
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