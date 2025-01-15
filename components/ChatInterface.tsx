'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Send, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { sendMessage } from '@/app/actions'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

const chatbots = {
  security: { name: "SecuriBot", avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%88%9B%E5%BB%BA%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%8D%E5%AD%97-vNLvATW6ARbsGKEpdLaWANF5YhKeEO.png" },
  random: { name: "RoamiBot", avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%88%9B%E5%BB%BA%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%8D%E5%AD%97-3-NKt1n3NnEuqpa7LXiEMQIiD9r9GMXh.png" },
  security2: { name: "GuardBot", avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%88%9B%E5%BB%BA%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%8D%E5%AD%97-5-y16VANCLcqZqxq0AixCId09TAiEJrd.png" }
}

export default function ChatInterface({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const chatbot = chatbots[chatId as keyof typeof chatbots] || chatbots.random

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() === '' || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await sendMessage(inputMessage, chatId)
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
      }
      setMessages((prevMessages) => [...prevMessages, botMessage])
    } catch (error) {
      console.error('Error in handleSendMessage:', error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: error instanceof Error 
          ? `错误: ${error.message}` 
          : "抱歉，我现在遇到了一些技术问题，请稍后再试。",
        sender: 'bot',
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        className="mb-4 text-white hover:text-purple-300"
        onClick={() => router.push('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Chat Rooms
      </Button>
      <Card className="bg-gradient-to-b from-purple-900/50 to-purple-900/10 border border-purple-500/20 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-center mb-6">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={chatbot.avatar} alt={chatbot.name} />
              <AvatarFallback>{chatbot.name[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-white">{chatbot.name}</h2>
          </div>
          <div className="space-y-4 h-[60vh] overflow-y-auto mb-4 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={chatbot.avatar} alt={chatbot.name} />
                    <AvatarFallback>{chatbot.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-gray-700 text-gray-200 rounded-tl-none'
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow bg-gray-800 text-white border-purple-500/50"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

