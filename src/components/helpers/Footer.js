import React from 'react';

const Footer = () => {
    return (
        <footer>
            <p style={{ fontSize: '14px' }}>&copy; {new Date(Date.now()).getFullYear()} reserved by Computer Science Dept | TPC Technical Team</p>
        </footer>
    )
}

export default Footer