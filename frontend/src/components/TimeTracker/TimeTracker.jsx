import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TrackerHistory from '../TrackerHistory/TrackerHistory';

const TimeTracker = (props) => {

    // getting _id from session storage
    const _id = sessionStorage.getItem('Id');
    const empId = sessionStorage.getItem('Id');
    const token = sessionStorage.getItem('Token');

    const [project, setProject] = useState('');
    const [projectData, setProjectData] = useState([]);
    const [taskData, setTaskData] = useState([]);
    const [task, setTask] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [modeOfWork, setModeOfWork] = useState('');
    const [startTime, setStartTime] = useState('');
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [reload, setReload] = useState(false);

    // start timer
    const start = () => {
        setStartTime(new Date());
        setRunning(true);
        setIsDisabled(true);
        setReload(false);
    };

    // stop timer
    const stop = async () => {
        setRunning(false);
        setTime(0);
        setIsDisabled(false);
        let post = await axios.post('/api/tracker', { empId, project, task, jobDescription, modeOfWork, startTime, endTime: new Date(), token });
        if (post) {
            setProject('');
            setTask('');
            setModeOfWork('');
            setJobDescription('');
        };
        setReload(true);
    };

    // pause timer
    const pause = async () => {
        setRunning(false);
        setIsDisabled(true);
        await axios.post('/api/tracker', { empId, project, task, jobDescription, modeOfWork, startTime, endTime: new Date(), token });
        setReload(true);
    };

    // handle side effects while saving, fetching start 
    useEffect(() => {

        // fetch project
        const getProject = async () => {
            let project = await axios.post('/api/projects', { token });
            setProjectData(project.data);
        }
        getProject();

        // fetch task
        const getTask = async () => {
            let task = await axios.post('/api/tasks', { token });
            setTaskData(task.data);
        }
        getTask();

        let interval = null;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1000);
            }, 1000);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);

    }, [running, _id, token]);
    // handle side effects while saving, fetching end

    return (
        <>
            {(props.roles === "user" && props.token) ? (
                <>
                    {/* Employee project, task, job description, mode of work, start time,end time start*/}
                    <div className="container-fluid mt-2">
                        <div className="row">
                            <div className="col-sm-12 col-lg-2">
                                <select className="form-select w-100" disabled={isDisabled} value={project} onChange={(e) => { setProject(e.target.value) }}>
                                    <option value="" disabled={true}>Project</option>
                                    {projectData.sort((a, b) => a.projectLabel.localeCompare(b.projectLabel)).map((item, index) => {
                                        return (
                                            <option key={index} value={item.projectLabel}>{item.projectLabel}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-sm-12 col-lg-2">
                                <select className="form-select w-100" disabled={isDisabled} value={task} onChange={(e) => { setTask(e.target.value) }}>
                                    <option value="" disabled={true}>Task</option>
                                    {taskData.sort((a, b) => a.taskLabel.localeCompare(b.taskLabel)).map((item, index) => {
                                        return (
                                            <option key={index} value={item.taskLabel}>{item.taskLabel}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-sm-12 col-lg-2">
                                <select className="form-select w-100" disabled={isDisabled} value={modeOfWork} onChange={(e) => { setModeOfWork(e.target.value) }}>
                                    <option value="" disabled={true}>Mode of Work</option>
                                    <option value="Work from Home">Work from Home</option>
                                    <option value="Work from Office">Work from Office</option>
                                </select>
                            </div>

                            <div className="col-sm-12 col-lg-2">
                                <div className="input-group">
                                    <input type="text" className="form-control w-100" placeholder='Job Description' disabled={isDisabled} value={jobDescription} onChange={(e) => { setJobDescription(e.target.value) }} />
                                </div>
                            </div>

                            <div className="col-sm-12 col-lg-4">
                                <div className="d-flex justify-content-end w-100">
                                    <div className="timer mt-2 me-1">
                                        <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
                                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                                        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                                    </div>
                                    <div>
                                        {running ?
                                            (
                                                <>
                                                    <button className="btn me-1 btn-danger" onClick={stop}>Stop</button>
                                                    <button className="btn btn-primary" onClick={pause}>Pause</button>
                                                </>
                                            )
                                            :
                                            (
                                                <button className="btn btn-success" onClick={start}>Start</button>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Employee project, task, job description, mode of work, start time,end time end*/}

                    <br />

                    {/* Tracker Hostory component */}
                    <TrackerHistory reload={reload} roles={props.roles} token={props.token} />
                </>
            ) : (null)}
        </>
    )
}

export default TimeTracker