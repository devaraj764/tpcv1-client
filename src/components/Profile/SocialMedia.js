import React, {useState} from 'react';
import {Card, Row, Col, Form ,Button} from 'react-bootstrap'

const SocialMedia = () => {
    const [addNew, setAddNew] = useState(false)
    return (
        <div className="SocialMedia">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <p className="heading">Externel Links<br />
                    <span className="message">Add your links here</span>
                </p>
                {addNew ?
                    <Button variant="light" onClick={() => setAddNew(false)} style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px' }} size='sm'>cancel</Button>

                    :
                    <Button onClick={() => setAddNew(true)} style={{ backgroundColor: '#071a84', fontSize: '14px !important', minWidth: '100px', borderRadius: '25px' }} size='sm'>+ Add New</Button>
                }
            </div>
            <Card body style={{ padding: '10px' }}>
                <Row>
                    {addNew ? null :
                        <p style={{ textAlign: 'center', width: '100%', color: 'gray' }}> No Links Available!<br /> Try to add new links...</p>
                    }
                    {/* for every links */}
                    <Col md={6} sm={12}>

                    </Col>
                    {addNew ?
                        <Col lg={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Place your link here.."
                                />

                                <Button style={{ backgroundColor: '#071a84', fontSize: '14px !important', minWidth: '100px' }}>Add</Button>
                            </div>
                        </Col>
                        : null}
                </Row>

            </Card>
        </div>
    )
}

export default SocialMedia;