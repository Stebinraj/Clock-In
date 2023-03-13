import React from 'react';
import Footer from '../components/Footer/Footer';
import EmployeeUpdate from '../components/Form/EmployeeUpdate';
import Navbar from '../components/Navbar/Navbar';
import NotFound from '../components/NotFound/NotFound';

const UpdateEmployee = () => {

    const roles = sessionStorage.getItem('Role');
    const token = sessionStorage.getItem('Token');

    return (
        <>
            {(roles === "admin" && token) ? (
                <>
                    {/* Navbar Component */}
                    <Navbar roles={roles} token={token} />

                    {/* Employee Update Component */}
                    <EmployeeUpdate roles={roles} token={token} />

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

export default UpdateEmployee