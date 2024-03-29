import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import '../../Popup/MoreInfo.css';
import { FiEdit3 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

export default function DeleteCoursePopup({ fetchCourseData, courseToEdit, course }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hideDeleteModal, hideShowDeleteModal] = useState(true);
  const loginToken = localStorage.getItem('token');
  const [courseToDelete, setCourseToDelete] = useState(null);
  const handleShow = () => {
    console.log(course.id)
    setShowDeleteModal(true)
  };
  const handleHide = () =>{
    hideShowDeleteModal(false)
  }
const handleDeleteModalOpen = (id) => {

    setCourseToDelete(id);
    setShowDeleteModal(true);
  };
  const handleDeleteLesson = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/course/${courseToDelete}/`, {headers: { "Authorization" : `Bearer ${loginToken}`}}, );
      setShowDeleteModal(false);
      window.location.href = '/Courses';
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };
  return (
    <>
        <AiFillDelete size={40} className="delete-course-btn " onClick={() => handleDeleteModalOpen(course.id)}></AiFillDelete>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Usuń kurs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Czy jesteś pewny, żeby usunąć kurs?
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
