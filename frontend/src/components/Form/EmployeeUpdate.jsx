import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Grid, Segment } from 'semantic-ui-react';
import * as EmailValidator from 'email-validator';

const EmployeeUpdate = (props) => {

    const _id = sessionStorage.getItem('UpdateId');
    const [name, setName] = useState(sessionStorage.getItem('UpdateName'));
    const [nameError, setNameError] = useState('');
    const [nameColor, setNameColor] = useState(null);
    const [username, setUsername] = useState(sessionStorage.getItem('UpdateUsername'));
    const [usernameErr, setUsernameErr] = useState('');
    const [usernameColor, setusernameColor] = useState(null);
    const [password, setPassword] = useState(sessionStorage.getItem('UpdatePassword'));
    const [passwordErr, setPasswordErr] = useState('');
    const [passwordColor, setPasswordColor] = useState(null);
    const [roleError, setRoleError] = useState('');
    const [roleColor, setRoleColor] = useState(null);
    const [role, setRole] = useState(sessionStorage.getItem('UpdateRole'));
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

    // update specific employee credentials
    const updateEmployee = async (e) => {
        try {
            e.preventDefault();
            if (validateName() & validateEmail() & validatePassword() & validateRole()) {
                const updated = await axios.put(`http://localhost:5000/api/users/${_id}`, { name, username, password, role, token });
                if (updated) {
                    alert('Updated Successfully');
                    navigate('/dashboard', { replace: true });
                }
                else {
                    alert('Updation failed');
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            {(props.roles === "admin" && props.token) ? (
                <>
                    <Grid textAlign='center' style={{ height: '90vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Form size='large'>
                                <Segment>
                                    <h6 style={{ textAlign: 'left' }}>Name</h6>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' type='text' onChange={(e) => { setName(e.target.value); setNameError(''); setNameColor(''); setClicked(false) }} value={name} />
                                    <em style={{ color: `${nameColor}` }}>{nameError}</em>
                                    <h6 style={{ textAlign: 'left' }}>Email</h6>
                                    <Form.Input fluid icon='mail' iconPosition='left' placeholder='Username' type='text' onChange={(e) => { setUsername(e.target.value); setUsernameErr(''); setusernameColor(''); setClicked(false) }} value={username} />
                                    <em style={{ color: `${usernameColor}` }}>{usernameErr}</em>
                                    <h6 style={{ textAlign: 'left' }}>Password</h6>
                                    <Form.Input fluid icon='key' iconPosition='left' placeholder='Password' type='password' onChange={(e) => { setPassword(e.target.value); setPasswordErr(''); setPasswordColor(''); setClicked(false) }} value={password} />
                                    <em style={{ color: `${passwordColor}` }}>{passwordErr}</em>
                                    <Form.Group inline style={{ justifyContent: 'space-between' }}>
                                        <h6 style={{ textAlign: 'left' }}>Role</h6>
                                        <Form.Input type='radio' label='Admin' name='role' value={role} checked={role === 'admin'} onChange={() => { setRole('admin'); setRoleError(''); setRoleColor(''); setClicked(false); }} />
                                        <Form.Input type='radio' label='User' name='role' value={role} checked={role === 'user'} onChange={() => { setRole('user'); setRoleError(''); setRoleColor(''); setClicked(false); }} />
                                    </Form.Group>
                                    <em style={{ color: `${roleColor}` }}>{roleError}</em>
                                    {clicked ? (
                                        <>
                                            <button className="ui primary button" style={{ width: '100%' }}>Update</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={(e) => { updateEmployee(e); setClicked(true) }} className="ui primary button" style={{ width: '100%' }}>Update</button>
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

export default EmployeeUpdate