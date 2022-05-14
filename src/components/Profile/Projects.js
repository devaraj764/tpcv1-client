import React, { useState } from 'react'
import { Card, Form, Accordion, Button } from 'react-bootstrap';
import { FiLink } from 'react-icons/fi'

const Projects = (props) => {
    const [addNew, setaddNew] = useState(false);
    return (
        <div className="Projects">
            <p className="heading">Projects<br />
                <span className="message">Add your Projects and tem members</span>
            </p>
            <Card body style={{ padding: '10px', fontSize: '14px' }}>
                {
                    addNew ?
                        <>
                            <Form.Label htmlFor="title">Project Title :</Form.Label>
                            <Form.Control
                                as='input'
                                type='text'
                                id='title'
                                placeholder="Your project title"
                            />
                            <br />
                            <Form.Label htmlFor="description">Describe your project :</Form.Label>
                            <Form.Control
                                as='textarea'
                                roes={3}
                                id='description'
                                placeholder="Describe your project...."
                            />
                            <br />
                            <Form.Label htmlFor="links">Technologies used :</Form.Label>
                            <Form.Control
                                as='input'
                                type='text'
                                id='links'
                                placeholder="Technologies used in this project"
                            />
                            <br />
                            <Form.Label htmlFor="links">External link :</Form.Label>
                            <Form.Control
                                as='input'
                                type='text'
                                id='links'
                                placeholder="paste video or document link..(Optional)"
                            />
                        </>
                        :
                        <Accordion>
                            {/* for every project */}
                            <Accordion.Item eventKey={'0'}>
                                <Accordion.Header>Project Title</Accordion.Header>
                                <Accordion.Body>
                                    {
                                        !props.edit ?
                                            <a href="/" referrer="noreferrer" target="_blank" style={{ float: 'right', marginBottom: "10px", textDecoration: 'none' }}><FiLink size={14} />&nbsp;know more</a>
                                            :
                                            <Form.Control
                                                type="text"
                                                size='sm'
                                                placeholder="paste video or document link here"
                                                style={{ marginBottom: "10px" }}
                                            />
                                    }
                                    <Form.Control
                                        as='textarea'
                                        rows={3}
                                        placeholder="Enter your project description...."
                                        style={{ fontSize: '14px', marginBottom: '10px' }}
                                        disabled={!props.edit}

                                    />
                                    <Form.Control
                                        type="text"
                                        size='sm'
                                        placeholder="Technologies used in this project"
                                        disabled={!props.edit}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                }
                {/* </Col> */}
                {
                    props.edit ?
                        addNew ?
                            <div style={{ marginTop: '20px' }}>
                                <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px' }} onClick={() => setaddNew(false)}>push</Button>
                                <Button variant="light" size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px', marginRight: '10px' }} onClick={() => setaddNew(false)}>cancel</Button>
                            </div>
                            :
                            <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px', marginTop: '20px' }} onClick={() => setaddNew(true)}>+ Add</Button>

                        : null
                }
            </Card>
        </div>
    )
}

export default Projects