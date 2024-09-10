import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const interests = [
    "Ciencias", "Tecnología", "Arte", "Humanidades", "Negocios",
    "Salud", "Educación", "Deportes", "Medio Ambiente", "Política"
] as const

type Interest = typeof interests[number]

interface InterestsFormProps {
    data: {
        interests: Record<Interest, boolean>
    };
    onNext: (data: { interests: Record<Interest, boolean> }) => void;
}

export function InterestsForm({ data, onNext }: InterestsFormProps) {
    const [selectedInterests, setSelectedInterests] = useState<Record<Interest, boolean>>(data.interests || {})

    const handleChange = (interest: Interest) => {
        setSelectedInterests(prev => ({
            ...prev,
            [interest]: !prev[interest]
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext({ interests: selectedInterests })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Selecciona tus intereses</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                {interests.map(interest => (
                    <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                            id={interest}
                            checked={selectedInterests[interest] || false}
                            onCheckedChange={() => handleChange(interest)}
                        />
                        <label htmlFor={interest} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {interest}
                        </label>
                    </div>
                ))}
            </div>
            <Button type="submit">Siguiente</Button>
        </form>
    )
}