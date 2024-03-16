import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Form, Button } from 'react-bootstrap'; // Importujemy komponenty Form, Button, Row i Col z React-Bootstrap
import TextareaWithLineNumbers from './TextareaWithLineNumbers';
import { CiBoxList } from "react-icons/ci";
import './Lesson.css'
import Offcanvas from 'react-bootstrap/Offcanvas';

const Lesson = () => {
    const { courseUrl, lessonId } = useParams();
    const [lessonData, setLessonData] = useState(null);
    const [codeInput, setCodeInput] = useState('');
    const [showLessons, setShowLessons] = useState(false);
    const [requestBody, setRequestBody] = useState('');
    const loginToken = localStorage.getItem('token');
    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/lesson/${lessonId}/`, { headers: { "Authorization": `Bearer ${loginToken}` } });
                setLessonData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching lesson data:', error);
            }
        };
        fetchLesson();
    }, [lessonId, loginToken]);

    useEffect(() => {
        if (lessonData) {
            setRequestBody({
                expected_result: lessonData.expected_output,
                language: lessonData.language,

            });
        }
    }, [lessonData]);

    console.log(requestBody)
    const handleShow = () => {
        setShowLessons(true)
    }
    const handleClose = () => {
        setShowLessons(false)
    }
    return (
        <div className="lesson-container">
            <Row className='lesson-row'>
                {lessonData && (
                    <>
                        <h1 className='lesson-title'>{lessonData.title}</h1>
                    </>
                )}
                <Col md={6}>
                    <div>
                        <p className='lesson-content'>{lessonData?.content}</p>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="code-input-container">
                        <TextareaWithLineNumbers lessonId={lessonId} requestBody={requestBody} />
                    </div>
                </Col>
            </Row>

        </div>
    );
};

export default Lesson;
