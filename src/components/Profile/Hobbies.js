import React, { useState, useEffect } from 'react';
import { Card, Row, Col, FormControl, InputGroup, Button, Badge } from 'react-bootstrap'
import { MdOutlineCancel } from 'react-icons/md'

const Hobbies = ({ edit, profileData, updatedProfile, setupdatedProfile, setDirty }) => {
    const [addNew, setAddNew] = useState(false);
    const [newHobbies, setnewHobbies] = useState([]);
    const [hobbie, sethobbie] = useState('');

    useEffect(() => {
        setnewHobbies(profileData.hobbies ? profileData.hobbies : [])
    }, [profileData]);

    const addHobbie = () => {
        setDirty();
        setnewHobbies([...newHobbies, hobbie]);
        setupdatedProfile({ ...updatedProfile, hobbies: [...newHobbies, hobbie] });
        setAddNew(false);
        sethobbie('');
    }

    const removeHobbie = (hobbie) => {
        setDirty();
        setnewHobbies(newHobbies.filter(h => h !== hobbie))
        setupdatedProfile({ ...updatedProfile, hobbies: newHobbies.filter(h => h !== hobbie) });
    }


    return (
        <div className="Hobbies">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                    <p className="heading">Hobbies</p>
                    <p className="message">Add your hobbies here</p>
                </div>
                {addNew ?
                    <Button variant="light" onClick={() => setAddNew(false)} style={{ minWidth: '100px' }} size='sm'>cancel</Button>
                    :
                    edit ?
                        <Button onClick={() => setAddNew(true)} style={{ minWidth: '100px', borderRadius: '10px' }} size='sm'>+ Hobbie</Button>
                        : null
                }
            </div>
            <Card body style={{ padding: '8px' }}>
                <Row style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {addNew ? null : newHobbies ? newHobbies.length === 0 ?
                        <p style={{ textAlign: 'center', width: '100%', color: 'gray' }}> No Hobbies Available!<br /> Try to add new Hobbies...</p>
                        :
                        newHobbies.map((hobbie, index) => {
                            return (
                                <Col key={index} sm={4} style={{ marginBottom: '10px' }}>
                                    <Badge style={{ padding: '10px 20px', fontSize: '14px', color: '#3c4852' }} bg="light" pill>
                                        {hobbie}&nbsp;
                                        {edit ? <MdOutlineCancel size={15} style={{ color: '#6b818b', float: 'right', marginLeft: '5px', cursor: 'pointer' }} onClick={() => removeHobbie(hobbie)} /> : null}
                                    </Badge>
                                </Col>
                            );
                        }) : null
                    }
                    {addNew ?
                        <Col lg={12}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    type="text"
                                    placeholder="Write your hobbie..."
                                    value={hobbie}
                                    onChange={(e) => { sethobbie(e.target.value); setDirty() }}
                                />
                                <Button variant="outline-secondary" style={{ minWidth: '100px' }} onClick={addHobbie}>Add</Button>
                            </InputGroup>
                        </Col>
                        : null}
                </Row>

            </Card>
        </div>
    )
}

export default Hobbies;