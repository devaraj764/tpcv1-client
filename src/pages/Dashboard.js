import React, { useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
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
                    <Switch>
                        <Route exact path='/dashboard' render={() => <Home api={props.api} />}></Route>
                        <Route exact path='/dashboard/notifications' render={() => <Notifications history={props.history} />}></Route>
                        <Route path='/dashboard/profile' render={() => <Profile history={props.history} api={props.api} />}></Route>
                    </Switch>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default withRouter(Dashboard);