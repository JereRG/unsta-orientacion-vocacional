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
    data: {
        interests: Interest[]
    };
    onNext: (data: { interests: Interest[] }) => void;
    onPrevious: () => void;
}

export function InterestsForm({ data, onNext }: InterestsFormProps) {
    const [selectedInterests, setSelectedInterests] = React.useState<Interest[]>(data.interests || [])

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
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4 text-[#003366]">Selecciona tus áreas de interés</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {interests.map((interest, index) => (
                    <motion.button
                        key={interest}
                        className={`p-4 rounded-lg text-center transition-colors ${
                            selectedInterests.includes(interest)
                                ? 'bg-[#003366] text-white'
                                : 'bg-white text-[#003366] border border-[#003366]'
                        }`}
                        onClick={() => toggleInterest(interest)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {interest}
                    </motion.button>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Button 
                    onClick={handleSubmit} 
                    className="w-full bg-[#003366] hover:bg-[#002244] text-white"
                    disabled={selectedInterests.length === 0}
                >
                    Siguiente
                </Button>
            </motion.div>
        </div>
    )
}