import React from 'react';
import { Section } from './Section';
import styles from './Education.module.css';

interface EducationItem {
    institution: string;
    startDate: string;
    endDate: string | null;
    area: string;
    studyType?: string;
}

interface Props {
    education: EducationItem[];
}

export const Education: React.FC<Props> = ({ education }) => {
    return (
        <Section title="Educación">
            <ul className={styles.ul}>
                {education.map(({ institution, startDate, endDate, area, studyType }, index) => {
                    const startDateObj = new Date(startDate);
                    const startYear = `${startDateObj.toLocaleString('es-ES', { month: 'short', timeZone: 'UTC' })} ${startDateObj.getUTCFullYear()}`;
                    const endDateObj = endDate != null ? new Date(endDate) : null;
                    const endYear = endDateObj ? `${endDateObj.toLocaleString('es-ES', { month: 'short', timeZone: 'UTC' })} ${endDateObj.getUTCFullYear()}` : "Actual";
                    const years = `${startYear} - ${endYear}`;

                    return (
                        <li key={index}>
                            <article className={styles.article}>
                                <header className={styles.header}>
                                    <div>
                                        <h3 className={styles.h3}>{institution}</h3>
                                    </div>
                                    <time className={styles.time}>{years}</time>
                                </header>
                                <footer>
                                    <p>{studyType ? `${studyType} en ` : ''}{area}</p>
                                </footer>
                            </article>
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
};
