import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            I am some page!
            <Link to="/">Go back to Home</Link>
        </div>
    )
}