'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import React from 'react'

type Step = {
  title: string
  fields: React.ReactNode
}

const steps: Step[] = [
  {
    title: 'Personal Info',
    fields: (
      <div className="space-y-4">
        <Label htmlFor="fullName">Full Name</Label>
        <Input id="fullName" name="fullName" placeholder="Enter your full name" required />
      </div>
    ),
  },
  {
    title: 'Contact',
    fields: (
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input aria-required id="email" name="email" type="email" placeholder="Enter your email" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" required />
        </div>
      </div>
    ),
  },
  {
    title: 'Company',
    fields: (
      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" placeholder="Enter your company name" required />
        </div>
        <div>
          <Label htmlFor="companyType">Company Type</Label>
          <Select name="companyType" required>
            <SelectTrigger>
              <SelectValue placeholder="Select company type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brand">Brand/Advertiser</SelectItem>
              <SelectItem value="agency">Ad Agency</SelectItem>
              <SelectItem value="doohOperator">DOOH Network Operator</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    ),
  },
  {
    title: 'DOOH Interests',
    fields: (
      <div className="space-y-4">
        <Label>Which DOOH solutions are you interested in?</Label>
        {[
          'AI-Driven Audience Targeting',
          'Real-Time Content Delivery',
          'Multi-Screen Campaign Management',
          'Performance Analytics and Insights',
          'Programmatic DOOH Advertising',
          'Interactive DOOH Experiences'
        ].map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox id={option} name="interests" value={option} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: 'Campaign Goals',
    fields: (
      <div className="space-y-4">
        <Label htmlFor="campaignGoals">What are your primary DOOH campaign goals?</Label>
        <Select name="campaignGoals" required>
          <SelectTrigger>
            <SelectValue placeholder="Select primary campaign goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="brandAwareness">Increase Brand Awareness</SelectItem>
            <SelectItem value="leadGeneration">Lead Generation</SelectItem>
            <SelectItem value="salesDriven">Drive Sales/Conversions</SelectItem>
            <SelectItem value="engagement">Boost Customer Engagement</SelectItem>
            <SelectItem value="locationBased">Location-Based Marketing</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
        <Input id="additionalInfo" name="additionalInfo" placeholder="Any specific requirements or questions?" />
      </div>
    ),
  },
]

interface MultiStepModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MultiStepModal({ isOpen, setIsOpen }: MultiStepModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted!')
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setCurrentStep(0)
    setIsSubmitted(false)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSubmitted ? 'Thank You!' : steps[currentStep].title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {!isSubmitted && (
            <>
              <div className="mb-6">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  {steps.map((_, index) => (
                    <span key={index} className={index <= currentStep ? 'text-blue-600' : ''}>
                      ✨ {index + 1}
                    </span>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {steps[currentStep].fields}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    size="icon"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto bg-blue-600 hover:bg-blue-700"
                  >
                    Submit
                    <Check className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </>
          )}
          {isSubmitted && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <Check className="w-12 h-12 text-blue-600" />
              </motion.div>
              <p className="text-xl font-semibold mb-4">Thank you for your submission!</p>
              <p className="text-gray-600 mb-6">We'll get back to you shortly.</p>
              <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">Close</Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}