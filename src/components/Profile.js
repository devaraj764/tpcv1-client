import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, InputGroup, FormControl, Accordion, Image, Button } from 'react-bootstrap';
import { MdPermIdentity, MdEmail, MdBatchPrediction, MdPhone, MdOutlineCancel } from 'react-icons/md';
import { BiRename } from 'react-icons/bi'
import { SiLeetcode } from 'react-icons/si'
import { BsLink } from 'react-icons/bs';
import { FaBirthdayCake, FaBook, FaGithub, FaLinkedin, FaHackerrank, FaYoutube, } from 'react-icons/fa';
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
                    <SocialMedia profileData={profileData} updatedProfile={updatedProfile} setupdatedProfile={setupdatedProfile} edit={edit} />
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
                                value={profileData.name}
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
                                value={profileData.idNo}
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
                                value={profileData.email}
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
                            <Form.Select
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, section: e.target.value }) }}
                                type='text'
                                value={profileData.section ? profileData.section : '-- select --'}
                                placeholder="section code"
                                aria-label="sectioncode"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            >
                                <option disabled>-- select --</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="dob" className="label">Date of Birth</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FaBirthdayCake /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, dob: e.target.value }) }}
                                type='date'
                                value={profileData.dob}
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
                            <Form.Select
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, batch: e.target.value }) }}
                                type='text'
                                value={profileData.batch ? profileData.batch : '-- select --'}
                                placeholder="Enter your bacth"
                                aria-label="batch"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            >
                                <option disabled>-- select --</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="yearofstudy" className="label">Year of Study</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FaBook /></InputGroup.Text>
                            <Form.Select
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, yearofStudy: e.target.value }) }}
                                type='text'
                                value={profileData.yearofStudy ? profileData.yearofStudy : '-- select --'}
                                placeholder="Enter your year of study"
                                aria-label="yearofstudy"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            >
                                <option disabled>-- select --</option>
                                <option value="E3">E3</option>
                                <option value="E4">E4</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <Form.Label htmlFor="contactNumber" className="label">Contact Number</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><MdPhone /></InputGroup.Text>
                            <FormControl
                                onChange={(e) => { setupdatedProfile({ ...updatedProfile, contactNumber: e.target.value }) }}
                                type='text'
                                value={profileData.contactNumber}
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
                                value={profileData.address}
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
            {/* Hard Skills  */}
            <Card body style={{ padding: '10px' }}>
                <p className="sub-heading">Hard Skills</p>
                <Row>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Sub-Heading #1</Accordion.Header>
                            <Accordion.Body>
                                <div className="skill">
                                    <p>Skill #1</p>
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                                <div className="skill">
                                    <p>Skill #2</p>
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
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
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                                <div className="skill">
                                    <p>Skill #2</p>
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
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

            {/* Soft Skills  */}
            <Card body style={{ padding: '10px' }}>
                <p className="sub-heading">Soft Skills</p>
                <Row>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Sub-Heading #1</Accordion.Header>
                            <Accordion.Body>
                                <div className="skill">
                                    <p>Skill #1</p>
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                                <div className="skill">
                                    <p>Skill #2</p>
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
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
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                                <div className="skill">
                                    <p>Skill #2</p>
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
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
    // Schooling
    const [schoolDetails, setSchoolDetails] = useState(null);
    const [name, setname] = useState('');
    const [loc, setloc] = useState('');
    const [cgpa, setcgpa] = useState('');
    const [passout, setpassout] = useState('');

    // Pre-Graduation
    const [preGraduationDetails, setpreGraduationDetails] = useState(null);
    const [clgName, setclgName] = useState('');
    const [clgLoc, setclgLoc] = useState('');
    const [clgCpgpa, setclgCpgpa] = useState('');
    const [clgPassout, setclgPassout] = useState('');

    useEffect(() => {
        setname(profileData.schooling ? profileData.schooling.name : '');
        setloc(profileData.schooling ? profileData.schooling.loc : '');
        setcgpa(profileData.schooling ? profileData.schooling.cgpa : '');
        setpassout(profileData.schooling ? profileData.schooling.passout : '');
        setclgName(profileData.preGraduation ? profileData.preGraduation.name : '');
        setclgLoc(profileData.preGraduation ? profileData.preGraduation.loc : '');
        setclgCpgpa(profileData.preGraduation ? profileData.preGraduation.cgpa : '');
        setclgPassout(profileData.preGraduation ? profileData.preGraduation.passout : '');
    }, [profileData]);

    useEffect(() => {
        setSchoolDetails({ name, cgpa, loc, passout });
        setupdatedProfile({ ...updatedProfile, schooling: schoolDetails });
    }, [name, loc, cgpa, passout, updatedProfile]);

    useEffect(() => {
        setpreGraduationDetails({
            "name": clgName,
            "loc": clgLoc,
            "cgpa": clgCpgpa,
            "passout": clgPassout
        });
        setupdatedProfile({ ...updatedProfile, preGraduation: preGraduationDetails });
    }, [clgName, clgLoc, clgCpgpa, clgPassout, updatedProfile]);

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
                                value={clgName}
                                onChange={(e) => setclgName(e.target.value)}
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
                            <Form.Select aria-label="Default select example" disabled={!edit} value={clgPassout} onChange={(e) => setclgPassout(e.target.value)}>
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
                                value={clgCpgpa}
                                onChange={(e) => setclgCpgpa(e.target.value)}
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
                                value={clgLoc}
                                onChange={(e) => setclgLoc(e.target.value)}
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


const SocialMedia = ({ profileData, edit, updatedProfile, setupdatedProfile }) => {
    const [addNew, setAddNew] = useState(false)
    const [newLinks, setnewLinks] = useState([]);
    const [link, setlink] = useState('');

    useEffect(() => {
        setnewLinks(profileData.links ? profileData.links : [])
    }, [profileData]);

    const addLink = () => {
        setnewLinks([...newLinks, link]);
        setupdatedProfile({ ...updatedProfile, links: [...newLinks, link] });
        setAddNew(false);
        setlink('')
    }

    const removeLink = (link) => {
        setnewLinks(newLinks.filter(l => l !== link))
        setupdatedProfile({ ...updatedProfile, links: newLinks.filter(l => l !== link) });
    }

    return (
        <div className="SocialMedia">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <p className="heading">Externel Links<br />
                    <span className="message">Add your links here</span>
                </p>
                {addNew ?
                    <Button variant="light" onClick={() => setAddNew(false)} style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px' }} size='sm'>cancel</Button>

                    : edit ?
                        <Button onClick={() => setAddNew(true)} style={{ backgroundColor: '#071a84', fontSize: '14px !important', minWidth: '100px', borderRadius: '25px' }} size='sm'>+ Add New</Button>
                        : null}
            </div>
            <Card body style={{ padding: '10px' }}>
                <Row>
                    {addNew ? null : newLinks?.length === 0 ?
                        <p style={{ textAlign: 'center', width: '100%', color: 'gray' }}> No Links Available!<br /> Try to add new links...</p>
                        :
                        newLinks.map((link, index) => {
                            return (
                                <Col key={index} md={6} sm={12}>
                                    <Card body className='linkField'>
                                        <i> {link.includes('github') ? <FaGithub size={20} /> : link.includes('linkedin') ? <FaLinkedin size={20} /> : link.includes('hackerrank') ? <FaHackerrank size={20} /> : link.includes('leetcode') ? <SiLeetcode size={20} /> : link.includes('youtube') ? <FaYoutube size={20} /> : <BsLink size={20} />}</i>
                                        <a href={link} target="_blank">{link}</a>
                                        {edit ? <MdOutlineCancel size={16} style={{ color: 'tomato', float: 'right', cursor: 'pointer' }} onClick={() => removeLink(link)} /> : null}
                                    </Card>
                                </Col>
                            );
                        })
                    }
                    {addNew ?
                        <Col lg={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <Form.Control
                                    onChange={(e) => setlink(e.target.value)}
                                    value={link}
                                    type="text"
                                    placeholder="Place your link here.."
                                />

                                <Button style={{ backgroundColor: '#071a84', fontSize: '14px !important', minWidth: '100px' }} onClick={() => addLink()}>Add</Button>
                            </div>
                        </Col>
                        : null
                    }
                </Row>

            </Card>
        </div>
    )
}
export default Profile