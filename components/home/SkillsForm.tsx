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
  data?: {
    skills: Record<Skill, number>
  };
  onNext: (data: { skills: Record<Skill, number> }) => void;
  onPrevious: () => void;
}

export default function SkillsForm({ data, onNext, onPrevious }: SkillsFormProps) {
  const [skillLevels, setSkillLevels] = React.useState<Record<Skill, number>>(data?.skills || {})

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
    <div className="space-y-6 p-4 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Evalúa tus habilidades</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            className="aspect-square p-4 rounded-xl shadow-lg flex flex-col items-center justify-center bg-white border-2 border-blue-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-lg font-bold text-blue-600 mb-2 text-center">{skill}</span>
            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
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
          disabled={Object.keys(skillLevels).length < skills.length}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}