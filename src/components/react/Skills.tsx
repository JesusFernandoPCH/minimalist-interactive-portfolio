import React from 'react';
import { Section } from './Section';
import * as Icons from './Icons';
import styles from './Skills.module.css';

interface SkillItem {
    name: string;
}

interface Props {
    skills: SkillItem[];
}

// Map skill names to icons from the generated Icons.tsx
const SKILLS_ICONS: Record<string, React.FC> = {
    HTML: Icons.Html,
    CSS: Icons.Css,
    JavaScript: (Icons as any).Javascript,
    TypeScript: Icons.TypeScript,
    React: Icons.ReactIcon,
    Node: Icons.Node,
    MySQL: Icons.Sql,
    Git: Icons.Git,
    GitHub: Icons.GitHub,
    Next: Icons.Next,
    Tailwind: Icons.Tailwind,
    Swift: Icons.Swift,
    SwiftUI: (Icons as any).Swiftui,
    Kotlin: Icons.Kotlin,
    Flutter: Icons.Flutter,
    Astro: Icons.Astro,
    GSAP: Icons.Gsap,
    Vue: Icons.Vue,
    Svelte: Icons.Svelte,
    Angular: Icons.Angular,
    Python: Icons.Python,
    Docker: Icons.Docker,
    Figma: Icons.Figma,
};

export const Skills: React.FC<Props> = ({ skills }) => {
    return (
        <Section title="Habilidades">
            <ul className={styles.ul}>
                {skills.map(({ name }, index) => {
                    const iconName = name === "Next.js" ? "Next" : name;
                    const Icon = SKILLS_ICONS[iconName];

                    return (
                        <li key={index} className={styles.li}>
                            {Icon && <Icon />} <span>{name}</span>
                        </li>
                    );
                })}
            </ul>
        </Section>
    );
};
