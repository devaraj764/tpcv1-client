import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { TiWarningOutline } from 'react-icons/ti';
import { VscInfo } from 'react-icons/vsc';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { HiOutlineClipboardList } from 'react-icons/hi';
import axios from '../axios';

const Notifications = (props) => {

  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      props.history.push('/login')
    }
  }, [props.history]);

  useEffect(() => {
    const url = '/students/notifications'
    axios.get(url, {
      headers: {
        "auth-token": localStorage.getItem('auth-token')
      }
    }).then((res) => {
      setNotifications(res.data.message);
    }).catch((err) => {
      setNotifications('error')
    });
  }, [props.api]);

  return (
    <div className="Notifications">
      <Row className="justify-content-md-center">
        <Col xs lg="8">
          {notifications ? notifications === 'error' ?
            <p style={{ textAlign: 'center' }}>Error loading data</p>
            :
            notifications.length === 0 ? <p style={{ textAlign: 'center' }}>No current notifications</p> :
            notifications.map((notifier, index) => (
              <Row className="notifier" key={index}>
                <Col md={1} xs={2} className="notifier-typo">
                  {
                      notifier.type === 'warning' ?
                        <TiWarningOutline size={24} /> :
                        notifier.type === 'info' ?
                          <VscInfo size={24} /> :
                          notifier.type === 'success' ?
                            <IoMdCheckmarkCircleOutline size={24} />
                            : notifier.type === 'test' ?
                              <HiOutlineClipboardList size={24} /> : null

                    }

                </Col>
                <Col xs={10} md={11} className="notifier-body align-self-center">
                  <p className="title">{notifier.title.toUpperCase()}</p>
                  <p className="description">{notifier.description}</p>
                </Col>
              </Row>
            )) :
            <div style={{ minHeight: '20vh', textAlign: 'center' }}>
              <center style={{ marginTop: '80px' }}>
                <Spinner size='xl' animation='grow' /><br /><br />
                Retrieving data...
              </center>
            </div>
          }
        </Col>
      </Row>
    </div>
  )
}

export default Notifications