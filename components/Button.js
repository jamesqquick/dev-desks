import React from 'react';

export default function Button({
    text,
    callback = () => {},
    disabled = false,
}) {
    return (
        <button
            type="submit"
            className="inline-block text-sm px-4 py-2 rounded bg-accent-green-400 text-white hover:bg-accent-green-500 disabled:opacity-50"
            onClick={callback}
        >
            {text}
        </button>
    );
}
