import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import * as EmailValidator from 'email-validator';

const Login = () => {

    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [usernameColor, setusernameColor] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [passwordColor, setPasswordColor] = useState(null);
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    const passRegex1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte
    const passRegex2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    // Minimum ten characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    const passRegex3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/;

    const validateEmail = () => {
        if (EmailValidator.validate(username)) {
            setUsernameErr('Email is Valid !!!');
            setusernameColor('green');
            return true;
        }
        else if (username === "") {
            setUsernameErr('Fields Cannot be Empty !!!');
            setusernameColor('red');
            return false;
        }
        else {
            setUsernameErr('Email is Invalid !!!');
            setusernameColor('red');
            return false;
        }
    }

    const validatePassword = () => {
        if (password === "") {
            setPasswordErr('Fields Cannot be Empty !!!');
            setPasswordColor('red');
            return false;
        }
        else if (passRegex1.test(password) || passRegex2.test(password) || passRegex3.test(password)) {
            setPasswordErr('Password is Valid !!!');
            setPasswordColor('green');
            return true;
        }
        else {
            setPasswordErr('Password is Invalid !!!');
            setPasswordColor('red');
            return false;
        }
    }

    // login credentials check, storing sessions and redirection start
    const authenticate = async (e) => {
        try {
            e.preventDefault();

            if (validateEmail() & validatePassword()) {
                const response = await axios.post('http://localhost:5000/api/login', { username, password });

                if ((response.data.token && response.data.user.role === "user") || (response.data.token && response.data.user.role === "admin")) {
                    sessionStorage.setItem('Id', response.data.user._id);
                    sessionStorage.setItem('Name', response.data.user.name);
                    sessionStorage.setItem('Username', response.data.user.username);
                    sessionStorage.setItem('Role', response.data.user.role);
                    sessionStorage.setItem('Token', response.data.token);
                    navigate('/dashboard', { replace: true });
                    alert("Login Successful !!!");
                }
                else if (response.data === "User does not exist") {
                    setUsernameErr('User does not exist !!!');
                    setusernameColor('red');
                    return;
                }
                else if (response.data === "Invalid Password") {
                    setPasswordErr("Password is Wrong !!!");
                    setPasswordColor('red');
                    return;
                }
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
                            <h6 style={{ textAlign: 'left' }}>Email</h6>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='example123@gmail.com' type='text' onChange={(e) => { setUsername(e.target.value.trim()); setUsernameErr(''); setusernameColor(''); setClicked(false) }} style={{ color: `${usernameColor}` }} />
                            <em style={{ color: `${usernameColor}` }}>{usernameErr}</em>
                            <h6 style={{ textAlign: 'left' }}>Password</h6>
                            <Form.Input fluid icon='key' iconPosition='left' placeholder='enter your password' type='password' onChange={(e) => { setPassword(e.target.value.trim()); setPasswordErr(''); setPasswordColor(''); setClicked(false) }} style={{ color: `${passwordColor}` }} />
                            <em style={{ color: `${passwordColor}` }}>{passwordErr}</em>
                            {clicked ? (
                                <button className="ui primary button" style={{ width: '100%' }}>Login</button>
                            ) : (
                                <button onClick={(e) => { authenticate(e); setClicked(true) }} className="ui primary button" style={{ width: '100%' }}>Login</button>
                            )}
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
            {/* Login End */}
        </>
    )
}

export default Login