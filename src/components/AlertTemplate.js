import React from 'react';

export default function AlertTemplate({ style, options, message, close }) {
    return (
        <div className={`alert alert-${options.type}`}>
            {options.type === 'info' && '!'}
            {options.type === 'success' && ':)'}
            {options.type === 'error' && ':('}
            {message}
        </div>
    );
}
