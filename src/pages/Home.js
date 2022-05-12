import React, { useState, useEffect } from 'react';
import { Col, Row, Image, InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import CareerImg from '../assets/career.svg';
import TPCLogo from '../assets/tpc-logo.svg';
import { MdPermIdentity, MdEmail, MdPassword, MdBatchPrediction, MdPhone } from 'react-icons/md';
import { BiRename } from 'react-icons/bi'
import { FaBirthdayCake, FaBook } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import hardSkills from '../defaults/hardskills.json';
import softSkills from '../defaults/softskills.json';

function Home(props) {

    const [path, setPath] = useState(props.location.pathname);

    useEffect(() => {
        setPath(props.location.pathname)
        let token = localStorage.getItem('auth-token');
        if (token) {
            props.history.push('/dashboard');
        }
    }, [props.location.pathname, props.history]);

    const routeToDashBoard = (res) => {
        props.history.push({
            pathname: '/dashboard',
        })
        localStorage.setItem('auth-token', res.data.token);
    }

    return (
        <>
            <Row className="Home" style={{ minHeight: '100vh' }}>
                <Col className="left-side" lg={6} md={6}>
                    <div style={{ textAlign: 'center', color: 'white' }}>
                        <Image src={CareerImg} fluid={true} style={{ maxHeight: '300px', marginBottom: '50px' }} />
                        <p style={{ fontSize: '20px' }}>“Luck is what happens<br /> when preparation meets opportunity.”</p>
                    </div>
                </Col>
                <Col className="right-side" sm={12} lg={6} md={6}>
                    <Image src={TPCLogo} fluid={true} style={{ maxHeight: '300px', marginBottom: '30px' }} />
                    {path === '/login' ? <Login callBack={routeToDashBoard} api={props.api} /> : <Register callBack={routeToDashBoard} api={props.api} />}

                </Col>
            </Row>
        </>
    )
}

function Login(props) {
    const [idNo, setidNo] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');

    function submit(e) {
        e.preventDefault();
        if (idNo === '' || password === '') {
            seterror('Fill all empty fields')
        } else {
            seterror('')
            loginUser();
        }
    }

    function loginUser() {
        setsuccess('')
        const url = props.api + 'login'
        axios.post(url, {
            "idNo": idNo,
            "password": password,
        }).then(res => {
            console.log(res.data)
            props.callBack(res);
        }).catch(err => {
            if (err) {
                seterror(err.response.data.error)
            }
        })
    }

    const forgotPassword = () => {
        if (idNo === '') {
            seterror('Enter your idNo')
        } else {
            axios.post(props.api + 'forgot-password', {
                "idNo": idNo,
            }).then(res => {
                console.log(res.data.message)
                seterror('')
                setsuccess(res.data.message)
            }).catch(err => {
                console.log(err)
            });
        }
    }

    return (
        <>

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
                <p style={{ float: 'right', fontSize: '14px', cursor: 'pointer' }} onClick={forgotPassword}>Forgot Password?</p>
            </div>
            {error === '' ? null : <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
            {success === '' ? null : <p style={{ color: 'green', fontSize: '14px' }}>{success}</p>}
            <Button style={{ maxWidth: '400px', width: '100%', backgroundColor: '#071a84' }} size="md" onClick={(e) => submit(e)}>Login</Button>
            <br />
            <p>Don't have account? <Link style={{ color: '#071a84', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }} to="/register">SignUp</Link></p>
        </>
    );
}

function Register(props) {
    const [error, seterror] = useState('');
    const [name, setname] = useState('');
    const [id, setid] = useState('');
    const [email, setemail] = useState('');
    const [section, setsection] = useState('');
    const [dob, setdob] = useState('');
    const [batch, setbatch] = useState('');
    const [yearofStudy, setyearofStudy] = useState('');
    const [contactNum, setcontactNum] = useState('');
    const [address, setaddress] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    function validateEmail() {
        var re = /^[a-z0-9](\.?[a-z0-9]){5,}@r(oogle)?guktsklm\.ac.in$/;
        return re.test(String(email).toLowerCase());
    }

    function submit(e) {
        e.preventDefault()
        if (name === '' || id === '' || email === '' || section === '' || dob === '' || batch === '' || yearofStudy === '' || address === '' || contactNum === '' || password === '' || confirmPassword === '') {
            seterror('Fill all empty fields!!!')
        } else if (name.length < 3) {
            seterror('Name should contain at least 3 characters');
        } else if (id.length < 7) {
            seterror('Student ID shoudl contain at least 7 characters, it must look like (SXXXXXX)');
        } else if (!validateEmail(email)) {
            seterror('Enter a valid email address')
        } else if (password !== confirmPassword) {
            seterror('Password and confirm password does not matched')
        }
        else {
            seterror('');
            registerUser();
        }
    }

    function registerUser() {
        const url = props.api + 'register'
        axios.post(url, {
            "name": name,
            "idNo": id,
            "email": email,
            "section": section,
            "batch": batch,
            "dob": dob,
            "yearofStudy": yearofStudy,
            "address": address,
            "contactNumber": contactNum,
            "password": password,
            "hardSkills": hardSkills,
            "softSkills": softSkills,
        }).then(res => {
            console.log(res.data);
            props.callBack(res)
        }).catch(err => {
            if (err) {
                seterror(err.response.data.error)
            }
        });
    }

    return (
        <>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Student Registration Form</p>
            <br />
            <Row style={{ maxWidth: '756px' }}>
                <Col md={6} sm={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><BiRename /></InputGroup.Text>
                        <FormControl
                            onChange={(e) => setname(e.target.value)}
                            type='text'
                            placeholder="Full Name"
                            aria-label="Full name"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col md={6} sm={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3"><MdPermIdentity /></InputGroup.Text>
                        <FormControl
                            onChange={(e) => setid(e.target.value)}
                            type='text'
                            placeholder="ID Number"
                            aria-label="idnumber"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col md={6} sm={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3"><MdEmail /></InputGroup.Text>
                        <FormControl
                            onChange={(e) => setemail(e.target.value)}
                            type='email'
                            placeholder="Email"
                            aria-label="email"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col md={6} sm={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3"><SiGoogleclassroom /></InputGroup.Text>
                        <Form.Select
                            onChange={(e) => setsection(e.target.value)}
                            defaultValue="-- select --"
                        >
                            <option disabled>-- select --</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col md={6} sm={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3"><FaBirthdayCake /></InputGroup.Text>
                        <FormControl
                            onChange={(e) => setdob(e.target.value)}
                            type='date'
                            name="date"
                            placeholder="Date of Birth"
                            aria-label="ddob"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col md={6} sm={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3"><MdBatchPrediction /></InputGroup.Text>
                        <Form.Select
                            onChange={(e) => setbatch(e.target.value)}
                            defaultValue="-- select --"
                        >
                            <option disabled>-- select --</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col md={6} sm={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3"><FaBook /></InputGroup.Text>
                        <Form.Select
                            onChange={(e) => setyearofStudy(e.target.value)}
                            defaultValue="-- select --"
                        >
                            <option disabled>-- select --</option>
                            <option value="E3">E3</option>
                            <option value="E4">E4</option>
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col md={6} sm={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3"><MdPhone /></InputGroup.Text>
                        <FormControl
                            onChange={(e) => setcontactNum(e.target.value)}
                            type='text'
                            placeholder="Contact Number"
                            aria-label="number"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col sm={12}>
                    <InputGroup className="mb-3">
                        <FormControl
                            onChange={(e) => setaddress(e.target.value)}
                            as='textarea'
                            type='text'
                            placeholder="Address"
                            aria-label="Address"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col md={6} sm={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2"><MdPassword /></InputGroup.Text>
                        <FormControl
                            onChange={(e) => setpassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col md={6} sm={12}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon2"><MdPassword /></InputGroup.Text>
                        <FormControl
                            onChange={(e) => setconfirmPassword(e.target.value)}
                            type='password'
                            placeholder="Confirm password"
                            aria-label="Consirm password"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
            </Row>
            <br />
            {error === '' ? null : <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
            <Button style={{ maxWidth: '400px', width: '100%', backgroundColor: '#071a84' }} size="md" onClick={(e) => submit(e)}>Proceed</Button>
            <br />
            <p>Already had account? <Link style={{ color: '#071a84', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }} to="/login">SignIn</Link></p>
        </>
    );
}

export default withRouter(Home);