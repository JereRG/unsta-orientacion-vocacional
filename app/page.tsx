"use client";

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from '@/components/home/Stepper'
import { InterestsForm } from '@/components/home/InterestsForm'
import { SkillsForm } from '@/components/home/SkillsForm'
import { AcademicPreferencesForm } from '@/components/home/AcademicPreferencesForm'
import { ProfessionalGoalsForm } from '@/components/home/ProfessionalGoalsForm'
import { Results } from '@/components/home/Results'

interface FormData {
  interests: Record<string, boolean>;
  skills: Record<string, number>;
  academicPreferences: {
    preference?: string;
  };
  professionalGoals: {
    goals: string;
  };
}

interface StepComponentProps {
  data: FormData;
  onNext: (data: Partial<FormData>) => void;
  onPrevious: () => void;
  isLastStep: boolean;
}

type StepComponent = React.ComponentType<StepComponentProps>;

interface Step {
  title: string;
  component: StepComponent;
}

export default function VocationalGuidanceApp() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    interests: {},
    skills: {},
    academicPreferences: {},
    professionalGoals: { goals: '' }
  })

  const steps: Step[] = [
    { title: 'Intereses', component: InterestsForm },
    { title: 'Habilidades', component: SkillsForm },
    { title: 'Preferencias Académicas', component: AcademicPreferencesForm },
    { title: 'Objetivos Profesionales', component: ProfessionalGoalsForm },
    { title: 'Resultados', component: Results as StepComponent }
  ]

  const handleNext = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data })
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const CurrentStepComponent = steps[step].component

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Orientación Vocacional</CardTitle>
          <CardDescription>Descubre tu camino profesional</CardDescription>
        </CardHeader>
        <CardContent>
          <Stepper steps={steps.map(s => s.title)} currentStep={step} />
          <CurrentStepComponent
            data={formData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLastStep={step === steps.length - 1}
          />
        </CardContent>
      </Card>
    </div>
  )
}