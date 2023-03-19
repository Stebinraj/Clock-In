import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = (props) => {

    const name = sessionStorage.getItem('Name');
    const navigate = useNavigate();

    // dashboard navigation
    const goToDashboard = (e) => {
        try {
            e.preventDefault();
            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.log(error.message);
        }
    };

    // add employee
    const addEmployee = (e) => {
        try {
            e.preventDefault();
            navigate('/register', { replace: true });
        } catch (error) {
            console.log(error.message);
        }
    };

    // logout, session clearing and navigating start
    const logout = (e) => {
        try {
            e.preventDefault();
            sessionStorage.clear();
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error.message);
        }
    };

    // add project / task
    const addProjectAndTask = (e) => {
        e.preventDefault();
        navigate('/create', { replace: true });
    };

    return (
        <>
            {/* Navbar Start */}

            {(props.roles === "user" && props.token) || (props.roles === "admin" && props.token) ? (
                <>
                    <nav className="navbar bg-light fixed navbar-expand-lg employee-navbar">
                        <div className="container-fluid">
                            {/* <span style={{ fontWeight: "bold", fontSize: '20px', color: 'blue' }} className='link-to-employee'>
                                <img src={require('../../assets/logo.png')} alt="Logo" width="55" height="55" className="d-inline-block align-text-center me-1" style={{ fontWeight: "bold", fontSize: '20px' }} />
                                ICTAK Clock-In
                            </span> */}
                            <Link to={'/dashboard'} replace={true} style={{ fontWeight: "bold", fontSize: '20px', color: 'blue' }} className='link-to-employee'>
                                <img src={require('../../assets/clock.png')} alt="Logo" width="55" height="55" className="d-inline-block align-text-center me-1" style={{ fontWeight: "bold", fontSize: '20px' }} />
                                Clock-In
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Clock-In</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <h4 className='mt-2 me-3'>{name}</h4>

                                        {(props.roles === "admin" && props.token) && (
                                            <>
                                                <li className="nav-item">
                                                    <button onClick={(e) => { goToDashboard(e) }} className='btn btn-primary me-2'>Dashboard</button>
                                                </li>
                                                <br />
                                                <li className="nav-item">
                                                    <button onClick={(e) => (addEmployee(e))} className='btn btn-primary me-2'>Add Employee</button>
                                                </li>
                                                <br />
                                                <li className="nav-item">
                                                    <button onClick={(e) => { addProjectAndTask(e) }} className='btn btn-primary me-2'>Add Project / Task</button>
                                                </li>
                                                <br />
                                            </>
                                        )}

                                        <li className="nav-item">
                                            <button onClick={(e) => { logout(e) }} className='btn btn-primary'>Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </>
            ) : (null)}

            {/* Navbar End */}
        </>
    )
}

export default Navbar