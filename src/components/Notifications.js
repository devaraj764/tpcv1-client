import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { TiWarningOutline } from 'react-icons/ti';
import { VscInfo } from 'react-icons/vsc';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { HiOutlineClipboardList } from 'react-icons/hi';
import axios from 'axios';


const warning = {
  backgroundColor: '#F9FAB1',
  color: '#bebb04'
}

const info = {
  backgroundColor: '#D9F5FF',
  color: '#064075'
}

const success = {
  backgroundColor: '#DFFFD9',
  color: '#207A0C'
}

const test = {
  backgroundColor: '#ffebfe',
  color: '#FF00FF',
}

const Notifications = (props) => {

  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      props.history.push('/login')
    }
  }, [props.history]);

  useEffect(() => {
    const url = props.api + '/students/notifications'
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
            notifications.map((notifier, index) => (
              <div className="notifier" key={index}>
                <div className="notifier-typo" style={
                  notifier.type === 'warning' ?
                    warning :
                    notifier.type === 'info' ?
                      info :
                      notifier.type === 'success' ?
                        success
                        : notifier.type === 'test' ?
                          test : null
                }>
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

                </div>
                <div className="notifier-body">
                  <span className="title">{notifier.title.toUpperCase()}</span>
                  <span className="description">{notifier.description}</span>
                </div>
              </div>
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