import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios';

const ProfileModal = ({ image, api, value, callback, upload }) => {
    const [show, setshow] = useState(false);

    useEffect(() => {
        setshow(value)
    }, [value]);

    const uploadProfilePicture = async () => {
        const url = api + '/students/'
        const data = new FormData();
        data.append('imageUrl', image)
        await axios.patch(url, data, {
            headers: {
                "auth-token": localStorage.getItem('auth-token')
            }
        })
            .then((res) => {
                callback(false);
                setshow(false);
                upload(true);
            })
            .catch((err) => console.log(err))
    }

    const cancelUpload = () => {
        setshow(false);
        callback(false);
        document.getElementById('imageInput').value = ''
    }

    return (
        <div>
            <Modal show={show} onHide={() => setshow(false)}>
                <div style={{ padding: '20px' }}>
                    <h6>Do you want to make this as your profile picture?</h6>
                    <div style={{ float: 'right', marginTop: '20px' }}>
                        <Button variant="secondary" onClick={cancelUpload} style={{ marginRight: '20px' }}>No</Button>
                        <Button variant='danger' onClick={uploadProfilePicture}>Yes</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ProfileModal;