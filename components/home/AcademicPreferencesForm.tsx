import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

export const academicPreferences = [
  { id: 'theoretical', label: 'Prefiero estudios teóricos y conceptuales' },
  { id: 'practical', label: 'Prefiero estudios prácticos y aplicados' },
  { id: 'research', label: 'Me interesa la investigación y el análisis' },
  { id: 'creative', label: 'Disfruto de actividades creativas y expresivas' },
] as const

export type AcademicPreference = typeof academicPreferences[number]['id']

interface AcademicPreferencesFormProps {
  data?: {
    academicPreferences: AcademicPreference
  };
  onNext: (data: { academicPreferences: AcademicPreference }) => void;
  onPrevious: () => void;
}

export default function AcademicPreferencesForm({ data, onNext, onPrevious }: AcademicPreferencesFormProps) {
  const [preference, setPreference] = React.useState<AcademicPreference | undefined>(data?.academicPreferences)

  const handleSubmit = () => {
    if (preference) {
      onNext({ academicPreferences: preference })
    }
  }

  return (
    <div className="space-y-6 p-4 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Preferencias Académicas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {academicPreferences.map((pref, index) => (
          <motion.button
            key={pref.id}
            className={`aspect-square p-4 rounded-xl text-center transition-colors shadow-lg flex items-center justify-center ${
              preference === pref.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border-2 border-blue-600'
            }`}
            onClick={() => setPreference(pref.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-lg font-bold">{pref.label}</span>
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
          disabled={!preference}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
