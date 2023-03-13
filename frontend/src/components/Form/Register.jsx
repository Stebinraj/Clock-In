import React, { useState } from 'react';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const token = sessionStorage.getItem('Token');
    const navigate = useNavigate();

    // creating an employee, navigation
    const registerEmployee = async (e) => {
        try {
            e.preventDefault();
            let added = await axios.post('/api/register', { name, username, password, role, token });
            if (added.data.verifyToken) {
                alert("Employee Added Successfully");
                navigate('/dashboard', { replace: true });
            } else if (added.data === 'User already exists !!!') {
                alert(added.data);
            }
            else {
                alert('Employee Cannot be Added');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            {(props.roles === "admin" && props.token) ? (
                <>
                    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header color='blue' textAlign='center'>
                                <h2>Add Employee</h2>
                            </Header>
                            <Form size='large'>
                                <Segment>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' type='text' onChange={(e) => { setName(e.target.value) }} />
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' type='text' onChange={(e) => { setUsername(e.target.value) }} />
                                    <Form.Input fluid icon='key' iconPosition='left' placeholder='Password' type='password' onChange={(e) => { setPassword(e.target.value) }} />
                                    <Form.Group inline >
                                        <Form.Input type='radio' label='Admin' name='role' value='admin' checked={role === 'admin'} onChange={() => setRole('admin')} />
                                        <Form.Input type='radio' label='User' name='role' value='user' checked={role === 'user'} onChange={() => setRole('user')} />
                                    </Form.Group>
                                    <button onClick={(e) => { registerEmployee(e) }} className="ui primary button" style={{ width: '100%' }}>Submit</button>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </>
            ) : (null)}

        </>
    )
}

export default Register