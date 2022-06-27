import React, { useState, useEffect } from 'react';
import { Table, Form, Container, Image } from 'react-bootstrap';
import axios from '../../axios';
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'
import ListStudents from '../../assets/customer.png';

const StudentList = (props) => {

    const [students, setstudents] = useState([]);
    const [filteredStudents, setfilteredStudents] = useState([]);

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
                    <Form.Control style={{ maxWidth: '400px', margin: '20px 0' }} type="text" onChange={(e) => setsearchInput(e.target.value)} onKeyUp={searchStudents} placeholder="Search Students By ID" />
                    <Table variant="dark" striped hover>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Batch</th>
                                <th>Year of Study</th>
                                <th>Section</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{student.idNo}</td>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.contactNumber}</td>
                                    <td>{student.batch}</td>
                                    <td>{student.yearofStudy}</td>
                                    <td>{student.section}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    )
}

export default withRouter(StudentList)