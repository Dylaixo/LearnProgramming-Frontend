import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';

const Lesson = ({ id, title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lesson">
      <h1
        className="lesson-title"
        onClick={() => setOpen(!open)}
        aria-controls={`lesson-content-${id}`}
        aria-expanded={open}
      >
        {title}
      </h1>
      <Collapse in={open}>
        <div id={`lesson-content-${id}`} className="lesson-content">
          {content}
        </div>
      </Collapse>
    </div>
  );
};

export default Lesson;
