// src/App.js
import React, { useState } from 'react';
import SegmentPopup from './SegmentPopup';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSaveSegment = () => {
    setShowPopup(true);
  };

  const handleSave = (data) => {
    console.log('Segment Saved:', data);
    // Implement actual server submission if needed
  };

  return (
    <div className="App">
      <button className="save-segment-btn" onClick={handleSaveSegment}>
        Save segment
      </button>

      {showPopup && (
        <SegmentPopup setShowPopup={setShowPopup} onSave={handleSave} />
      )}
    </div>
  );
}

export default App;
