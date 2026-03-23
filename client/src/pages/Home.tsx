import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import TopicSelector from "@/components/TopicSelector"
import DifficultySelector from "@/components/DifficultySelector"
import type { Topic, Difficulty } from "@/types/index"

const Home = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("easy")
  const navigate = useNavigate()

  const handleGenerate = () => {
    if (!selectedTopic) return
    navigate(`/problems/${selectedTopic}/${selectedDifficulty}`)
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-12">

        {/* Header */}
        {/* <div className="mb-12 text-center">
          <h1 className="mb-2 font-mono text-4xl font-bold tracking-tight">
            <span className="text-primary">{">"}</span> DSA Practice
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Master concepts through bite-sized problems with AI Powered Question Generator
          </p>
        </div> */}
        <div className="mb-12 text-center">
  {/* Title with AI badge */}
  <h1 className="mb-3 text-5xl font-medium tracking-tight">
    DSA Practice
    <span className="ml-3 inline-block rounded-md bg-foreground px-2.5 py-0.5 text-4xl text-background align-middle">
      AI
    </span>
  </h1>

  {/* Subtitle */}
  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
    Bite-sized problems generated on demand · tuned to your topic and difficulty
  </p>

  {/* Stats row */}
  <div className="mt-6 flex justify-center gap-10">
    {[
      { val: "5×", lbl: "problems per session" },
      { val: "∞",  lbl: "unique questions"     },
      { val: "AI", lbl: "powered engine"       },
    ].map(({ val, lbl }) => (
      <div key={lbl} className="text-center">
        <div className="font-mono text-xl font-medium">{val}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{lbl}</div>
      </div>
    ))}
  </div>

  {/* Divider */}
  <div className="mt-6 mx-auto w-16 h-px bg-border" />
</div>

        {/* Topic Selector */}
         <TopicSelector
          selectedTopic={selectedTopic}
          onSelect={setSelectedTopic}
        />

        {/* Difficulty Selector */}
         <DifficultySelector
          selectedDifficulty={selectedDifficulty}
          onSelect={setSelectedDifficulty}
        /> 

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!selectedTopic}
          size="lg"
          className="w-full font-mono text-base font-semibold tracking-wide cursor-pointer"
        >
          {selectedTopic
            ? `Generate ${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Problems of ${selectedTopic} →`
            : "Select a topic to begin"}
        </Button>

        {/* Footer */}
        <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
          <span className="text-primary">$</span> Problems are generated & cached daily
        </p>

      </div>
    </div>
  )
}

export default Home