import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import Toast from '../Toast';
import { BsPatchCheckFill } from 'react-icons/bs'

const Home = (props) => {
  const [feedback, setfeedback] = useState('');
  const [toast, setToast] = useState(false);

  const sendFeedback = () => {
    const url = props.api + '/students/feedback';
    console.log(url)
    axios.post(url, {
      idNo: props.idNo,
      message: feedback
    }, {
      headers: {
        "auth-token": localStorage.getItem('auth-token')
      }
    })
      .then((res) => {
        setToast(true);
        setfeedback('');
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="Home">
      <Row className="justify-content-md-center">
        <Col sm={12} lg={8}>
          <div className="header">
            <p className="Title">Hello! <br /><span>{props.username}</span></p>
          </div>
          <p className="heading">To Do's</p>
          <p className="message">Things you need to complete</p>
          <div className="box">
            <ListGroup numbered>
              <ListGroup.Item as="li" className="list-group-item"><a href="/dashboard/profile">Complete your profile by clicking on profile nav button (on top-right corner)</a></ListGroup.Item>
              <ListGroup.Item as="li" className="list-group-item"><a href="/dashboard/profile">Upload your profile image and describe yourself in bio</a></ListGroup.Item>
              <ListGroup.Item as="li" className="list-group-item"> <a href="/dashboard/profile">Add your hobbies and social links (Github, LinkedIn, hackerrank, leetcode ...)</a></ListGroup.Item>
              <ListGroup.Item as="li" className="list-group-item"><a href="/dashboard/profile">Add your skills and rate them in skill section</a></ListGroup.Item>
              <ListGroup.Item as="li" className="list-group-item"><a href="/dashboard/profile">Add education details in education section</a></ListGroup.Item>
              <ListGroup.Item as="li" className="list-group-item"><a href="/dashboard/profile">Add your projects, internships, certifications and achievements in feats section</a></ListGroup.Item>
            </ListGroup>
          </div>
          <br />
          <br />
          <p className="heading">Send FeedBack</p>
          <p className="message">Tell us what you feel</p>
          <Form.Control
            as='textarea'
            rows={5}
            value={feedback}
            onChange={(e) => setfeedback(e.target.value)}
            placeholder="Enter your valuable suggestions to improve our site..."
            style={{ fontSize: '14px', borderRadius: '10px' }}
          />
          <Button variant="primary" size='lg' onClick={sendFeedback} style={{ marginTop: '20px', width: '100%', borderRadius: '10px' }}>
            Submit
          </Button>
          <br />
        </Col>
      </Row>
      <Toast value={toast} callback={setToast}>
        <BsPatchCheckFill size={18} style={{ color: '#32CD32' }} /> &nbsp; FeedBack sent successfully
      </Toast>
    </div>
  )
}

export default Home