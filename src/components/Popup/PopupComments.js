import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom'
import {Card, Button} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { popupActions } from '../../store/showPopUp-slice';
import { BsFillStarFill, BsStar } from "react-icons/bs";

export default function PopupComments(props) {
  const { title, description, url, author, numberOfRating } = props.article;
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
    <p>
        {numberOfRating < 40 ? <div className='rate'><BsFillStarFill/><BsFillStarFill/><BsStar/><BsStar/><BsStar/><span class="rating">( {numberOfRating} )</span></div> :
        numberOfRating > 40 && numberOfRating <= 80 ? <div className='rate'><BsFillStarFill/><BsFillStarFill/><BsFillStarFill/><BsStar/><BsStar/><span class="rating">( {numberOfRating} )</span></div> :
        numberOfRating > 80 ? <div className='rate'><BsFillStarFill/><BsFillStarFill/><BsFillStarFill/><BsFillStarFill/><BsFillStarFill/><span class="rating">( {numberOfRating} )</span></div> : null}
    </p>
    </Link>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>COMMENTS: </Modal.Title>
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
