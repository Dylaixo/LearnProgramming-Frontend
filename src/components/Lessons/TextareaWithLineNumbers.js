import React, { useState, useEffect, useRef } from 'react';
import './Lesson.css';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const TextareaWithLineNumbers = ({ requestBody, lessonId }) => {
  const [value, setValue] = useState('');
  const [height, setHeight] = useState(0);
  const [complieResult, setCompileResult] = useState({ error: true, msg: '' });
  const [nextLesson, setNextLesson] = useState('');
  const [isLastLesson, setIsLastLesson] = useState(false);
  const textareaRef = useRef(null);
  const loginToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const { courseUrl } = useParams();

  const handleTextareaChange = (event) => {
    setValue(event.target.value);
  };

  const handleClearCode = () => {
    setValue('');
  }

  const handleNextLesson = async () => {
    if (!complieResult.error) {
      try {
        const response = await axios.post(`http://localhost:8000/api/nextlesson/${lessonId}/`, {}, { headers: { "Authorization": `Bearer ${loginToken}` } });
        console.log('Next lesson data:', response.data);
        setNextLesson(response.data);
        complieResult.error = undefined;
        setValue('')
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  }

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      setHeight(textarea.scrollHeight);
    }
  }, [value]);

  useEffect(() => {
    if (nextLesson && nextLesson.id) {
      navigate(`/Courses/${courseUrl}/Lesson/${nextLesson.id}`);
      setCompileResult({ error: true })
    }
  }, [nextLesson, navigate, courseUrl]);

  const renderLineNumbers = () => {
    const lines = value.split('\n');
    return lines.map((_, index) => (
      <div key={index} className="line-number">{index + 1}</div>
    ));
  };

  const handleSubmitCode = async (event) => {
    event.preventDefault();
    const combinedRequestBody = { ...requestBody, compile_code: value };
    try {
      const response = await axios.post('http://localhost:8000/api/compile/', combinedRequestBody, { headers: { "Authorization": `Bearer ${loginToken}` } });
      console.log('Data sent successfully:', response.data);
      setCompileResult(response.data);
      console.log('after post: ' + response.data.error)
      if (!response.data.error) {
        const response2 = await axios.post(`http://localhost:8000/api/finishlesson/${lessonId}/`, {}, { headers: { "Authorization": `Bearer ${loginToken}` } });
        console.log('Lesson finished successfully: ' + response2.data);
        setIsLastLesson(response2.data)
        console.log(response2.data)
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  if (isLastLesson.is_last_lesson) { }
  return (
    <>
      <Form onSubmit={(event) => handleSubmitCode(event)}>
        <div className="textarea-container" style={{ height: `${height}px` }}>
          <div className="line-numbers">
            {renderLineNumbers()}
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleTextareaChange}
            className="textarea"
            placeholder="Enter your text here..."
            style={{ height: `${height}px` }}
          />
        </div>
        {complieResult.error  && (<p className='error_msg'>Error: {complieResult.msg}</p>)}
        {!complieResult.error && !isLastLesson.isLastLesson && (
          <Button className='submit-code-btn compile-btn' onClick={handleNextLesson}>
            Next lesson
          </Button>
        )}
        {complieResult.error && (
          <Button className='submit-code-btn' type="submit">
            Submit
          </Button>
        )}
        {!isLastLesson.is_last_lesson && (
          <Button className='submit-code-btn' onClick={handleClearCode}>
            Clear code
          </Button>
        )}
        {isLastLesson.is_last_lesson && !complieResult.error && (
          <p>Gratulacje, ukończyłeś kurs!</p>
        )}

      </Form>
    </>
  );
};

export default TextareaWithLineNumbers;
