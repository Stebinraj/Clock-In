import React from 'react';

const Footer = (props) => {
    return (
        <>
            {(props.roles === "user" && props.token) || (props.roles === "admin" && props.token) ? (
                <>
                    <div className=" text-center fixed-bottom">
                        <div className="-footer text-muted">
                            <h5>Copyright © {new Date().getFullYear()}</h5>
                        </div>
                    </div>
                </>
            ) : (null)}
        </>
    )
}

export default Footer