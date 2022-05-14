import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Badge } from 'react-bootstrap'
import { MdOutlineCancel } from 'react-icons/md'

const Hobbies = ({ edit, profileData, updatedProfile, setupdatedProfile }) => {
    const [addNew, setAddNew] = useState(false);
    const [newHobbies, setnewHobbies] = useState([]);
    const [hobbie, sethobbie] = useState('');

    useEffect(() => {
        setnewHobbies(profileData.hobbies ? profileData.hobbies : [])
    }, [profileData]);

    const addHobbie = () => {
        setnewHobbies([...newHobbies, hobbie]);
        setupdatedProfile({ ...updatedProfile, hobbies: [...newHobbies, hobbie] });
        setAddNew(false);
        sethobbie('');
    }

    const removeHobbie = (hobbie) => {
        setnewHobbies(newHobbies.filter(h => h !== hobbie))
        setupdatedProfile({ ...updatedProfile, hobbies: newHobbies.filter(h => h !== hobbie) });
    }


    return (
        <div className="Hobbies">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <p className="heading">Hobbies<br />
                    <span className="message">Add your hobbies here</span>
                </p>
                {addNew ?
                    <Button variant="light" onClick={() => setAddNew(false)} style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px' }} size='sm'>cancel</Button>
                    :
                    edit ?
                        <Button onClick={() => setAddNew(true)} style={{ backgroundColor: '#071a84', fontSize: '14px !important', minWidth: '100px', borderRadius: '25px' }} size='sm'>+ Hobbie</Button>
                        : null
                }
            </div>
            <Card body style={{ padding: '8px' }}>
                <Row>
                    {addNew ? null : newHobbies?.length === 0 ?
                        <p style={{ textAlign: 'center', width: '100%', color: 'gray' }}> No Links Available!<br /> Try to add new links...</p>
                        :
                        newHobbies.map((hobbie, index) => {
                            return (
                                <Col key={index} xl={12} style={{ margin: '5px' }}>
                                    <Badge style={{ padding: '15px', fontSize: '14px', color: 'black' }} bg="light" pill>
                                        {hobbie}&nbsp;
                                        {edit ? <MdOutlineCancel size={16} style={{ color: 'tomato', float: 'right', cursor: 'pointer' }} onClick={() => removeHobbie(hobbie)} /> : null}
                                    </Badge>
                                </Col>
                            );
                        })
                    }
                    {addNew ?
                        <Col lg={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Write your hobbie..."
                                    value={hobbie}
                                    onChange={(e) => sethobbie(e.target.value)}
                                />

                                <Button style={{ backgroundColor: '#071a84', fontSize: '14px !important', minWidth: '100px' }} onClick={addHobbie}>Add</Button>
                            </div>
                        </Col>
                        : null}
                </Row>

            </Card>
        </div>
    )
}

export default Hobbies;