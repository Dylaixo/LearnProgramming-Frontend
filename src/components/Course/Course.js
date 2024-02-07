import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Course = () => {
  const location = useLocation();
  const { state } = location;
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

  const { title, description, author, url } = state || {};

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <h5>Author: {author}</h5>
      <p>URL: {url}</p>

      <h2>Lessons:</h2>
      <ul>
        {lessonData.map((lesson) => (
          <li key={lesson.id}>{lesson.title}</li>
        ))}
      </ul>
      {/* Dodaj inne informacje, które chcesz wyświetlić */}
    </div>
  );
};

export default Course;
