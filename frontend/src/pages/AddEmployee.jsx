import React from 'react';
import Footer from '../components/Footer/Footer';
import Register from '../components/Form/Register';
import Navbar from '../components/Navbar/Navbar';
import NotFound from '../components/NotFound/NotFound';

const AddEmployee = () => {

    const roles = sessionStorage.getItem('Role');
    const token = sessionStorage.getItem('Token');

    return (
        <>
            {(roles === "admin" && token) ? (
                <>
                    <>
                        {/* Navbar Component */}
                        <Navbar roles={roles} token={token} />

                        {/* Register Component */}
                        <Register roles={roles} token={token} />

                        {/* Footer Component */}
                        <Footer roles={roles} token={token} />
                    </>
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

export default AddEmployee