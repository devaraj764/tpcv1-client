import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { BiLinkExternal } from 'react-icons/bi';

const Pagination = ({ data, pageLimit, dataLimit, selectMail, selectAll }) => {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div>
            {/* show the posts, 10 posts at a time */}
            <div className="dataContainer">
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
            </div>
            <div className="pagination">
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    prev
                </button>
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}
                <button
                    onClick={goToNextPage}
                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                >
                    next
                </button>
            </div>
        </div >
    );
}

export default Pagination;