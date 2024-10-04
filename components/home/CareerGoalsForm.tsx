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
  data?: {
    careerGoals: CareerGoal
  };
  onNext: (data: { careerGoals: CareerGoal }) => void;
  onPrevious: () => void;
}

export default function CareerGoalsForm({ data, onNext, onPrevious }: CareerGoalsFormProps) {
  const [selectedGoal, setSelectedGoal] = React.useState<CareerGoal | null>(data?.careerGoals || null)

  const handleSubmit = () => {
    if (selectedGoal) {
      onNext({ careerGoals: selectedGoal })
    }
  }

  return (
    <div className="space-y-6 p-4 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Selecciona tu objetivo profesional principal</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {careerGoals.map((goal, index) => (
          <motion.button
            key={goal}
            className={`aspect-square p-4 rounded-xl text-center transition-colors shadow-lg flex items-center justify-center ${
              selectedGoal === goal
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border-2 border-blue-600'
            }`}
            onClick={() => setSelectedGoal(goal)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-lg font-bold">{goal}</span>
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
          disabled={!selectedGoal}
        >
          Ver Resultados
        </Button>
      </div>
    </div>
  )
}