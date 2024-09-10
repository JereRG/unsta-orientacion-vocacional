import React from 'react'
import { Button } from "@/components/ui/button"

interface FormData {
    interests: Record<string, boolean>;
    skills: Record<string, number>;
    academicPreferences: {
        preference?: string;
    };
    professionalGoals: {
        goals: string;
    };
}

function getRecommendations(formData: FormData): string[] {
    const { interests, skills, academicPreferences } = formData
    let recommendations: string[] = []

    // Lógica de recomendación basada en intereses
    if (interests.Ciencias || interests.Tecnología) {
        recommendations.push("Ingeniería", "Ciencias de la Computación")
    }
    if (interests.Arte || interests.Humanidades) {
        recommendations.push("Bellas Artes", "Literatura", "Filosofía")
    }
    if (interests.Negocios) {
        recommendations.push("Administración de Empresas", "Economía")
    }
    if (interests.Salud) {
        recommendations.push("Medicina", "Enfermería", "Psicología")
    }

    // Ajustar recomendaciones basadas en habilidades
    if (skills.Comunicación > 7) {
        recommendations.push("Periodismo", "Relaciones Públicas")
    }
    if (skills.Liderazgo > 7) {
        recommendations.push("Gestión de Proyectos", "Emprendimiento")
    }

    // Considerar preferencias académicas
    if (academicPreferences.preference === 'research') {
        recommendations.push("Investigación Científica", "Doctorado")
    }

    // Eliminar duplicados y limitar a 5 recomendaciones
    recommendations = Array.from(new Set(recommendations)).slice(0, 5)

    return recommendations
}

interface ResultsProps {
    data: FormData;
    onPrevious: () => void;
}

export function Results({ data, onPrevious }: ResultsProps) {
    const recommendations = getRecommendations(data)

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Tus Resultados</h2>
            <p className="mb-4">Basado en tus respuestas, aquí tienes algunas carreras recomendadas:</p>
            <ul className="list-disc pl-5 mb-6">
                {recommendations.map((rec, index) => (
                    <li key={index} className="mb-2">{rec}</li>
                ))}
            </ul>
            <p className="mb-4">
                Recuerda que estas son solo sugerencias. Te recomendamos investigar más sobre estas carreras
                y consultar con un orientador vocacional para obtener una guía más personalizada.
            </p>
            <Button onClick={onPrevious}>Volver al inicio</Button>
        </div>
    )
}