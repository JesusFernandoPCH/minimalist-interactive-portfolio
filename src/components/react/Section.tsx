import React from 'react';
import './Section.css';

interface Props {
    title?: string;
    children: React.ReactNode;
}

export const Section: React.FC<Props> = ({ title, children }) => {
    return (
        <section className="cv-section">
            {title && <h2>{title}</h2>}
            {children}
        </section>
    );
};
