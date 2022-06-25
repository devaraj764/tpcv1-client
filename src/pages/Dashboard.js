import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from '../components/helpers/Navbar';
import Profile from '../components/Profile';
import Home from '../components/Home';
import Notifications from '../components/Notifications';
import Footer from '../components/helpers/Footer';
import PageNotFound from '../pages/PageNotFound';
import axios from '../axios';
import { Helmet } from 'react-helmet'

const Dashboard = (props) => {
    const [username, setusername] = useState('');
    const [idNo, setidNo] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            props.history.push('/login')
        }
    }, [props.history]);

    useEffect(() => {
        const url = '/students/mydata'
        axios.get(url, {
            headers: {
                "auth-token": localStorage.getItem('auth-token'),
            }
        }).then((res) => {
            setusername(res.data.name)
            setidNo(res.data.idNo)
            setId(res.data._id)
        }).catch((err) => {
            if (!err.request.data) Logout();
        });
    }, []);

    const Logout = () => {
        localStorage.removeItem('auth-token')
    }

    return (
        <>
            <Helmet>
                <title>Student Dashboard | TPC</title>
            </Helmet>
            <div className="Dashboard">
                <Navbar />
                <Container>
                    <Switch>
                        <Route exact path='/dashboard' render={() => <Home username={username} id={id} idNo={idNo} />}></Route>
                        <Route exact path='/dashboard/notifications' render={() => <Notifications history={props.history} />}></Route>
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