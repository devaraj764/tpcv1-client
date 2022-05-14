import React from 'react'
import { Col, Card, Form, Accordion, Row, Button } from 'react-bootstrap';
import { FiLink } from 'react-icons/fi'


const Certifications = (props) => {
    const [status, setStatus] = React.useState('working');
    const [addNew, setaddNew] = React.useState(false)

    return (
        <div className="Certifications">
            <p className="heading">Certifications<br />
                <span className="message">Add your new certifications and status</span>
            </p>
            <Card body style={{ padding: '10px', fontSize: '14px' }}>
                {
                    addNew ?
                        <>
                            <Form.Label htmlFor="title">Title</Form.Label>
                            <Form.Control
                                as='input'
                                type='text'
                                id='title'
                                placeholder="Enter your certification title.."
                            />
                            <br />
                            <Row>
                                <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                    <Form.Label htmlFor="start-date">Starting date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        id="start-date"
                                        size='sm'
                                        placeholder="start date"
                                        style={{ marginBottom: "10px" }}
                                    />
                                </Col>
                                <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                    <Form.Label htmlFor="status">Status</Form.Label>
                                    <Form.Select id="status" size='sm' style={{ marginBottom: "10px" }} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="working">working</option>
                                        <option value="completed">completed</option>
                                    </Form.Select>
                                </Col>
                                {
                                    status === 'completed' ?
                                        <>
                                            <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                                <Form.Label htmlFor="end-date">End date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    id="end-date"
                                                    size='sm'
                                                    placeholder="end date"
                                                    style={{ marginBottom: "10px" }}
                                                />
                                            </Col>
                                            <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                                <Form.Label htmlFor="link">Certificate Link</Form.Label>
                                                <Form.Control
                                                    as='input'
                                                    type='text'
                                                    id='link'
                                                    placeholder="Enter your link of the certificate"
                                                />
                                            </Col>
                                        </>
                                        : null
                                }
                            </Row>
                        </>
                        :
                        <Accordion>
                            {/* for every project */}
                            <Accordion.Item eventKey={'0'}>
                                <Accordion.Header>{'Certificate Title'}</Accordion.Header>
                                <Accordion.Body>
                                    {
                                        !props.edit ?
                                            <Row style={{ margin: '0 10px', textAlign: 'center' }}>
                                                <Col style={{ float: 'left', marginBottom: "10px", color: '#071a84' }}>19-05-2022</Col>
                                                <Col style={{ float: 'right', marginBottom: "10px", color: '#071a84' }}>working...</Col>
                                                {/* display below col only if he had certificate */}
                                                <Col style={{ float: 'right', marginBottom: "10px", color: '#071a84' }}><a href="/" referrer="noreferrer" target="_blank" style={{ textDecoration: 'none' }}><FiLink size={14} />&nbsp;Certifiicate</a></Col>
                                            </Row>
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
                                                    <Form.Label htmlFor="status">Status</Form.Label>
                                                    <Form.Select defaultValue={status} id="status" size='sm' style={{ marginBottom: "10px" }} onChange={(e) => { setStatus(e.target.value) }}>
                                                        <option value="working">working</option>
                                                        <option value="completed">completed</option>
                                                    </Form.Select>
                                                </Col>
                                                {
                                                    status === 'completed' ?
                                                        <>
                                                            <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                                                <Form.Label htmlFor="end-date">End date</Form.Label>
                                                                <Form.Control
                                                                    type="date"
                                                                    id="end-date"
                                                                    size='sm'
                                                                    placeholder="end date"
                                                                    style={{ marginBottom: "10px" }}
                                                                />
                                                            </Col>
                                                            <Col md={6} sm={12} style={{ marginTop: '10px' }}>
                                                                <Form.Label htmlFor="link">Certificate Link</Form.Label>
                                                                <Form.Control
                                                                    as='input'
                                                                    type='text'
                                                                    id='link'
                                                                    placeholder="Enter your link of the certificate"
                                                                />
                                                            </Col>
                                                        </>
                                                        : null
                                                }
                                            </Row>
                                    }
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

export default Certifications