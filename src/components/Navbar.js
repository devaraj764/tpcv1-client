import React, { useEffect } from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { IoMdNotifications } from 'react-icons/io';
import { HiUserCircle } from 'react-icons/hi';
import { MdHome } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri'

const NavbarNav = () => {
    const [active, setActive] = React.useState('/dashboard');

    useEffect(() => {
        setActive(window.location.pathname);
    }, [])
    return (
        <>
            <Navbar expand='md' className="navbar" variant="light" fixed="top">
                <Container>
                    <Navbar.Brand className="title">Dashboard</Navbar.Brand>
                    <Navbar.Toggle style={{ border: 'none' }} aria-controls='offcanvasNavbar-expand-md'><RiMenu4Line size={28} /></Navbar.Toggle>
                    <Navbar.Offcanvas
                        id='offcanvasNavbar-expand-md'
                        aria-labelledby='offcanvasNavbarLabel-expand-md'
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link className={active === '/dashboard' ? "active" : null} href="/dashboard" ><MdHome size={18} />&nbsp;&nbsp;Home</Nav.Link>
                                <Nav.Link className={active === '/dashboard/notifications' ? "active" : null} href="/dashboard/notifications"><IoMdNotifications size={18} />&nbsp;&nbsp;Notifications</Nav.Link>
                                <Nav.Link className={active === '/dashboard/profile' ? "active" : null} href="/dashboard/profile" style={{ paddingRight: '0' }}><HiUserCircle size={18} />&nbsp;&nbsp;Profile</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarNav