import React, { useState } from 'react';
import './Text-Input.css';

function Input({ predicted, locked, id, active, value, error, label }) {
  const [state, setState] = useState({
    active: (locked && active) || false,
    value: value || '',
    error: error || '',
    label: label || 'Label'
  });

  function changeValue(event) {
    const value = event.target.value;
    setState({ ...state, value, error: '' });
  }

  function handleKeyPress(event) {
    if (event.which === 13) {
      setState({ ...state, value: 'SUBMIT IS WORKING!' });
    }
  }

  const fieldClassName = `field ${(locked
    ? state.active
    : state.active || state.value) && 'active'} ${locked &&
    !state.active &&
    'locked'}`;

  return (
    <div className={fieldClassName}>
      {state.active &&
        state.value &&
        predicted &&
        predicted === state.value &&
        console.log(predicted) && <p className="predicted">{predicted}</p>}
      <input
        id={id}
        type="text"
        value={state.value}
        placeholder={state.label}
        onChange={changeValue}
        onKeyPress={handleKeyPress}
        onFocus={() => !locked && setState({ ...state, active: true })}
        onBlur={() => !state.locked && setState({ ...state, active: false })}
      />
      <label htmlFor={id} className={error && 'error'}>
        {error || label}
      </label>
    </div>
  );
}

export default Input;
