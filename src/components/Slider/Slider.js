import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Slider.css"
import Carousel from 'react-bootstrap/Carousel';

function Slider() {
    return (
        <Carousel className="pb-5">
          <Carousel.Item interval={500}>
            <img
              className="d-block w-80"
              src="https://www.dignited.com/wp-content/uploads/2022/08/top10lan-1024x576.jpg"
              alt="Slide with many programming languages."
            />
            <Carousel.Caption>
              <h2>Learn programming languages</h2>
              <p>You can learn every possible language in the world!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-80"
              src="https://www.freecodecamp.org/news/content/images/2020/02/amy-haddad-article.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h2>Do simple tasks</h2>
              <p>
                Do smiple tasks to end course and improve your skills.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-80"
              src="https://immunifyme.com/blog/wp-content/uploads/2021/12/hannah-busing-Zyx1bK9mqmA-unsplash.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h2>Create our community</h2>
              <p>Make and share your opinions about courses</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
}
export default Slider;
