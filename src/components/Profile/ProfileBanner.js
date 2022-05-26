import { Image, Button, Form, Spinner } from 'react-bootstrap';
import { AiOutlineCamera } from 'react-icons/ai'
import React, { useState, useEffect } from 'react';

const ProfileBanner = ({ setEdit, edit, handleChanges, logout, profileData, updatedProfile, setupdatedProfile, loader }) => {
    const [profileUrl, setprofileUrl] = useState('');

    useEffect(() => {
        setprofileUrl(profileData?.profilePicture ? profileData?.profilePicture : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80')
    }, [profileData]);

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    async function handleProfile(uploader) {
        if (uploader.target.files[0].size > 2000000) {
            alert('Profile Image size should be less than 2mb');
            return;
        }
        let url = '';
        await getBase64(uploader.target.files[0]).then(res => {
            url = res
        })
        setprofileUrl(url);
        setupdatedProfile({ ...updatedProfile, profilePicture: url })
    }


    return (
        <div className='profile-banner'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='imageUpload'>
                    <Image fluid src={profileUrl}
                        alt="profile image" className="profileImage" style={{ position: 'relative', opacity: edit ? '0.7' : '1' }} />
                    {edit ?
                        <div style={{ position: 'absolute', background: 'transparent', opacity: '0.5', zIndex: '2', marginTop: '-60px', marginLeft: '45px' }}>
                            <AiOutlineCamera size={25} />
                        </div>
                        : null}
                    {edit ? <Form.Control type='file' onChange={(e) => handleProfile(e)} style={{ position: 'absolute', opacity: '0', marginTop: '-100px', height: "100px", width: '100px' }} /> : null}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {edit ?
                        <>
                            <Button variant="primary" onClick={() => handleChanges()} size='sm'>{loader ? <Spinner animation="border" size='sm' /> : 'Save changes'}</Button>
                            <Button variant="light" onClick={() => setEdit(false)} size='sm'>Cancel</Button>
                        </>
                        :
                        <>
                            <Button variant="primary" onClick={() => setEdit(true)} size='sm'>Edit</Button>
                            <Button variant="danger" size='sm' onClick={logout}>Logout</Button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileBanner