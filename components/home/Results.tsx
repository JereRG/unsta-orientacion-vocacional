import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface ResultsProps {
    data: {
        interests: string[];
        skills: Record<string, number>;
        academicPreferences: string;
        careerGoals: string;
    };
}

function getRecommendations(data: ResultsProps['data']): string[] {
    // Lógica de recomendación basada en los datos del usuario
    // Esta es una versión simplificada, deberías expandirla según las carreras de la UNSTA
    const recommendations = []

    if (data.interests.includes("Ciencias de la Salud")) {
        recommendations.push("Medicina", "Enfermería")
    }
    if (data.interests.includes("Ciencias Jurídicas")) {
        recommendations.push("Derecho", "Notariado")
    }
    if (data.interests.includes("Ingeniería")) {
        recommendations.push("Ingeniería en Sistemas", "Ingeniería Industrial")
    }
    // Añade más lógica de recomendación aquí

    return recommendations.slice(0, 3) // Devuelve las 3 mejores recomendaciones
}

export function Results({ data }: ResultsProps) {
    const recommendations = getRecommendations(data)

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4 text-[#003366]">Tus Resultados</h2>
            <p className="mb-4">Basado en tus respuestas, aquí tienes algunas carreras recomendadas de la UNSTA:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h3 className="text-lg font-semibold text-[#003366]">{rec}</h3>
                        <p className="text-sm text-gray-600">Carrera recomendada</p>
                    </motion.div>
                ))}
            </div>
            <p className="mt-4">
                Recuerda que estas son solo sugerencias. Te recomendamos investigar más sobre estas carreras
                y consultar con un orientador vocacional de la UNSTA para obtener una guía más personalizada.
            </p>
            <div className="flex justify-between mt-6">
                <Link href="/" passHref>
                    <Button variant="outline">Volver al inicio</Button>
                </Link>
                <Link href="/carreras" passHref>
                    <Button className="bg-[#003366] hover:bg-[#002244] text-white">
                        Explorar carreras de la UNSTA
                    </Button>
                </Link>
            </div>
        </div>
    )
}