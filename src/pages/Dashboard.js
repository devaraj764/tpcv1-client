import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Notifications from '../components/Notifications';
import Footer from '../components/Footer';
import PageNotFound from '../pages/PageNotFound';
import axios from 'axios';

const Dashboard = (props) => {
    const [username, setusername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            props.history.push('/login')
        }
    }, [props.history]);

    useEffect(() => {
        const url = props.api + 'students/mydata'
        axios.get(url, {
            headers: {
                "auth-token": localStorage.getItem('auth-token')
            }
        }).then((res) => {
            setusername(res.data.name)
        }).catch((err) => {
            if (!err.request.data) Logout();
        });
    }, [props.api]);

    const Logout = () => {
        localStorage.removeItem('auth-token')
    }

    return (
        <>
            <div className="Dashboard">
                <Navbar />
                <Container>
                    <Switch>
                        <Route exact path='/dashboard' render={() => <Home username={username}/>}></Route>
                        <Route exact path='/dashboard/notifications' render={() => <Notifications api={props.api} history={props.history} />}></Route>
                        <Route exact path='/dashboard/profile' render={() => <Profile history={props.history} api={props.api} />}></Route>
                        <Route path="*" render={() => <PageNotFound />} />
                    </Switch>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default withRouter(Dashboard);