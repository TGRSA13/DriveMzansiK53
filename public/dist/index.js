'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var App = function App() {
    return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
            'h1',
            null,
            'Hello, React!'
        )
    );
};

// Ensure there's an element with the id 'root' in your HTML
_reactDom2['default'].render(_react2['default'].createElement(App, null), document.getElementById('root'));
