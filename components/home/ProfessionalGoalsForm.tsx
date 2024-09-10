import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ProfessionalGoalsFormProps {
    data: {
        professionalGoals?: {
            goals?: string;
        };
    };
    onNext: (data: { professionalGoals: { goals: string } }) => void;
    onPrevious: () => void;
}

export function ProfessionalGoalsForm({ data, onNext, onPrevious }: ProfessionalGoalsFormProps) {
    const [goals, setGoals] = useState(data.professionalGoals?.goals || '')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onNext({ professionalGoals: { goals } })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Objetivos Profesionales</h2>
            <Textarea
                placeholder="Describe tus objetivos profesionales a corto y largo plazo..."
                value={goals}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setGoals(e.target.value)}
                rows={6}
                className="mb-4"
            />
            <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={onPrevious}>Anterior</Button>
                <Button type="submit">Ver Resultados</Button>
            </div>
        </form>
    )
}