import { Image, Button, Form, Spinner } from 'react-bootstrap';
import { AiOutlineCamera } from 'react-icons/ai'
import React, { useState, useEffect } from 'react';
import AlertModal from '../alertModal';
import ProfileModal from './profileModal';
import { withRouter } from 'react-router-dom';

const ProfileBanner = ({ setEdit, edit, handleChanges, logout, profileData, loader, api, isDirty, setPristine, history }) => {

    const [profileUrl, setprofileUrl] = useState(null);
    const [modal, setmodal] = useState(false);

    const [profileModal, setprofileModal] = useState(false);
    const [imageSrc, setimageSrc] = useState(null);

    useEffect(() => {
        setprofileUrl(profileData ? profileData.imageUrl || profileData.imageUrl === '' ? `${api}${profileData.imageUrl}` : null : null);
    }, [profileData, api]);

    async function handleProfile(uploader) {
        if (uploader.target.files[0].size > 2000000) {
            alert('Profile Image size should be less than 2mb');
            return;
        }
        setimageSrc(URL.createObjectURL(uploader.target.files[0]))
        setprofileModal(true)
    }

    const cancelChanges = () => {
        if (isDirty) {
            setmodal(true);
        } else {
            history.push('/dashboard/profile');
        }
    }

    return (
        <div className='profile-banner'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className='imageUpload'>
                    <Image fluid src={profileUrl ? profileUrl : `${api}/uploads/default.svg`}
                        alt="profile image" className="profileImage" style={{ position: 'relative', opacity: edit ? '0.7' : '1' }} />
                    {edit ?
                        <div style={{ position: 'absolute', background: 'transparent', opacity: '0.5', zIndex: '2', marginTop: '-60px', marginLeft: '45px' }}>
                            <AiOutlineCamera size={25} />
                        </div>
                        : null}
                    {edit ? <Form.Control type='file' id="imageInput" accept="image/*" onChange={(e) => handleProfile(e)} style={{ position: 'absolute', opacity: '0', marginTop: '-100px', height: "100px", width: '100px' }} /> : null}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {edit ?
                        <>
                            <Button variant="primary" onClick={() => handleChanges()} size='sm'>{loader ? <Spinner animation="border" size='sm' /> : 'Save changes'}</Button>
                            <Button variant="light" onClick={cancelChanges} size='sm'>Cancel</Button>
                        </>
                        :
                        <>
                            <Button variant="primary" size='sm' onClick={() => history.push('/dashboard/profile?edit=true') } >Edit</Button>
                            <Button variant="outline-primary" size='sm' onClick={logout}>Logout</Button>
                        </>
                    }
                </div>
            </div>
            <AlertModal value={modal} callback={setmodal} setPristine={setPristine} />
            <ProfileModal api={api} src={imageSrc} value={profileModal} callback={setprofileModal} setcropimg={setprofileUrl} setEdit={setEdit} history={history}/>
        </div>
    )
}

export default withRouter(ProfileBanner)