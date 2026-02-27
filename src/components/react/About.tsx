import React from 'react';
import { Section } from './Section';

interface Props {
    summary: string;
}

export const About: React.FC<Props> = ({ summary }) => {
    return (
        <Section title="Sobre mí">
            <p>
                {summary}
            </p>
        </Section>
    );
};
