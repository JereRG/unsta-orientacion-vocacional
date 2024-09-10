import React from 'react'

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={index} className={`flex items-center ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${index <= currentStep ? 'border-primary' : 'border-muted'}`}>
            {index + 1}
          </div>
          <span className="ml-2">{step}</span>
          {index < steps.length - 1 && <div className={`h-0.5 w-12 mx-2 ${index < currentStep ? 'bg-primary' : 'bg-muted'}`} />}
        </div>
      ))}
    </div>
  )
}