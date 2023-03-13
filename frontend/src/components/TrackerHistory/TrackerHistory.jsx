import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const TrackerHistory = (props) => {

    // getting _id from session storage
    const _id = sessionStorage.getItem('Id');
    const token = sessionStorage.getItem('Token');
    const navigate = useNavigate();

    const [range, setRange] = useState('day');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [total, setTotal] = useState('');

    const [apiData, setApiData] = useState([]);

    // fetch specific date range or daily weekly monthly yearly employee data
    const handleRange = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`/api/${_id}/${range}`, { token });
            const result = await response.data;
            setApiData(result.data);
            setTotal(result.total);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSpecificDate = async (e) => {
        try {
            e.preventDefault();
            const start = startDate.toISOString();
            const end = endDate.toISOString();
            const response = await axios.post(`/api/${_id}/${start}/${end}`, { token });
            const result = await response.data;
            setApiData(result.data);
            setTotal(result.total);
        } catch (error) {
            console.log(error.message);
        }
    };

    // store data in session for updating specific employee tracker history
    const updateTracker = (e, value) => {
        try {
            e.preventDefault();
            sessionStorage.setItem('TrackerId', value._id);
            sessionStorage.setItem('TrackerProject', value.project);
            sessionStorage.setItem('TrackerTask', value.task);
            sessionStorage.setItem('TrackerJobDesc', value.jobDescription);
            sessionStorage.setItem('TrackerModeOfWork', value.modeOfWork);
            navigate('/updatetracker', { replace: true });
        } catch (error) {
            console.log(error.message);
        }
    };

    // delete specific employee tracker history
    const deleteData = async (e, _id) => {
        try {
            e.preventDefault();
            const deleted = await axios.delete(`/api/tracker/${_id}`);
            if (deleted) {
                alert('Deleted Successfully');
                getData();
            }
            else {
                alert('Unsuccessfull');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // fetch data after deleted specific employee tracker history
    const getData = async () => {
        try {
            const response = await axios.post(`/api/tracker/${_id}`, { token });
            setApiData(await response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const reset = async (e) => {
        try {
            e.preventDefault();
            setRange('day');
            setStartDate(new Date());
            setEndDate(new Date());
            setTotal('');
            getData();
        } catch (error) {
            console.log(error.message);
        }
    }

    // handle side effects while fetching data
    useEffect(() => {

        // fetch tracker history
        const getData = async () => {
            try {
                const response = await axios.post(`/api/tracker/${_id}`, { token });
                setApiData(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getData();

    }, [_id, token, props.reload]);

    return (
        <>
            {(props.roles === "admin" && props.token) && (
                <>
                    {/* specific employee analysis start */}
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-lg-2 d-flex mb-3">
                                <div className="form-group mr-3 ms-3">
                                    <label htmlFor="range" className="mr-2"> <h5>Range:</h5> </label>
                                    <select id="range" className="form-control" value={range} onChange={(e) => { setRange(e.target.value) }}>
                                        <option value="day">Daily</option>
                                        <option value="week">Weekly</option>
                                        <option value="month">Monthly</option>
                                        <option value="year">Yearly</option>
                                    </select>
                                </div>
                                <button onClick={(e) => { handleRange(e) }} className="btn btn-primary mt-4 mb-3 ms-3">Submit</button>
                            </div>

                            <div className="col-sm-12 col-lg-6 d-flex mb-3">
                                <div className="form-group mr-3 ms-3">
                                    <label htmlFor="startDate" className="mr-2"> <h5>Start Date:</h5> </label>
                                    <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => { setStartDate(date) }} shouldCloseOnSelect={true} />
                                </div>

                                <div className="form-group mr-3 ms-3">
                                    <label htmlFor="endDate" className="mr-2 analysis-label"> <h5>End Date:</h5> </label>
                                    <DatePicker className="form-control" dateFormat="dd/MM/yyyy" selected={endDate} onChange={(date) => { setEndDate(date) }} shouldCloseOnSelect={true} />
                                </div>
                                <button onClick={(e) => { handleSpecificDate(e) }} className="btn btn-primary mt-4 ms-3 mb-3 me-5">Submit</button>
                            </div>

                            <div className="col-sm-12 col-lg-2 card mb-3 bg-light justify-content-center me-3">
                                <div className="card-body mt-2">
                                    <h5 className="card-title">Total Hours : {total}</h5>
                                </div>
                            </div>

                            <div className="col-sm-12 col-lg-1 d-flex mb-3">
                                <button onClick={(e) => { reset(e) }} className="btn btn-primary mt-4 ms-3 mb-3 me-5">Reset</button>
                            </div>

                        </div>
                    </div>
                    {/* specific employee analysis end */}
                </>
            )}

            {(props.roles === "user" && props.token) || (props.roles === "admin" && props.token) ? (
                <>
                    {/* Employee time tracker history start */}
                    <div className="table-responsive">
                        <table className="table table-striped table-hover employee-table">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Project</th>
                                    <th scope="col">Task</th>
                                    <th scope="col">Mode of Work</th>
                                    <th scope="col">Job Description</th>
                                    <th scope="col">Start Time</th>
                                    <th scope="col">End Time</th>
                                    <th scope="col">Duration</th>
                                    {(props.roles === "admin" && props.token) && (
                                        <>
                                            <th scope="col">Update</th>
                                            <th scope="col">Delete</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {apiData.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{moment(value.startTime).format('DD-MM-YYYY')}</td>
                                            <td>{value.project}</td>
                                            <td>{value.task}</td>
                                            <td>{value.modeOfWork}</td>
                                            <td>{value.jobDescription}</td>
                                            <td>{moment(value.startTime).format('HH:mm:ss')}</td>
                                            <td>{moment(value.endTime).format('HH:mm:ss')}</td>
                                            <td>{moment.utc(moment(value.endTime).diff(moment(value.startTime))).format("HH:mm:ss")}</td>
                                            {(props.roles === "admin" && props.token) && (
                                                <>
                                                    <td>
                                                        <button onClick={(e) => { updateTracker(e, value) }} className='btn btn-outline-success'>Update</button>
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-outline-danger' onClick={(e) => { deleteData(e, value._id) }}>Delete</button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* Employee time tracker history end */}
                </>
            ) : (null)}
        </>
    )
}

export default TrackerHistory