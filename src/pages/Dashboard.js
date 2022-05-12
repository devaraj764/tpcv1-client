import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Notifications from '../components/Notifications';
import Footer from '../components/Footer';

const Dashboard = (props) => {
    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            props.history.push('/login')
        }
    }, [props.history]);

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
                            <Notifications history={props.history}/>
                            :
                            props.location.pathname === '/dashboard/profile' ?
                                <Profile history={props.history} api={props.api}/> : "No page found"
                    }
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default withRouter(Dashboard);