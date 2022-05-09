import React, { useState } from 'react';
import { Col, Row, Image, InputGroup, FormControl, Button } from 'react-bootstrap';
import CareerImg from '../assets/career.svg';
import TPCLogo from '../assets/tpc-logo.svg';
import { MdPermIdentity, MdPassword } from 'react-icons/md';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function Home(props) {
    const [idNo, setidNo] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');

    function submit(e) {
        e.preventDefault();
        if (idNo === '' || password === '') {
            seterror('Fill all empty fields')
        } else {
            seterror('')
            login();
        }
    }

    function login() {
        axios.post('http://localhost:3000/login', {
            "idNo": idNo,
            "password": password,
        }).then(res => {
            console.log(res.data)
            props.history.push({
                pathname: '/Dashboard',
                state: res.data.token
            })
        }).catch(err => {
            console.log(err.response)
        })
    }

    return (
        <>
            <Row className="Login" style={{ minHeight: '100vh' }}>
                <Col className="left-side" lg={6} md={6}>
                    <div style={{ textAlign: 'center', color: 'white' }}>
                        <Image src={CareerImg} fluid={true} style={{ maxHeight: '300px', marginBottom: '50px' }} />
                        <p style={{ fontSize: '20px' }}>“Find out what you like doing best, <br />and get someone to pay you for doing it.”</p>
                    </div>
                </Col>
                <Col className="right-side" sm={12} lg={6} md={6}>
                    <Image src={TPCLogo} fluid={true} style={{ maxHeight: '300px', marginBottom: '50px' }} />
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Hello Again!</p>
                    <p style={{ color: 'grey', textAlign: 'center', fontSize: '14px' }}>Hey, Enter your credentials to get login to your account..</p>
                    <br />
                    <InputGroup className="mb-3 inputField">
                        <InputGroup.Text id="basic-addon1"><MdPermIdentity /></InputGroup.Text>
                        <FormControl
                            onChange={(e) => setidNo(e.target.value)}
                            placeholder="Student Id"
                            aria-label="Student Id"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 inputField">
                        <InputGroup.Text id="basic-addon2"><MdPassword /></InputGroup.Text>
                        <FormControl
                            type="password"
                            onChange={(e) => setpassword(e.target.value)}
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <div style={{ maxWidth: '400px', width: '100%' }}>
                        <p style={{ float: 'right', fontSize: '14px' }}>Forgot Password?</p>
                    </div>
                    <br />
                    <Button style={{ maxWidth: '400px', width: '100%', backgroundColor: '#071a84' }} size="md" onClick={(e) => submit(e)}>Login</Button>
                    <br />
                    <p>Don't have account? <span style={{ color: '#071a84', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}>SignUp</span></p>
                </Col>
            </Row>
        </>
    )
}
export default withRouter(Home);