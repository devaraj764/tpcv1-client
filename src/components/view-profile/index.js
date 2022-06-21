import React, { useEffect, useState } from 'react'
import { Row, Col, Image, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
// import { BsFillTelephoneFill, BsEnvelopeFill } from 'react-icons/bs'

const ViewProfile = (props) => {
    const [profile, setProfile] = useState(null);
    const [err, setErr] = useState(false);
    useEffect(() => {
        const url = props.api + '/students/view-profile/' + props.match.params.id
        axios.get(url, {
            headers: {
                "auth-token": localStorage.getItem('auth-token')
            }
        }).then((res) => {
            setProfile(res.data)
            console.log(res.data)

        }).catch((err) => {
            console.log(err)
            setErr(err.message)
        });
    }, []);


    return (
        !err ?
            !profile ?
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}><Spinner animation="border" size='sm' /> &nbsp; Loading Data...</div>
                :
                <Row className="view-profile justify-content-md-center">
                    <Col md={7}>
                        <div className="header">
                            <div className="header-left">
                                <p className="user-name">{profile.name}</p>
                                <p>{profile.email}</p>
                                <p>+91 {profile.contactNumber}</p>
                            </div>
                            <div className="header-right">
                                <Image src={profile.imageUrl ? `${props.api}${profile.imageUrl}` : `${props.api}/uploads/default.svg`} alt="profile-image" height="100px" style={{ borderRadius: '10px' }} />
                            </div>
                        </div>
                        <hr />
                        <main>
                            {/* About Me */}
                            <Row className="section">
                                <Col md={4} sm={12}>
                                    <p className="heading">About Me</p>
                                </Col>
                                <Col md={8} sm={12}>
                                    <div className="description">
                                        {profile.bio ? <p>`${profile.bio}`</p> : <p>No bio is described...</p>}
                                        <p className="sub-heading" style={{ marginTop: '20px' }}>Hobbies</p>
                                        {profile.hobbies.length === 0 ? <p>Not Updated</p> :
                                            <p>{profile.hobbies.forEach((hobbie) => (`${hobbie}, `))}</p>
                                        }
                                    </div>
                                </Col>
                            </Row>
                            {/* Education */}
                            <Row className="section">
                                <Col md={4} sm={12}>
                                    <p className="heading">EDUCATION</p>
                                </Col>
                                <Col md={8} sm={12}>
                                    <div className="description">
                                        <p className="sub-heading">B.Tech, Computer Science & Engineering</p>
                                        {profile.graduation.name ?
                                            <>
                                                <p>{profile.graduation.name}</p>
                                                <p>2019 - 2023</p>
                                                <p>CGPA : 8.2</p>
                                            </>
                                            : <p>Not Updated</p>
                                        }
                                        <p className="sub-heading" style={{ marginTop: '20px' }}>Pre - University</p>
                                        {
                                            profile.graduation.name ?
                                                <>
                                                    <p>Rajiv Gandhi University Of Knowledge And Technology , Srikakulam</p>
                                                    <p>2017 - 2029</p>
                                                    <p>CGPA : 8.9</p>
                                                </>
                                                : <p>Not Updated</p>
                                        }
                                        <p className="sub-heading" style={{ marginTop: '20px' }}>Schooling</p>
                                        {
                                            profile.graduation.name ?
                                                <>
                                                    <p>Rajiv Gandhi University Of Knowledge And Technology , Srikakulam</p>
                                                    <p>CGPA : 10.0</p>
                                                </>
                                                : <p>Not Updated</p>
                                        }
                                    </div>
                                </Col>
                            </Row>
                            {/* HardSkills */}
                            <Row className="section">
                                <Col md={4} sm={12}>
                                    <p className="heading">Hard Skills</p>
                                </Col>
                                <Col md={8} sm={12}>
                                    <div className="description">
                                        {profile.hardSkills.length > 0 ?
                                            profile.hardSkills.map((skill, id) => {
                                                return (
                                                    <div key={id} style={{ marginBottom: '20px' }}>
                                                        <p className="sub-heading">{skill.title}</p>
                                                        {skill.data.length > 0 ?
                                                            skill.data.map((dataItem, id) => (
                                                                <p key={id}>{dataItem.name}
                                                                    {dataItem.level ? <> : <i>{dataItem.level}{dataItem.tools ? ` - ${dataItem.tools}` : null}</i></> : null}
                                                                    {dataItem.description ? <><br /> <span style={{ marginLeft: '10px' }}>{dataItem.description}</span></> : null}
                                                                </p>
                                                            )) : null
                                                        }
                                                    </div>
                                                )

                                            })
                                            : null
                                        }

                                    </div>
                                </Col>
                            </Row>
                            {/* SoftSkills */}
                            <Row className="section">
                                <Col md={4} sm={12}>
                                    <p className="heading">Soft Skills</p>
                                </Col>
                                <Col md={8} sm={12}>
                                    <div className="description">
                                        {profile.softSkills.length > 0 ?
                                            profile.softSkills.map((skill, id) => {
                                                if (skill.title === 'Language Proficiency') {
                                                    return (
                                                        <div key={id} style={{ marginBottom: '20px' }}>
                                                            <p className="sub-heading">{skill.title}</p>
                                                            {skill.data.length > 0 ?
                                                                skill.data.map((dataItem, id) => (
                                                                    <p key={id}>{dataItem.name}
                                                                        {dataItem.level ? <> : <i>{dataItem.level}</i></> : null}
                                                                    </p>
                                                                )) : null
                                                            }
                                                        </div>
                                                    )
                                                }
                                                return (
                                                    <div key={id} style={{ marginBottom: '20px' }}>
                                                        <p className="sub-heading">{skill.title} : <i style={{ fontSize: '14px', fontWeight: '500', color: '#6b818b' }}>{skill.level}</i></p>
                                                    </div>
                                                )

                                            })
                                            : null
                                        }

                                    </div>
                                </Col>
                            </Row>
                            {/* projects */}
                            <Row className="section">
                                <Col md={4} sm={12}>
                                    <p className="heading">Projects</p>
                                </Col>
                                <Col md={8} sm={12}>
                                    <div className="description">
                                        {profile.projects.length > 0 ? profile.projects.map((project) => (
                                            <div style={{ marginBottom: '20px' }} key={project.title}>
                                                <p className="sub-heading">{project.title}</p>
                                                <p>{project.description}</p>
                                                <p>Techinologies used : {project.technologies}</p>
                                                {project.link ? <a href={project.link}>Know more..</a> : null}
                                            </div>
                                        )) : <p>Not Updated</p>
                                        }
                                    </div>
                                </Col>
                            </Row>
                            {/* Intenships */}
                            <Row className="section">
                                <Col md={4} sm={12}>
                                    <p className="heading">Internships</p>
                                </Col>
                                <Col md={8} sm={12}>
                                    <div className="description">
                                        {profile.internships.length > 0 ? profile.internships.map((internship) => (
                                            <div style={{ marginBottom: '20px' }} key={internship.organization}>
                                                <p className="sub-heading">Role : {internship.role}</p>
                                                <p>Company : {internship.organization}</p>
                                                <p>Duration : {internship.duration} months</p>
                                                <p>Status : {internship.status}</p>
                                                <p>{internship.status === 'working' ? `Joined on ${internship.startDate}` : `${internship.startDate} - ${internship.endDate}`}</p>
                                                {profile.certificate ? <a href={profile.certificate}>View certificate</a> : null}
                                            </div>
                                        )) : <p>Not Updated</p>
                                        }
                                    </div>
                                </Col>
                            </Row>
                            {/* Certifications */}
                            <Row className="section">
                                <Col md={4} sm={12}>
                                    <p className="heading">Certifications</p>
                                </Col>
                                <Col md={8} sm={12}>
                                    <div className="description">
                                        {profile.certifications.length > 0 ? profile.certifications.map((item) => (
                                            <div style={{ marginBottom: '20px' }} key={item.title}>
                                                <p className="sub-heading">{item.title}</p>
                                                <p>Certiified by {item.organization}</p>
                                                <p>Status : {item.status}</p>
                                                <p>{item.status === 'working' ? `Joined on ${item.startDate}` : `${item.startDate} - ${item.endDate}`}</p>
                                                {item.link ? <a href={item.link}>View certificate</a> : null}
                                            </div>
                                        )) : <p>Not Updated</p>
                                        }
                                    </div>
                                </Col>
                            </Row>
                            {/* Achievements */}
                            <Row className="section">
                                <Col md={4} sm={12}>
                                    <p className="heading">Achievements</p>
                                </Col>
                                <Col md={8} sm={12}>
                                    <div className="description">
                                        {profile.achievements.length > 0 ? profile.achievements.map((project) => (
                                            <div style={{ marginBottom: '20px' }} key={project.title}>
                                                <p className="sub-heading">{project.title}</p>
                                                <p>{project.description}</p>
                                            </div>
                                        )) : <p>Not Updated</p>
                                        }
                                    </div>
                                </Col>
                            </Row>
                            {/* External Links */}
                            <Row className="section">
                                <Col md={4} sm={12}>
                                    <p className="heading">External Links & <br /> Work Samples</p>
                                </Col>
                                <Col md={8} sm={12}>
                                    <div className="description">
                                        {profile.links.length === 0 ? <p>Not Updated</p> :
                                            profile.links.map((link) => (

                                                <div key={link} style={{ marginBottom: '20px' }}>
                                                    <p className="sub-heading">
                                                        {link.includes('github') ?
                                                            'Github' :
                                                            link.includes('linkedin') ?
                                                                'LinkedIn' :
                                                                link.includes('hackerrank') ? 'HackerRank' : link.includes('leetcode') ? 'LeetCode' : link.includes('youtube') ? 'YouTube' : 'Link'}</p>
                                                    <a href={link}>{link}</a>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </main>
                    </Col>
                </Row>
            :
            <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>Error Loading data...</div>
    )
}

export default withRouter(ViewProfile)