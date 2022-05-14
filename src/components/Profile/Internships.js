import React from 'react'
import { Col, Card, Form, Accordion, Row, Button } from 'react-bootstrap';


const Internships = (props) => {
    const [status, setStatus] = React.useState('working');
    const [addNew, setaddNew] = React.useState(false)

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
                                as='input'
                                type='text'
                                id='role'
                                placeholder="Enter your role the Internship.."
                            />
                            <br />
                            <Form.Label htmlFor="organization">Organization name:</Form.Label>
                            <Form.Control
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
                                            <Form.Select id="status" size='sm' style={{ marginBottom: "10px" }} onChange={(e) => setStatus(e.target.value)}>
                                                <option value="working">working</option>
                                                <option value="completed">completed</option>
                                            </Form.Select>
                                        </Col>
                                        {
                                            status === 'completed' ?
                                                <Col>
                                                    <Form.Label htmlFor="end-date">End date</Form.Label>
                                                    <Form.Control
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
                            {/* for every project */}
                            <Accordion.Item eventKey={'0'}>
                                <Accordion.Header>{'Role in Internship'}</Accordion.Header>
                                <Accordion.Body>
                                    {
                                        !props.edit ?
                                            <div style={{ margin: '0 10px' }}>
                                                <p style={{ float: 'left', marginBottom: "10px", color: '#071a84' }}>19-05-2022</p>
                                                <p style={{ float: 'right', marginBottom: "10px", color: '#071a84' }}>working...</p>
                                            </div>
                                            :
                                            <Row>
                                                <Col md={6} sm={12}>
                                                    <Form.Label htmlFor="start-date">Starting date</Form.Label>
                                                    <Form.Control
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
                                                            <Form.Select defaultValue={status} id="status" size='sm' style={{ marginBottom: "10px" }} onChange={(e) => { setStatus(e.target.value) }}>
                                                                <option value="working">working</option>
                                                                <option value="completed">completed</option>
                                                            </Form.Select>
                                                        </Col>
                                                        {
                                                            status === 'completed' ?
                                                                <Col>
                                                                    <Form.Label htmlFor="end-date">End date</Form.Label>
                                                                    <Form.Control
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
                                    }
                                    <Form.Control
                                        type="text"
                                        size='sm'
                                        placeholder="Organization name"
                                        disabled={!props.edit}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                }
                {
                    props.edit ?
                        addNew ?
                            <div style={{ marginTop: '20px' }}>
                                <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px' }} onClick={() => { setStatus('working'); setaddNew(false) }}>push</Button>
                                <Button variant="light" size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px', marginRight: '10px' }} onClick={() => { setStatus('working'); setaddNew(false) }}>cancel</Button>
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