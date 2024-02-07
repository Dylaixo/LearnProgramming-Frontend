import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './TopRatedCoursesCarousel.css';

function TopRatedCoursesCarousel() {
  // Stała tablica z przykładowymi danymi kursów
  const courses = [
    {
      id: 1,
      title: 'Kurs React',
      description: 'Nauka React od podstaw',
      image: 'https://images.wsj.net/im-869935/social',
      numberOfRating: 100,
      author: 'John Doe',
    },
    {
      id: 2,
      title: 'Kurs JavaScript',
      description: 'Zaawansowany kurs JavaScript',
      image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2023-10/travis-klelce-taylor-swift-zz-231016-f11d9b.jpg',
      numberOfRating: 95,
      author: 'Jane Smith',
    },
    {
        id: 2,
        title: 'Kurs JavaScript2',
        description: 'Zaawansowany kurs JavaScript',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2023-10/travis-klelce-taylor-swift-zz-231016-f11d9b.jpg',
        numberOfRating: 95,
        author: 'Jane Smith',
      },
      {
        id: 2,
        title: 'Kurs JavaScript3',
        description: 'Zaawansowany kurs JavaScript',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2023-10/travis-klelce-taylor-swift-zz-231016-f11d9b.jpg',
        numberOfRating: 95,
        author: 'Jane Smith',
      },
      {
        id: 2,
        title: 'Kurs JavaScript3',
        description: 'Zaawansowany kurs JavaScript',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2023-10/travis-klelce-taylor-swift-zz-231016-f11d9b.jpg',
        numberOfRating: 95,
        author: 'Jane Smith',
      },
      {
        id: 2,
        title: 'Kurs JavaScript3',
        description: 'Zaawansowany kurs JavaScript',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2023-10/travis-klelce-taylor-swift-zz-231016-f11d9b.jpg',
        numberOfRating: 95,
        author: 'Jane Smith',
      },
      {
        id: 2,
        title: 'Kurs JavaScript3',
        description: 'Zaawansowany kurs JavaScript',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2023-10/travis-klelce-taylor-swift-zz-231016-f11d9b.jpg',
        numberOfRating: 95,
        author: 'Jane Smith',
      },
      {
        id: 2,
        title: 'Kurs JavaScript3',
        description: 'Zaawansowany kurs JavaScript',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2023-10/travis-klelce-taylor-swift-zz-231016-f11d9b.jpg',
        numberOfRating: 95,
        author: 'Jane Smith',
      },
      {
        id: 2,
        title: 'Kurs JavaScript3',
        description: 'Zaawansowany kurs JavaScript',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2023-10/travis-klelce-taylor-swift-zz-231016-f11d9b.jpg',
        numberOfRating: 95,
        author: 'Jane Smith',
      },
      {
        id: 2,
        title: 'Kurs JavaScript5',
        description: 'Zaawansowany kurs JavaScript',
        image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2023-10/travis-klelce-taylor-swift-zz-231016-f11d9b.jpg',
        numberOfRating: 95,
        author: 'Jane Smith',
      },
    // Dodaj więcej kursów według potrzeby
  ];

  // Sortowanie kursów według oceny
  const sortedCourses = [...courses].sort((a, b) => b.numberOfRating - a.numberOfRating);

  return (
    <div style={{ maxWidth: '50%', margin: '0 auto' }}>
    <h1 style={{textAlign: 'center'}}>Najlepiej oceniane</h1>
      <Carousel interval={null}>
        {sortedCourses.slice(0, 5).map((course, index) => (
          <Carousel.Item key={index}>
            {/* Wyświetlanie obrazu w karuzeli */}
            <img
              className="d-block w-100 img-welcome"
              src={course.image}
              alt={course.title}

            />
            {/* Wyświetlanie Caption na obrazie */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', color: 'white' }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
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
