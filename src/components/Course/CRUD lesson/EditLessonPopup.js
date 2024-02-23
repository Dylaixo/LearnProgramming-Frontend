import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { FiEdit3 } from "react-icons/fi";
import '../../Popup/MoreInfo.css';

export default function EditLessonPopup({ fetchLessons, lesson }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const loginToken = localStorage.getItem('token');
    const [editLessonData, setEditLessonData] = useState({
        id: '',
        title: '',
        content: ''
    });

    console.log(lesson)
    const handleEditLessonChange = (e) => {
        const { name, value } = e.target;
        setEditLessonData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditModalOpen = (lesson) => {
        setEditLessonData(lesson);
        setShowEditModal(true);
    };

    const handleSaveEditLesson = async () => {
        try {
            await axios.put(`http://34.136.176.140:8000/api/lesson/${editLessonData.id}/`, editLessonData, {headers: { "Authorization" : `Bearer ${loginToken}`}}, );
            fetchLessons();
            setShowEditModal(false);
        } catch (error) {
            console.error('Error saving lesson data:', error);
        }
    };

    return (
        <>
            <FiEdit3 className="edit-icon" size={25} onClick={() => handleEditModalOpen(lesson)} />
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body className='mx-auto'>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={editLessonData.title}
                                onChange={handleEditLessonChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="content"
                                value={editLessonData.content}
                                onChange={handleEditLessonChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="expected_output">
                            <Form.Label>Expected Output</Form.Label>
                            <Form.Control
                                type="text"
                                name="expected_output"
                                value={editLessonData.expected_output}
                                onChange={handleEditLessonChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSaveEditLesson}>Save</Button>
                </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}