import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { questions } from '../src/data/questions.js'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { saveName } from '../utils/session'

export default function Quest() {
  const location = useLocation()
  const { slug } = useParams()
  const navigate = useNavigate()
  const nameFromState = location.state?.name
  const name = location.state?.name
  const [index, setIndex] = useState(0)

  if (nameFromState) saveName(nameFromState)

  const [selections, setSelections] = useState({})
  const question = questions[index]

  const selectedSet = useMemo(() => {
    const qid = question?.id
    return selections[qid] ?? new Set()
  }, [selections, question])

  const toggleOption = (optionIndex) => {
    const qid = question.id

    setSelections((prev) => {
      const current = prev[qid] ? new Set(prev[qid]) : new Set()
      if (current.has(optionIndex)) current.delete(optionIndex)
      else current.add(optionIndex)

      return {
        ...prev,
        [qid]: current
      }
    })
  }

  const handleNext = () => {
    if (index < questions.length - 1) setIndex((i) => i + 1)
    else navigate(`/${slug}/certificate`, { state: { name, selections } })
  }

  if (!name) {
    return (
      <div className="text-center">
        <p>Сесія втрачена</p>
      </div>
    )
  }

  const isDisabled = selectedSet.size === 0

  return (
    <>
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">{name}, розпочнемо ✨</h2>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-2 mb-6 mt-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i <= index ? 'bg-purple-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-purple-300">
            {question.title}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              const checked = selectedSet.has(i)

              return (
                <label
                  key={i}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition duration-200 cursor-pointer select-none
                    ${
                      checked
                        ? 'border-purple-400 bg-purple-100'
                        : 'border-gray-200 bg-purple-200'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleOption(i)}
                    className="h-5 w-5 accent-purple-600"
                  />
                  <span className="text-gray-600">{option}</span>
                </label>
              )
            })}
          </div>

          {/* CTA */}
          <button
            onClick={handleNext}
            disabled={isDisabled}
            className={`w-full py-3 rounded-xl font-semibold transition duration-200
                    ${
                      isDisabled
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:opacity-90'
                    }`}
          >
            {index < questions.length - 1 ? 'Відповісти' : 'Зберегти'}
          </button>

          <p className="text-center text-xs text-gray-400">
            Можна обрати кілька варіантів ✨
          </p>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
