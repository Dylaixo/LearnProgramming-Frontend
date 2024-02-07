import React from 'react';
import TopRatedCoursesCarousel from './TopRatedCoursesCarousel';

function WelcomePage() {
  return (
    <div>
      <h1>Witaj na stronie powitalnej!</h1>
      <p>
        Witaj na naszej stronie! Jest nam bardzo miło, że tu jesteś.
        Zapraszamy do zapoznania się z naszą ofertą i korzystania z naszych usług.
      </p>
      {/* Dodaj inne treści lub komponenty, które chcesz wyświetlić */}
      <TopRatedCoursesCarousel></TopRatedCoursesCarousel>
    </div>
  );
}

export default WelcomePage;