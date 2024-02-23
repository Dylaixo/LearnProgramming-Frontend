import React from 'react';
import TopRatedCoursesCarousel from './TopRatedCoursesCarousel';

function WelcomePage() {

  return (
    <div>
      <h1 style={{"padding": "3% 3%"}}>Cieszymy się, że jesteś z nami.</h1>
      <p style={{"lineHeight": "2.3", "fontSize": "1.5rem", "font-family": "Kode Mono"}}>
      Witaj w LearnProgramming - miejscu, gdzie rozwijasz swoje umiejętności programistyczne i inspirujesz się wspólnie z nami.<br></br>
      Rozpocznij swoją przygodę już teraz! Wybierz kurs, który Cię interesuje, i zanurz się w świat kodowania. <br></br> Jesteśmy tu, aby Ci pomóc na każdym kroku. Powodzenia!
      </p>

      {/* Dodaj inne treści lub komponenty, które chcesz wyświetlić */}
      <TopRatedCoursesCarousel></TopRatedCoursesCarousel>
    </div>
  );
}

export default WelcomePage;