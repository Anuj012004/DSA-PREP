import { Card, CardContent } from "@/components/ui/card"
import { TOPICS } from "@/types/index"
import type { Topic } from "@/types/index"

interface TopicSelectorProps {
  selectedTopic: Topic | null
  onSelect: (topic: Topic) => void
}

const TopicSelector = ({ selectedTopic, onSelect }: TopicSelectorProps) => {
  return (
    <div className="mb-10">
      <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        // select a topic
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TOPICS.map((topic) => (
          <Card
            key={topic.id}
            onClick={() => onSelect(topic.id)}
            className={`cursor-pointer border-2 transition-all hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5 ${
              selectedTopic === topic.id
                ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                : "border-border bg-card"
            }`}
          >
            <CardContent className="flex flex-col items-center gap-2 p-5">
              <span className="text-3xl">{topic.icon}</span>
              <span className="font-mono text-sm font-medium text-card-foreground">
                {topic.label}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TopicSelector