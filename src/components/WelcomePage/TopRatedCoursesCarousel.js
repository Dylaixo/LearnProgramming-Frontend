import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './TopRatedCoursesCarousel.css';
import axios from 'axios';

function TopRatedCoursesCarousel() {
  const [courses, setCourses] = useState([]);
  // Sortowanie kursów według oceny
  const loginToken = localStorage.getItem('token');
  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${loginToken}`,
    };
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses/', {headers});
        setCourses(response.data);
        console.log(courses)
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    };
    fetchCourses();
  }, []);

  const sortedCourses = [...courses].sort((a, b) => b.avg_rating - a.avg_rating );
  console.log(sortedCourses )
  return (
    <div style={{ maxWidth: '50%', margin: '0 auto' }}>
    <h1 style={{textAlign: 'center'}}>Najlepiej oceniane kursy</h1>
      <Carousel interval={null}>
        {sortedCourses.slice(0, 5).map((course, index) => (
          <Carousel.Item key={index}>
            {/* Wyświetlanie obrazu w karuzeli */}
            <img
              className="d-block w-100 top-rate"
              src={course.url}
              alt={course.title}
              style={{ borderRadius: 0 }} // Usunięcie zaokrąglonych rogów
            />
            {/* Wyświetlanie Caption na obrazie */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', color: 'white' }}>
              <h3>{course.title}</h3>
              <p>{course.short_desc}</p>
              {/* Dodatkowe informacje o kursie */}
              {/* Ocena, autor, liczba ocen, link do kursu itp. */}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default TopRatedCoursesCarousel;
