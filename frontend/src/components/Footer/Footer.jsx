import React from 'react';

const Footer = (props) => {
    return (
        <>
            {(props.roles === "user" && props.token) || (props.roles === "admin" && props.token) ? (
                <>
                    <footer className='footer'>
                        <div className=" text-center fixed-bottom">
                            <div className="-footer text-muted">
                                <h5>Copyright © {new Date().getFullYear()}</h5>
                            </div>
                        </div>
                    </footer>
                </>
            ) : (null)}
        </>
    )
}

export default Footer