import React from 'react';

const Project = ({styleId, title, description, picture, link}) => {
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <figure>
                <div id={styleId} style={{backgroundImage: `url(${picture})`}} className="imageBox"></div>
                <figcaption>{title}</figcaption>
                <p>{description}</p>
            </figure>
        </a>
    );
}
 
export default Project;