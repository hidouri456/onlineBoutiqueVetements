"use client"

import { Badge } from "@/components/ui/badge"

interface ChatSuggestionsProps {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
}

export function ChatSuggestions({ suggestions, onSuggestionClick }: ChatSuggestionsProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Suggestions :</p>
      <div className="flex flex-wrap gap-1">
        {suggestions.map((suggestion, index) => (
          <Badge
            key={index}
            variant="outline"
            className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-xs py-1 transition-colors"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </Badge>
        ))}
      </div>
    </div>
  )
}
