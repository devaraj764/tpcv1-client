import React, { useState, useEffect } from 'react';
import { Row, Card, Accordion, Form, Badge, Col, Button } from 'react-bootstrap';

const Skills = ({ edit, profileData, updatedProfile, setupdatedProfie }) => {
    const [addNew, setaddNew] = useState(false);
    const [hardSkills, sethardSkills] = useState([]);
    const [newskill, setnewskill] = useState({
        name: '',
        level: 'beginner'
    });
    const [newTech, setnewTech] = useState({
        name: '',
        level: 'beginner',
        tools: ""
    });

    useEffect(() => {
        sethardSkills(profileData.hardSkills ? profileData.hardSkills : []);
    }, [profileData]);

    const addSkill = (title) => {
        if (title === 'Programming Languages') {
            let newhardSkills = hardSkills;
            newhardSkills[0] = {
                "title": "Programming Languages",
                "data": [
                    ...newhardSkills[0].data,
                    newskill
                ]
            }
            sethardSkills(newhardSkills);
            setupdatedProfie({ ...updatedProfile, hardSkills: newhardSkills });
            setaddNew(false)
        }
        if (title === 'Technologies') {
            let newhardSkills = hardSkills;
            newhardSkills[1] = {
                "title": "Technologies",
                "data": [
                    ...newhardSkills[1].data,
                    newTech
                ]
            }
            sethardSkills(newhardSkills);
            setupdatedProfie({ ...updatedProfile, hardSkills: newhardSkills });
            console.log(updatedProfile)
        }
    }

    const changeSkillLevel = (level, name, title) => {
        if (title === 'Programming Languages') {
            console.log(level);
            let newhardSkills = hardSkills;
            const index = newhardSkills[0].data.findIndex(x => x.name === name);
            newhardSkills[0].data[index] = {
                "name": name,
                "level": level
            }
            sethardSkills(newhardSkills);
            setupdatedProfie({ ...updatedProfile, hardSkills: newhardSkills });
            console.log(updatedProfile)
            setaddNew(false)
        }
        if (title === 'Technologies') {
            console.log(level);
            let newhardSkills = hardSkills;
            const index = newhardSkills[1].data.findIndex(x => x.name === name);
            newhardSkills[1].data[index] = {
                "name": name,
                "level": level
            }
            sethardSkills(newhardSkills);
            setupdatedProfie({ ...updatedProfile, hardSkills: newhardSkills });
            console.log(updatedProfile)
            setaddNew(false)
        }
    }

    return (
        <div className="Skills">
            <p className="heading">Skills<br />
                <span className="message">Rate your skills according to your capability</span>
            </p>
            {/* Hard Skills  */}
            <Card body style={{ padding: '10px' }}>
                <p className="sub-heading">Hard Skills</p>
                <Row>
                    <Accordion>
                        {hardSkills?.map((skill, index) => {
                            return <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{skill.title}</Accordion.Header>
                                <Accordion.Body>
                                    {skill?.data?.map((item, index) => {
                                        return <><div className="skill" key={index}>
                                            <p>{item.name}</p>
                                            {item.description !== undefined ? <span>{item.description}</span> : <Form.Select onChange={(e) => changeSkillLevel(e.target.value, item.name, skill.title)} className="skillVal" size='sm' value={item.level} aria-label="Default select example" disabled={!edit}>
                                                <option value="Basic">Beginner</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="Advanced">Advanced</option>
                                            </Form.Select>}
                                        </div>
                                            {item.tools !== undefined ? item.tools === '' ? null : <div style={{ display: 'block', alignItems: 'center', textAlign: 'center' }}>Specialized in {item.tools}</div> : null}
                                        </>
                                    })}
                                    {edit ? addNew ? <Button variant="light" onClick={() => setaddNew(false)} style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px', marginBottom: '20px' }} size='sm'>cancel</Button> : <Badge pill style={{ width: '80px', padding: '6px', fontSize: '14px', cursor: 'pointer' }} onClick={() => setaddNew(true)}>+ Add</Badge> : null}
                                    {addNew ? <Col lg={12}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <Form.Control
                                                onChange={(e) => skill.title === 'Programming Languages' ? setnewskill({ ...newskill, name: e.target.value }) : setnewTech({ ...newTech, name: e.target.value })}
                                                value={skill.title === 'Programming Languages' ? newskill.name : newTech.name}
                                                type="text"
                                                placeholder={skill.title === 'Programming Languages' ? 'Language' : 'technology'}
                                            />
                                            {skill.title === 'Technologies' ? <Form.Control
                                                onChange={(e) => setnewTech({ ...newTech, tools: e.target.value })}
                                                value={newTech.tools}
                                                type="text"
                                                placeholder='specialization'
                                            /> : null}
                                            <Form.Select value={newskill.level} onChange={(e) => setnewskill({ ...newskill, level: e.target.value })} aria-label="Default select example">
                                                <option value="Basic">Beginner</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="Advanced">Advanced</option>
                                            </Form.Select>
                                            <Button style={{ backgroundColor: '#071a84', fontSize: '14px !important', minWidth: '100px' }} onClick={() => addSkill(skill.title)}>Add</Button>
                                        </div>
                                    </Col> : null}
                                </Accordion.Body>
                            </Accordion.Item>
                        })}
                    </Accordion>
                </Row>
            </Card>

            {/* Soft Skills  */}
            <Card body style={{ padding: '10px' }}>
                <p className="sub-heading">Soft Skills</p>
                <Row>
                    <Accordion>
                        {profileData?.softSkills?.map((skill, index) => {
                            return skill.title === 'Language Proficiency' ? <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{skill.title}</Accordion.Header>
                                <Accordion.Body>
                                    {skill?.data?.map((item, index) => {
                                        return <div className="skill" key={index}>
                                            <p>{item.name}</p>
                                            <Form.Select className="skillVal" size='sm' value={item.level} aria-label="Default select example" disabled={!edit}>
                                                <option value="Basic">Beginner</option>
                                                <option value="Medium">Moderate</option>
                                                <option value="Advanced">Advanced</option>
                                            </Form.Select>
                                        </div>
                                    })}
                                </Accordion.Body>
                            </Accordion.Item> : null
                        })}
                    </Accordion>
                </Row>
            </Card>
        </div>
    )
}

export default Skills;