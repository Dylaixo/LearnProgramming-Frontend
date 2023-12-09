import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom'
import {Card, Button} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { popupActions } from '../../store/showPopUp-slice';

export default function PopupCourse(props) {
  const { title, description, url, author } = props.article;
//    const show = useSelector(state => state.popup.show);
//    const dispatch = useDispatch();

//    const handleClose = () => {
//      dispatch(popupActions.unsetShow());
//    };

//    const handleShow = () => {
//      dispatch(popupActions.setShow());
//    };
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
console.log(show)
  return (
    <>
    <Link className='slabLink' onClick={handleShow}>
      <Button variant="outline-primary" className='more'>
        More information ...
      </Button>
    </Link>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <p>{description}</p>
        <h5>Author: {author}</h5>
        <a href={url} target="_blank" rel="noopener noreferrer">
        <Button variant="primary" size="lg">
          Start course!
        </Button>
        </a>
      </Modal.Body>
    </Modal>
  </>
  );
}
