import React from 'react'
import { motion } from 'framer-motion'

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex justify-between mb-8 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center mx-2">
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              index <= currentStep ? 'border-[#003366] bg-[#003366] text-white' : 'border-gray-300 text-gray-500'
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {index + 1}
          </motion.div>
          <span className={`mt-2 text-sm ${index <= currentStep ? 'text-[#003366] font-semibold' : 'text-gray-500'}`}>
            {step}
          </span>
          {index < steps.length - 1 && (
            <motion.div
              className={`h-0.5 w-full mt-2 ${index < currentStep ? 'bg-[#003366]' : 'bg-gray-300'}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            />
          )}
        </div>
      ))}
    </div>
  )
}