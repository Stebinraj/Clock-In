import React, { useState } from 'react';
import { Form, Grid, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as EmailValidator from 'email-validator';

const Register = (props) => {

    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [usernameColor, setusernameColor] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [passwordColor, setPasswordColor] = useState(null);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [nameColor, setNameColor] = useState(null);
    const [role, setRole] = useState('');
    const [roleError, setRoleError] = useState('');
    const [roleColor, setRoleColor] = useState(null);
    const token = sessionStorage.getItem('Token');
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    const passRegex1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte
    const passRegex2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    // Minimum ten characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    const passRegex3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/;

    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;

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
    };

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

    const validateName = () => {
        if (name === "") {
            setNameError('Fields Cannot be Empty !!!');
            setNameColor('red');
            return false;
        }
        else if (nameRegex.test(name)) {
            setNameError('Name is Valid !!!');
            setNameColor('green');
            return true;
        }
        else {
            setNameError('Name is Invalid !!!');
            setNameColor('red');
            return false;
        }
    }

    const validateRole = () => {
        if (!role) {
            setRoleError('Please Select an Option !!!');
            setRoleColor('red');
            return false;
        }
        else {
            setRoleError('');
            setRoleColor('');
            return true;
        }
    }

    // creating an employee, navigation
    const registerEmployee = async (e) => {
        try {
            e.preventDefault();

            if (validateName() & validateEmail() & validatePassword() & validateRole()) {
                const added = await axios.post('/api/register', { name, username, password, role, token });
                if (added.data.verifyToken) {
                    alert("Employee Added Successfully");
                    navigate('/dashboard', { replace: true });
                }
                else if (added.data === 'User already exists !!!') {
                    setUsernameErr('User already exists !!!');
                    setusernameColor('red');
                    return;
                }
                else {
                    alert('Employee Cannot be Added');
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            {(props.roles === "admin" && props.token) ? (
                <>
                    <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Form size='large'>
                                <Segment>
                                    <h6 style={{ textAlign: 'left' }}>Name</h6>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='enter your name' type='text' onChange={(e) => { setName(e.target.value.trim()); setNameError(''); setNameColor(''); setClicked(false) }} style={{ color: `${nameColor}` }} />
                                    <em style={{ color: `${nameColor}` }}>{nameError}</em>
                                    <h6 style={{ textAlign: 'left' }}>Email</h6>
                                    <Form.Input fluid icon='mail' iconPosition='left' placeholder='example123@gmail.com' type='text' onChange={(e) => { setUsername(e.target.value.trim()); setUsernameErr(''); setusernameColor(''); setClicked(false) }} style={{ color: `${usernameColor}` }} />
                                    <em style={{ color: `${usernameColor}` }}>{usernameErr}</em>
                                    <h6 style={{ textAlign: 'left' }}>Password</h6>
                                    <Form.Input fluid icon='key' iconPosition='left' placeholder='enter your password' type='password' onChange={(e) => { setPassword(e.target.value.trim()); setPasswordErr(''); setPasswordColor(''); setClicked(false) }} style={{ color: `${passwordColor}` }} />
                                    <em style={{ color: `${passwordColor}` }}>{passwordErr}</em>
                                    <Form.Group inline style={{ justifyContent: 'space-between' }}>
                                        <h6 style={{ textAlign: 'left' }}>Role</h6>
                                        <Form.Input type='radio' label='Admin' name='role' value='admin' checked={role === 'admin'} onChange={() => { setRole('admin'); setRoleError(''); setRoleColor(''); setClicked(false) }} />
                                        <Form.Input type='radio' label='User' name='role' value='user' checked={role === 'user'} onChange={() => { setRole('user'); setRoleError(''); setRoleColor(''); setClicked(false) }} />
                                    </Form.Group>
                                    <em style={{ color: `${roleColor}` }}>{roleError}</em>
                                    {clicked ? (
                                        <>
                                            <button className="ui primary button" style={{ width: '100%' }}>Submit</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={(e) => { registerEmployee(e); setClicked(true) }} className="ui primary button" style={{ width: '100%' }}>Submit</button>
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

export default Register