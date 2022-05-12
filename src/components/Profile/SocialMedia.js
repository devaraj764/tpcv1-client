import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { SiLeetcode } from 'react-icons/si'
import { BsLink } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaHackerrank, FaYoutube } from 'react-icons/fa';

const SocialMedia = ({ edit, profileData, updatedProfile, setupdatedProfile }) => {
    const [addNew, setAddNew] = useState(false)
    const [newLinks, setnewLinks] = useState([]);
    const [link, setlink] = useState('');

    useEffect(() => {
        setnewLinks(profileData.links ? profileData.links : [])
    }, [profileData]);

    const addLink = () => {
        setnewLinks([...newLinks, link]);
        setupdatedProfile({ ...updatedProfile, links: [...newLinks, link] });
        setAddNew(false);
        setlink('');
    }

    const removeLink = (link) => {
        setnewLinks(newLinks.filter(l => l !== link))
        setupdatedProfile({ ...updatedProfile, links: newLinks.filter(l => l !== link) });
    }

    return (
        <div className="SocialMedia">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <p className="heading">Externel Links<br />
                    <span className="message">Add your links here</span>
                </p>
                {addNew ?
                    <Button variant="light" onClick={() => setAddNew(false)} style={{ fontSize: '14px !important', minWidth: '100px', borderRadius: '25px' }} size='sm'>cancel</Button>
                    :
                    edit ?
                        <Button onClick={() => setAddNew(true)} style={{ backgroundColor: '#071a84', fontSize: '14px !important', minWidth: '100px', borderRadius: '25px' }} size='sm'>+ Add New</Button>
                        : null
                }
            </div>
            <Card body style={{ padding: '10px' }}>
                <Row>
                    {addNew ? null : newLinks?.length === 0 ?
                        <p style={{ textAlign: 'center', width: '100%', color: 'gray' }}> No Links Available!<br /> Try to add new links...</p>
                        :
                        newLinks.map((link, index) => {
                            return (
                                <Col key={index} md={6} sm={12}>
                                    <Card body className='linkField'>
                                        <i> {link.includes('github') ? <FaGithub size={20} /> : link.includes('linkedin') ? <FaLinkedin size={20} /> : link.includes('hackerrank') ? <FaHackerrank size={20} /> : link.includes('leetcode') ? <SiLeetcode size={20} /> : link.includes('youtube') ? <FaYoutube size={20} /> : <BsLink size={20} />}</i>
                                        <a href={link} target="_blank">{link}</a>
                                        {edit ? <MdOutlineCancel size={16} style={{ color: 'tomato', float: 'right', cursor: 'pointer' }} onClick={() => removeLink(link)} /> : null}
                                    </Card>
                                </Col>
                            );
                        })
                    }
                    {addNew ?
                        <Col lg={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <Form.Control
                                    onChange={(e) => setlink(e.target.value)}
                                    value={link}
                                    type="text"
                                    placeholder="Place your link here.."
                                />

                                <Button style={{ backgroundColor: '#071a84', fontSize: '14px !important', minWidth: '100px' }} onClick={() => addLink()}>Add</Button>
                            </div>
                        </Col>
                        : null
                    }
                </Row>
            </Card>
        </div>
    )
}

export default SocialMedia;