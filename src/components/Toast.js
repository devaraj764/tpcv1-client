import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap'

const Toast = ({ value, callback, children }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (value === true) {
            setShow(true);
            setTimeout(() => setShow(false), 1000);
            callback(false);
        }
    }, [value])
    
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <div style={{ padding: '10px' }}>
                    {children}
                </div>
            </Modal>
        </>
    );
}

export default Toast