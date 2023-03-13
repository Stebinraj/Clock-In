import React from 'react'
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import NotFound from '../components/NotFound/NotFound';
import TrackerHistory from '../components/TrackerHistory/TrackerHistory';

const Analysis = () => {

    const roles = sessionStorage.getItem('Role');
    const token = sessionStorage.getItem('Token');

    return (
        <>
            {(roles === "admin" && token) ? (
                <>
                    {/* Navbar Component */}
                    <Navbar roles={roles} token={token} />

                    <br />

                    {/* Tracker History Component */}
                    <TrackerHistory roles={roles} token={token} />

                    {/* Footer Component */}
                    <Footer roles={roles} token={token} />
                </>
            ) : (
                <>
                    {/* Not found Component */}
                    <NotFound />
                </>
            )}
        </>
    )
}

export default Analysis