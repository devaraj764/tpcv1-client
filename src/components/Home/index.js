import React from 'react';
import { Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';

const Home = (props) => {
  return (
    <div className="Home">
      <Row className="justify-content-md-center">
        <Col sm={12} lg={8}>
          <div className="header">
            <div>
              <p className="title">Hello!</p>
              <p className="name">{props.username}</p>
            </div>
          </div>
          <Card body>
            <p className="heading">To Do's<br />
              <span className="message">Actions that you need to do immediately</span></p>
            <ListGroup as="ol" variant="flush" numbered>
              <ListGroup.Item as="li"><a href="/dashboard/profile">Complete your profile by clicking on profile nav button (on top-right corner)</a></ListGroup.Item>
              <ListGroup.Item as="li"><a href="/dashboard/profile">Upload your profile image and describe yourself in bio</a></ListGroup.Item>
              <ListGroup.Item as="li"> <a href="/dashboard/profile">Add your hobbies and social links (Github, LinkedIn, hackerrank, leetcode ...)</a></ListGroup.Item>
              <ListGroup.Item as="li"><a href="/dashboard/profile">Add your skills and rate them in skill section</a></ListGroup.Item>
              <ListGroup.Item as="li"><a href="/dashboard/profile">Add education details in education section</a></ListGroup.Item>
              <ListGroup.Item as="li"><a href="/dashboard/profile">Add your projects, internships, certifications and achievements in feats section</a></ListGroup.Item>
            </ListGroup>
          </Card>
          <br />
          <Card body>
            <p className="heading">Send FeedBack<br />
              <span className="message">Tell us what you feel</span></p>
            <Form.Control
              as='textarea'
              rows={5}
              placeholder="Enter your valuable suggestions to improve our site..."
              style={{ fontSize: '14px' }}
            />
            <Button variant="primary" size="sm" style={{ fontSize: '14px', borderRadius: '25px', padding: '5px 20px', marginTop: '10px', float: 'right' }}>
              Submit
            </Button>
          </Card>
          <br />
        </Col>
      </Row>

    </div>
  )
}

export default Home