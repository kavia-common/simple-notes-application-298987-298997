import React from 'react';
import PropTypes from 'prop-types';

// PUBLIC_INTERFACE
export default function Header({ title, theme, onToggleTheme }) {
  /** Minimal app header showing title and a theme toggle button. */
  return (
    <div className="header" role="banner">
      <div className="title">{title}</div>
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
