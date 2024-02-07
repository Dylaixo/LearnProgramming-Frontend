import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
 import './HomePage.css';
import PopupCourse from '../Popup/PopupCourse';
import PopupComments from '../Popup/PopupComments';
const data = [
        {
          "author": "Michael R. Gordon",
          "level": "basic",
          "title": "Ukraine Fires ATACMS Missile at Russian Forces for the First Time - WSJ - The Wall Street Journalssdadasdasssda",
          "description": "U.S. missiles were secretly deployed to Ukraine in recent days",
          "numberOfRating": 30,
          "url": "url",
          "urlToImage": "https://images.wsj.net/im-869935/social",
          "publishedAt": "2023-10-17T14:14:00Z",
          "content": null
        },
        {
          "author": "Becca Wood",
          "title": "Fans Spot 'Invisible Strings' Connecting Taylor Swift, Travis Kelce - TODAY",
          "level": "regular",
          "numberOfRating": 80,
          "description": "What are the invisible strings connecting Travis Kelce and Taylor Swift? Fans spot things they think indicate the two are destined. See fan theories.",
          "url": "url2",
          "urlToImage": "https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1200x630_center,f_auto,q_auto:best/rockcms/2023-10/travis-klelce-taylor-swift-zz-231016-f11d9b.jpg",
          "publishedAt": "2023-10-17T14:08:00Z",
          "content": "Were there clues we didn't see? \r\nEver since rumors have begun to swirl of the potential romance between Travis Kelce and Taylor Swift, fans are asking: All along, was there some invisible string? \r\n… [+3385 chars]"
        },
        {
          "author": "Reuters",
          "title": "US retail sales beat expectations in boost to third-quarter GDP growth expectations - Reuters",
          "numberOfRating": 60,
          "description": "U.S. retail sales increased more than expected in September as households stepped up purchases of motor vehicles and spent more at restaurants and bars, cementing expectations that economic growth accelerated in the third quarter.",
          "url": "url3",
          "urlToImage": "https://www.reuters.com/resizer/tK-H6JfNg3gBXT6O-_Fno8_uQCo=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/HUTE6IHPQ5JHLHVG63HWA2WTXI.jpg",
          "publishedAt": "2023-10-17T13:38:00Z",
          "content": "WASHINGTON, Oct 17 (Reuters) - U.S. retail sales increased more than expected in September as households stepped up purchases of motor vehicles and spent more at restaurants and bars, cementing expec… [+4221 chars]"
        },
        {
          "author": "Mike Florio",
          "title": "PFT's Week 7 2023 NFL power rankings - NBC Sports",
          "description": "Miami takes over the top post.",
          "numberOfRating": 10,
          "url": "url4",
          "urlToImage": "https://www.reuters.com/resizer/tK-H6JfNg3gBXT6O-_Fno8_uQCo=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/HUTE6IHPQ5JHLHVG63HWA2WTXI.jpg",
          "publishedAt": "2023-10-17T13:11:39Z",
          "content": "1. Dolphins (5-1, last week No. 4): Miami has the offense that Kansas City used to have.\r\n2. Chiefs (5-1, No. 3): Theyre winning, but something is off.\r\n3. Lions (5-1, No. 5): Super Bowl contenders? … [+2743 chars]"
        }
      ]

function HomePage() {
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await fetch('API_URL/courses');
  //       const coursesData = await response.json();
  //       setCourses(coursesData);
  //     } catch (error) {
  //       console.error('Error fetching courses data:', error);
  //     }
  //   };

  //   fetchCourses();
  // }, []);
    return (
        <>
        <div className='row mt-5 mb-5'>
          {data.map((article, index) => (
          <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
            <Card key={index}>
              <Card.Body >
                <Card.Img variant="bottom" src={article.urlToImage} />
                <Card.Title>{article.title.slice(0, 60)}</Card.Title>
                <p className='author'>{article.author}</p>
                <PopupComments article={article}/>
                <PopupCourse article={article} />
              </Card.Body>
            </Card>
            </div>
          ))}

        </div>
        </>
      );
}

export default HomePage