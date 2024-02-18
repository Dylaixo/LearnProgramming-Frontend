import Footer from '../Footer/Footer';
import NavigationAuth from '../Navigation/NavigationAuth';
import HomePage from '../HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Course from '../Course/Course';
import WelcomePage from '../WelcomePage/WelcomePage';
import Lesson from '../Lessons/Lesson';
function Auth() {

  return (

    <>
      <NavigationAuth/>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Courses" element={<HomePage />} />
        <Route path="/Courses/:courseUrl" element={<Course />} />
        <Route path="/Courses/:courseUrl/lesson/:lessonId" element={<Lesson />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer/>
    </>
  );
}

export default Auth;