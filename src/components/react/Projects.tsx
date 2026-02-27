import React from 'react';
import { Section } from './Section';
import { GitHub } from './Icons';
import styles from './Projects.module.css';

interface ProjectItem {
    name: string;
    isActive: boolean;
    description: string;
    highlights: string[];
    url?: string;
    github?: string;
}

interface Props {
    projects: ProjectItem[];
}

export const Projects: React.FC<Props> = ({ projects }) => {
    return (
        <Section title="Proyectos">
            <ul className={styles.ul}>
                {projects.map(({ url, description, highlights, name, isActive, github }, index) => {
                    return (
                        <li key={index}>
                            <article className={styles.article}>
                                <header className={styles.header}>
                                    <h3 className={styles.h3}>
                                        {url ? (
                                            <a href={url} target="_blank" title={`Ver el proyecto ${name}`} rel="noreferrer" className={styles.a}>
                                                {name}
                                            </a>
                                        ) : (
                                            <span className={styles.a}>{name}</span>
                                        )}
                                        {isActive && <span className={styles.activeDot}>•</span>}
                                        {github && (
                                            <a
                                                className={styles.githubLink}
                                                href={github}
                                                target="_blank"
                                                rel="noreferrer"
                                                title={`Ver código fuente del proyecto ${name}`}
                                            >
                                                <GitHub />
                                            </a>
                                        )}
                                    </h3>
                                    <p className={styles.p}>{description}</p>
                                </header>
                                <footer className={styles.footer}>
                                    {highlights.map((highlight, idx) => (
                                        <span key={idx} className={styles.highlight}>{highlight}</span>
                                    ))}
                                </footer>
                            </article>
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
};
