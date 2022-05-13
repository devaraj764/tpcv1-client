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
                        {profileData?.hardSkills?.map((skill, index) => {
                            return <Accordion.Item eventKey={index} key={index}>
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