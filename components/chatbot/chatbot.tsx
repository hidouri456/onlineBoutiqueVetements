"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { useChat } from "ai/react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickActions = [
  "Aide pour choisir ma taille",
  "Recommandations de produits",
  "Suivi de commande",
  "Politique de retour",
  "Délais de livraison",
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Bonjour ! Je suis votre assistant virtuel Boutique Mode. Comment puis-je vous aider aujourd'hui ? 👋",
      },
    ],
  })

  const [mockMode, setMockMode] = useState(false)

  useEffect(() => {
    // check if server is in mock mode
    fetch('/api/chat')
      .then((r) => r.json())
      .then((j) => setMockMode(!!j.mock))
      .catch(() => setMockMode(true))
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuickAction = (action: string) => {
    const syntheticEvent = {
      preventDefault: () => {},
      target: { value: action },
    } as React.ChangeEvent<HTMLInputElement>

    handleInputChange(syntheticEvent)

    // Simulate form submission
    const formEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>

    // If mockMode, call our API directly and append the mock response
    if (mockMode) {
      // append user message
      append({ id: String(Date.now()), role: 'user', content: action })
      fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: action }] }) })
        .then((r) => r.json())
        .then((data) => {
          if (data?.message) {
            append({ id: String(Date.now() + 1), role: 'assistant', content: data.message })
          }
        })
      return
    }

    handleSubmit(formEvent)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-accent hover:bg-accent/90"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]">
          <Card className="h-full flex flex-col shadow-2xl">
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-accent text-accent-foreground rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent-foreground/20 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">Assistant Boutique Mode</CardTitle>
                  <div className="flex items-center gap-1 text-xs opacity-90">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    En ligne
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-accent-foreground hover:bg-accent-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-accent" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.role === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{formatTime(new Date(message.createdAt || Date.now()))}</p>
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-accent" />
                  </div>
                  <div className="bg-muted text-foreground rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Actions rapides :</p>
                <div className="flex flex-wrap gap-1">
                  {quickActions.map((action) => (
                    <Badge
                      key={action}
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground text-xs py-1"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Tapez votre message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
