import React from 'react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import NotFound from '../components/NotFound/NotFound';
import TimeTracker from '../components/TimeTracker/TimeTracker';
import ViewUsers from '../components/ViewUsers/ViewUsers';

const Dashboard = () => {

    const roles = sessionStorage.getItem('Role');
    const token = sessionStorage.getItem('Token');

    return (
        <>
            {(roles === "user" && token) || (roles === "admin" && token) ? (
                <>
                    {/* Navbar Component */}
                    <Navbar roles={roles} token={token} />
                    {(roles === "user" && token) && (
                        <>
                            {/* Time Tracker Component */}
                            <TimeTracker roles={roles} token={token} />
                        </>
                    )}
                    {(roles === "admin" && token) && (
                        <>
                            <br />
                            {/* View Users Component */}
                            <ViewUsers roles={roles} token={token} />
                        </>
                    )}
                    {/* Footer Component */}
                    <Footer roles={roles} token={token} />
                </>
            ) : (
                <>
                    {/* Not found Component */}
                    <NotFound />
                </>
            )
            }
        </>
    )
}

export default Dashboard