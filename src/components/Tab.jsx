import React from 'react';

const Tab = ({ label, isActive, isCompleted = false, disabled = false, onClick }) => {
  // Combine classes based on state
  const tabClass = `tab ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''} ${isCompleted ? 'completed' : ''}`;
  
  return (
    <button
      className={tabClass}
      onClick={onClick}
      disabled={disabled}
    >
      {isCompleted && !isActive && (
        <span className="completion-indicator" role="img" aria-label="completed">✓</span>
      )}
      {label}
    </button>
  );
};

export default Tab;
