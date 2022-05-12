import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, FormControl, Accordion, Image, Button } from 'react-bootstrap';
import { MdPermIdentity, MdEmail, MdBatchPrediction, MdPhone } from 'react-icons/md';
import { BiRename } from 'react-icons/bi'
import { FaBirthdayCake, FaBook } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import axios from 'axios';

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



    return (
        <div className="profile">
            <Row className="justify-content-md-center">
                <Col xs={12} lg="8">
                    <ProfileBanner handleChanges={handleChanges} edit={edit} setEdit={setEdit} logout={Logout} />
                    <hr />
                    <PersonalProfile edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                    <Skills edit={edit} />
                    <EducationDetails edit={edit} profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} />
                </Col>
            </Row>
        </div>
    )
}

const ProfileBanner = ({ setEdit, edit, handleChanges, logout }) => {

    return (
        <div className='profile-banner'>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image fluid src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    alt="profile image" className="profileImage" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {edit ?
                        <>
                            <Button variant="primary" onClick={() => handleChanges()} size='sm'>Save changes</Button>
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

const PersonalProfile = ({ edit, profileData, updatedProfile, setupdatedProfile }) => {
    return (
        <div className="personal-details">
            <p className="heading">Personal Details<br />
                <span className="message">Update your photo and personal details here</span>
            </p>
            <Card body style={{ padding: '10px', fontSize: '14px' }}>
                <Row>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="fullname" className="label">Full Name</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><BiRename /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, name: e.target.value }) }}
                                type='text'
                                defaultValue={profileData.name}
                                placeholder="Full Name"
                                aria-label="idnumber"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="studentid" className="label">Student ID</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><MdPermIdentity /></InputGroup.Text>
                            <FormControl
                                type='text'
                                defaultValue={profileData.idNo}
                                placeholder="Id Number"
                                aria-label="studentid"
                                aria-describedby="basic-addon1"
                                disabled
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="email" className="label">Email</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><MdEmail /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, email: e.target.value }) }}
                                type='text'
                                defaultValue={profileData.email}
                                placeholder="collage email address"
                                aria-label="collageemail"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="classcode" className="label">Section Code</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><SiGoogleclassroom /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, section: e.target.value }) }}
                                type='text'
                                defaultValue={profileData.section}
                                placeholder="section code"
                                aria-label="sectioncode"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="dob" className="label">Date of Birth</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FaBirthdayCake /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, dob: e.target.value }) }}
                                type='date'
                                defaultValue={profileData.dob}
                                placeholder="Enter your date of birth"
                                aria-label="dob"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="batch" className="label">Batch</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><MdBatchPrediction /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, batch: e.target.value }) }}
                                type='text'
                                defaultValue={profileData.batch}
                                placeholder="Enter your bacth"
                                aria-label="batch"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="yearofstudy" className="label">Year of Study</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FaBook /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, yearofStudy: e.target.value }) }}
                                type='text'
                                defaultValue={profileData.yearofStudy}
                                placeholder="Enter your year of study"
                                aria-label="yearofstudy"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="contactNumber" className="label">Contact Number</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><MdPhone /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, contactNumber: e.target.value }) }}
                                type='text'
                                defaultValue={profileData.contactNumber}
                                placeholder="Enter your contact number"
                                aria-label="contactNumber"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={12}>
                        <Form.Label htmlFor="contactNumber" className="label">Address</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, address: e.target.value }) }}
                                as='textarea'
                                type='text'
                                defaultValue={profileData.address}
                                placeholder="Address"
                                aria-label="Address"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

const Skills = ({ edit }) => {
    return (
        <div className="Skills">
            <p className="heading">Skills<br />
                <span className="message">Rate your skills according to your capability</span>
            </p>
            {/* School Details  */}
            <Card body style={{ padding: '10px' }}>
                <p className="sub-heading">Hard Skills</p>
                <Row>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Sub-Heading #1</Accordion.Header>
                            <Accordion.Body>
                                <div className="skill">
                                    <p>Skill #1</p>
                                    <Form.Select className="skillVal" size='sm' defaultValue="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                                <div className="skill">
                                    <p>Skill #2</p>
                                    <Form.Select className="skillVal" size='sm' defaultValue="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Sub-Heading #2</Accordion.Header>
                            <Accordion.Body>
                                <div className="skill">
                                    <p>Skill #1</p>
                                    <Form.Select className="skillVal" size='sm' defaultValue="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                                <div className="skill">
                                    <p>Skill #2</p>
                                    <Form.Select className="skillVal" size='sm' defaultValue="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </Card>

            {/* collage details  */}
            <Card body style={{ padding: '10px' }}>
                <p className="sub-heading">Soft Skills</p>
                <Row>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Sub-Heading #1</Accordion.Header>
                            <Accordion.Body>
                                <div className="skill">
                                    <p>Skill #1</p>
                                    <Form.Select className="skillVal" size='sm' defaultValue="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                                <div className="skill">
                                    <p>Skill #2</p>
                                    <Form.Select className="skillVal" size='sm' defaultValue="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Sub-Heading #2</Accordion.Header>
                            <Accordion.Body>
                                <div className="skill">
                                    <p>Skill #1</p>
                                    <Form.Select className="skillVal" size='sm' defaultValue="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                                <div className="skill">
                                    <p>Skill #2</p>
                                    <Form.Select className="skillVal" size='sm' defaultValue="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </Card>
        </div>
    )
}

const EducationDetails = ({ edit, profileData, updatedProfile, setupdatedProfile }) => {
    const [schoolDetails, setSchoolDetails] = useState(null);
    const [name, setname] = useState('');
    const [loc, setloc] = useState('');
    const [cgpa, setcgpa] = useState('');
    const [passout, setpassout] = useState('');

    useEffect(() => {
        setname(profileData.schooling ? profileData.schooling.name : '');
        setloc(profileData.schooling ? profileData.schooling.loc : '');
        setcgpa(profileData.schooling ? profileData.schooling.cgpa : '');
        setpassout(profileData.schooling ? profileData.schooling.passout : '');
    }, [profileData]);

    useEffect(() => {
        setSchoolDetails({ name, cgpa, loc, passout });
        setupdatedProfile({ ...updatedProfile, schooling: schoolDetails });
    }, [name, loc, cgpa, passout, updatedProfile]);

    return (
        <div className="educational-details">
            <p className="heading">Educational Details<br />
                <span className="message">Update your educational details here</span>
            </p>
            {/* School Details  */}
            <Card body style={{ padding: '10px' }}>
                <p className="sub-heading">Schooling</p>
                <Row>
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">at</InputGroup.Text>
                            <FormControl
                                onChange={(e) => setname(e.target.value)}
                                value={name}
                                placeholder="School Name"
                                aria-label="SchoolName"
                                aria-describedby="basic-addon1"
                                id="schoolName"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Passed Out</InputGroup.Text>
                            <Form.Select value={passout} id="passout" aria-label="Default select example" disabled={!edit} onChange={(e) => setpassout(e.target.value)}>
                                <option disabled={!edit}>Year</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">CGPA</InputGroup.Text>
                            <FormControl
                                id="cgpa"
                                onChange={(e) => setcgpa(e.target.value)}
                                value={cgpa}
                                placeholder="Your 10th CGPA"
                                aria-label="SchoolName"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="location"
                                onChange={(e) => setloc(e.target.value)}
                                as='textarea'
                                value={loc}
                                placeholder="Your school address"
                                aria-label="address"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Card>

            {/* collage details  */}
            <Card body style={{ padding: '10px' }}>
                <p className="sub-heading">Pre University</p>
                <Row>
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">at</InputGroup.Text>
                            <FormControl
                                defaultValue=""
                                placeholder="University Name"
                                aria-label="University name"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Passed Out</InputGroup.Text>
                            <Form.Select defaultValue="Year" aria-label="Default select example" disabled={!edit}>
                                <option disabled>Year</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">CGPA</InputGroup.Text>
                            <FormControl
                                defaultValue=""
                                placeholder="Overall CGPA"
                                aria-label="SchoolName"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <FormControl
                                as='textarea'
                                defaultValue=""
                                placeholder="Address of University"
                                aria-label="address"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Profile