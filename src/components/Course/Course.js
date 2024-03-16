import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsMailboxFlag } from "react-icons/bs";
import './Course.css';
import AddLessonPopup from './CRUD lesson/AddLessonPopup';
import DeleteLessonPopup from './CRUD lesson/DeleteLessonPopup';
import EditLessonPopup from './CRUD lesson/EditLessonPopup';
import EditCoursePopup from './CRUD course/EditCoursePopup';
import DeleteCoursePopup from './CRUD course/DeleteCoursePopup';

const Course = () => {
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonsData, setLessonData] = useState('');
  const [loading, setLoading] = useState(true);
  const [loggedOwner, setLoggedOwner] = useState(false);
  const [whoAmI, setWhoAmI] = useState('');
  const [courseData, setCourseData] = useState('');
  const [ownerData, setOwnerData] = useState('');
  const [lessonId, setLessonId] = useState('');
  const [startCourse, setStartCourse] = useState('');
  const [isCourseStarted, setIsCourseStarted] = useState(false);
  const [editLessonData, setEditLessonData] = useState({
    id: '',
    title: '',
    content: ''
  });
  const loginToken = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${loginToken}`,
  };
  const navigate = useNavigate();
  const { courseUrl } = useParams();
  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/usercourses/`, { headers });
        const userCourses = response.data.courses;
        const isStarted = userCourses.includes(parseInt(courseUrl));
        // console.log(userCourses.includes(parseInt(courseUrl)))
        setIsCourseStarted(isStarted);
      } catch (error) {
        console.error('Error fetching user courses:', error);
      }
    };
    fetchUserCourses();
  }, []);
  const handleGoToCourse = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/startcourse/${courseUrl}/`, {}, { headers: { "Authorization": `Bearer ${loginToken}` } });
      console.log('Data sent successfully:', response.data);
      setLessonId(response.data)
    } catch (error) {
      console.error('Error sending data:', error);
    }

  };
  const courseId = courseUrl.split('/')[1]; // Wyciągamy identyfikator kursu z courseUrl
  const toggleLesson = (id) => {
    setActiveLesson(activeLesson === id ? null : id);
  };
  useEffect(() => {
    if (lessonId | isCourseStarted) {
      navigate(`/Courses/${courseUrl}/Lesson/${lessonId.lesson_id}`)
    }
  }, [lessonId]);
  const handleContinueCourse = () => {
    navigate(`/Courses/${courseUrl}/Lesson/${lessonsData[0].id}`);
  };


  const fetchLogged = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/whoami/`, { headers });

      setWhoAmI(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching logged data:', error);
    }
  };

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/lessons/`, { headers });
      const lessons = response.data.filter((lesson) => lesson.course.toString() === courseUrl);
      setLessonData(lessons);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lessons data:', error);
    }
  };
  const fetchOwnerData = async (ownerId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${ownerId}/`, { headers });
      setOwnerData(response.data);
    } catch (error) {
      console.error('Error fetching owner data:', error);
    }
  };
  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/course/${courseUrl}/`, { headers });
      setCourseData(response.data);
      fetchOwnerData(response.data.owner);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };
  useEffect(() => {
    fetchLogged();
    fetchCourseData();
    fetchLessons();

  }, [courseUrl]);
  useEffect(() => {
    if (ownerData.id === whoAmI.id) {

      setLoggedOwner(true);
    } else {
      setLoggedOwner(false);
    }
  })
  return (
    <div>
      <div className="course-container">
        <img src={courseData.url} alt={courseData.title} className="course-image" />
        <div className="course-details">
          <h2 className="course-title">{courseData.title}</h2>
          <p>Author: {ownerData.username}</p>
          <p className='send-email' onClick={() => window.location.href = `mailto:${ownerData.email}`}><BsMailboxFlag size={20} /> {ownerData.email}</p>
          <p>{ownerData.bio}</p>
          <p className="course-description">{courseData.description}</p>
          {isCourseStarted ? (
            <Button variant="outline-primary" className='button' onClick={handleContinueCourse}>
              <span>Continue course</span>
            </Button>
          ) : (
            <Button variant="outline-primary" className='button' onClick={handleGoToCourse}>
              <span>Start course</span>
            </Button>
          )}

          {loggedOwner && (
            <>
              <DeleteCoursePopup course={courseData} />
              <EditCoursePopup fetchCourseData={fetchCourseData} course={courseData} />
              <AddLessonPopup fetchLessons={fetchLessons} />
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
                  {loggedOwner && (
                    <>
                      <EditLessonPopup lesson={lesson} fetchLessons={fetchLessons} />
                      <DeleteLessonPopup lesson={lesson} fetchLessons={fetchLessons} />
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
