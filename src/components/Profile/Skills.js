import { Row, Card, Accordion, Form } from 'react-bootstrap';


const Skills = ({ edit, profileData, updatedProfile, setupdatedProfie }) => {
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
                        {profileData.hardSkills.map((skill, index) => {
                            return <Accordion.Item eventKey="0" key={index}>
                                <Accordion.Header>{skill.title}</Accordion.Header>
                                <Accordion.Body>
                                    {skill.data.map((item, index) => {
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
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Sub-Heading #1</Accordion.Header>
                            <Accordion.Body>
                                <div className="skill">
                                    <p>Skill #1</p>
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                                <div className="skill">
                                    <p>Skill #2</p>
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Sub-Heading #2</Accordion.Header>
                            <Accordion.Body>
                                <div className="skill">
                                    <p>Skill #1</p>
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                                <div className="skill">
                                    <p>Skill #2</p>
                                    <Form.Select className="skillVal" size='sm' value="NILL" aria-label="Default select example" disabled={!edit}>
                                        <option value="NILL">NILL</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Advanced">Advanced</option>
                                    </Form.Select>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </Card>
        </div>
    )
}

export default Skills;