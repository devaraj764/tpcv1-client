import React from 'react'
import {  Card, Form, Accordion, Button } from 'react-bootstrap';
import { FiLink } from 'react-icons/fi'

const Projects = (props) => {
    const [addNew, setaddNew] = React.useState(false)
    return (
        <div className="Projects">
            <p className="heading">Projects<br />
                <span className="message">Add your Projects and tem members</span>
            </p>
            <Card body style={{ padding: '10px', fontSize: '14px' }}>
                {
                    addNew ?
                        <>
                            <Form.Label htmlFor="title">Project Title</Form.Label>
                            <Form.Control
                                as='input'
                                type='text'
                                id='title'
                                placeholder="Your project title"
                            />
                            <br />
                            <Form.Label htmlFor="description">Describe your project</Form.Label>
                            <Form.Control
                                as='textarea'
                                roes={3}
                                id='description'
                                placeholder="Your project title"
                            />
                            <br />
                            <Form.Label htmlFor="links">External link</Form.Label>
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
                                                style={{ float: 'right', marginBottom: "10px", textDecoration: 'none' }}
                                            />
                                    }
                                    <Form.Control
                                        as='textarea'
                                        rows={3}
                                        placeholder="Enter your project description...."
                                        style={{ fontSize: '14px' }}
                                        disabled={!props.edit}

                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                }
                {/* </Col> */}
                <br />
                {
                    addNew ?
                        <div>
                            <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px' }} onClick={() => setaddNew(false)}>push</Button>
                            <Button variant="light" size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px' }} onClick={() => setaddNew(false)}>cancel</Button>
                        </div>
                        :
                        <Button size="sm" style={{ float: 'right', width: '100px', borderRadius: '25px' }} onClick={() => setaddNew(true)}>+ Add</Button>
                }
            </Card>
        </div>
    )
}

export default Projects