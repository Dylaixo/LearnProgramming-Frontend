import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './HomePage.css';
import PopupCourse from '../Popup/PopupCourse';
import AddCoursePopup from '../Popup/AddCoursePopup';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Rating from '../Rating/Rating';
import axios from 'axios';

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const loginToken = localStorage.getItem('token');
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/courses/', {headers: { "Authorization" : `Bearer ${loginToken}`}});
      const coursesData = await response.json();
      setCourses(coursesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses data:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Wysyłanie żądania GET do serwera
        const response = await axios.get(`http://localhost:8000/api/users/`, {headers: { "Authorization" : `Bearer ${loginToken}`}});

        // Pobieranie danych z odpowiedzi
        setUsers(response.data);
        console.log(response.data)
      } catch (error) {
        // Obsługa błędów
        console.error('Error fetching users data:', error);
      }
    };
    fetchUsers();
    fetchCourses();
  }, []);

  const handleAddCourse = (newCourse) => {
    setCourses(prevCourses => [...prevCourses, newCourse]);
  };

  const getUserNameById = (userId) => {
    if (!Array.isArray(users)) {
      console.error('Users data is not an array');
      return 'Unknown';
    }
    const user = users.find(user => user.id === userId);
    return user ? user.username : 'Unknown';
  };

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <AiOutlineLoading3Quarters className="loading-icon" />
        </div>
      ) : (
        <div className='row mt-5 mb-5'>
          {courses.map((article, index) => (
            <div className='col-lg-4 col-md-4 col-sm-6 mb-4' key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{article.title.length > 33 ? article.title.slice(0, 33) + '...' : article.title}</Card.Title>
                  <Card.Img variant="bottom" src={article.url} />
                  <Rating rating={[article.avg_rating, article.count_rating]} />
                  <p className='author'>Autor: {getUserNameById(article.owner)}</p>
                  <p className='shortDesc'>{article.short_desc.slice(0,100)}</p>
                  <AddCoursePopup article={article} onAddCourse={handleAddCourse} fetchCourses={fetchCourses}/>
                  <PopupCourse article={article} courseId={article.id} fetchCourses={fetchCourses} />
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default HomePage;
