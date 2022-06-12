import React, { useState } from 'react';
import { Nav, Row,Col } from 'react-bootstrap'

const Admin = () => {
    const [tab, setTab] = useState(0);
    return (
        <div className='admin container' style={{marginTop:'100px'}}>
            <Row>
                <Col xs="12" lg="8">
                    <Nav>
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
                    {
                        tab === 0 ?
                            <div>Notifications</div>
                            : tab === 1 ?
                                <div>users</div>
                                : <div>Feedback</div>
                    }
                </Col>
            </Row>
        </div >
    );
};

export default Admin;