import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Segment } from 'semantic-ui-react';

const TrackerUpdate = (props) => {

    const _id = sessionStorage.getItem('TrackerId');
    const [project, setProject] = useState(sessionStorage.getItem('TrackerProject'));
    const [projectError, setProjectError] = useState('');
    const [projectColor, setProjectColor] = useState(null);
    const [task, setTask] = useState(sessionStorage.getItem('TrackerTask'));
    const [taskError, setTaskError] = useState('');
    const [taskColor, setTaskColor] = useState(null);
    const [jobDescription, setJobDesc] = useState(sessionStorage.getItem('TrackerJobDesc'));
    const [jobDescriptionError, setJobDescriptionError] = useState('');
    const [jobDescriptionColor, setJobDescriptionColor] = useState(null);
    const [modeOfWork, setModeOfWork] = useState(sessionStorage.getItem('TrackerModeOfWork'));
    const [modeOfWorkError, setModeOfWorkError] = useState('');
    const [modeOfWorkColor, setModeOfWorkColor] = useState(null);
    const token = sessionStorage.getItem('Token');
    const [clicked, setClicked] = useState(false);
    const textRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const navigate = useNavigate();

    // project validation
    const validateProject = () => {
        if (project === "") {
            setProjectError('Fields Cannot be Empty !!!');
            setProjectColor('red');
            return false;
        }
        else if (!textRegex.test(project)) {
            setProjectError('Invalid Value !!!');
            setProjectColor('red');
            return false;
        }
        else {
            setProjectError('');
            setProjectColor(null);
            return true;
        }
    }

    // task validation
    const validateTask = () => {
        if (task === "") {
            setTaskError('Fields Cannot be Empty !!!');
            setTaskColor('red');
            return false;
        }
        else if (!textRegex.test(task)) {
            setTaskError('Invalid Value !!!');
            setTaskColor('red');
            return false;
        }
        else {
            setTaskError('');
            setTaskColor(null);
            return true;
        }
    };

    // mode of work validation
    const validateModeOfWork = () => {
        if (modeOfWork === "") {
            setModeOfWorkError('Fields Cannot be Empty !!!');
            setModeOfWorkColor('red');
            return false;
        }
        else if (!textRegex.test(modeOfWork)) {
            setModeOfWorkError('Invalid Value !!!');
            setModeOfWorkColor('red');
            return false;
        }
        else {
            setModeOfWorkError('');
            setModeOfWorkColor(null);
            return true;
        }
    }

    // Job Description validation
    const validateJobDescription = () => {
        if (jobDescription === "") {
            setJobDescriptionError('Fields Cannot be Empty !!!');
            setJobDescriptionColor('red');
            return false;
        }
        else if (!textRegex.test(jobDescription)) {
            setJobDescriptionError('Invalid Value !!!');
            setJobDescriptionColor('red');
            return false;
        }
        else {
            setJobDescriptionError('');
            setJobDescriptionColor(null);
            return true;
        }
    }

    // update specific user tracker history
    const updateTracker = (e) => {
        try {
            e.preventDefault();
            if (validateProject() & validateTask() & validateModeOfWork() & validateJobDescription()) {
                const updatedTracker = axios.put(`http://localhost:5000/api/tracker/${_id}`, { project, task, jobDescription, modeOfWork, token });
                if (updatedTracker) {
                    alert('Updated Successfully');
                    navigate('/analysis', { replace: true });
                }
                else {
                    alert('Data cannot be updated');
                }
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            {(props.roles === "admin" && props.token) ? (
                <>
                    <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Form size='large'>
                                <Segment>
                                    <h6 style={{ textAlign: 'left' }}>Project</h6>
                                    <Form.Input fluid icon='product hunt' iconPosition='left' placeholder='Project' type='text' onChange={(e) => { setProject(e.target.value); setProjectError(''); setProjectColor(''); setClicked(false) }} value={project} />
                                    <em style={{ color: `${projectColor}` }}>{projectError}</em>
                                    <h6 style={{ textAlign: 'left' }}>Task</h6>
                                    <Form.Input fluid icon='tasks' iconPosition='left' placeholder='Task' type='text' onChange={(e) => { setTask(e.target.value); setTaskError(''); setTaskColor(''); setClicked(false) }} value={task} />
                                    <em style={{ color: `${taskColor}` }}>{taskError}</em>
                                    <h6 style={{ textAlign: 'left' }}>Job Description</h6>
                                    <Form.Input fluid icon='slideshare' iconPosition='left' placeholder='Job Description' type='text' onChange={(e) => { setJobDesc(e.target.value); setJobDescriptionError(''); setJobDescriptionColor(''); setClicked(false) }} value={jobDescription} />
                                    <em style={{ color: `${jobDescriptionColor}` }}>{jobDescriptionError}</em>
                                    <h6 style={{ textAlign: 'left' }}>Mode of Work</h6>
                                    <Form.Input fluid icon='building' iconPosition='left' placeholder='Mode of Work' type='text' onChange={(e) => { setModeOfWork(e.target.value); setModeOfWorkError(''); setModeOfWorkColor(''); setClicked(false) }} value={modeOfWork} />
                                    <em style={{ color: `${modeOfWorkColor}` }}>{modeOfWorkError}</em>
                                    {clicked ? (
                                        <>
                                            <button className="ui primary button" style={{ width: '100%' }}>Update</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={(e) => { updateTracker(e); setClicked(true) }} className="ui primary button" style={{ width: '100%' }}>Update</button>
                                        </>
                                    )}
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </>
            ) : (null)}
        </>
    )
}

export default TrackerUpdate