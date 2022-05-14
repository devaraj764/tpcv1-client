import React from 'react'
import { Card, Form, Accordion, Button } from 'react-bootstrap';

const Achievements = (props) => {
    const [status, setStatus] = React.useState('working');
    const [addNew, setaddNew] = React.useState(false)
    return (
        <div className="Achievements">
            <p className="heading">Achievements<br />
                <span className="message">Add your school and collage level achievements.</span>
            </p>
            <Card body style={{ padding: '10px', fontSize: '14px' }}>
                {
                    addNew ?
                        <>
                            <Form.Label htmlFor="name">Achievement name :</Form.Label>
                            <Form.Control
                                as='input'
                                type='text'
                                id='name'
                                placeholder="Your achivement name"
                            />
                            <br />
                            <Form.Label htmlFor="description">Describe your achievement :</Form.Label>
                            <Form.Control
                                as='textarea'
                                roes={3}
                                id='description'
                                placeholder="Tell about your achievement...."
                            />
                        </>
                        :
                        <Accordion>
                            {/* for every Achievement */}
                            <Accordion.Item eventKey={'0'}>
                                <Accordion.Header>{'Achievement Name'}</Accordion.Header>
                                <Accordion.Body>
                                    <Form.Control
                                        as='textarea'
                                        rows={3}
                                        placeholder="Describe about your achievement...."
                                        style={{ fontSize: '14px', marginBottom: '10px' }}
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

export default Achievements