import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ResultsProps {
    data: {
        interests: string[];
        skills: Record<string, number>;
        academicPreferences: string;
        careerGoals: string;
    };
}

interface CareerRecommendation {
    name: string;
    description: string;
    link: string;
}

function getRecommendations(data: ResultsProps['data']): CareerRecommendation[] {
    // Lógica de recomendación basada en los datos del usuario
    // Esta es una versión simplificada, deberías expandirla según las carreras de la UNSTA
    const recommendations: CareerRecommendation[] = []

    if (data.interests.includes("Ciencias de la Salud")) {
        recommendations.push({
            name: "Medicina",
            description: "Carrera dedicada al estudio y práctica de la prevención, diagnóstico y tratamiento de enfermedades.",
            link: "/carreras/medicina"
        })
        recommendations.push({
            name: "Enfermería",
            description: "Profesión centrada en el cuidado de la salud y el bienestar de las personas.",
            link: "/carreras/enfermeria"
        })
    }
    if (data.interests.includes("Ciencias Jurídicas")) {
        recommendations.push({
            name: "Derecho",
            description: "Estudio de las leyes y su aplicación en la sociedad para la resolución de conflictos.",
            link: "/carreras/derecho"
        })
        recommendations.push({
            name: "Notariado",
            description: "Especialización en la formalización y autenticación de actos jurídicos.",
            link: "/carreras/notariado"
        })
    }
    if (data.interests.includes("Ingeniería")) {
        recommendations.push({
            name: "Ingeniería en Sistemas",
            description: "Diseño y desarrollo de sistemas informáticos y tecnológicos.",
            link: "/carreras/ingenieria-sistemas"
        })
        recommendations.push({
            name: "Ingeniería Industrial",
            description: "Optimización de procesos y sistemas en entornos productivos y de servicios.",
            link: "/carreras/ingenieria-industrial"
        })
    }
    // Añade más lógica de recomendación aquí

    return recommendations.slice(0, 3) // Devuelve las 3 mejores recomendaciones
}

export default function Result({ data }: ResultsProps) {
    const recommendations = getRecommendations(data)

    return (
        <div className="space-y-8 p-4 bg-white min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Tus Resultados</h2>
            
            <Card>
                <CardHeader>
                    <CardTitle>Resumen de tus respuestas</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Intereses:</strong> {data.interests.join(", ")}</p>
                    <p><strong>Preferencia académica:</strong> {data.academicPreferences}</p>
                    <p><strong>Objetivo profesional:</strong> {data.careerGoals}</p>
                    <p><strong>Habilidades destacadas:</strong> {Object.entries(data.skills)
    .filter(([, value]) => value > 3) // Solo usamos 'value', por eso omitimos el primer argumento
    .map(([key]) => key) // Solo necesitamos 'key', omitimos el segundo argumento
    .join(", ")}</p>
                </CardContent>
            </Card>

            <p className="text-lg text-center">Basado en tus respuestas, aquí tienes algunas carreras recomendadas de la UNSTA:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.map((rec, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-blue-600">{rec.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-gray-600 mb-4">{rec.description}</p>
                                <Link href={rec.link} passHref>
                                    <Button variant="outline" className="w-full">Más información</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card>
                <CardContent className="text-center py-4">
                    <p>
                        Recuerda que estas son solo sugerencias. Te recomendamos investigar más sobre estas carreras
                        y consultar con un orientador vocacional de la UNSTA para obtener una guía más personalizada.
                    </p>
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                <Link href="/" passHref>
                    <Button variant="outline" className="w-full sm:w-auto">Volver al inicio</Button>
                </Link>
                <Link href="/carreras" passHref>
                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                        Explorar todas las carreras de la UNSTA
                    </Button>
                </Link>
            </div>
        </div>
    )
}