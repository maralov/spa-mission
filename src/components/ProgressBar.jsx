import { motion } from 'framer-motion'

const steps = ['Запрошення', 'Квест', 'Сертифікат']

export default function ProgressBar({ currentStep = 0 }) {
  const progress = (currentStep / (steps.length - 1)) * 100

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Step labels */}
      <div className="flex justify-between mb-2">
        {steps.map((label, i) => (
          <span
            key={label}
            className={`text-xs font-medium transition-colors duration-300 ${
              i <= currentStep ? 'text-glow' : 'text-white/40'
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Track */}
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary via-glow to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
