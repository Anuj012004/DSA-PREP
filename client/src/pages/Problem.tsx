import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Lightbulb, Code } from "lucide-react"
import { DIFFICULTIES } from "@/types/index"
import type { Question } from "@/types/index"

const Problem = () => {
  const navigate = useNavigate()
  const location = useLocation()
  useParams<{ id: string }>()

  useEffect(() => {
    if (!location.state) {
      navigate('/')
    }
  }, [location.state, navigate])

  if (!location.state) return null

  const { question, topic, difficulty } = location.state as {
    question: Question
    topic: string
    difficulty: string
  }

  if (!question) {
    return (
      <div className="dark flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center font-mono">
          <p className="text-muted-foreground">Problem not found.</p>
          <Button variant="outline" onClick={() => navigate("/")} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  const diffColor =
    difficulty === "easy"
      ? "border-green-500/50 bg-green-500/15 text-green-400"
      : difficulty === "medium"
      ? "border-yellow-500/50 bg-yellow-500/15 text-yellow-400"
      : "border-red-500/50 bg-red-500/15 text-red-400"

  const openInIDE = (lang: string) => {
    const baseUrls: Record<string, string> = {
      python: 'https://onecompiler.com/python',
      javascript: 'https://onecompiler.com/javascript',
      java: 'https://onecompiler.com/java',
      cpp: 'https://onecompiler.com/cpp',
    }

    const DEFAULT_CODE: Record<string, string> = {
      python: `# Problem: ${question.title}
# ${question.description}
# Example Input: ${question.exampleInput}
# Example Output: ${question.exampleOutput}
# Hint: ${question.hint}

# Write your solution here
def solution():
    pass
`,
      javascript: `// Problem: ${question.title}
// ${question.description}
// Example Input: ${question.exampleInput}
// Example Output: ${question.exampleOutput}
// Hint: ${question.hint}

// Write your solution here
function solution() {

}

console.log(solution())
`,
      java: `// Problem: ${question.title}
// ${question.description}
// Example Input: ${question.exampleInput}
// Example Output: ${question.exampleOutput}
// Hint: ${question.hint}

public class Main {
  public static void main(String[] args) {
    // Write your solution here
  }
}
`,
      cpp: `// Problem: ${question.title}
// ${question.description}
// Example Input: ${question.exampleInput}
// Example Output: ${question.exampleOutput}
// Hint: ${question.hint}

#include<bits/stdc++.h>
using namespace std;

int main() {
  // Write your solution here
  return 0;
}
`,
    }

    navigator.clipboard.writeText(DEFAULT_CODE[lang])
    window.open(baseUrls[lang], '_blank')
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-10">

        <Button
          variant="ghost"
          onClick={() => navigate(`/problems/${topic}/${difficulty}`)}
          className="mb-6 font-mono text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Button>

        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className="font-mono text-xl font-bold text-foreground">
              {question.title}
            </h1>
            <Badge variant="outline" className={`font-mono ${diffColor}`}>
              {DIFFICULTIES.find((d) => d.id === difficulty)?.label}
            </Badge>
          </div>
        </div>

        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <p className="font-mono text-sm leading-relaxed text-card-foreground whitespace-pre-wrap">
            {question.description}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            // example
          </h2>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="font-mono text-xs">
              <div className="mb-1">
                <span className="text-muted-foreground">Input: </span>
                <span className="text-primary">{question.exampleInput}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Output: </span>
                <span className="text-foreground font-semibold">{question.exampleOutput}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            // constraints
          </h2>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="font-mono text-xs text-muted-foreground">
              <span className="text-primary mr-2">•</span>
              {question.constraints}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="hint" className="border-border">
              <AccordionTrigger className="font-mono text-sm text-muted-foreground hover:text-foreground">
                <span className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" /> Show Hint
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="font-mono text-xs text-muted-foreground pl-1">
                  <span className="text-primary mr-2">1.</span>
                  {question.hint}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Open in IDE Section */}
        <div className="mb-8">
          <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            // solve it
          </h2>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="mb-1 font-mono text-xs text-muted-foreground">
              Pick a language — starter code will be copied to clipboard automatically:
            </p>
            <p className="mb-3 font-mono text-xs text-primary">
              → Press Ctrl+A then Ctrl+V in the IDE to paste your code
            </p>
            <div className="flex flex-wrap gap-2">
              {['python', 'javascript', 'java', 'cpp'].map((lang) => (
                <Button
                  key={lang}
                  variant="outline"
                  size="sm"
                  onClick={() => openInIDE(lang)}
                  className="font-mono text-xs"
                >
                  <Code className="mr-2 h-3 w-3" />
                  {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between border-t border-border pt-6">
          <Button
            variant="outline"
            onClick={() => navigate(`/problems/${topic}/${difficulty}`)}
            className="font-mono"
          >
            ← All Problems
          </Button>
        </div>

      </div>
    </div>
  )
}

export default Problem
