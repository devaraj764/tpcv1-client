import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { BsFillTelephoneFill, BsEnvelopeFill } from 'react-icons/bs'

const ViewProfile = () => {
    return (
        <Container className="view-profile">
            <Row>
                <Col md={4} className="left-side">
                    <center>
                        <Image src={`https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80`} roundedCircle height="150px" width="150px" />
                    </center>
                    <div style={{ margin: '40px 0' }}>
                        <h4 style={{ textTransform: 'uppercase'}} className="title">About Me</h4>
                        <p style={{ color: '#cdc9c9', fontSize: '14px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit risus non convallis tempor. Morbi mollis, arcu non aliquet aliquam, augue tellus imperdiet dui, et finibus lacus metus id elit. Etiam vulputate nulla sed dolor consequat, non condimentum arcu mollis. Ut auctor neque sit amet elit tincidunt lacinia. Phasellus commodo sapien urna, vel rhoncus odio rutrum malesuada. Nulla interdum nisi eu bibendum molestie. Phasellus mollis auctor nisi sed ultricies. Sed ac erat auctor, pellentesque orci in, egestas est. Nulla aliquet eros at orci tincidunt gravida. Aenean egestas convallis neque id rhoncus.</p>
                    </div>
                    <hr />
                    <div style={{ margin: '40px 0' }}>
                        <h4 style={{ textTransform: 'uppercase'}} className="title">Websites & Social<br /> Lnks</h4>
                        <div className="links">
                            <p >Github :</p>
                            <a href="https://github.com/devarajedgroom" rel="noopener noreferrer" target="_blank">https://github.com/devarajedgroom</a>
                        </div>
                        <div className="links">
                            <p >LinkedIn :</p>
                            <a href="https://www.linkedin.com/in/deva-raju-maddu-a66055218/" rel="noopener noreferrer" target="_blank">https://www.linkedin.com/in/deva-raju-maddu-a66055218/</a>
                        </div>
                    </div>
                </Col>
                <Col md={8} className="right-side">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ color: '#cdc9c9', margin: '0' }}>MYSELF</p>
                            <h3 className="title">MADDU DEVARAJU</h3>
                        </div>
                        <div style={{ marginLeft: '20px', maxWidth: '300px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', marginBottom: '10px' }}>
                                <BsEnvelopeFill /> &nbsp; s170725@rguktsklm.ac.in
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                                <BsFillTelephoneFill /> &nbsp; +91 7013240218
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h5 className="title">Educational Details</h5>
                        <p className="description">I have done my schooling in </p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ViewProfile