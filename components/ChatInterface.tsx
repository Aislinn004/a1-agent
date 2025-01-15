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
    <div className="min-h-screen relative overflow-hidden bg-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-purple-950/20 to-zinc-900" />
      
      <div className="starfield">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`tiny-star-${i}`}
            className="star star-tiny"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
        
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`small-star-${i}`}
            className="star star-small"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
        
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`bright-star-${i}`}
            className="star star-medium star-bright"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`float-star-${i}`}
            className={`star star-small star-bright ${i % 2 === 0 ? 'star-float' : 'star-float-reverse'}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative h-screen flex flex-col items-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <Button
            onClick={() => router.push('/')}
            className="mb-4 w-fit bg-purple-600 hover:bg-purple-700 rounded-full px-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Card className="flex-grow bg-gray-900/50 border-purple-500/20 backdrop-blur-xl h-[80vh] rounded-3xl">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-center mb-6">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={chatbot.avatar} alt={chatbot.name} />
                  <AvatarFallback>{chatbot.name[0]}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-white">{chatbot.name}</h2>
              </div>
              <div className="flex-grow overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <Avatar className="h-8 w-8 mt-1 mr-2 flex-shrink-0">
                        <AvatarImage src={chatbot.avatar} alt={chatbot.name} />
                        <AvatarFallback>{chatbot.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] p-3 ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white rounded-2xl rounded-tr-md'
                          : 'bg-gray-700 text-gray-200 rounded-2xl rounded-tl-md'
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.sender === 'user' && (
                      <Avatar className="h-8 w-8 mt-1 ml-2 flex-shrink-0">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2 mt-auto">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-grow bg-gray-800 text-white border-purple-500/50 rounded-full px-6"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700 rounded-full px-6"
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
      </div>
    </div>
  )
}

