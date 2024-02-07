import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Course.css';
const Course = () => {
  const location = useLocation();
  const { state } = location;
  const [activeLesson, setActiveLesson] = useState(null);
  const lessonData = [
    {
      id: 1,
      title: 'Introduction to React',
      content: 'This lesson covers the basics of React and its core concepts.',
    },
    {
      id: 2,
      title: 'Components in React',
      content: 'Learn about React components and how to create and use them.',
    },
    {
      id: 3,
      title: 'State and Props',
      content: 'Understand the concepts of state and props in React applications.',
    },
    // Dodaj więcej lekcji według potrzeb
  ]

  // const [lessons, setLessons] = useState([]);

  // useEffect(() => {
  //   // Tutaj użyj odpowiedniego zapytania do serwera, aby pobrać informacje o lekcjach dla danego kursu
  //   const fetchLessonsData = async () => {
  //     try {
  //       // Przykładowe zapytanie do serwera
  //       const response = await fetch(`API_URL/courses/${state.url}/lessons`);
  //       const lessonsData = await response.json();

  //       // Ustaw dane o lekcjach w stanie komponentu
  //       setLessons(lessonsData);
  //     } catch (error) {
  //       console.error('Error fetching lessons data:', error);
  //     }
  //   };

  //   // Wywołaj funkcję pobierającą dane o lekcjach
  //   fetchLessonsData();
  // }, [state.url]); // Dodaj zależność, aby efekt wykonał się tylko przy zmianie URL kursu

  // if (!state) {
  //   return <div>No data available</div>;
  // }

  const { title, description, author, url } = state;
  const toggleLesson = (id) => {
    setActiveLesson(activeLesson === id ? null : id);
  };
  return (

    <div>
    <div className="course-container">
      <img src={"https://images.wsj.net/im-869935/social"} alt={title} className="course-image" />
      <div className="course-details">
        <h2 className="course-title">{title}</h2>
        <p className="course-description">{description}</p>
        <Button variant="outline-primary" className='button' >
        <span>Check course </span>
      </Button>
      </div>
    </div>
      <ul>
                {lessonData.map((lesson) => (
          <li key={lesson.id}>
            <button className="lesson-button" onClick={() => toggleLesson(lesson.id)}>
              {lesson.title}
            </button>
            {activeLesson === lesson.id && (
              <div className="lesson-content">
                <p>{lesson.content}</p>
                {/* Dodaj inne informacje, które chcesz wyświetlić */}
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* Dodaj inne informacje, które chcesz wyświetlić */}
    </div>
  );
};

export default Course;
