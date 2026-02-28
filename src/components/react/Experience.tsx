import React from 'react';
import { Section } from './Section';
import styles from './Experience.module.css';

interface WorkItem {
    name: string;
    startDate: string;
    endDate: string | null;
    position: string;
    summary: string;
    highlights: string[];
    url?: string;
}

interface Props {
    work: WorkItem[];
}

export const Experience: React.FC<Props> = ({ work }) => {
    return (
        <Section title="Experiencia laboral">
            <ul className={styles.ul}>
                {work.map(({ name, startDate, endDate, position, summary, url }, index) => {
                    const startDateObj = new Date(startDate);
                    const startYear = `${startDateObj.toLocaleString('es-ES', { month: 'short', timeZone: 'UTC' })} ${startDateObj.getUTCFullYear()}`;
                    const endDateObj = endDate != null ? new Date(endDate) : null;
                    const endYear = endDateObj ? `${endDateObj.toLocaleString('es-ES', { month: 'short', timeZone: 'UTC' })} ${endDateObj.getUTCFullYear()}` : "Actual";

                    return (
                        <li key={index}>
                            <article className={styles.article}>
                                <header className={styles.header}>
                                    <div>
                                        <h3 className={styles.h3}>
                                            {url ? (
                                                <a href={url} title={`Ver ${name}`} target="_blank" rel="noreferrer" className={styles.a}>
                                                    {name}
                                                </a>
                                            ) : (
                                                name
                                            )}
                                        </h3>
                                        <h4 className={styles.h4}>{position}</h4>
                                    </div>
                                    <div>
                                        <time className={styles.time} dateTime={startDate} data-title={startDate}>
                                            {startYear}
                                        </time>
                                        {" - "}
                                        <time className={styles.time} dateTime={endDate || ''} data-title={endDate || 'Actual'}>
                                            {endYear}
                                        </time>
                                    </div>
                                </header>
                                <footer>
                                    <p>{summary}</p>
                                </footer>
                            </article>
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
};
