import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';

const TrackerUpdate = (props) => {

    const _id = sessionStorage.getItem('TrackerId');
    const [project, setProject] = useState(sessionStorage.getItem('TrackerProject'));
    const [task, setTask] = useState(sessionStorage.getItem('TrackerTask'));
    const [jobDescription, setJobDesc] = useState(sessionStorage.getItem('TrackerJobDesc'))
    const [modeOfWork, setModeOfWork] = useState(sessionStorage.getItem('TrackerModeOfWork'));
    const token = sessionStorage.getItem('Token')
    const navigate = useNavigate();

    // update specific user tracker history
    const updateTracker = (e) => {
        e.preventDefault();
        const updatedTracker = axios.put(`/api/tracker/${_id}`, { project, task, jobDescription, modeOfWork, token });
        if (updatedTracker) {
            alert('Updated Successfully');
            navigate('/analysis', { replace: true });
        }
        else {
            alert('Data cannot be updated');
        }
    };

    return (
        <>
            {(props.roles === "admin" && props.token) ? (
                <>
                    <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header color='blue' textAlign='center'>
                                <h2>Tracker Update</h2>
                            </Header>
                            <Form size='large'>
                                <Segment>
                                    <Form.Input fluid icon='mail' iconPosition='left' placeholder='Project' type='text' onChange={(e) => { setProject(e.target.value) }} value={project} />
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Task' type='text' onChange={(e) => { setTask(e.target.value) }} value={task} />
                                    <Form.Input fluid icon='key' iconPosition='left' placeholder='Job Description' type='text' onChange={(e) => { setJobDesc(e.target.value) }} value={jobDescription} />
                                    <Form.Input fluid icon='key' iconPosition='left' placeholder='Mode of Work' type='text' onChange={(e) => { setModeOfWork(e.target.value) }} value={modeOfWork} />
                                    <button onClick={(e) => { updateTracker(e) }} className="ui primary button" style={{ width: '100%' }}>Update</button>
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