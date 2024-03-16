import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './MoreInfo.css';
import { BiCommentAdd } from "react-icons/bi";
import { RiUserSearchLine, RiUserUnfollowLine } from "react-icons/ri";
import axios from 'axios'; // Importowanie Axios
import Rating from '../Rating/Rating';
import { GiConsoleController } from 'react-icons/gi';

export default function PopupCourse({ article, courseId, fetchCourses }) {
  // const { id, title, description, url, author, urlToImage, owner } = props.article;
  const [show, setShow] = useState(false);
  const [ownerData, setOwnerData] = useState([]);
  const [comment, setComment] = useState('');
  const [showUserNameMap, setShowUserNameMap] = useState({});
  const [opinions, setOpinions] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUserName, setShowUserName] = useState(false)
  const [whoAmI, setWhoAmI] = useState('')
  const [commentFormVisible, setCommentFormVisible] = useState(false);
  const [userData, setUserData] = useState(""); // Id użytkownika, który jest aktualnie zalogowany
  const loginToken = localStorage.getItem('token');
  const handleStartCourse = () => {

    navigate(`/Courses/${courseId}`);
  };
  // const whoAmI = {
  //   id: 4,
  //   username: 'user1',
  //   email: 'example@email.com',
  //   bio: "user bio"
  // };
  const fetchData = async () => {
    try {
      // Wysyłanie żądania GET do serwera
      const response = await axios.get(`http://localhost:8000/api/course/${article.id}/`, {headers: { "Authorization" : `Bearer ${loginToken}`}});

      // Pobieranie danych z odpowiedzi
      setOpinions(response.data);
    } catch (error) {
      // Obsługa błędów
      console.error('Error fetching courses data:', error);
    }
  };
  useEffect(() => {
    fetchData();

  }, []);


  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${article.owner}/`, {headers: { "Authorization" : `Bearer ${loginToken}`}});
        setOwnerData(response.data);
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    };
    fetchOwner();

  }, []);

  useEffect(() => {
    const fetchWhoAmI = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/whoami/`, { headers: { "Authorization": `Bearer ${loginToken}` } });
            setWhoAmI(response.data);
        } catch (error) {
            console.error('Error fetching logged data:', error);
        }
    };
    fetchWhoAmI();
}, [loginToken]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const bodyParameters = {
      course: courseId,
        user: whoAmI.id,
        text: comment,
        rating: rating
   };

    console.log(bodyParameters)
    try {
      const response = await axios.post('http://localhost:8000/api/opinions/', bodyParameters, {headers: { "Authorization" : `Bearer ${loginToken}`}} ,).then(function (res) {
        setComment('');
        setRating(0);
        handleClose();
        fetchCourses();
        fetchData();
      })

    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowUserName = (index) => {

    setShowUserNameMap(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleShowUser = async (userId, index) => {
    setShowUserNameMap(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));

    try {
      const response = await axios.get(`http://localhost:8000/api/user/${userId}/`, {headers: { "Authorization" : `Bearer ${loginToken}`}});
      const updatedRatings = [...opinions.ratings];
      updatedRatings[index].userData = response.data;
      setOpinions({ ...opinions, ratings: updatedRatings });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleToggleCommentForm = () => {
    setCommentFormVisible(!commentFormVisible);
  };
  return (
    <>
      <Button variant="outline-primary" className='button' onClick={handleShow}>
        <span>Więcej ... </span>
      </Button>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>{article.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='course-details mx-auto'>
          <p>{article.description}</p>
          <Button className='add-button course-detail' variant="primary" size="lg" onClick={handleStartCourse}>
            Wyświetl kurs
          </Button>
        </Modal.Body>

        <h5 className='share-title'>Komentarze</h5>
        <hr />
        <Modal.Body className='comments-list'>
          {opinions.ratings ? (
            opinions.ratings.map((rating, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p onClick={() => handleShowUser(rating.user, index)}>
                    {showUserNameMap[index] ? (
                      <RiUserUnfollowLine size={30} />
                    ) : (
                      <RiUserSearchLine size={30} />
                    )}
                    {rating.userData && rating.userData.username && showUserNameMap[index] ? rating.userData.username : <></>}
                  </p>
                  <Rating rating={[rating.rating, 0]} />
                </div>
                <p>{rating.text}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>Brak komenatrzy dla tego kursu</p>
          )}
        </Modal.Body>
        <div className='add-holder'>
          <BiCommentAdd size={30} style={{ cursor: 'pointer', color: '#53abf4', marginLeft: 'auto', marginRight: '10%' }} onClick={handleToggleCommentForm} />
        </div>
        <Modal.Body className='comment-add mx-auto'>
          {commentFormVisible && (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="commentForm">
                <Form.Label>Dodaj komentarz:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="ratingForm">
                <Form.Label className='rating-label'>Ocena {rating}/100</Form.Label>
                <Form.Range
                  min="0"
                  max="100"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                  required
                />
              </Form.Group>
              <div className='add-button-div mx-auto'>
              <Button className='add-button' type="submit" disabled={loading}>
                {loading ? 'Dodawanie komenatrza...' : 'Dodaj komentarz'}
              </Button>
              </div>
              {error && <p className="text-danger">{error}</p>}
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
