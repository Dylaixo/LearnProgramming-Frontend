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
  const [languages, setLanguages] = useState([]); // Dodajemy stan dla przechowywania dostępnych języków

    // const fetchLanguages = async () => {
    //   try {
    //     const response = await axios.get('http://34.136.176.140:8000/api/languages/', { headers: { "Authorization": `Bearer ${loginToken}` } });
    //     setLanguages(response.data);
    //     console.log(languages);
    //   } catch (error) {
    //     console.error('Error fetching languages:', error);
    //   }
    // };
    // fetchLanguages();
    useEffect(() => {
      const fetchLanguages = async () => {
        try {
          const response = await axios.get('http://34.136.176.140:8000/api/languages/', {headers: { "Authorization" : `Bearer ${loginToken}`}});
          setLanguages(response.data);
        } catch (error) {
          console.error('Error fetching categories data:', error);
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
    console.log(courseData)
    try {
      const response = await axios.post('http://34.136.176.140:8000/api/courses/', courseData, {headers: { "Authorization" : `Bearer ${loginToken}`}});
      console.log('Data sent successfully:', response.data);

    } catch (error) {
      console.error('Error sending data:', error);
    }

    setTimeout(() => {
      setCourseData({
        title: '',
        owner: 2,
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
          <Modal.Title>Create your own course</Modal.Title>
        </Modal.Header>
        {loading ? (
          <div className="loading-container">
            <AiOutlineLoading3Quarters className="loading-icon" />
          </div>) : (
          <>
            <Modal.Body className='mx-auto'>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={courseData.title} onChange={(e) => setCourseData({ ...courseData, title: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="language">
                <Form.Label>Language</Form.Label>
                <Form.Control as="select" value={courseData.language} onChange={e => setCourseData({ ...courseData, language: e.target.value })}>
                  <option value="">Select language</option>
                  {languages.map(language => (
                    <option key={language.id} value={language.id}>
                      {language.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" value={courseData.description} onChange={(e) => setCourseData({ ...courseData, description: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="shortDesc">
                <Form.Label>Short Description</Form.Label>
                <Form.Control type="text" placeholder="Enter short description" value={courseData.short_desc} onChange={(e) => setCourseData({ ...courseData, short_desc: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="url">
                <Form.Label>URL</Form.Label>
                <Form.Control type="text" placeholder="Enter URL" value={courseData.url} onChange={(e) => setCourseData({ ...courseData, url: e.target.value })} />
              </Form.Group>
              {/* </Col> */}

              {/* Prawa kolumna - dane lekcji */}
              {/* <Col sm={6}>
                  <h4>Lessons</h4>
                  {courseData.lessons.map((lesson, index) => (
                    <div key={index}>
                      <h5>
                        <Button variant="link" onClick={() => handleToggleLesson(index)}>
                          Lesson {index + 1} {expandedLessonIndex === index ? '(Hide)' : '(Show)'}
                        </Button>
                      </h5>
                      {expandedLessonIndex === index && (
                        <div>
                          <Form.Group controlId={`lessonTitle${index}`}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" value={lesson.title} onChange={(e) => setCourseData(prevData => {
                              const updatedLessons = [...prevData.lessons];
                              updatedLessons[index].title = e.target.value;
                              return { ...prevData, lessons: updatedLessons };
                            })} />
                          </Form.Group>
                          <Form.Group controlId={`lessonContent${index}`}>
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" placeholder="Enter content" value={lesson.content} onChange={(e) => setCourseData(prevData => {
                              const updatedLessons = [...prevData.lessons];
                              updatedLessons[index].content = e.target.value;
                              return { ...prevData, lessons: updatedLessons };
                            })} />
                          </Form.Group>
                          <Form.Group controlId={`lessonExpectedOutput${index}`}>
                            <Form.Label>Expected Output</Form.Label>
                            <Form.Control type="text" placeholder="Enter expected output" value={lesson.expected_output} onChange={(e) => setCourseData(prevData => {
                              const updatedLessons = [...prevData.lessons];
                              updatedLessons[index].expected_output = e.target.value;
                              return { ...prevData, lessons: updatedLessons };
                            })} />
                          </Form.Group>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button variant="primary" onClick={handleAddLesson}>Add Lesson</Button>
                </Col>
              </Row> */}
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
