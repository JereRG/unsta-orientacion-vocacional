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
    onRestart: () => void;
}

interface CareerRecommendation {
    name: string;
    description: string;
    link: string;
}

function getRecommendations(data: ResultsProps['data']): CareerRecommendation[] {
    const recommendations: CareerRecommendation[] = [];

    // Lógica de recomendación basada en intereses
    if (data.interests.includes("Ciencias de la Salud")) {
        recommendations.push({
            name: "Medicina",
            description: "Especialízate en la prevención, diagnóstico y tratamiento de enfermedades.",
            link: "/carreras/medicina"
        });
        recommendations.push({
            name: "Enfermería",
            description: "Cuida y asiste a los pacientes en su proceso de recuperación y bienestar.",
            link: "/carreras/enfermeria"
        });
    }

    if (data.interests.includes("Ciencias Jurídicas")) { 
        recommendations.push({ 
            name: "Derecho", 
            description: "Estudio de las leyes y su aplicación en la sociedad para la resolución de conflictos.", 
            link: "/carreras/derecho" }); 
        recommendations.push({ 
            name: "Notariado", 
            description: "Especialización en la formalización y autenticación de actos jurídicos.", 
            link: "/carreras/notariado" }) 
        }

    if (data.interests.includes("Ingeniería") && data.skills["Resolución de problemas"] >= 4) {
        recommendations.push({
            name: "Ingeniería en Sistemas",
            description: "Desarrolla sistemas informáticos que optimicen procesos y soluciones tecnológicas.",
            link: "/carreras/ingenieria-sistemas"
        });
        recommendations.push({
            name: "Ingeniería Industrial",
            description: "Gestiona y optimiza procesos en industrias para mejorar la eficiencia y productividad.",
            link: "/carreras/ingenieria-industrial"
        });
    }

    if (data.interests.includes("Ciencias Económicas") || data.skills["Liderazgo"] >= 4) {
        recommendations.push({
            name: "Administración de Empresas",
            description: "Desarrolla competencias para liderar y gestionar organizaciones de distintos sectores.",
            link: "/carreras/administracion"
        });
    }

    if (data.interests.includes("Artes y Diseño") && data.skills["Creatividad"] >= 4) {
        recommendations.push({
            name: "Diseño Gráfico",
            description: "Combina la creatividad con las técnicas de diseño para crear soluciones visuales efectivas.",
            link: "/carreras/diseno-grafico"
        });
    }

    // Lógica basada en preferencias académicas
    if (data.academicPreferences === "theoretical" || data.careerGoals === "Investigación académica") {
        recommendations.push({
            name: "Filosofía",
            description: "Explora las cuestiones fundamentales sobre la existencia, el conocimiento y la ética.",
            link: "/carreras/filosofia"
        });
        recommendations.push({
            name: "Historia",
            description: "Profundiza en el estudio de eventos históricos y sus implicancias en el presente.",
            link: "/carreras/historia"
        });
    }

    if (data.academicPreferences === "practical") {
        recommendations.push({
            name: "Arquitectura",
            description: "Diseña y planifica espacios habitables y funcionales para diversas necesidades.",
            link: "/carreras/arquitectura"
        });
    }

    if (data.academicPreferences === "research" && data.careerGoals === "Investigación académica") {
        recommendations.push({
            name: "Ciencias Biológicas",
            description: "Investiga la vida en sus diversas formas y niveles de organización.",
            link: "/carreras/biologia"
        });
    }

    if (data.academicPreferences === "creative") {
        recommendations.push({
            name: "Comunicación Social",
            description: "Aprende sobre los procesos de comunicación y cómo influyen en la sociedad.",
            link: "/carreras/comunicacion"
        });
    }

    // Lógica basada en objetivos profesionales
    if (data.careerGoals === "Emprendimiento") {
        recommendations.push({
            name: "Ingeniería Comercial",
            description: "Adquiere conocimientos para gestionar y desarrollar nuevos emprendimientos.",
            link: "/carreras/ingenieria-comercial"
        });
    }

    if (data.careerGoals === "Sector público") {
        recommendations.push({
            name: "Ciencias Políticas",
            description: "Estudia el sistema político y contribuye al desarrollo de políticas públicas.",
            link: "/carreras/ciencias-politicas"
        });
    }

    if (data.careerGoals === "Consultoría" && data.skills["Análisis"] >= 4) {
        recommendations.push({
            name: "Consultoría de Negocios",
            description: "Ofrece asesoramiento a empresas para mejorar su desempeño y estrategia.",
            link: "/carreras/consultoria"
        });
    }

    if (data.careerGoals === "Docencia") {
        recommendations.push({
            name: "Pedagogía",
            description: "Forma y capacita a futuros educadores para el ámbito escolar y académico.",
            link: "/carreras/pedagogia"
        });
    }

    // Limitamos las recomendaciones a las 5 más relevantes
    return recommendations.slice(0, 5);
}

export default function Result({ data, onRestart }: ResultsProps) {
    const recommendations = getRecommendations(data);

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
                        .filter(([, value]) => value >= 4)
                        .map(([key]) => key)
                        .join(", ")}</p>
                </CardContent>
            </Card>

            <p className="text-lg text-center">Basado en tus respuestas, te recomendamos considerar las siguientes carreras:</p>

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
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <Card>
                <CardContent className="text-center py-4">
                    <p>
                        Estas sugerencias son un punto de partida. Te recomendamos contactar a un orientador vocacional
                        de la UNSTA para una guía personalizada.
                    </p>
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                <Button variant="outline" className="w-full sm:w-auto" onClick={onRestart}>Volver al inicio</Button>
                <Link href="https://www.unsta.edu.ar/grado-posgrado/">
                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">Explorar carreras de la UNSTA</Button>
                </Link>
            </div>
        </div>
    )
}
