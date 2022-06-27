import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Image } from 'react-bootstrap'
import { BsPatchCheckFill } from 'react-icons/bs';
import Toast from '../../components/helpers/Toast';
import axios from '../../axios';
import EmailImage from '../../assets/email.png';
import { withRouter } from 'react-router-dom'


const SendMail = (props) => {
    const [subject, setsubject] = useState('');
    const [body, setbody] = useState('');
    const [mails, setmails] = useState('');
    const [toast, settoast] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('admin-token')) {
            props.history.push('/admin/login');
        }
        if (props.location.state) {
            let emails = props.history.location.state.emails
            console.log(emails)
            setmails(emails)
        }
    }, []);

    const sendMail = (e) => {
        e.preventDefault()
        if (subject === '' || body === '' || mails === '') {
            alert('Please fill out all fields');
            return;
        }
        axios.post('/admin/sendmail', {
            subject: subject,
            emails: mails,
            html: body
        }, {
            headers: {
                "auth-token": localStorage.getItem("admin-token")
            }
        })
            .then((res) => {
                settoast(true);
                setsubject('')
                setbody('')
                setmails('')
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <Helmet>
                <title>Send Mails | Admin</title>
            </Helmet>
            <Container className='Admin' style={{ marginTop: '50px' }}>
                <Row className='justify-content-md-center'>
                    <Col xs="12" lg="8">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
                            <div style={{ marginRight: '20px' }}>
                                <Image src={EmailImage} alt="email image" fluid style={{ maxHeight: '60px' }} />
                            </div>
                            <div>
                                <p className="heading">Send Email</p>
                                <p className="sub-heading">Admin can send emails to the students selectively.</p>
                            </div>
                        </div>
                        <div style={{ border: '1px solid #c8c8c8', padding: '20px', borderRadius: '10px', height: 'fit-content' }}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" placeholder='Enter subject of email' value={subject} onChange={(e) => setsubject(e.target.value)} required />
                                </Form.Group><br />
                                <Form.Group>
                                    <Form.Label>Body</Form.Label>
                                    <Form.Control type="text" as='textarea' rows='5' placeholder='Enter body of email in html' value={body} onChange={(e) => setbody(e.target.value)} required />
                                </Form.Group><br /><br />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'fit-content', marginBottom: '10px' }}>
                                    <div style={{ margin: '0px' }}>
                                        <p className="message">Student Emails</p>
                                    </div>
                                    {addNew ?
                                        <Button variant="light" onClick={() => setAddNew(false)} style={{ minWidth: '100px' }} size='sm'>cancel</Button>
                                        :
                                        <Button onClick={() => setAddNew(true)} style={{ minWidth: '100px', borderRadius: '10px' }} size='sm'>+ Email</Button>
                                    }
                                </div>
                                <Card body>
                                    <div>
                                        {addNew ? null : mails.length === 0 ?
                                            <p style={{ textAlign: 'center', width: '100%', color: 'gray' }}> No Mails Added yet!<br /> Try to add new mais...</p>
                                            :
                                            mails.map((mail, index) => {
                                                return (
                                                    <Badge key={index} style={{ padding: '10px 20px', fontSize: '14px', color: '#3c4852', width: 'fit-content', border: '1px solid #c8c8c8', margin: '5px' }} bg="light" pill>
                                                        {mail}&nbsp;
                                                        {<MdOutlineCancel size={15} style={{ color: '#6b818b', float: 'right', marginLeft: '5px', cursor: 'pointer' }} onClick={() => removeMail(mail)} />}
                                                    </Badge>
                                                );
                                            })
                                        }
                                        {addNew ?
                                            <Col lg={12}>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter Mail..."
                                                        value={mail}
                                                        onChange={(e) => { setmail(e.target.value); }}
                                                    />
                                                    <Button variant="secondary" style={{ minWidth: '100px' }} onClick={addMail}>Add</Button>
                                                </InputGroup>
                                            </Col>
                                            : null}
                                    </div>
                                </Card>
                                <Row className="justify-content-md-center" style={{ marginTop: '30px ' }}>
                                    <Col xs={12}>
                                        <Button size='lg' type='submit' variant='primary' onClick={(e) => sendMail(e)} style={{ width: '100%' }}>Send Email</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <Toast value={toast} callback={settoast}>
                            <BsPatchCheckFill size={18} style={{ color: '#32CD32' }} /> &nbsp; Emails Sent Successfully
                        </Toast>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default withRouter(SendMail);