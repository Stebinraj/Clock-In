import React from 'react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import NotFound from '../components/NotFound/NotFound';
import ProjectTask from '../components/ProjectTask/ProjectTask';

const AddProjectOrTask = () => {

    const roles = sessionStorage.getItem('Role');
    const token = sessionStorage.getItem('Token');

    return (
        <>
            {(roles === "admin" && token) ? (
                <>
                    {/* Navbar Component */}
                    <Navbar roles={roles} token={token} />

                    {/* ProjectTask Component */}
                    <ProjectTask roles={roles} token={token} />

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

export default AddProjectOrTask