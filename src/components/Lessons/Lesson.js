import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Form, Button } from 'react-bootstrap'; // Importujemy komponenty Form, Button, Row i Col z React-Bootstrap
import TextareaWithLineNumbers from './TextareaWithLineNumbers';

const Lesson = () => {
    const { courseUrl, lessonId } = useParams();
    const [lessonData, setLessonData] = useState(null);
    const [codeInput, setCodeInput] = useState('');

    const handleCodeInputChange = (value) => {
      setCodeInput(value);
    };

    useEffect(() => {
      const fetchLesson = async () => {
        try {
          const response = await axios.get(`http://34.136.176.140:8000/api/lesson/${lessonId}`);
          setLessonData(response.data);
        } catch (error) {
          console.error('Error fetching lesson data:', error);
        }
      };
      fetchLesson();
    }, [lessonId]);

    const handleSubmitCode = (event) => {
      event.preventDefault();
      console.log('Submitted code:', codeInput);
      setCodeInput('');
    };

    return (
      <div className="lesson-container">
        <Row>
                          {lessonData && (
                <>
                  <h1>Lesson {lessonId} for course {courseUrl}</h1>
                </>
              )}
          <Col md={6}> {/* Ustawiamy szerokość kolumny na połowę ekranu dla lewej części */}
            <div>

              <p>{lessonData?.content}</p>
            </div>
          </Col>
          <Col md={6}> {/* Ustawiamy szerokość kolumny na połowę ekranu dla prawej części */}
            <div className="code-input-container">
              <Form onSubmit={handleSubmitCode}>
                <TextareaWithLineNumbers value={codeInput} onChange={handleCodeInputChange} />
                <Button className='submit-code-btn' type="submit">Submit</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
};

export default Lesson;
