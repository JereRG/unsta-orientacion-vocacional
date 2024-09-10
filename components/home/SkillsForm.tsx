import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'

export const skills = [
  "Comunicación", "Liderazgo", "Trabajo en equipo", "Resolución de problemas",
  "Creatividad", "Organización", "Análisis", "Adaptabilidad"
] as const

export type Skill = typeof skills[number]

interface SkillsFormProps {
  data: {
    skills: Record<Skill, number>
  };
  onNext: (data: { skills: Record<Skill, number> }) => void;
  onPrevious: () => void;
}

export function SkillsForm({ data, onNext, onPrevious }: SkillsFormProps) {
  const [skillLevels, setSkillLevels] = React.useState<Record<Skill, number>>(data.skills || {})

  const handleRating = (skill: Skill, rating: number) => {
    setSkillLevels(prev => ({
      ...prev,
      [skill]: rating
    }))
  }

  const handleSubmit = () => {
    onNext({ skills: skillLevels })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-[#003366]">Evalúa tus habilidades</h2>
      {skills.map((skill, index) => (
        <motion.div
          key={skill}
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <label className="block text-sm font-medium mb-2">{skill}</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star
                key={rating}
                className={`cursor-pointer transition-colors ${
                  rating <= (skillLevels[skill] || 0)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
                onClick={() => handleRating(skill, rating)}
              />
            ))}
          </div>
        </motion.div>
      ))}
      <div className="flex justify-between">
        <Button onClick={onPrevious} variant="outline">Anterior</Button>
        <Button 
          onClick={handleSubmit} 
          className="bg-[#003366] hover:bg-[#002244] text-white"
          disabled={Object.keys(skillLevels).length < skills.length}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}