import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './MoreInfo.css';
// ... (imports)

export default function PopupCourse(props) {
  const { title, description, url, author } = props.article;
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { courseUrl } = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 console.log("test" + courseUrl)
  const handleStartCourse = () => {
    navigate(`/Courses/${url}`, { state: { title, description, author, url } });
  };


  return (
    <>
      <Button variant="outline-primary" className='button' onClick={handleShow}>
        <span>Check course </span>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>
          <h5>Author: {author}</h5>
          <Button variant="primary" size="lg" onClick={handleStartCourse}>
            Start course!
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
