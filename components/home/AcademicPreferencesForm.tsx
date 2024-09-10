import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface AcademicPreference {
  id: string;
  label: string;
}

const academicPreferences: AcademicPreference[] = [
  { id: 'theoretical', label: 'Prefiero estudios teóricos y conceptuales' },
  { id: 'practical', label: 'Prefiero estudios prácticos y aplicados' },
  { id: 'research', label: 'Me interesa la investigación y el análisis' },
  { id: 'creative', label: 'Disfruto de actividades creativas y expresivas' },
]

interface AcademicPreferencesFormProps {
  data: {
    academicPreferences: {
      preference?: string;
    };
  };
  onNext: (data: { academicPreferences: { preference: string } }) => void;
  onPrevious: () => void;
}

export function AcademicPreferencesForm({ data, onNext, onPrevious }: AcademicPreferencesFormProps) {
  const [preferences, setPreferences] = useState<{ preference?: string }>(data.academicPreferences || {})

  const handleChange = (value: string) => {
    setPreferences(prev => ({
      ...prev,
      preference: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ academicPreferences: preferences as { preference: string } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Preferencias Académicas</h2>
      <RadioGroup onValueChange={handleChange} value={preferences.preference}>
        {academicPreferences.map(pref => (
          <div key={pref.id} className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value={pref.id} id={pref.id} />
            <Label htmlFor={pref.id}>{pref.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between mt-6">
        <Button type="button" variant="outline" onClick={onPrevious}>Anterior</Button>
        <Button type="submit">Siguiente</Button>
      </div>
    </form>
  )
}