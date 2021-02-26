import React from 'react';

export default function FormInput({ name, label, placeholder = '', register }) {
    return (
        <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <input
                type="text"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={placeholder}
                name={name}
                ref={register}
            />
        </div>
    );
}
