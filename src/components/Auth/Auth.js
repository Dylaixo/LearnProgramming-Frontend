import Footer from '../Footer/Footer';
import NavigationAuth from '../Navigation/NavigationAuth';
import HomePage from '../HomePage/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Course from '../Course/Course';
import WelcomePage from '../WelcomePage/WelcomePage';
import Lesson from '../Lessons/Lesson';
import Profile from '../Profile/Profile';
import MyCourses from '../MyCourses/MyCourses';
function Auth() {

  return (

    <>
      <NavigationAuth />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Courses" element={<HomePage />} />
        <Route path="/Courses/:courseUrl" element={<Course />} />
        <Route path="/Courses/:courseUrl/Lesson/:lessonId" element={<Lesson />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/MyCourses' element={<MyCourses />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Auth;