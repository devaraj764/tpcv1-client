import React, { useState, useEffect } from 'react'
import { Col, Card, Form, Accordion, Row, Button } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';

const Internships = (props) => {
    const [addNew, setaddNew] = React.useState(false)
    const [internships, setinternships] = useState([]);
    const [newInternship, setnewInternship] = useState({
        'role': '',
        'organization': '',
        'startDate': '',
        'endDate': '',
        'status': 'working',
    });

    useEffect(() => {
        setinternships(props.profileData?.internships ? props.profileData?.internships : []);
    }, [props.profileData]);

    const addInternship = () => {
        setinternships([...internships, newInternship]);
        props.setupdatedProfile({ ...props.updatedProfile, internships: [...internships, newInternship] });
        setaddNew(false);
    }

    const updateInternship = (index, key, value) => {
        const newInternships = [...internships];
        newInternships[index] = {
            ...newInternships[index],
            [key]: value
        }
        setinternships(newInternships);
        props.setupdatedProfile({ ...props.updatedProfile, internships: newInternships });
    }

    const deleteInternship = (index) => {
        setinternships(internships.filter((_blank, i) => i !== index));
        props.setupdatedProfile({ ...props.updatedProfile, internships: internships.filter((_, i) => i !== index) });
    }

    return (
        <div className="Internships">
            <p className="heading">Internships<br />
                <span className="message">Add your new internships and status</span>
            </p>
            <Card body style={{ padding: '10px', fontSize: '14px' }}>
                {
                    addNew ?
                        <>
                            <Form.Label htmlFor="role">Role</Form.Label>
                            <Form.Control
                                defaultValue={newInternship.role}
                                onChange={(e) => setnewInternship({ ...newInternship, role: e.target.value })}
                                as='input'
                                type='text'
                                id='role'
                                placeholder="Enter your role the Internship.."
                            />
                            <br />
                            <Form.Label htmlFor="organization">Organization name:</Form.Label>
                            <Form.Control
                                defaultValue={newInternship.organization}
                                onChange={(e) => setnewInternship({ ...newInternship, organization: e.target.value })}
                                as='input'
                                type='text'
                                id='organization'
                                placeholder="Enter organization name you worked for.."
                            />
                            <br />
                            <Row>
                                <Col md={6} sm={12}>
                                    <Form.Label htmlFor="start-date">Starting date</Form.Label>
                                    <Form.Control
                                        defaultValue={newInternship.startDate}
                                        onChange={(e) => setnewInternship({ ...newInternship, startDate: e.target.value })}
                                        type="date"
                                        id="start-date"
                                        size='sm'
                                        placeholder="start date"
                                        style={{ marginBottom: "10px" }}
                                    />
                                </Col>
                                <Col md={6} sm={12}>
                                    <Row>
                                        <Col>
                                            <Form.Label htmlFor="status">Status</Form.Label>
                                            <Form.Select id="status" size='sm' style={{ marginBottom: "10px" }} defaultValue={newInternship.status} onChange={(e) => { setnewInternship({ ...newInternship, status: e.target.value }); }}>
                                                <option value="working">working</option>
                                                <option value="completed">completed</option>
                                            </Form.Select>
                                        </Col>
                                        {
                                            newInternship.status === 'completed' ?
                                                <Col>
                                                    <Form.Label htmlFor="end-date">End date</Form.Label>
                                                    <Form.Control
                                                        defaultValue={newInternship.endDate}
                                                        onChange={(e) => setnewInternship({ ...newInternship, endDate: e.target.value })}
                                                        type="date"
                                                        id="end-date"
                                                        size='sm'
                                                        placeholder="end date"
                                                        style={{ marginBottom: "10px" }}
                                                    />
                                                </Col> : null
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        </>
                        :
                        <Accordion>
                            {
                                internships.map((internship, index) => {
                                    return (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={index}>
                                            {
                                                props.edit ?
                                                    <span onClick={() => { deleteInternship(index) }} style={{ marginRight: '10px', color: 'tomato', cursor: 'pointer' }}><MdDelete size={24} /></span> : null
                                            }
                                            <Accordion.Item style={{ width: '100%' }} eventKey={index}>
                                                <Accordion.Header>{internship.role}</Accordion.Header>
                                                <Accordion.Body>
                                                    {
                                                        !props.edit ?
                                                            <div style={{ margin: '0 10px' }}>
                                                                <p style={{ float: 'left', marginBottom: "10px", color: '#071a84' }}>{internship.startDate}</p>
                                                                <p style={{ float: 'right', marginBottom: "10px", color: '#071a84' }}>{internship.status}</p>
                                                            </div>
                                                            :
                                                            <Row>
                                                                <Col md={6} sm={12}>
                                                                    <Form.Label htmlFor="start-date">Starting date</Form.Label>
                                                                    <Form.Control
                                                                        defaultValue={internship.startDate}
                                                                        onChange={(e) => updateInternship(index, 'startDate', e.target.value)}
                                                                        type="date"
                                                                        id="start-date"
                                                                        size='sm'
                                                                        placeholder="start date"
                                                                        style={{ marginBottom: "10px" }}
                                                                    />
                                                                </Col>
                                                                <Col md={6} sm={12}>
                                                                    <Row>
                                                                        <Col>
                                                                            <Form.Label htmlFor="status">Status</Form.Label>
                                                                            <Form.Select defaultValue={internship.status} id={internship.role} size='sm' style={{ marginBottom: "10px" }} onChange={(e) => { updateInternship(index, 'status', e.target.value); }}>
                                                                                <option value="working">working</option>
                                                                                <option value="completed">completed</option>
                                                                            </Form.Select>
                                                                        </Col>
                                                                        {
                                                                            document.getElementById(internship.role)?.value === 'completed' ?
                                                                                internship.status === 'completed' ?
                                                                                    <Col>
                                                                                        <Form.Label htmlFor="end-date">End date</Form.Label>
                                                                                        <Form.Control
                                                                                            defaultValue={internship.endDate}
                                                                                            onChange={(e) => updateInternship(index, 'endDate', e.target.value)}
                                                                                            type="date"
                                                                                            id="end-date"
                                                                                            size='sm'
                                                                                            placeholder="end date"
                                                                                            style={{ marginBottom: "10px" }}
                                                                                        />
                                                                                    </Col> : null : null
                                                                        }
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                    }
                                                    <Form.Control
                                                        type="text"
                                                        size='sm'
                                                        onChange={(e) => updateInternship(index, 'organization', e.target.value)}
                                                        defaultValue={internship.organization}
                                                        placeholder="Organization name"
                                                        disabled={!props.edit}
                                                    />
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </div>
                                    )
                                })
                            }
                        </Accordion>
                }
                {
                    props.edit ?
                        addNew ?
                            <div style={{ marginTop: '20px' }}>
                                <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px' }} onClick={addInternship}>push</Button>
                                <Button variant="light" size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px', marginRight: '10px' }} onClick={() => { setaddNew(false) }}>cancel</Button>
                            </div>
                            :
                            <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px', marginTop: '20px' }} onClick={() => setaddNew(true)}>+ Add</Button>

                        : null
                }
            </Card>
        </div>
    )
}

export default Internships