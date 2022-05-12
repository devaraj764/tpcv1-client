import React, { useState, useEffect } from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import axios from 'axios';
import ProfileBanner from './ProfileBanner.js';
import PersonalProfile from './PersonalProfile.js';
import EducationDetails from './EducationDetails.js';
import Skills from './Skills.js';
import SocialMedia from './SocialMedia';
import Hobbies from './Hobbies.js'

const Profile = (props) => {
    const [Token, setToken] = useState(null);
    const [edit, setEdit] = useState(false);
    const [profileData, setprofileData] = useState({});
    const [updatedProfile, setupdatedProfile] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        setToken(token)
        if (!token) {
            props.history.push('/login')
        }
    }, [Token, props.history]);

    useEffect(() => {
        const url = props.api + 'students/mydata'
        axios.get(url, {
            headers: {
                "auth-token": localStorage.getItem('auth-token')
            }
        }).then((res) => {
            setprofileData(res.data)
        }).catch((err) => console.log(err))
    }, [props.api]);


    const handleChanges = () => {
        const url = props.api + 'students/'
        axios.patch(url, updatedProfile, {
            headers: {
                "auth-token": localStorage.getItem('auth-token')
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => console.log(err))
        setEdit(false);
    }

    const Logout = () => {
        setToken('')
        localStorage.removeItem('auth-token')
    }

    // Tabs code
    const [tab, setTab] = useState(0);
    return (
        <div className="profile">
            <Row className="justify-content-md-center">
                <Col xs={12} lg="8">
                    <ProfileBanner handleChanges={handleChanges} edit={edit} setEdit={setEdit} logout={Logout} />
                    <hr />
                    <Nav fill variant="pills" defaultActiveKey={tab}>
                        <Nav.Item>
                            <Nav.Link eventKey="0" onClick={() => setTab(0)}>Personal</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="1" onClick={() => setTab(1)}>Skills</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="2" onClick={() => setTab(2)}>Education</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="3" onClick={() => setTab(3)}>Feats</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr />
                    {
                        tab === 0
                            ?
                            <>
                                <PersonalProfile edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                                <Hobbies/>
                                <SocialMedia />
                            </>
                            :
                            tab === 1 ?
                                <>
                                    <Skills edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfie={setupdatedProfile} />
                                </>
                                :
                                tab === 2 ?
                                    <>
                                        <EducationDetails edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                                    </>
                                    :
                                    tab === 3 ?
                                        <>
                                            <p style={{ textAlign: 'center', marginTop: '10px' }}>Achievements</p>
                                        </> : null

                    }
                </Col>
            </Row>
        </div>
    )
}

export default Profile