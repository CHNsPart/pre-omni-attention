'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, RotateCw, AlertCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import React from 'react'
import { cn } from "@/lib/utils"
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import dynamic from 'next/dynamic'

const OptimizedImage = dynamic(() => import('../OptimizedImage'), {
  loading: () => <p>Loading...</p>,
})

type Step = {
  title: string
  fields: React.ReactNode
}


interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  companyName: string
  companyType: string
  interests: string[]
  campaignGoals: string
  additionalInfo: string
}

interface MultiStepModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  images?: string[]
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phoneNumber: '',
  companyName: '',
  companyType: '',
  interests: [],
  campaignGoals: '',
  additionalInfo: '',
}

export function ModalTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors relative overflow-hidden group"
    >
      <span className="group-hover:-translate-x-full transition-transform duration-500 inline-block">
        Book a free 10 min demo
      </span>
      <span className="absolute inset-0 flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-500">
        📢
      </span>
    </button>
  )
}

export default function MultiStepModal({ isOpen, setIsOpen, images = [] }: MultiStepModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    console.log('Form data updated:', { ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    console.log('Form data updated:', { ...formData, [name]: value })
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => {
      const newInterests = checked
        ? [...prev.interests, value]
        : prev.interests.filter(interest => interest !== value)
      console.log('Form data updated:', { ...prev, interests: newInterests })
      return { ...prev, interests: newInterests }
    })
  }

  const validateStep = () => {
    if (formRef.current) {
      const form = formRef.current;
      if (currentStep === 0) {
        const nameInput = form.elements.namedItem('fullName') as HTMLInputElement;
        if (!nameInput.value.trim()) {
          setError("Oops! We didn't catch your name. Mind sharing it with us?");
          return false;
        }
      } else if (currentStep === 1) {
        const emailInput = form.elements.namedItem('email') as HTMLInputElement;
        if (!emailInput.value.trim()) {
          setError("Oh no! We're missing your email. How else will we send you amazing updates?");
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(emailInput.value.trim())) {
          setError("Hmm, that email doesn't look quite right. Could you double-check it?");
          return false;
        }
      }
    }
    setError(null); // Clear error when validation passes
    return true;
  };

  const resetForm = () => {
    setCurrentStep(0)
    setIsSubmitted(false)
    setError(null)
    setFormData(initialFormData)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setError(null); // Clear error when going back
  };

  const handleNext = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      console.log(`Moving from step ${currentStep} to ${currentStep + 1}`);
      setCurrentStep(prev => prev + 1);
    } else {
      console.log(`Staying on step ${currentStep}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
  
    console.log(`Submit attempted. Current step: ${currentStep}, isSubmitting: ${isSubmitting}`);
  
    if (currentStep === steps.length - 1 && isSubmitting) {
      if (validateStep()) {
        console.log('Attempting to submit form data:', formData);
        try {
          const response = await axios.post('/api/submit', formData);
          console.log('Form submitted successfully:', response.data);
          setIsSubmitted(true);
          setError(null);
          toast({
            title: "Success",
            description: "Your form has been submitted successfully.",
          });
        } catch (error) {
          console.error('Error submitting form:', error);
          setError('There was an error submitting the form. Please try again.');
          toast({
            variant: "destructive",
            title: "Error",
            description: "There was a problem submitting your form.",
          });
        } finally {
          setIsSubmitting(false);
        }
      }
    } else {
      console.log('Not submitting, either not on last step or submit not initiated');
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  useEffect(() => {
    console.log(`Current step changed to: ${currentStep}`);
    if (currentStep === steps.length - 1) {
      console.log('Reached last step');
    }
  }, [currentStep]);

  const steps: Step[] = [
    {
      title: 'Personal Info',
      fields: (
        <div className="space-y-4">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            name="fullName" 
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name" 
            required 
          />
        </div>
      ),
    },
    {
      title: 'Contact',
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phoneNumber" 
              type="tel" 
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number" 
              required 
            />
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
            <Input 
              id="companyName" 
              name="companyName" 
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Enter your company name" 
              required 
            />
          </div>
          <div>
            <Label htmlFor="companyType">Company Type</Label>
            <Select 
              name="companyType" 
              value={formData.companyType}
              onValueChange={(value) => handleSelectChange('companyType', value)}
              required
            >
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
              <Checkbox 
                id={option} 
                name="interests" 
                value={option}
                checked={formData.interests.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
              />
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
          <Select 
            name="campaignGoals"
            value={formData.campaignGoals}
            onValueChange={(value) => handleSelectChange('campaignGoals', value)}
            required
          >
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
          <Input 
            id="additionalInfo" 
            name="additionalInfo" 
            value={formData.additionalInfo}
            onChange={handleInputChange}
            placeholder="Any specific requirements or questions?" 
          />
        </div>
      ),
    },
  ]

  console.log(`Rendering MultiStepModal. Current step: ${currentStep}`);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 h-full w-full flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            className={cn(
              "w-full max-w-[425px] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 rounded-2xl relative z-50 flex flex-col overflow-hidden"
            )}
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>

            <div className="flex flex-col p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">
                {isSubmitted ? 'Thank You!' : steps[currentStep].title}
              </h2>

              {images.length > 0 && (
                <div className="flex justify-center items-center mb-6 overflow-x-auto">
                  {images.map((image, idx) => (
                    <motion.div
                      key={`image-${idx}`}
                      style={{
                        rotate: Math.random() * 20 - 10,
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 0,
                        zIndex: 100,
                      }}
                      className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                    >
                      <OptimizedImage
                        src={image}
                        alt={`Demo image ${idx + 1}`}
                        width={100}
                        height={100}
                        className="rounded-lg h-20 w-20 object-cover flex-shrink-0"
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit}>
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

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center"
                      >
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {error}
                      </motion.div>
                    )}

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
                      {currentStep < steps.length - 1 && (
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="ml-auto bg-blue-600 hover:bg-blue-700"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button> 
                      )}
                      {currentStep === steps.length - 1 && (
                        <Button
                          type="submit"
                          className="ml-auto bg-blue-600 hover:bg-blue-700"
                          onClick={() => setIsSubmitting(true)}
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
                    <p className="text-gray-600 mb-6">We&apos;ll get back to you shortly.</p>
                    <div className="flex flex-col space-y-4">
                      <Button onClick={() => setIsOpen(false)} className="bg-blue-600 hover:bg-blue-700 w-full">
                        Close
                      </Button>
                      <Button 
                        onClick={resetForm} 
                        variant="outline" 
                        className="w-full hover:bg-gray-100 flex items-center justify-center"
                      >
                        <RotateCw className="w-4 h-4 mr-2" />
                        Resubmit
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}



