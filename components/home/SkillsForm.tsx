import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const skills = [
  "Comunicación", "Liderazgo", "Trabajo en equipo", "Resolución de problemas",
  "Creatividad", "Organización", "Análisis", "Adaptabilidad"
] as const

type Skill = typeof skills[number]

interface SkillsFormProps {
  data: {
    skills: Record<Skill, number>
  };
  onNext: (data: { skills: Record<Skill, number> }) => void;
  onPrevious: () => void;
}

export function SkillsForm({ data, onNext, onPrevious }: SkillsFormProps) {
  const [skillLevels, setSkillLevels] = useState<Record<Skill, number>>(data.skills || {})

  const handleChange = (skill: Skill, value: number[]) => {
    setSkillLevels(prev => ({
      ...prev,
      [skill]: value[0]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ skills: skillLevels })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Evalúa tus habilidades</h2>
      {skills.map(skill => (
        <div key={skill} className="mb-4">
          <label className="block text-sm font-medium mb-2">{skill}</label>
          <Slider
            defaultValue={[skillLevels[skill] || 0]}
            max={10}
            step={1}
            onValueChange={(value) => handleChange(skill, value)}
          />
        </div>
      ))}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrevious}>Anterior</Button>
        <Button type="submit">Siguiente</Button>
      </div>
    </form>
  )
}