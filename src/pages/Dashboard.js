import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Notifications from '../components/Notifications';
import Footer from '../components/Footer';

const Dashboard = (props) => {
    return (
        <>
        <div className="Dashboard">
            <Navbar />
            <Container>
                {props.location.pathname === '/dashboard'
                    ?
                    <Home />
                    :
                    props.location.pathname === '/dashboard/notifications' ?
                        <Notifications />
                        :
                        props.location.pathname === '/dashboard/profile' ?
                            <Profile /> : "No page found"
                }
            </Container>
        </div>
        <Footer/>
        </>
    );
};

export default withRouter(Dashboard);