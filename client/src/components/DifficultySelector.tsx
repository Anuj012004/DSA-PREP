import { DIFFICULTIES } from "@/types/index"
import type { Difficulty } from "@/types/index"

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty
  onSelect: (difficulty: Difficulty) => void
}

const DifficultySelector = ({ selectedDifficulty, onSelect }: DifficultySelectorProps) => {
  return (
    <div className="mb-10">
      <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        // select difficulty
      </h2>
      <div className="flex gap-3">
        {DIFFICULTIES.map((diff) => (
          <button
            key={diff.id}
            onClick={() => onSelect(diff.id)}
            className={`rounded-lg border-2 px-6 py-3 font-mono text-sm font-semibold transition-all ${
              selectedDifficulty === diff.id
                ? diff.id === "easy"
                  ? "border-green-500 bg-green-500/15 text-green-400"
                  : diff.id === "medium"
                  ? "border-yellow-500 bg-yellow-500/15 text-yellow-400"
                  : "border-red-500 bg-red-500/15 text-red-400"
                : "border-border text-muted-foreground hover:border-muted-foreground/40"
            }`}
          >
            {diff.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DifficultySelector