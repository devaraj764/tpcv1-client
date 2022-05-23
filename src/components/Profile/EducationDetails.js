import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Form, InputGroup, FormControl, Accordion } from 'react-bootstrap';

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

    // Graduation details
    const [graduationDetails, setgraduationDetails] = useState(null);
    const [universityName, setuniversityName] = useState('');
    const [universityLoc, setuniversityLoc] = useState('');
    const [universityCgpa, setuniversityCgpa] = useState('');
    const [allCgpa, setallCgpa] = useState(null);

    useEffect(() => {
        setname(profileData.schooling ? profileData.schooling.name : '');
        setloc(profileData.schooling ? profileData.schooling.loc : '');
        setcgpa(profileData.schooling ? profileData.schooling.cgpa : '');
        setpassout(profileData.schooling ? profileData.schooling.passout : '');
        setclgName(profileData.preGraduation ? profileData.preGraduation.name : '');
        setclgLoc(profileData.preGraduation ? profileData.preGraduation.loc : '');
        setclgCpga(profileData.preGraduation ? profileData.preGraduation.cgpa : '');
        setclgPassout(profileData.preGraduation ? profileData.preGraduation.passout : '');
        setuniversityName(profileData.graduation ? profileData.graduation.name : '');
        setuniversityLoc(profileData.graduation ? profileData.graduation.loc : '');
        setuniversityCgpa(profileData.graduation ? profileData.graduation.cgpa : '');
        setallCgpa(profileData.graduation ? profileData.graduation.allcgpa : null);
    }, [profileData]);

    useEffect(() => {
        setSchoolDetails({ name, cgpa, loc, passout });
        setupdatedProfile({ ...updatedProfile, schooling: schoolDetails });
    }, [name, loc, cgpa, passout, schoolDetails, setupdatedProfile, updatedProfile, setSchoolDetails]);

    useEffect(() => {
        setpreGraduationDetails({
            name: clgName,
            cgpa: clgCpga,
            loc: clgLoc,
            passout: clgPassout
        });
        setupdatedProfile({ ...updatedProfile, preGraduation: preGraduationDetails });
    }, [clgName, clgLoc, clgCpga, clgPassout, setupdatedProfile, updatedProfile, preGraduationDetails, setpreGraduationDetails]);

    useEffect(() => {
        setgraduationDetails({
            name: universityName,
            cgpa: universityCgpa,
            loc: universityLoc,
            allcgpa: allCgpa
        });
        setupdatedProfile({ ...updatedProfile, graduation: graduationDetails });
    }, [universityName, universityLoc, universityCgpa, allCgpa, setupdatedProfile, updatedProfile, graduationDetails, setgraduationDetails]);

    const calculateAverageCgpa = (key, value) => {
        setallCgpa({ ...allCgpa, [key]: value });

        let sum = parseFloat("0.0");
        for (let key in allCgpa) {
            sum += parseFloat(allCgpa[key]);
        }
        let newcgpa = sum / 8;
        setuniversityCgpa(Number((newcgpa).toFixed(1)));
    }

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
                            <Form.Select value={passout || passout !== '' ? passout : 'Year'} id="passout" aria-label="Default select example" disabled={!edit} onChange={(e) => setpassout(e.target.value)}>
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
                                value={cgpa}
                                onChange={(e) => setcgpa(e.target.value)}
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
            <Card body style={{ padding: '10px', marginTop: '5px' }}>
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
                            <Form.Select aria-label="Default select example" disabled={!edit} value={clgPassout || clgPassout !== '' ? clgPassout : 'Year'} onChange={(e) => setclgPassout(e.target.value)}>
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

            {/* Grauation details */}
            <Card body style={{ padding: '10px', marginTop: '5px' }}>
                <p className="sub-heading">Graduation</p>
                <Row>
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">at</InputGroup.Text>
                            <FormControl
                                value={universityName}
                                onChange={(e) => setuniversityName(e.target.value)}
                                placeholder="University Name"
                                aria-label="University name"
                                aria-describedby="basic-addon1"
                                disabled={!edit}
                            />
                        </InputGroup>
                    </Col>
                    {edit ?
                        <Col sm={12}>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>CGPA</Accordion.Header>
                                    <Accordion.Body>
                                        <Row>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E1/SEM1</InputGroup.Text>
                                                    <FormControl
                                                        value={allCgpa ? allCgpa['0'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('0', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E1/SEM2</InputGroup.Text>
                                                    <FormControl
                                                        value={allCgpa ? allCgpa['1'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('1', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E2/SEM1</InputGroup.Text>
                                                    <FormControl
                                                        value={allCgpa ? allCgpa['2'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('2', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E2/SEM2</InputGroup.Text>
                                                    <FormControl
                                                        value={allCgpa ? allCgpa['3'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('3', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E3/SEM1</InputGroup.Text>
                                                    <FormControl
                                                        value={allCgpa ? allCgpa['4'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('4', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E3/SEM2</InputGroup.Text>
                                                    <FormControl
                                                        value={allCgpa ? allCgpa['5'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('5', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E4/SEM1</InputGroup.Text>
                                                    <FormControl
                                                        value={allCgpa ? allCgpa['6'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('6', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col md={6} sm={12}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="basic-addon1">E4/SEM2</InputGroup.Text>
                                                    <FormControl
                                                        value={allCgpa ? allCgpa['7'] : ''}
                                                        onChange={(e) => calculateAverageCgpa('7', e.target.value)}
                                                        placeholder="CGPA"
                                                        aria-label="SchoolName"
                                                        aria-describedby="basic-addon1"
                                                        disabled={!edit}
                                                    />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <br />
                        </Col> :
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">CGPA</InputGroup.Text>
                            <FormControl
                                value={universityCgpa}
                                onChange={(e) => setuniversityCgpa(e.target.value)}
                                placeholder="Overall CGPA"
                                aria-label="SchoolName"
                                aria-describedby="basic-addon1"
                                disabled
                            />
                        </InputGroup>}
                    <Col sm={12}>
                        <InputGroup className="mb-3">
                            <FormControl
                                as='textarea'
                                value={universityLoc}
                                onChange={(e) => setuniversityLoc(e.target.value)}
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