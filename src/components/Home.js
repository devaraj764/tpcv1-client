import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col, Card, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { MdFeedback } from 'react-icons/md'

const Home = (props) => {

  const [show, setShow] = useState(false);
  const [message, setmessage] = useState('');
  const [success, setsuccess] = useState('');

  const submitFeedback = () => {
    axios.post(props.api + 'students/feedback', {
      "message": message
    }, {
      headers: {
        "auth-token": localStorage.getItem('auth-token')
      }
    }).then(res => {
      setsuccess(res.data.message)
      setTimeout(() => {
        setsuccess('');
        setShow(false)
      }, 2000);
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="Home">
      <Row className="justify-content-md-center">
        <Col sm={12} lg={8}>
          <div className="header">
            <div>
              <p className="title">Hello!</p>
              <p className="name">Deva Raju Maddu</p>
            </div>
            <Button onClick={() => setShow(true)}><MdFeedback size={18} /> &nbsp;Feedback</Button>
          </div>
          <Card body>
            <p className="heading">To Do's<br />
              <span className="message">Actions that you need to do immediately</span></p>
            <ListGroup as="ol" variant="flush" numbered>
              <ListGroup.Item as="li">Complete your profile by clicking on profile nav button (on top-right corner)</ListGroup.Item>
              <ListGroup.Item as="li">Upload your profile image and educational details = update profile</ListGroup.Item>
              <ListGroup.Item as="li">Rate your skills in the skills section = update Profile</ListGroup.Item>
              <ListGroup.Item as="li">Create your LinkedIn profiles to add in social media section</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <p className="heading">Send FeedBack</p>
          <Form.Control
            onChange={(e) => setmessage(e.target.value)}
            as='textarea'
            rows={5}
            placeholder="Enter your valuable suggestions to improve our site..."
            style={{ fontSize: '14px' }}
          />
        </Modal.Body>
        {success === '' ? null : <p style={{ color: 'green', fontSize: '14px', textAlign: 'center' }}>{success}</p>}
        <Modal.Footer>
          <Button variant="secondary" size="sm" style={{ fontSize: '14px', borderRadius: '25px', padding: '5px 20px' }} onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" size="sm" style={{ fontSize: '14px', borderRadius: '25px', padding: '5px 20px' }} onClick={() => submitFeedback()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Home