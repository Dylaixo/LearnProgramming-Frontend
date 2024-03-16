import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import '../../Popup/MoreInfo.css';
import { FiEdit3 } from "react-icons/fi";

export default function EditCoursePopup({ fetchCourseData, courseToEdit, course }) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginToken = localStorage.getItem('token');
  const [courseData, setCourseData] = useState({
    title: course.title,
    owner: course.owner,
    language: course.language,
    description: course.description,
    short_desc: course.short_desc,
    url: course.url,
  });
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/languages/', {headers: { "Authorization" : `Bearer ${loginToken}`}}); // Pobieramy dostępne języki z serwera
        setLanguages(response.data); // Aktualizujemy stan z dostępnymi językami
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };
    const fetchLanguage = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/language/${course.language}/`,  {headers: { "Authorization" : `Bearer ${loginToken}`}}); // Pobieramy dostępne języki z serwera
          setLanguage(response.data.name);
        } catch (error) {
          console.error('Error fetching languages:', error);
        }
      };
    fetchLanguages();
    fetchLanguage();
  }, []);
  useEffect(() => {
    if (courseToEdit) {
      setCourseData(courseToEdit);
      setShow(true);
    }
  }, [courseToEdit]);

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

      const response = await axios.put(`http://localhost:8000/api/course/${course.id}/`, courseData, {headers: { "Authorization" : `Bearer ${loginToken}`}} );
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
    setTimeout(() => {
      handleClose();
      fetchCourseData();
    }, 2000);
  };
  return (
    <>
      <Link className='slabLink' onClick={handleShow}>
        <FiEdit3 size={40} className="add-course-btn"></FiEdit3>
      </Link>
      <Modal show={show} size='xl' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj kurs</Modal.Title>
        </Modal.Header>
        {loading ? (
          <div className="loading-container">
            <AiOutlineLoading3Quarters className="loading-icon" />
          </div>) : (
          <>
            <Modal.Body className='mx-auto'>
              <Form.Group controlId="title">
                <Form.Label>Tytuł</Form.Label>
                <Form.Control type="text" placeholder={course.title ? course.title : "Enter title"} value={courseData.title} onChange={(e) => setCourseData({ ...courseData, title: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="language">
                <Form.Label>Język</Form.Label>
                <Form.Control as="select" value={courseData.language} onChange={e => setCourseData({ ...courseData, language: e.target.value })}>
                  <option value="">{language}</option>
                  {languages.map(language => (
                    <option key={language.id} value={language.id}>
                      {language.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Opis</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder={course.description ? course.description : "Enter short description"} value={courseData.description} onChange={(e) => setCourseData({ ...courseData, description: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="shortDesc">
                <Form.Label>Krótki opis</Form.Label>
                <Form.Control type="text" placeholder={course.short_desc ? course.short_desc : "Enter short description"} value={courseData.short_desc} onChange={(e) => setCourseData({ ...courseData, short_desc: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="url">
                <Form.Label>URL do zdjęcia</Form.Label>
                <Form.Control type="text" placeholder={course.url ? course.url : "Enter URL to image"} value={courseData.url} onChange={(e) => setCourseData({ ...courseData, url: e.target.value })} />
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
