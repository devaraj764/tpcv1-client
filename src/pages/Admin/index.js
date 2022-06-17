import React, { useState, useEffect } from 'react';
import { Nav, Row, Col, Form, Button, Table } from 'react-bootstrap'
import { BsPatchCheckFill } from 'react-icons/bs';
import Toast from '../../components/Toast';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const Admin = (props) => {
    const [tab, setTab] = useState(0);
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [type, settype] = useState('');
    const [externals, setexternals] = useState('');

    const [students, setstudents] = useState([]);
    const [feedbacks, setfeedbacks] = useState([]);

    const [toast, settoast] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('admin-token')) {
            props.history.push('/admin/login');
        }
    }, []);

    useEffect(() => {
        // fetch students
        const url = props.api + '/admin/getStudents';
        axios.get(url, {
            headers: {
                "auth-token": localStorage.getItem('admin-token')
            }
        }).then((res) => {
            setstudents(res.data)
        })
            .catch((err) => console.log(err))
        // fetch feedbacks 
        const url2 = props.api + '/admin/feedbacks';
        axios.get(url2, {
            headers: {
                "auth-token": localStorage.getItem('admin-token')
            }
        }).then((res) => {
            setfeedbacks(res.data)
        })
            .catch((err) => console.log(err))
    }, []);

    const sendNotification = async () => {
        const url = props.api + '/admin/notifications'
        axios.post(url, {
            "title": title,
            "description": description,
            "type": type,
            "externals": externals
        }, {
            headers: {
                "auth-token": localStorage.getItem('admin-token')
            }
        })
            .then((res) => {
                settoast(true);
                settitle('')
                setdescription('')
                settype('')
                setexternals('')
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className='admin' style={{ marginTop: '100px' }}>
            <Row className='justify-content-md-center'>
                <Col xs="12" lg="8">
                    <hr />
                    <Nav fill variant="pills" defaultActiveKey={tab}>
                        <Nav.Item>
                            <Nav.Link eventKey="0" onClick={() => setTab(0)}>Notifications</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="1" onClick={() => setTab(1)}>Students</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="2" onClick={() => setTab(2)}>Feedback</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr />
                    {
                        tab === 0 ?
                            <div>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" placeholder='Enter title of notification' value={title} onChange={(e) => settitle(e.target.value)} />
                                    </Form.Group><br />
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" placeholder='Enter description of notification' value={description} onChange={(e) => setdescription(e.target.value)} />
                                    </Form.Group><br />
                                    <Row>
                                        <Form.Group as={Col} sm={12} lg={6}>
                                            <Form.Label>Type</Form.Label>
                                            <Form.Select defaultValue="-- select --" placeholder="Notification Type" onChange={(e) => settype(e.target.value)}>
                                                <option disabled>-- select --</option>
                                                <option value="info">Info</option>
                                                <option value="warning">Warning</option>
                                                <option value="success">Success</option>
                                                <option value="test">Test</option>
                                            </Form.Select>
                                        </Form.Group><br />
                                        <Form.Group as={Col} sm={12} lg={6}>
                                            <Form.Label>External Links</Form.Label>
                                            <Form.Control type="text" placeholder='external links' value={externals} onChange={(e) => setexternals(e.target.value)} />
                                        </Form.Group>
                                    </Row><br /><br />
                                    <Button variant='primary' onClick={sendNotification} style={{ float: 'right', borderRadius: '20px', width: '100px' }}>send</Button>
                                </Form>
                            </div>
                            : tab === 1 ?
                                <div>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Mobile</th>
                                                <th>Batch</th>
                                                <th>Year of Study</th>
                                                <th>Section</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {students.map((student, i) =>
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{student.idNo}</td>
                                                    <td>{student.name}</td>
                                                    <td>{student.email}</td>
                                                    <td>{student.contactNumber}</td>
                                                    <td>{student.batch}</td>
                                                    <td>{student.yearofStudy}</td>
                                                    <td>{student.section}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                                : <div>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Student Id</th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {feedbacks.map((feedback, i) =>
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{feedback.idNo}</td>
                                                    <td>{feedback.message}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                    }
                </Col>
            </Row>
            <Toast value={toast} callback={settoast}>
                <BsPatchCheckFill size={18} style={{ color: '#32CD32' }} /> &nbsp; Notification Sent Successfully
            </Toast>
        </div >
    );
};

export default withRouter(Admin);