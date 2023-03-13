import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import TrackerUpdate from '../components/Form/TrackerUpdate';
import Navbar from '../components/Navbar/Navbar';
import NotFound from '../components/NotFound/NotFound';

const UpdateTracker = () => {

    const roles = sessionStorage.getItem('Role');
    const token = sessionStorage.getItem('Token');
    const navigate = useNavigate();

    const goBack = (e) => {
        e.preventDefault();
        navigate('/analysis', { replace: true });
    };

    return (
        <>
            {(roles === "admin" && token) ? (
                <>
                    {/* Navbar Component */}
                    <Navbar roles={roles} token={token} />

                    <br />
                    <button onClick={(e) => { goBack(e) }} className="ui primary button ms-3">Back</button>

                    {/* Tracker Update Component */}
                    <TrackerUpdate roles={roles} token={token} />

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

export default UpdateTracker