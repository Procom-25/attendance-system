import React, { useState } from 'react';
import './AttendanceForm.css';

const AttendanceForm = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submitted code:', code);
  };

  return (
    <div className="attendance-container">
      <div className="form-section">
        <img src="/procom25logo.png" alt="Procom 25" className="logo" />
        <h1>MARK ATTENDANCE</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>

      <div className="help-button">
        <button className="help-icon">?</button>
      </div>
    </div>
  );
};

export default AttendanceForm; 