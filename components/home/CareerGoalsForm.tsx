import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

export const careerGoals = [
  "Emprendimiento", "Investigación académica", "Sector público",
  "Empresa privada", "Organizaciones sin fines de lucro", "Docencia",
  "Consultoría", "Desarrollo tecnológico"
] as const

export type CareerGoal = typeof careerGoals[number]

interface CareerGoalsFormProps {
  data: {
    careerGoals: CareerGoal
  };
  onNext: (data: { careerGoals: CareerGoal }) => void;
  onPrevious: () => void;
}

export function CareerGoalsForm({ data, onNext, onPrevious }: CareerGoalsFormProps) {
  const [selectedGoal, setSelectedGoal] = React.useState<CareerGoal | null>(data.careerGoals || null)

  const handleSubmit = () => {
    if (selectedGoal) {
      onNext({ careerGoals: selectedGoal })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-[#003366]">Selecciona tu objetivo profesional principal</h2>
      <div className="grid grid-cols-2 gap-4">
        {careerGoals.map((goal, index) => (
          <motion.button
            key={goal}
            className={`p-4 rounded-lg text-center transition-colors ${
              selectedGoal === goal
                ? 'bg-[#003366] text-white'
                : 'bg-white text-[#003366] border border-[#003366]'
            }`}
            onClick={() => setSelectedGoal(goal)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {goal}
          </motion.button>
        ))}
      </div>
      <div className="flex justify-between">
        <Button onClick={onPrevious} variant="outline">Anterior</Button>
        <Button 
          onClick={handleSubmit} 
          className="bg-[#003366] hover:bg-[#002244] text-white"
          disabled={!selectedGoal}
        >
          Ver Resultados
        </Button>
      </div>
    </div>
  )
}