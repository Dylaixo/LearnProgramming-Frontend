import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { SiAddthis } from "react-icons/si";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import '../../Popup/MoreInfo.css';

export default function DeleteLessonPopup({ fetchLessons, lesson }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const loginToken = localStorage.getItem('token');
  const handleDeleteModalOpen = (id) => {
    setLessonToDelete(id);
    setShowDeleteModal(true);
  };
  const handleDeleteLesson = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/lesson/${lessonToDelete}/`, { headers: { "Authorization": `Bearer ${loginToken}` } },);
      fetchLessons();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };
  return (
    <>
      <>
        <AiFillDelete size={25} onClick={() => handleDeleteModalOpen(lesson.id)} />
      </>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Usuń lekcje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Jesteś pewny, żeby usunąc lekcje ?
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Anuluj</Button>
            <Button variant="danger" onClick={handleDeleteLesson}>Usuń</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
