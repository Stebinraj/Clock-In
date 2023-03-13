import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';

const EmployeeUpdate = (props) => {

    const _id = sessionStorage.getItem('UpdateId');
    const [name, setName] = useState(sessionStorage.getItem('UpdateName'));
    const [username, setUsername] = useState(sessionStorage.getItem('UpdateUsername'));
    const [password, setPassword] = useState(sessionStorage.getItem('UpdatePassword'));
    const [role, setRole] = useState(sessionStorage.getItem('UpdateRole'));
    const token = sessionStorage.getItem('Token');
    const navigate = useNavigate();

    // update specific employee credentials
    const updateEmployee = async (e) => {
        try {
            e.preventDefault();
            const updated = await axios.put(`/api/users/${_id}`, { name, username, password, role, token });
            if (updated) {
                alert('Updated Successfully');
                navigate('/dashboard', { replace: true });
            }
            else {
                alert('Updation failed');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            {(props.roles === "admin" && props.token) ? (
                <>
                    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header color='blue' textAlign='center'>
                                <h2>Update Employee</h2>
                            </Header>
                            <Form size='large'>
                                <Segment>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' type='text' onChange={(e) => { setName(e.target.value) }} value={name} />
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' type='text' onChange={(e) => { setUsername(e.target.value) }} value={username} />
                                    <Form.Input fluid icon='key' iconPosition='left' placeholder='Password' type='password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
                                    <Form.Group inline >
                                        <Form.Input type='radio' label='Admin' name='role' value={role} checked={role === 'admin'} onChange={() => setRole('admin')} />
                                        <Form.Input type='radio' label='User' name='role' value={role} checked={role === 'user'} onChange={() => setRole('user')} />
                                    </Form.Group>
                                    <button onClick={(e) => { updateEmployee(e) }} className="ui primary button" style={{ width: '100%' }}>Update</button>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </>
            ) : (null)}
        </>
    )
}

export default EmployeeUpdate