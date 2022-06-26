import React, { useEffect } from 'react';
import { Row, Col, Container, Card, Image } from 'react-bootstrap';
import NotificationImage from '../../assets/notification.png';
import EmailImage from '../../assets/email.png';
import ListStudents from '../../assets/customer.png';
import FeedbackImage from '../../assets/feedback.png';

import { withRouter, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'

const Admin = (props) => {
<<<<<<< HEAD
=======
    const [tab, setTab] = useState(1);
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [type, settype] = useState('');
    const [externals, setexternals] = useState('');

    const [students, setstudents] = useState([]);
    const [filteredStudents, setfilteredStudents] = useState([]);
    const [feedbacks, setfeedbacks] = useState([]);

    const [toast, settoast] = useState(false);
    const [searchInput, setsearchInput] = useState('');

>>>>>>> f507becd31e7a9201d1cea45f2a8aae94f4b51ca
    useEffect(() => {
        if (!localStorage.getItem('admin-token')) {
            props.history.push('/admin/login');
        }
    }, []);


    return (
        <HomePage props={props} />
    );
};

const HomePage = (props) => {
    console.log(props)
    return (
        <>
            <Helmet>
                <title>Admin Dashboard | TPC</title>
            </Helmet>
            <Container className='Admin' style={{ marginTop: '50px' }}>
                <Row className='justify-content-md-center'>
                    <Col xs="12" lg="8">
<<<<<<< HEAD
                        <p style={{ fontSize: '28px', fontWeight: 'bold', marginLeft: '20px' }}>Admin Dashboard</p>

                        <Row style={{ marginTop: '30px' }} className="gx-2">
                            <Col md={6} sm={12} className="p-3">
                                <Card body as={Link} to='/admin/dashboard/send-notification'>
                                    <Row className="inernal-row">
                                        <Col xs={2} className="align-self-center">
                                            <Image src={NotificationImage} alt="notification image" fluid style={{ maxHeight: '40px' }} />
                                        </Col>
                                        <Col xs={10} className="align-self-center">
                                            <p className="heading">Send Notifications</p>
                                            <p className="sub-heading">Admin can send notification directly to the student dahboard.</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col md={6} sm={12} className="p-3">
                                <Card body>
                                    <Row className="inernal-row">
                                        <Col xs={2} className="align-self-center">
                                            <Image src={EmailImage} alt="notification image" fluid style={{ maxWidth: '40px' }} />
                                        </Col>
                                        <Col xs={10} className="align-self-center">
                                            <p className="heading">Send Email</p>
                                            <p className="sub-heading">Admin can send emails to the setudents selectively.</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col md={6} sm={12} className="p-3">
                                <Card body as={Link} to='/admin/dashboard/studentslist'>
                                    <Row className="inernal-row">
                                        <Col xs={2} className="align-self-center">
                                            <Image src={ListStudents} alt="notification image" fluid style={{ maxWidth: '40px' }} />
                                        </Col>
                                        <Col xs={10} className="align-self-center">
                                            <p className="heading">Students List</p>
                                            <p className="sub-heading">Admin can get the students lists and can apply filters.</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col md={6} sm={12} className="p-3">
                                <Card body as={Link} to='/admin/dashboard/feedbacks'>
                                    <Row className="inernal-row">
                                        <Col xs={2} className="align-self-center">
                                            <Image src={FeedbackImage} alt="notification image" fluid style={{ maxWidth: '40px' }} />
                                        </Col>
                                        <Col xs={10} className="align-self-center">
                                            <p className="heading">Student Feedbacks</p>
                                            <p className="sub-heading">See the feedbacks of the students recieved through website.</p>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
=======
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
                                        <Form.Control type="text" onChange={(e) => setsearchInput(e.target.value)} onKeyUp={searchStudents} placeholder="Search Students By ID" />
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
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredStudents.map((student, i) =>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{student.idNo}</td>
                                                        <td>{student.name}</td>
                                                        <td>{student.email}</td>
                                                        <td>{student.contactNumber}</td>
                                                        <td>{student.batch}</td>
                                                        <td>{student.yearofStudy}</td>
                                                        <td>{student.section}</td>
                                                        {/* <td><a style={{cursor:'pointer'}} onClick={() => props.history.push(`/view-profile/${student._id}`)}>View Profile</a></td> */}
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
>>>>>>> f507becd31e7a9201d1cea45f2a8aae94f4b51ca
                    </Col>
                </Row>
            </Container >
        </>
    )
}

export default withRouter(Admin);