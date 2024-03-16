import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBookOpen } from "react-icons/fi";
import './MyCourses.css'
import { useNavigate } from 'react-router-dom';

function MyCourses() {
    const [userCoursesIds, setUserCoursesIds] = useState([]);
    const [userCourses, setUserCourses] = useState([]);
    const [activeLesson, setActiveLesson] = useState(null);
    const [whoAmI, setWhoAmI] = useState('');
    const navigate = useNavigate();
    const loginToken = localStorage.getItem('token');
    const toggleLesson = (id) => {
        setActiveLesson(activeLesson === id ? null : id);
      };
    useEffect(() => {
        const fetchLogged = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/usercourses/`, { headers: { "Authorization": `Bearer ${loginToken}` } });
                setUserCoursesIds(response.data);
                console.log(userCoursesIds.courses);
            } catch (error) {
                console.error('Error fetching logged data:', error);
            }
        };
        const fetchWhoAmI = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/whoami/`, { headers: { "Authorization": `Bearer ${loginToken}` } });
                setWhoAmI(response.data);
            } catch (error) {
                console.error('Error fetching logged data:', error);
            }
        };
        fetchWhoAmI();
        fetchLogged();
    }, [loginToken]);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/courses/`, { headers: { "Authorization": `Bearer ${loginToken}` } });
                const courses = response.data.filter(course => userCoursesIds.courses.includes(parseInt(course.id)));
                setUserCourses(courses);
                console.log(userCourses)
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        // console.log(userCoursesIds.courses.length)
        // if (userCoursesIds.courses.length > 0) {
        //     fetchCourses();
        // }
        fetchCourses();
    }, [loginToken, userCoursesIds]);
    const handleNaigate = (id) =>{
        navigate(`/Courses/${id}`)
    }
    return (
        <div>
            <h1 className='typing-animation'>Kursy rozpoczęte przez: {whoAmI.username}</h1>
            <p className='mycourse-paragraph'>
                Sledź swoje kursy i ucz się nowych rzeczy
            </p>
            <ul>

            {userCourses.map((userCourse) => (
    <li key={userCourse.id}>
        <div>
            <button className="lesson-button" onClick={() => toggleLesson(userCourse.id)}>
                {userCourse.title}
            </button>
        </div>
        {activeLesson === userCourse.id && (
            <div className="lesson-content">
                <p>{userCourse.short_desc}</p>
                <FiBookOpen onClick={() => handleNaigate(userCourse.id)} className="browser-icon" size={35}></FiBookOpen>
            </div>
        )}

    </li>
))}

      </ul>
        </div>
    );
}

export default MyCourses;
