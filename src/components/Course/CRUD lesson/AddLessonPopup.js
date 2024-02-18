import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { SiAddthis } from "react-icons/si";
import { useParams } from 'react-router-dom';
import { IoMdClose, IoMdAdd } from "react-icons/io";
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import '../../Popup/MoreInfo.css';

export default function AddLessonPopup({ fetchLessons }) {
    const [show, setShow] = useState(false);
    const { courseUrl } = useParams();
    const [loading, setLoading] = useState(false);
    const loginToken = localStorage.getItem('token');
    const [lessonData, setLessonData] = useState({
        title: '',
        content: '',
        course: parseInt(courseUrl),
        expected_output: '',
        lesson_nr: 2
    });

    const handleClose = () => {
        setShow(false)
        setLoading(false)
    };
    const handleShow = () => {
        setShow(true)
    };

    const handleSave = async () => {
        setLoading(true);
        setLessonData({ ...lessonData, lesson_nr: 1, course: parseInt(courseUrl) })
        console.log(lessonData)
        try {
            const response = await axios.post('http://34.136.176.140:8000/api/lessons/', lessonData,{headers: { "Authorization" : `Bearer ${loginToken}`}});
            console.log('Data sent successfully:', response.data);

        } catch (error) {
            console.error('Error sending data:', error);
        }

        setTimeout(() => {
            setLessonData({
                course: '',
                title: '',
                content: '',
                expected_output: ''
            })
            handleClose();
            fetchLessons();
        }, 2000);

    };

    return (
        <>
            <Link className='slabLink-addLesson' onClick={handleShow}>
                <SiAddthis size={40} className="add-lesson-btn"></SiAddthis>
            </Link>
            <Modal show={show} size='xl' onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create lesson</Modal.Title>
                </Modal.Header>
                {loading ? (
                    <div className="loading-container">
                        <AiOutlineLoading3Quarters className="loading-icon" />
                    </div>) : (
                    <>
                        <Modal.Body className='mx-auto'>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" value={lessonData.title} onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="content">
                                <Form.Label>Content of lesson</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter content" value={lessonData.content} onChange={(e) => setLessonData({ ...lessonData, content: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="expected_output">
                                <Form.Label>Expected output</Form.Label>
                                <Form.Control type="text" placeholder="Enter expected output" value={lessonData.expected_output} onChange={(e) => setLessonData({ ...lessonData, expected_output: e.target.value })} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="d-flex justify-content-between">
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                                <Button variant="primary" onClick={handleSave}>Save</Button>
                            </div>
                        </Modal.Footer>

                    </>
                )}
            </Modal>
        </>
    );
}
