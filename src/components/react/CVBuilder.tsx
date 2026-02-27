import React, { useState } from 'react';
import { Hero } from './Hero';
import { About } from './About';
import { Experience } from './Experience';
import { Education } from './Education';
import { Projects } from './Projects';
import { Skills } from './Skills';
import defaultCvData from '../../../cv.json';

export const CVBuilder: React.FC = () => {
    const [cvData, setCvData] = useState(defaultCvData);

    const handleBasicsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCvData(prev => ({
            ...prev,
            basics: {
                ...prev.basics,
                [name]: value
            }
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCvData(prev => ({
                    ...prev,
                    basics: {
                        ...prev.basics,
                        image: reader.result as string
                    }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCvData(prev => ({
            ...prev,
            basics: {
                ...prev.basics,
                location: {
                    ...prev.basics.location,
                    [name]: value
                }
            }
        }));
    };

    const handleProfileChange = (index: number, field: string, value: string) => {
        const newProfiles = [...cvData.basics.profiles];
        newProfiles[index] = { ...newProfiles[index], [field]: value };
        setCvData(prev => ({
            ...prev,
            basics: {
                ...prev.basics,
                profiles: newProfiles
            }
        }));
    };

    const addProfile = () => {
        setCvData(prev => ({
            ...prev,
            basics: {
                ...prev.basics,
                profiles: [...prev.basics.profiles, { network: '', username: '', url: '' }]
            }
        }));
    };

    const removeProfile = (index: number) => {
        const newProfiles = [...cvData.basics.profiles];
        newProfiles.splice(index, 1);
        setCvData(prev => ({
            ...prev,
            basics: {
                ...prev.basics,
                profiles: newProfiles
            }
        }));
    };

    const handleWorkChange = (index: number, field: string, value: string) => {
        const newWork = [...cvData.work];
        newWork[index] = { ...newWork[index], [field]: value } as any;
        setCvData(prev => ({ ...prev, work: newWork as any }));
    };

    const addWork = () => {
        setCvData(prev => ({
            ...prev,
            work: [{ name: '', position: '', startDate: '', endDate: '', summary: '', highlights: [], url: '' }, ...prev.work] as any
        }));
    };

    const removeWork = (index: number) => {
        const newWork = [...cvData.work];
        newWork.splice(index, 1);
        setCvData(prev => ({ ...prev, work: newWork as any }));
    };

    const handleEducationChange = (index: number, field: string, value: string) => {
        const newEdu = [...cvData.education];
        newEdu[index] = { ...newEdu[index], [field]: value };
        setCvData(prev => ({ ...prev, education: newEdu as any }));
    };

    const addEducation = () => {
        setCvData(prev => ({
            ...prev,
            education: [{ institution: '', area: '', studyType: '', startDate: '', endDate: '', url: '' }, ...prev.education] as any
        }));
    };

    const removeEducation = (index: number) => {
        const newEdu = [...cvData.education];
        newEdu.splice(index, 1);
        setCvData(prev => ({ ...prev, education: newEdu as any }));
    };

    const handleProjectChange = (index: number, field: string, value: string | boolean | string[]) => {
        const newProj = [...cvData.projects];
        newProj[index] = { ...newProj[index], [field]: value } as any;
        setCvData(prev => ({ ...prev, projects: newProj as any }));
    };

    const handleProjectHighlightChange = (index: number, value: string) => {
        const newProj = [...cvData.projects] as any[];
        newProj[index] = {
            ...newProj[index],
            _rawHighlights: value,
            highlights: value.split(',').map(s => s.trim()).filter(Boolean)
        };
        setCvData(prev => ({ ...prev, projects: newProj as any }));
    };

    const addProject = () => {
        setCvData(prev => ({
            ...prev,
            projects: [{ name: '', description: '', isActive: false, highlights: [], url: '', github: '' }, ...prev.projects] as any
        }));
    };

    const removeProject = (index: number) => {
        const newProj = [...cvData.projects];
        newProj.splice(index, 1);
        setCvData(prev => ({ ...prev, projects: newProj as any }));
    };

    const handleSkillChange = (index: number, field: string, value: string) => {
        const newSkill = [...cvData.skills];
        newSkill[index] = { ...newSkill[index], [field]: value } as any;
        setCvData(prev => ({ ...prev, skills: newSkill as any }));
    };

    const addSkill = () => {
        setCvData(prev => ({
            ...prev,
            skills: [{ name: '', level: '', keywords: [] }, ...prev.skills] as any
        }));
    };

    const removeSkill = (index: number) => {
        const newSkill = [...cvData.skills];
        newSkill.splice(index, 1);
        setCvData(prev => ({ ...prev, skills: newSkill as any }));
    };

    const downloadJson = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "cv.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="cvbuilder-container" style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>

            {/* FORM SECTION (Hidden on print) */}
            <div
                className="builder-form no-print"
                style={{
                    width: '400px',
                    height: '100%',
                    overflowY: 'auto',
                    backgroundColor: '#f9f9f9',
                    borderRight: '1px solid #ddd',
                    padding: '24px',
                    boxSizing: 'border-box'
                }}
            >
                <h2 style={{ marginTop: 0 }}>Editor de CV</h2>
                <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '20px' }}>
                    Edita los datos aquí para ver los cambios en tiempo real.
                </p>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                    <button
                        onClick={() => window.print()}
                        style={{ flex: 1, padding: '8px', background: '#111', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        🖨️ Imprimir CV
                    </button>
                    <button
                        onClick={downloadJson}
                        style={{ flex: 1, padding: '8px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        💾 Guardar JSON
                    </button>
                </div>

                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '12px' }}>Datos Básicos</h3>

                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem' }}>
                        <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Nombre:</span>
                        <input type="text" name="name" value={cvData.basics.name} onChange={handleBasicsChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </label>

                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem' }}>
                        <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Profesión/Título (Label):</span>
                        <input type="text" name="label" value={cvData.basics.label} onChange={handleBasicsChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </label>

                    <div style={{ marginBottom: '12px' }}>
                        <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px', fontSize: '0.9rem' }}>Imagen (URL o Archivo):</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <input type="text" name="image" placeholder="URL de la imagen" value={cvData.basics.image} onChange={handleBasicsChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }} />
                            <div style={{ padding: '8px', border: '1px dashed #ccc', borderRadius: '4px', backgroundColor: '#fff', fontSize: '0.85rem' }}>
                                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: '100%' }} />
                                <div style={{ marginTop: '4px', color: '#666', fontSize: '0.75rem' }}>* También puedes arrastrar y soltar una imagen aquí.</div>
                            </div>
                        </div>
                    </div>

                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem' }}>
                        <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Email:</span>
                        <input type="email" name="email" value={cvData.basics.email} onChange={handleBasicsChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </label>

                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem' }}>
                        <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Teléfono:</span>
                        <input type="tel" name="phone" value={cvData.basics.phone} onChange={handleBasicsChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    </label>

                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <label style={{ flex: 1, fontSize: '0.9rem' }}>
                            <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Ciudad:</span>
                            <input type="text" name="city" value={cvData.basics.location.city} onChange={handleLocationChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </label>
                        <label style={{ flex: 1, fontSize: '0.9rem' }}>
                            <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Región (Estado/Provincia):</span>
                            <input type="text" name="region" value={cvData.basics.location.region} onChange={handleLocationChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </label>
                    </div>

                    <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem' }}>
                        <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Resumen:</span>
                        <textarea name="summary" value={cvData.basics.summary} onChange={handleBasicsChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '100px', resize: 'vertical' }} />
                    </label>
                </section>

                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '12px' }}>Redes Sociales</h3>
                    {cvData.basics.profiles.map((profile, index) => (
                        <div key={index} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #eee', borderRadius: '4px', position: 'relative' }}>
                            <button
                                onClick={() => removeProfile(index)}
                                style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent', color: 'red', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                title="Eliminar red social"
                            >×</button>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, marginBottom: '4px' }}>
                                    Red
                                    <span
                                        title="Redes soportadas con icono: LinkedIn, GitHub, X, Facebook, Instagram, YouTube"
                                        style={{ cursor: 'help', fontSize: '0.8rem', backgroundColor: '#e0e0e0', color: '#555', borderRadius: '50%', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                    >?</span>
                                </span>
                                <input type="text" value={profile.network} onChange={e => handleProfileChange(index, 'network', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Usuario:</span>
                                <input type="text" value={profile.username} onChange={e => handleProfileChange(index, 'username', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>URL:</span>
                                <input type="url" value={profile.url} onChange={e => handleProfileChange(index, 'url', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                        </div>
                    ))}
                    <button onClick={addProfile} style={{ width: '100%', padding: '8px', background: '#eee', border: '1px dashed #ccc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        + Agregar Red Social
                    </button>
                </section>

                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '12px' }}>Experiencia Laboral</h3>
                    {cvData.work.map((job, index) => (
                        <div key={index} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #eee', borderRadius: '4px', position: 'relative' }}>
                            <button
                                onClick={() => removeWork(index)}
                                style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent', color: 'red', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                title="Eliminar experiencia"
                            >×</button>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Empresa:</span>
                                <input type="text" value={job.name} onChange={e => handleWorkChange(index, 'name', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Puesto:</span>
                                <input type="text" value={job.position} onChange={e => handleWorkChange(index, 'position', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <label style={{ flex: 1, fontSize: '0.9rem' }}>
                                    <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Fecha Inicio:</span>
                                    <input type="text" placeholder="YYYY-MM" value={job.startDate} onChange={e => handleWorkChange(index, 'startDate', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                </label>
                                <label style={{ flex: 1, fontSize: '0.9rem' }}>
                                    <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Fecha Fin (vacío = Actual):</span>
                                    <input type="text" placeholder="YYYY-MM" value={job.endDate || ''} onChange={e => handleWorkChange(index, 'endDate', e.target.value || null as any)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                </label>
                            </div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>URL Empresa:</span>
                                <input type="url" value={job.url || ''} onChange={e => handleWorkChange(index, 'url', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Resumen de Actividades:</span>
                                <textarea value={job.summary} onChange={e => handleWorkChange(index, 'summary', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px', resize: 'vertical' }} />
                            </label>
                        </div>
                    ))}
                    <button onClick={addWork} style={{ width: '100%', padding: '8px', background: '#eee', border: '1px dashed #ccc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        + Agregar Experiencia
                    </button>
                </section>

                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '12px' }}>Educación</h3>
                    {cvData.education.map((edu, index) => (
                        <div key={index} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #eee', borderRadius: '4px', position: 'relative' }}>
                            <button
                                onClick={() => removeEducation(index)}
                                style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent', color: 'red', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                title="Eliminar educación"
                            >×</button>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Institución:</span>
                                <input type="text" value={edu.institution} onChange={e => handleEducationChange(index, 'institution', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Área/Especialidad:</span>
                                <input type="text" value={edu.area} onChange={e => handleEducationChange(index, 'area', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Tipo de Estudio:</span>
                                <input type="text" value={edu.studyType || ''} onChange={e => handleEducationChange(index, 'studyType', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <label style={{ flex: 1, fontSize: '0.9rem' }}>
                                    <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Fecha Inicio:</span>
                                    <input type="text" placeholder="YYYY-MM" value={edu.startDate} onChange={e => handleEducationChange(index, 'startDate', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                </label>
                                <label style={{ flex: 1, fontSize: '0.9rem' }}>
                                    <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Fecha Fin (vacío = Actual):</span>
                                    <input type="text" placeholder="YYYY-MM" value={edu.endDate || ''} onChange={e => handleEducationChange(index, 'endDate', e.target.value || null as any)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                                </label>
                            </div>
                        </div>
                    ))}
                    <button onClick={addEducation} style={{ width: '100%', padding: '8px', background: '#eee', border: '1px dashed #ccc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        + Agregar Educación
                    </button>
                </section>

                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '12px' }}>Proyectos</h3>
                    {cvData.projects.map((proj, index) => (
                        <div key={index} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #eee', borderRadius: '4px', position: 'relative' }}>
                            <button
                                onClick={() => removeProject(index)}
                                style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent', color: 'red', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                title="Eliminar proyecto"
                            >×</button>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Nombre del Proyecto:</span>
                                <input type="text" value={proj.name} onChange={e => handleProjectChange(index, 'name', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Descripción:</span>
                                <textarea value={proj.description} onChange={e => handleProjectChange(index, 'description', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '60px', resize: 'vertical' }} />
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <input type="checkbox" checked={!!proj.isActive} onChange={e => handleProjectChange(index, 'isActive', e.target.checked)} />
                                <span style={{ fontWeight: 600 }}>¿Proyecto Activo?</span>
                            </label>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>URL (Web):</span>
                                <input type="url" value={proj.url || ''} onChange={e => handleProjectChange(index, 'url', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>URL del Código (GitHub):</span>
                                <input type="url" value={(proj as any).github || ''} onChange={e => handleProjectChange(index, 'github', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Etiquetas/Tecnologías (separadas por coma):</span>
                                <input
                                    type="text"
                                    value={(proj as any)._rawHighlights !== undefined ? (proj as any)._rawHighlights : (proj.highlights ? proj.highlights.join(', ') : '')}
                                    onChange={e => handleProjectHighlightChange(index, e.target.value)}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                />
                            </label>
                        </div>
                    ))}
                    <button onClick={addProject} style={{ width: '100%', padding: '8px', background: '#eee', border: '1px dashed #ccc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        + Agregar Proyecto
                    </button>
                </section>

                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '12px' }}>Habilidades</h3>
                    {cvData.skills.map((skill, index) => (
                        <div key={index} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #eee', borderRadius: '4px', position: 'relative' }}>
                            <button
                                onClick={() => removeSkill(index)}
                                style={{ position: 'absolute', top: '8px', right: '8px', background: 'transparent', color: 'red', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                title="Eliminar habilidad"
                            >×</button>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, marginBottom: '4px' }}>
                                    Tecnología / Habilidad
                                    <span
                                        title="Habilidades con icono: HTML, CSS, JavaScript, TypeScript, React, Next, Node, Tailwind, Git, SQL, Flutter, Kotlin, Swift, SwiftUI, Astro, GSAP, Vue, Svelte, Angular, Python, Docker, Figma"
                                        style={{ cursor: 'help', fontSize: '0.8rem', backgroundColor: '#e0e0e0', color: '#555', borderRadius: '50%', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                    >?</span>
                                </span>
                                <input type="text" value={skill.name} onChange={e => handleSkillChange(index, 'name', e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </label>
                        </div>
                    ))}
                    <button onClick={addSkill} style={{ width: '100%', padding: '8px', background: '#eee', border: '1px dashed #ccc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        + Agregar Habilidad
                    </button>
                </section>

                <p style={{ fontSize: '0.8rem', color: '#888' }}>
                    Basado en el diseño original de midudev
                </p>

            </div>

            {/* CV PREVIEW SECTION (Printable) */}
            <div
                className="cv-preview-container"
                style={{
                    flex: 1,
                    height: '100%',
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                }}
            >
                <main style={{ padding: '4rem', margin: 'auto', width: '100%', maxWidth: '800px' }}>
                    <Hero basics={cvData.basics} />
                    <About summary={cvData.basics.summary} />
                    <Experience work={cvData.work} />
                    <Education education={cvData.education} />
                    <Projects projects={cvData.projects as any} />
                    <Skills skills={cvData.skills} />
                </main>
            </div>

            <style>{`
        @media print {
            .no-print { display: none !important; }
            .cv-preview-container { overflow: visible !important; height: auto !important; flex: none !important; width: 100% !important;}
            body { margin: 0; padding: 0; }
        }
        @media (max-width: 768px) {
            .cvbuilder-container { flex-direction: column !important; height: auto !important; overflow: visible !important; }
            .builder-form { width: 100% !important; height: auto !important; border-right: none !important; border-bottom: 2px solid #ddd !important; }
            .cv-preview-container { height: auto !important; overflow: visible !important; }
        }
      `}</style>
        </div>
    );
};
