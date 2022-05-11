import React from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { IoMdNotifications } from 'react-icons/io';
import { HiUserCircle } from 'react-icons/hi';
import { MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';

const NavbarNav = () => {
    return (
        <>
            <Navbar expand='md' className="navbar" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand className="title">Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls='offcanvasNavbar-expand-md' />
                    <Navbar.Offcanvas
                        id='offcanvasNavbar-expand-md'
                        aria-labelledby='offcanvasNavbarLabel-expand-md'
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/dashboard"><MdHome size={18} />&nbsp;&nbsp;Home</Nav.Link>
                                <Nav.Link as={Link} to="/dashboard/notifications"><IoMdNotifications size={18}/>&nbsp;&nbsp;Notifications</Nav.Link>
                                <Nav.Link as={Link} to="/dashboard/profile" style={{paddingRight:'0'}}><HiUserCircle size={18}/>&nbsp;&nbsp;Profile</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarNav