// src/SegmentPopup.js
import React, { useState } from 'react';
import './App.css'; // Ensure the styles are imported here as well

const SegmentPopup = ({ setShowPopup, onSave }) => {
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ]);
  const [selectedSchema, setSelectedSchema] = useState('');

  const handleAddSchema = () => {
    if (selectedSchema) {
      const selected = availableSchemas.find(
        (schema) => schema.value === selectedSchema
      );
      setSchemas([...schemas, selected]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== selectedSchema)
      );
      setSelectedSchema('');
    }
  };

  const handleRemoveSchema = (index) => {
    const removedSchema = schemas[index];
    setAvailableSchemas([...availableSchemas, removedSchema]);
    setSchemas(schemas.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const data = {
      segment_name: segmentName,
      schema: schemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };
    console.log(data); // Replace with actual server submission logic
    onSave(data);
    setShowPopup(false);
  };

  return (
    <div className="popup">
      <h3>Saving Segment</h3>
      <input
        type="text"
        className="segment-input"
        placeholder="Name of the segment"
        value={segmentName}
        onChange={(e) => setSegmentName(e.target.value)}
      />

      <div className="schema-box">
        {schemas.map((schema, index) => (
          <div key={index} className="schema-item">
            <select
              value={schema.value}
              onChange={(e) =>
                setSchemas(
                  schemas.map((s, i) =>
                    i === index
                      ? availableSchemas.find(
                          (schema) => schema.value === e.target.value
                        )
                      : s
                  )
                )
              }
            >
              {[schema, ...availableSchemas].map((s, i) => (
                <option key={i} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <button
              className="remove-schema-btn"
              onClick={() => handleRemoveSchema(index)}
            >
              −
            </button>
          </div>
        ))}
      </div>

      <select
        className="add-schema-dropdown"
        value={selectedSchema}
        onChange={(e) => setSelectedSchema(e.target.value)}
      >
        <option value="">Add schema to segment</option>
        {availableSchemas.map((schema, index) => (
          <option key={index} value={schema.value}>
            {schema.label}
          </option>
        ))}
      </select>

      <div
        className="add-schema-link"
        onClick={handleAddSchema}
        role="button"
      >
        + Add new schema
      </div>

      <div className="actions">
        <button className="save-btn" onClick={handleSubmit}>
          Save the Segment
        </button>
        <button className="cancel-btn" onClick={() => setShowPopup(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SegmentPopup;
