import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { SiAddthis } from "react-icons/si";
import { IoMdClose, IoMdAdd } from "react-icons/io";
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import './MoreInfo.css';
export default function AddCoursePopup({ fetchCourses }) {
  const [whoAmI, setWhoAmI] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginToken = localStorage.getItem('token');
  const [courseData, setCourseData] = useState({
    title: '',
    owner: 2,
    language: '',
    description: '',
    short_desc: '',
    url: '',
  });
  const [languages, setLanguages] = useState([]);

  // Nowa funkcja do pobierania danych o użytkowniku
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/whoami/`, { headers: { "Authorization": `Bearer ${loginToken}` } });
      setWhoAmI(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // useEffect do pobrania danych o użytkowniku
  useEffect(() => {
    fetchUserData();
  }, []);

  // useEffect do pobrania dostępnych języków
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/languages/', { headers: { "Authorization": `Bearer ${loginToken}` } });
        setLanguages(response.data);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    if (loginToken) {
      fetchLanguages();
    }
  }, [loginToken]);

  const handleClose = () => {
    setShow(false)
    setLoading(false)
  };
  const handleShow = () => {
    setShow(true)
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/courses/', courseData, { headers: { "Authorization": `Bearer ${loginToken}` } });
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }

    setTimeout(() => {
      setCourseData({
        title: '',
        owner: whoAmI.id,
        language: '',
        description: '',
        short_desc: '',
        url: '',
        lessons: []
      })
      handleClose();
      fetchCourses();
    }, 5000);
  };


  return (
    <>
      <Link className='slabLink' onClick={handleShow}>
        <SiAddthis size={40} className="add-course-btn"></SiAddthis>
      </Link>
      <Modal show={show} size='xl' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stwórz własny kurs</Modal.Title>
        </Modal.Header>
        {loading ? (
          <div className="loading-container">
            <AiOutlineLoading3Quarters className="loading-icon" />
          </div>) : (
          <>
            <Modal.Body className='mx-auto'>
              <Form.Group controlId="title">
                <Form.Label>Tytuł</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={courseData.title} onChange={(e) => setCourseData({ ...courseData, title: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="language">
                <Form.Label>Język</Form.Label>
                <Form.Control as="select" value={courseData.language} onChange={e => setCourseData({ ...courseData, language: e.target.value })}>
                  <option value="">Wybierz język</option>
                  {languages.map(language => (
                    <option key={language.id} value={language.id}>
                      {language.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Opis kursu</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" value={courseData.description} onChange={(e) => setCourseData({ ...courseData, description: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="shortDesc">
                <Form.Label>Krótki opis kursu</Form.Label>
                <Form.Control type="text" placeholder="Enter short description" value={courseData.short_desc} onChange={(e) => setCourseData({ ...courseData, short_desc: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="url">
                <Form.Label>URL do zdjęcia</Form.Label>
                <Form.Control type="text" placeholder="Enter URL" value={courseData.url} onChange={(e) => setCourseData({ ...courseData, url: e.target.value })} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleClose}>Zamknij</Button>
                <Button variant="primary" onClick={handleSave}>Zapisz</Button>
              </div>
            </Modal.Footer>

          </>
        )}
      </Modal>
    </>
  );
}
