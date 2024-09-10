"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from '@/components/home/Stepper'
import { InterestsForm, Interest } from '@/components/home/InterestsForm'
import { SkillsForm, Skill } from '@/components/home/SkillsForm'
import { AcademicPreferencesForm, AcademicPreference } from '@/components/home/AcademicPreferencesForm'
import { CareerGoalsForm, CareerGoal } from '@/components/home/CareerGoalsForm'
import { Results } from '@/components/home/Results'
import { Header } from '@/components/home/Header'

interface FormData {
  interests: Interest[];
  skills: Record<Skill, number>;
  academicPreferences: AcademicPreference;
  careerGoals: CareerGoal;
}

interface StepComponentProps {
  data: FormData;
  onNext: (data: Partial<FormData>) => void;
  onPrevious: () => void;
}

type StepComponent = React.ComponentType<StepComponentProps>;

interface Step {
  title: string;
  component: StepComponent;
}

export default function VocationalGuidanceApp() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    interests: [],
    skills: {} as Record<Skill, number>,
    academicPreferences: '' as AcademicPreference,
    careerGoals: '' as CareerGoal
  })

  const steps: Step[] = [
    { title: 'Intereses', component: InterestsForm as StepComponent },
    { title: 'Habilidades', component: SkillsForm as StepComponent },
    { title: 'Preferencias Académicas', component: AcademicPreferencesForm as StepComponent },
    { title: 'Objetivos Profesionales', component: CareerGoalsForm as StepComponent },
    { title: 'Resultados', component: Results as StepComponent }
  ]

  const handleNext = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data })
    setStep(prevStep => prevStep + 1)
  }

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1)
  }

  const CurrentStepComponent = steps[step].component

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-[#003366] text-white">
              <CardTitle className="text-2xl">Orientación Vocacional UNSTA</CardTitle>
              <CardDescription className="text-gray-200">Descubre tu camino profesional en nuestra universidad</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Stepper steps={steps.map(s => s.title)} currentStep={step} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <CurrentStepComponent
                    data={formData}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                  />
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}