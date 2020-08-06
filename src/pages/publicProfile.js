import React from 'react';

export default function publicProfile({ match }) {
    const { params } = match;
    console.log(params);

    return <div></div>;
}
