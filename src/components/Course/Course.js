import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineLoading3Quarters, AiFillDelete } from "react-icons/ai";
import { BsMailboxFlag } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import './Course.css';
import AddLessonPopup from './CRUD lesson/AddLessonPopup';
import DeleteLessonPopup from './CRUD lesson/DeleteLessonPopup';
import EditLessonPopup from './CRUD lesson/EditLessonPopup';
import AddCoursePopup from '../Popup/AddCoursePopup';
import EditCoursePopup from './CRUD course/EditCoursePopup';
import DeleteCoursePopup from './CRUD course/DeleteCoursePopup';

const Course = () => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonsData, setLessonData] = useState('');
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [courseData, setCourseData] = useState('');
  const [ownerData, setOwnerData] = useState('');
  const [editLessonData, setEditLessonData] = useState({
    id: '',
    title: '',
    content: ''
  });
  const loginToken = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${loginToken}`,
  };
  const whoAmI = {
    id: 2,
    username: 'user1',
    email: 'example@email.com',
    bio: "user bio"
  };
  const navigate = useNavigate();
  const { courseUrl} = useParams();
  const handleGoToCourse = () => {
    const lessonId = 1;
    navigate(`/Courses/${courseUrl}/lesson/${lessonId}`);
  };
  const toggleLesson = (id) => {
    setActiveLesson(activeLesson === id ? null : id);
  };

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`http://34.136.176.140:8000/api/lessons/`, {headers});
      const lessons = response.data.filter((lesson) => lesson.course.toString() === courseUrl);
      setLessonData(lessons);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lessons data:', error);
    }
  };
  const fetchOwnerData = async (ownerId) => {
    try {
      const response = await axios.get(`http://34.136.176.140:8000/api/user/${ownerId}/`, {headers});
      setOwnerData(response.data);
    } catch (error) {
      console.error('Error fetching owner data:', error);
    }
  };
  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`http://34.136.176.140:8000/api/course/${courseUrl}/`, {headers});
      setCourseData(response.data);
      fetchOwnerData(response.data.owner);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };
  useEffect(() => {

    fetchCourseData();
    fetchLessons();

  }, [courseUrl]);
 useEffect(() => {
  if (ownerData.id === whoAmI.id) {
      setIsOwner(true);
  }
 })

  return (
    <div>
      <div className="course-container">
        <img src={courseData.url} alt={courseData.title} className="course-image" />
        <div className="course-details">
          <h2 className="course-title">{courseData.title}</h2>
          <p>Author: {ownerData.username}</p>
          <p className='send-email' onClick={() => window.location.href = `mailto:${ownerData.email}`}><BsMailboxFlag size={20}/> {ownerData.email}</p>
          <p>{ownerData.bio}</p>
          <p className="course-description">{courseData.description}</p>
          <Button variant="outline-primary" className='button' onClick={handleGoToCourse}>
            <span>Start course</span>
          </Button>
          {isOwner &&(
            <>
            <DeleteCoursePopup course={courseData} token={loginToken}/>
            <EditCoursePopup fetchCourseData={fetchCourseData} course={courseData} token={loginToken}/>
            <AddLessonPopup fetchLessons={fetchLessons} token={loginToken}/>
            </>
          )}
        </div>
      </div>
      <ul>

        {Array.isArray(lessonsData) && lessonsData.length > 0 ? (
          lessonsData.map((lesson) => (
            <li key={lesson.id}>
              <div>
                <button className="lesson-button" onClick={() => toggleLesson(lesson.id)}>
                  {lesson.title}
                  {isOwner && (
                    <>
                    <EditLessonPopup lesson={lesson} fetchLessons={fetchLessons} token={loginToken}/>
                    <DeleteLessonPopup lesson={lesson} fetchLessons={fetchLessons} token={loginToken}/>
                    </>
                  )}
                  {/* <FiEdit3 className="edit-icon"size={25} onClick={() => handleEditModalOpen(lesson)} /> */}

                  {/* <AiFillDelete size={25} onClick={() => handleDeleteModalOpen(lesson.id)}/> */}
                </button>
              </div>
              {activeLesson === lesson.id && (
                <div className="lesson-content">
                  <p>{lesson.content}</p>
                </div>
              )}
            </li>
          ))
        ) : (
          <li>
            {lessonsData === '' && loading ? (
              <div className="loading-container">
                <AiOutlineLoading3Quarters className="loading-icon" />
              </div>
            ) : (
              "No lessons available"
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Course;
