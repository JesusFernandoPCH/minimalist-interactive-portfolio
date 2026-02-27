import React from 'react';
import { Section } from './Section';
import * as Icons from './Icons';
import styles from './Hero.module.css';

interface Profile {
    network: string;
    url: string;
    username: string;
}

interface Location {
    address: string;
    postalCode: string;
    city: string;
    countryCode: string;
    region: string;
}

interface Basics {
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    location: Location;
    profiles: Profile[];
}

interface Props {
    basics: Basics;
}

const SOCIAL_ICONS: Record<string, React.FC> = {
    GitHub: Icons.GitHub,
    LinkedIn: Icons.LinkedIn,
    X: Icons.X,
    Facebook: Icons.Facebook,
    Instagram: Icons.Instagram,
    YouTube: Icons.YouTube,
};

export const Hero: React.FC<Props> = ({ basics }) => {
    const { name, label, image, location, profiles, phone, email } = basics;
    const { city, region } = location;

    const printInfo = [
        email,
        phone,
        ...profiles.map(p => p.username ? `${p.username}` : p.url)
    ].filter(Boolean).join(" • ");

    return (
        <Section>
            <div className={styles.container}>
                <div className={styles.info}>
                    <h1 className={styles.h1}>{name}</h1>
                    <h2 className={styles.h2}>{label}</h2>
                    <span className={styles.span}>
                        <Icons.WorldMap />
                        {city}, {region}
                    </span>
                    <footer className={styles.print}>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', fontSize: '0.85rem' }}>
                            {email && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Icons.Mail /> {email}
                                </span>
                            )}
                            {phone && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Icons.Phone /> {phone}
                                </span>
                            )}
                            {profiles.map(({ network, url, username }, index) => {
                                const Icon = SOCIAL_ICONS[network];
                                if (!Icon) return null;
                                return (
                                    <span key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Icon /> {username || url}
                                    </span>
                                );
                            })}
                        </div>
                    </footer>
                    <footer className={styles.noPrint}>
                        {email && (
                            <a
                                href={`mailto:${email}`}
                                title={`Enviar un correo electrónico a ${name} al correo ${email}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.a}
                            >
                                <Icons.Mail />
                            </a>
                        )}
                        {phone && (
                            <a
                                href={`tel:${phone}`}
                                title={`Llamar por teléfono a ${name} al número ${phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.a}
                            >
                                <Icons.Phone />
                            </a>
                        )}
                        {profiles.map(({ network, url }, index) => {
                            const Icon = SOCIAL_ICONS[network];
                            if (!Icon) return null;
                            return (
                                <a
                                    key={index}
                                    href={url}
                                    title={`Visitar el perfil de ${name} en ${network}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.a}
                                >
                                    <Icon />
                                </a>
                            );
                        })}
                    </footer>
                </div>
                <figure className={styles.figure}>
                    <img src={image} alt={name} className={styles.img} />
                </figure>
            </div>
        </Section>
    );
};
