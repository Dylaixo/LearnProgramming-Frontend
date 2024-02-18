import React, { useState, useEffect, useRef } from 'react';
import './Lesson.css';

const TextareaWithLineNumbers = () => {
  const [value, setValue] = useState('');
  const [height, setHeight] = useState(0);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const handleTextareaChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      setHeight(textarea.scrollHeight);
    }
  }, [value]);
  const renderLineNumbers = () => {
    const lines = value.split('\n'); // Podzielenie zawartości textarea na linie
    return lines.map((_, index) => (
      <div key={index} className="line-number">{index + 1}</div>
    ));
  };

  return (
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
  );
};

export default TextareaWithLineNumbers;
