import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ViewUsers = (props) => {

    const [apiData, setApiData] = useState([]);
    const token = sessionStorage.getItem('Token');
    const navigate = useNavigate();

    // delete specific employee
    const onDelete = async (e, _id) => {
        try {
            e.preventDefault();
            const deleteData = await axios.delete(`/api/delete/${_id}`);
            if (deleteData) {
                alert('Deleted Successfully')
                getData();
            }
            else {
                alert("Unsuccessful");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // fetch employee list after deleted specific employee
    const getData = async () => {
        try {
            const response = await axios.post('/api/users', { token });
            setApiData(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    // store _id, name, username, password, role in sessions for updating employee
    const updateUser = (e, value) => {
        try {
            e.preventDefault();
            sessionStorage.setItem('UpdateId', value._id);
            sessionStorage.setItem('UpdateName', value.name);
            sessionStorage.setItem('UpdateUsername', value.username);
            sessionStorage.setItem('UpdatePassword', value.password)
            sessionStorage.setItem('UpdateRole', value.role);
            // sessionStorage.setItem('UpdateToken', token);
            navigate('/update', { replace: true });
        } catch (error) {
            console.log(error.message);
        }
    }

    // store _id in sessions for analyse a specific employee tracking history
    const analyzeData = (e, value) => {
        try {
            e.preventDefault();
            sessionStorage.setItem('Id', value._id);
            navigate('/analysis', { replace: true });
        } catch (error) {
            console.log(error.message);
        }
    };

    // handle side effects of fetching employees
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.post('/api/users', { token });
                setApiData(response.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getData();
    }, [token]);


    return (
        <>
            {(props.roles === "admin" && props.token) ? (
                <>
                    {/* View Users start */}
                    <div className='table-responsive'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Employee Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">User Role</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Delete</th>
                                    <th scope="col">Analysis</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apiData.filter((data) => data.role === "user").sort((a, b) => a.name.localeCompare(b.name)).map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.name}</td>
                                            <td>{value.username}</td>
                                            <td>{value.role}</td>
                                            <td>
                                                <button onClick={(e) => { updateUser(e, value) }} className='btn btn-outline-success'>Update</button>
                                            </td>
                                            <td>
                                                <button className='btn btn-outline-danger' onClick={(e) => { onDelete(e, value._id) }}>Delete</button>
                                            </td>
                                            <td>
                                                <button onClick={(e) => { analyzeData(e, value) }} className='btn btn-outline-warning text-dark'>Analyse</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* View Users end */}
                </>
            ) : (null)}
        </>
    )
}

export default ViewUsers