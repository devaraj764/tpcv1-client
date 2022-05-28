import React, { useState } from 'react'
import { FormControl, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios'

const Test = () => {
    const [Image, setImage] = useState(null);

    const handleUpload = async () => {
        var data = new FormData();
        console.log(data);
        data.append('image', Image);
        data.append('batch', '2017');
        const url = `http://localhost:80/students`
        await axios.patch(url, data, {
            headers: {
                "auth-token": localStorage.getItem('auth-token')
            }
        }).then((res) => {
            console.log(res)
            // window.location.reload()
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <Row>
            <Col>
                <FormControl
                    type="file"
                    accept='image/*'
                    onChange={(e) => { setImage(e.target.files[0]) }}
                    placeholder="Upload your image"
                />
            </Col>
            <Col>
                <Button onClick={handleUpload}>Upload</Button>
            </Col>
        </Row>
    )
}

export default Test