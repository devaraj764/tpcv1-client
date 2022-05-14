import React, { useState, useEffect } from 'react';
import { Row, Card, Accordion, Form, Col, Button, Badge } from 'react-bootstrap';

const Skills = ({ edit, profileData, updatedProfile, setupdatedProfie }) => {
    const [addNew, setaddNew] = useState(false);
    const [hardSkills, sethardSkills] = useState([]);
    const [softSkills, setsoftSkills] = useState([]);
    const [newskill, setnewskill] = useState({
        name: '',
        level: 'beginner'
    });
    const [newTech, setnewTech] = useState({
        name: '',
        level: 'beginner',
        tools: ""
    });
    const [newSubject, setnewSubject] = useState({
        name: '',
        description: '',
    });
    const [newLanguage, setnewLanguage] = useState({
        name: '',
        level: 'beginner',
    });

    useEffect(() => {
        sethardSkills(profileData.hardSkills ? profileData.hardSkills : []);
        setsoftSkills(profileData.softSkills ? profileData.softSkills : []);
    }, [profileData]);

    const addHardSkill = (title) => {
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
            setaddNew(false)
        }
        if (title === 'Subjects') {
            let newhardSkills = hardSkills;
            newhardSkills[2] = {
                "title": "Subjects",
                "data": [
                    ...newhardSkills[2].data,
                    newSubject
                ]
            }
            sethardSkills(newhardSkills);
            setupdatedProfie({ ...updatedProfile, hardSkills: newhardSkills });
            setaddNew(false)
        }
    }

    const changeSkillLevel = (level, name, title) => {
        if (title === 'Programming Languages') {
            let newhardSkills = hardSkills;
            const index = newhardSkills[0].data.findIndex(x => x.name === name);
            newhardSkills[0].data[index] = {
                "name": name,
                "level": level
            }
            sethardSkills(newhardSkills);
            setupdatedProfie({ ...updatedProfile, hardSkills: newhardSkills });
        }
        if (title === 'Technologies') {
            let newhardSkills = hardSkills;
            const index = newhardSkills[1].data.findIndex(x => x.name === name);
            newhardSkills[1].data[index] = {
                ...newhardSkills[1].data[index],
                "level": level
            }
            sethardSkills(newhardSkills);
            setupdatedProfie({ ...updatedProfile, hardSkills: newhardSkills });
        }
    }

    const changeTools = (tools, name) => {
        let newhardSkills = hardSkills;
        const index = newhardSkills[1].data.findIndex(x => x.name === name);
        newhardSkills[1].data[index] = {
            ...newhardSkills[1].data[index],
            "tools": tools
        }
        sethardSkills(newhardSkills);
        setupdatedProfie({ ...updatedProfile, hardSkills: newhardSkills });
    }

    const changeDescription = (description, name) => {
        let newhardSkills = hardSkills;
        const index = newhardSkills[2].data.findIndex(x => x.name === name);
        newhardSkills[2].data[index] = {
            ...newhardSkills[2].data[index],
            "description": description
        }
        sethardSkills(newhardSkills);
        setupdatedProfie({ ...updatedProfile, hardSkills: newhardSkills });
    }

    const addSoftSkill = (title) => {
        if (title === 'Language Proficiency') {
            let newsoftSkills = softSkills;
            newsoftSkills[0] = {
                "title": "Language Proficiency",
                "data": [
                    ...newsoftSkills[0].data,
                    newLanguage
                ]
            }
            setsoftSkills(newsoftSkills);
            console.log(newsoftSkills);
            setupdatedProfie({ ...updatedProfile, softSkills: newsoftSkills });
            setaddNew(false)
        }
    }

    const changeLanguageLevel = (level, name) => {
        let newsoftSkills = softSkills;
        const index = newsoftSkills[0].data.findIndex(x => x.name === name);
        newsoftSkills[0].data[index] = {
            "name": name,
            "level": level
        }
        setsoftSkills(newsoftSkills);
        setupdatedProfie({ ...updatedProfile, softSkills: newsoftSkills });
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
                                        return (<>
                                            <div key={index}>
                                                <div className="skill">
                                                    <p>{item.name}</p>
                                                    <div>
                                                        {item.description !== undefined ? <Form.Control defaultValue={item.description} placeholder="Describe topics you know" onChange={(e) => changeDescription(e.target.value, item.name)} type='text' className='skillVal' style={{ maxWidth: '300px' }} size='sm' aria-label="Default select example" disabled={!edit} /> :
                                                            <Form.Select onChange={(e) => changeSkillLevel(e.target.value, item.name, skill.title)} className="skillVal" size='sm' value={item.level} aria-label="Default select example" disabled={!edit}>
                                                                <option value="Basic">Beginner</option>
                                                                <option value="Moderate">Moderate</option>
                                                                <option value="Advanced">Advanced</option>
                                                            </Form.Select>}
                                                    </div>
                                                </div>
                                                {item.tools !== undefined ? <Form.Control
                                                    size={'sm'}
                                                    type='text'
                                                    onChange={(e) => changeTools(e.target.value, item.name)}
                                                    defaultValue={item.tools === undefined || item.tools === '' ? '' : item.tools}
                                                    placeholder="Frameworks you are specialized in.."
                                                    style={{ marginBottom: '30px' }}
                                                    disabled={!edit}
                                                /> : null}
                                            </div>
                                        </>)
                                    })}
                                    {edit ? addNew ? <Button variant="light" onClick={() => setaddNew(false)} style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px', marginBottom: '20px' }} size='sm'>cancel</Button> : <Button style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px', marginBottom: '20px' }} size='sm' onClick={() => setaddNew(true)}>+ Add</Button> : null}
                                    {addNew ? <Col lg={12}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <Form.Control
                                                onChange={(e) => skill.title === 'Programming Languages' ? setnewskill({ ...newskill, name: e.target.value }) : skill.title === 'Subjects' ? setnewSubject({ ...newSubject, name: e.target.value }) : setnewTech({ ...newTech, name: e.target.value })}
                                                value={skill.title === 'Programming Languages' ? newskill.name : skill.title === 'Subjects' ? newSubject.name : newTech.name}
                                                type="text"
                                                placeholder={skill.title === 'Programming Languages' ? 'Language' : skill.title === 'Subjects' ? 'Subject' : 'technology'}
                                            />
                                            {skill.title === 'Technologies' ? <Form.Control
                                                onChange={(e) => setnewTech({ ...newTech, tools: e.target.value })}
                                                value={newTech.tools}
                                                type="text"
                                                placeholder='specialization'
                                            /> : null}
                                            {skill.title === 'Subjects' ? <Form.Control value={newSubject.description} type='text' placeholder='Describe topics you know' onChange={(e) => setnewSubject({ ...newSubject, description: e.target.value })} /> : <Form.Select value={newskill.level} onChange={(e) => setnewskill({ ...newskill, level: e.target.value })} aria-label="Default select example">
                                                <option value="Basic">Beginner</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="Advanced">Advanced</option>
                                            </Form.Select>}
                                            <Button style={{ backgroundColor: '#071a84', fontSize: '14px !important', minWidth: '100px' }} onClick={() => addHardSkill(skill.title)}>Add</Button>
                                        </div>
                                    </Col> : null}
                                </Accordion.Body>
                            </Accordion.Item>
                        })}
                    </Accordion>
                </Row>
            </Card>

            {/* Soft Skills  */}
            <Card body style={{ padding: '10px', marginTop: '5px' }}>
                <p className="sub-heading">Soft Skills</p>
                <Row>
                    <Accordion>
                        {softSkills?.map((skill, index) => {
                            return skill.title === 'Language Proficiency' ? <Accordion.Item eventKey={index} key={index}>
                                <Accordion.Header>{skill.title}</Accordion.Header>
                                <Accordion.Body>
                                    {skill?.data?.map((item, index) => {
                                        return <div className="skill" key={index}>
                                            <p>{item.name}</p>
                                            <Form.Select className="skillVal" size='sm' onChange={(e) => changeLanguageLevel(e.target.value, item.name)} value={item.level} aria-label="Default select example" disabled={!edit}>
                                                <option value="Basic">Beginner</option>
                                                <option value="Medium">Moderate</option>
                                                <option value="Advanced">Advanced</option>
                                            </Form.Select>
                                        </div>
                                    })}
                                    {edit ? addNew ? <Button variant="light" onClick={() => setaddNew(false)} style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px', marginBottom: '20px' }} size='sm'>cancel</Button> : <Button variant="primary" size='sm' style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px', marginBottom: '20px' }} onClick={() => setaddNew(true)}>+ Add</Button> : null}
                                    {addNew ? <Col lg={12}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <Form.Control
                                                onChange={(e) => setnewLanguage({ ...newLanguage, name: e.target.value })}
                                                value={newLanguage.name}
                                                type="text"
                                                placeholder='Language'
                                            />
                                            <Form.Select value={newskill.level} onChange={(e) => setnewLanguage({ ...newLanguage, level: e.target.value })} aria-label="Default select example">
                                                <option value="Basic">Beginner</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="Advanced">Advanced</option>
                                            </Form.Select>
                                            <Button style={{ backgroundColor: '#071a84', fontSize: '14px !important', minWidth: '100px' }} onClick={() => addSoftSkill(skill.title)}>Add</Button>
                                        </div>
                                    </Col> : null}
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