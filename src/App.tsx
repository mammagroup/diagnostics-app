import { useState } from 'react'
import { HomeScreen } from './screens/HomeScreen'
import { TestScreen } from './screens/TestScreen'
import { ResultsScreen } from './screens/ResultsScreen'
import { BackgroundArt } from './components/BackgroundArt'
import type { PatientInfo } from './types'

type Step = 'home' | 'test' | 'results'

function App() {
  const [step, setStep] = useState<Step>('home')
  const [patient, setPatient] = useState<PatientInfo | null>(null)
  const [answers, setAnswers] = useState<number[]>([])

  return (
    <div className="relative mx-auto min-h-svh max-w-md overflow-hidden bg-white/80 shadow-[0_0_40px_rgba(80,19,19,0.06)] backdrop-blur-sm">
      <BackgroundArt />
      <div className="relative">
        {step === 'home' && (
          <HomeScreen
            onStartTest={(info) => {
              setPatient(info)
              setStep('test')
            }}
          />
        )}
        {step === 'test' && patient && (
          <TestScreen
            patient={patient}
            onFinish={(result) => {
              setAnswers(result)
              setStep('results')
            }}
          />
        )}
        {step === 'results' && patient && <ResultsScreen patient={patient} answers={answers} />}
      </div>
    </div>
  )
}

export default App
