import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, FormControl } from 'react-bootstrap';

const EducationDetails = ({ edit, profileData, updatedProfile, setupdatedProfile }) => {
    // Schooling Details
    const [schoolDetails, setSchoolDetails] = useState(null);
    const [name, setname] = useState('');
    const [loc, setloc] = useState('');
    const [cgpa, setcgpa] = useState('');
    const [passout, setpassout] = useState('');

    // preGraduation Details
    const [preGraduationDetails, setpreGraduationDetails] = useState(null);
    const [clgName, setclgName] = useState('');
    const [clgLoc, setclgLoc] = useState('');
    const [clgCpga, setclgCpga] = useState('');
    const [clgPassout, setclgPassout] = useState('');

    useEffect(() => {
        setname(profileData.schooling ? profileData.schooling.name : '');
        setloc(profileData.schooling ? profileData.schooling.loc : '');
        setcgpa(profileData.schooling ? profileData.schooling.cgpa : '');
        setpassout(profileData.schooling ? profileData.schooling.passout : '');
        setclgName(profileData.preGraduation ? profileData.preGraduation.name : '');
        setclgLoc(profileData.preGraduation ? profileData.preGraduation.loc : '');
        setclgCpga(profileData.preGraduation ? profileData.preGraduation.cgpa : '');
        setclgPassout(profileData.preGraduation ? profileData.preGraduation.passout : '');
    }, [profileData]);

    useEffect(() => {
        setSchoolDetails({ name, cgpa, loc, passout });
        setupdatedProfile({ ...updatedProfile, schooling: schoolDetails });
    }, [name, loc, cgpa, passout, schoolDetails, setupdatedProfile, updatedProfile]);

    useEffect(() => {
        setpreGraduationDetails({
            name: clgName,
            cgpa: clgCpga,
            loc: clgLoc,
            passout: clgPassout
        });
        setupdatedProfile({ ...updatedProfile, preGraduation: preGraduationDetails });
    }, [clgName, clgLoc, clgCpga, clgPassout, setupdatedProfile, updatedProfile, preGraduationDetails]);

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
                            <Form.Select value={passout || passout !== ''? passout : 'Year'} id="passout" aria-label="Default select example" disabled={!edit} onChange={(e) => setpassout(e.target.value)}>
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
            <Card body style={{ padding: '10px', marginTop:'5px' }}>
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
                            <Form.Select aria-label="Default select example" disabled={!edit} value={clgPassout || clgPassout !== ''? clgPassout : 'Year'} onChange={(e) => setclgPassout(e.target.value)}>
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
                                value={clgCpga}
                                onChange={(e) => setclgCpga(e.target.value)}
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

export default EducationDetails;