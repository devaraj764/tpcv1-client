import React from 'react'
import { Row, Card, Col, InputGroup, FormControl } from 'react-bootstrap';


const Register = () => {
    return (
        <div className="Register">
            <Card body>
                <p className="title">Student Registration</p>
                <Row>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-2">
                            <InputGroup.Text>@</InputGroup.Text>
                            <FormControl id="inlineFormInputGroup" placeholder="Username" />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-2">
                            <InputGroup.Text>@</InputGroup.Text>
                            <FormControl id="inlineFormInputGroup" placeholder="Username" />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-2">
                            <InputGroup.Text>@</InputGroup.Text>
                            <FormControl id="inlineFormInputGroup" placeholder="Username" />
                        </InputGroup>
                    </Col>
                    <Col md={6} sm={12}>
                        <InputGroup className="mb-2">
                            <InputGroup.Text>@</InputGroup.Text>
                            <FormControl id="inlineFormInputGroup" placeholder="Username" />
                        </InputGroup>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default Register