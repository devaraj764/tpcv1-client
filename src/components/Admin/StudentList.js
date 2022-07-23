import React, { useState, useEffect } from 'react';
import { Table, Form, Container, Image, Button, Pagination } from 'react-bootstrap';
import axios from '../../axios';
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom';
import { BiLinkExternal } from 'react-icons/bi';
import ListStudents from '../../assets/customer.png';

const StudentList = (props) => {

    const [students, setstudents] = useState([]);
    const [filteredStudents, setfilteredStudents] = useState([]);
    const [emails, setemails] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('admin-token')) {
            props.history.push('/admin/login');
        } else {
            // fetch students
            const url = '/admin/getStudents';
            axios.post(url, {
                headers: {
                    "auth-token": localStorage.getItem('admin-token')
                }
            }).then((res) => {
                setstudents(res.data)
                setfilteredStudents(res.data)
            })
                .catch((err) => console.log(err))

        }
    }, []);

    const [searchInput, setsearchInput] = useState('');
    const searchStudents = () => {
        let filteredStudents = students.filter(student => student.idNo.toUpperCase().includes(searchInput.toUpperCase()));
        setfilteredStudents(filteredStudents);
    }

    const selectMail = (value, email) => {
        if (value === true) {
            setemails([...emails, email])
        } else {
            setemails(emails.filter(e => e !== email))
        }
    }

    const selectAll = (value) => {
        if (value === true) {
            let emails = []
            students.map(student => emails.push(student.email))
            setemails(emails)
            let checkbox = document.getElementsByName('checkbox')
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = true
            }
        } else {
            setemails([])
            let checkbox = document.getElementsByName('checkbox')
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = false
            }
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    let items = [];
    const pages = Math.round(filteredStudents.length / 10);
    for (let number = 1; number <= pages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage}>
                {number}
            </Pagination.Item>,
        );
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * 10 - 10;
        const endIndex = startIndex + 10;
        return filteredStudents.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / 5) * 5;
        return new Array(5).fill().map((_, idx) => start + idx + 1);
    };

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }


    return (
        <>
            <Helmet>
                <title>Students List | Admin</title>
            </Helmet>
            <Container className="Admin">
                <div style={{ display: 'flex', alignItems: 'center', margin: '50px 0' }}>
                    <div style={{ marginRight: '20px' }}>
                        <Image src={ListStudents} alt="notification image" fluid style={{ maxHeight: '50px' }} />
                    </div>
                    <div>
                        <p className="heading">Students List</p>
                        <p className="sub-heading">Admin can get the students lists and can apply filters.</p>
                    </div>
                </div>
                <div className="view-unavailable">Content cannot be viewed in this screen.</div>
                <div className="StudentList-Table">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Form.Control style={{ maxWidth: '400px', margin: '20px 0' }} type="text" onChange={(e) => setsearchInput(e.target.value)} onKeyUp={searchStudents} placeholder="Search Students By ID" />
                        {emails.length === 0 ? null : <Button style={{ float: 'right', height: '50px', marginTop: '20px' }} onClick={() => props.history.push('/admin/dashboard/send-mail', { emails: emails })}>Send Email</Button>}
                    </div>
                    <Table variant="dark" striped hover>
                        <thead>
                            <tr>
                                <th><input type='checkbox' style={{ width: '20px' }} onChange={(e) => selectAll(e.target.checked)} /></th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Batch</th>
                                <th>Year of Study</th>
                                <th>Section</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getPaginatedData().map((d, idx) => (
                                <tr key={idx}>
                                    <td><input type='checkbox' style={{ width: '20px' }} name="checkbox" onChange={(e) => selectMail(e.target.checked, d.email)} /></td>
                                    <td>{d.idNo}</td>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.contactNumber}</td>
                                    <td>{d.batch}</td>
                                    <td>{d.yearofStudy}</td>
                                    <td>{d.section}</td>
                                    <td><a style={{ textDecoration: 'none' }} target='_blank' rel='noreferrer noopener' href={`/view-profile/${d._id}`}>View profile <BiLinkExternal /></a></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table><br />
                    <Pagination>
                        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                        {getPaginationGroup().map((item, index) => (
                            <Pagination.Item key={index} active={item === currentPage} onClick={changePage}>
                                {item}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pages} />
                    </Pagination>
                </div>
            </Container>
        </>
    )
}

export default withRouter(StudentList)