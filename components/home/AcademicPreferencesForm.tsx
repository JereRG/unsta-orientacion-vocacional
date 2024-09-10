import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export const academicPreferences = [
  { id: 'theoretical', label: 'Prefiero estudios teóricos y conceptuales' },
  { id: 'practical', label: 'Prefiero estudios prácticos y aplicados' },
  { id: 'research', label: 'Me interesa la investigación y el análisis' },
  { id: 'creative', label: 'Disfruto de actividades creativas y expresivas' },
] as const

export type AcademicPreference = typeof academicPreferences[number]['id']

interface AcademicPreferencesFormProps {
  data: {
    academicPreferences: AcademicPreference
  };
  onNext: (data: { academicPreferences: AcademicPreference }) => void;
  onPrevious: () => void;
}

export function AcademicPreferencesForm({ data, onNext, onPrevious }: AcademicPreferencesFormProps) {
  const [preference, setPreference] = React.useState<AcademicPreference>(data.academicPreferences || '')

  const handleSubmit = () => {
    if (preference) {
      onNext({ academicPreferences: preference })
    }
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <h2 className="text-2xl font-bold mb-4 text-[#003366]">Preferencias Académicas</h2>
      <RadioGroup value={preference} onValueChange={(value: AcademicPreference) => setPreference(value)}>
        {academicPreferences.map((pref, index) => (
          <motion.div
            key={pref.id}
            className="flex items-center space-x-2 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RadioGroupItem value={pref.id} id={pref.id} />
            <Label htmlFor={pref.id}>{pref.label}</Label>
          </motion.div>
        ))}
      </RadioGroup>
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={onPrevious}>Anterior</Button>
        <Button 
          type="submit" 
          className="bg-[#003366] hover:bg-[#002244] text-white"
          disabled={!preference}
        >
          Siguiente
        </Button>
      </div>
    </form>
  )
}