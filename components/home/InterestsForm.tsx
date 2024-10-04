import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

export const interests = [
    "Ciencias de la Salud", "Ciencias Jurídicas", "Ciencias Económicas",
    "Ciencias Sociales", "Ingeniería", "Arquitectura", "Artes y Diseño",
    "Ciencias de la Educación", "Teología", "Filosofía"
] as const

export type Interest = typeof interests[number]

interface InterestsFormProps {
    data?: {
        interests: Interest[]
    };
    onNext: (data: { interests: Interest[] }) => void;
    onPrevious: () => void;
}

export default function InterestsForm({ data, onNext, onPrevious }: InterestsFormProps) {
    const [selectedInterests, setSelectedInterests] = React.useState<Interest[]>(data?.interests || [])

    const toggleInterest = (interest: Interest) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        )
    }

    const handleSubmit = () => {
        onNext({ interests: selectedInterests })
    }

    return (
        <div className="space-y-6 p-4 bg-white min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Selecciona tus áreas de interés</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {interests.map((interest, index) => (
                    <motion.button
                        key={interest}
                        className={`aspect-square p-4 rounded-xl text-center transition-colors shadow-lg flex items-center justify-center ${
                            selectedInterests.includes(interest)
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-blue-600 border-2 border-blue-600'
                        }`}
                        onClick={() => toggleInterest(interest)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <span className="text-lg font-bold">{interest}</span>
                    </motion.button>
                ))}
            </div>
            <div className="flex justify-between mt-6">
                <Button 
                    onClick={onPrevious}
                    className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-100"
                >
                    Anterior
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={selectedInterests.length === 0}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}