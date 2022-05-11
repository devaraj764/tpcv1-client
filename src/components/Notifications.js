import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { TiWarningOutline } from 'react-icons/ti';
import { VscInfo } from 'react-icons/vsc';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { HiOutlineClipboardList } from 'react-icons/hi'


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
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      props.history.push('/login')
    }
  }, []);


  const notifications = [
    { type: 'info' },
    { type: 'success' },
    { type: 'warning' },
    { type: 'test' }
  ];

  return (
    <div className="Notifications">
      <Row className="justify-content-md-center">
        <Col xs lg="8">
          {notifications.map((notifier, index) => (
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
                <span className="title">{notifier.type.toUpperCase()}</span>
                <span className="description">We have successfully created</span>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  )
}

export default Notifications