import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // login credentials check, storing sessions and redirection start
    const authenticate = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post('/api/login', { username, password });

            if ((response.data.token && response.data.user.role === "user") || (response.data.token && response.data.user.role === "admin")) {
                sessionStorage.setItem('Id', response.data.user._id);
                sessionStorage.setItem('Name', response.data.user.name);
                sessionStorage.setItem('Username', response.data.user.username);
                sessionStorage.setItem('Role', response.data.user.role);
                sessionStorage.setItem('Token', response.data.token);
                navigate('/dashboard', { replace: true });
                alert("Login Successful !!!");
            }
            else {
                alert(response.data);
            }
        } catch (error) {
            alert(error.message);
        }
    };
    // login credentials check, storing sessions and redirection end

    return (
        <>
            {/* Login Start */}
            <Grid textAlign='center' style={{ height: '100vh', backgroundColor: '#f0f2f5' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header color='blue' textAlign='center'>
                        <h2>Login</h2>
                    </Header>
                    <Form size='large'>
                        <Segment>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' type='text' onChange={(e) => { setUsername(e.target.value) }} />
                            <Form.Input fluid icon='key' iconPosition='left' placeholder='Password' type='password' onChange={(e) => { setPassword(e.target.value) }} />
                            <button onClick={(e) => { authenticate(e) }} className="ui primary button" style={{ width: '100%' }}>Login</button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
            {/* Login End */}
        </>
    )
}

export default Login