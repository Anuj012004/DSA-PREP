import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { SpinnerCustom } from "@/components/ui/SpinnerLoader"
import { fetchQuestions } from "@/services/api"
import { TOPICS, DIFFICULTIES } from "@/types/index"
import type { Question, Topic, Difficulty } from "@/types/index"

const ProblemView = () => {
  const { topic, difficulty } = useParams<{ topic: string; difficulty: string }>()
  const navigate = useNavigate()

  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'ai' | 'cache' | null>(null)

  const topicLabel = TOPICS.find((t) => t.id === topic)?.label || topic
  const diffInfo = DIFFICULTIES.find((d) => d.id === difficulty)

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data = await fetchQuestions(
          topic as Topic,
          difficulty as Difficulty
        )

        setQuestions(data.questions)
        setSource(data.source)
      } catch (err) {
        setError("Failed to load questions. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    if (topic && difficulty) {
      loadQuestions()
    }
  }, [topic, difficulty])

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-10">

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 font-mono text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-mono text-2xl font-bold">
            <span className="text-primary">{">"}</span> {topicLabel}
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <Badge
              className={`font-mono ${
                difficulty === "easy"
                  ? "border-green-500/50 bg-green-500/15 text-green-400"
                  : difficulty === "medium"
                  ? "border-yellow-500/50 bg-yellow-500/15 text-yellow-400"
                  : "border-red-500/50 bg-red-500/15 text-red-400"
              }`}
              variant="outline"
            >
              {diffInfo?.label}
            </Badge>

            {source && (
              <Badge variant="outline" className="font-mono text-xs text-muted-foreground">
                {source === 'cache' ? '⚡ cached' : '🤖 ai generated'}
              </Badge>
            )}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <SpinnerCustom />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-6 text-center">
            <p className="font-mono text-sm text-red-400">{error}</p>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="mt-4 font-mono"
            >
              ← Go back
            </Button>
          </div>
        )}

        {/* Questions List */}
        {!isLoading && !error && (
          <div className="space-y-3">
            {questions.map((question, idx) => (
              <Card
                key={question._id}
                onClick={() => navigate(`/problem/${question._id}`, { state: { question, topic, difficulty } })}
                className="cursor-pointer border-border bg-card transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
              >
                <CardContent className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-muted-foreground">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-sm font-medium text-card-foreground">
                      {question.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">→</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default ProblemView