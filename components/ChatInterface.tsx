'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Send, Loader2, History, X, Trash2 } from 'lucide-react'
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
  timestamp?: Date
}

const chatbots = {
  security: { name: "SecuriBot", avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%88%9B%E5%BB%BA%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%8D%E5%AD%97-vNLvATW6ARbsGKEpdLaWANF5YhKeEO.png" },
  random: { name: "RoamiBot", avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%88%9B%E5%BB%BA%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%8D%E5%AD%97-3-NKt1n3NnEuqpa7LXiEMQIiD9r9GMXh.png" },
  security2: { name: "GuardBot", avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%88%9B%E5%BB%BA%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%8D%E5%AD%97-5-y16VANCLcqZqxq0AixCId09TAiEJrd.png" }
}

export default function ChatInterface({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const chatbot = chatbots[chatId as keyof typeof chatbots] || chatbots.random

  const saveMessages = (newMessages: Message[]) => {
    localStorage.setItem(`chat-history-${chatId}`, JSON.stringify(newMessages))
  }

  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat-history-${chatId}`)
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
  }, [chatId])

  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(messages)
    }
  }, [messages, chatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await sendMessage(inputMessage, chatId)
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(`chat-history-${chatId}`);
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
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

      <div className="container max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div className="space-y-4">
          <Card className="bg-gray-900/50 border-purple-500/20 backdrop-blur-xl rounded-3xl">
            <CardContent className="p-6">
              <div className="flex gap-6 h-[80vh]">
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-purple-500/20 rounded-xl"
                      onClick={() => router.push('/')}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>

                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-purple-500 rounded-full blur animate-pulse-glow"></div>
                        <Avatar className="h-12 w-12 border-2 border-purple-500/50">
                          <AvatarImage src={chatbot.avatar} />
                          <AvatarFallback>{chatbot.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="text-sm font-medium mt-1 text-purple-200">
                        {chatbot.name}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      className="text-white hover:bg-purple-500/20 rounded-xl"
                      onClick={() => setShowHistory(!showHistory)}
                    >
                      <History className="h-4 w-4 mr-2" />
                      History
                    </Button>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-4 pr-4 thin-scrollbar">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-3 ${
                          msg.sender === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {msg.sender === 'user' ? (
                            <div className="relative">
                              <div className="absolute -inset-0.5 bg-purple-500 rounded-full blur opacity-30"></div>
                              <Avatar className="h-8 w-8 border border-purple-500/50">
                                <AvatarFallback>Me</AvatarFallback>
                              </Avatar>
                            </div>
                          ) : (
                            <div className="relative">
                              <div className="absolute -inset-0.5 bg-purple-500 rounded-full blur opacity-30"></div>
                              <Avatar className="h-8 w-8 border border-purple-500/50">
                                <AvatarImage src={chatbot.avatar} />
                                <AvatarFallback>{chatbot.name[0]}</AvatarFallback>
                              </Avatar>
                            </div>
                          )}
                        </div>

                        <div className={`flex flex-col max-w-[60%] ${
                          msg.sender === 'user' ? 'items-end' : 'items-start'
                        }`}>
                          <div className={`rounded-2xl px-4 py-2.5 ${
                            msg.sender === 'user' 
                              ? 'bg-purple-500/20 text-purple-50' 
                              : 'bg-gray-800/50 text-gray-100'
                          }`}>
                            <div className="text-sm whitespace-pre-wrap break-words">
                              {msg.text}
                            </div>
                          </div>
                          {msg.timestamp && (
                            <span className="text-[10px] text-gray-400 mt-1 px-2">
                              {new Date(msg.timestamp).toLocaleString()}
                            </span>
                          )}
                        </div>
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
                      className="flex-grow bg-gray-800 text-white border-purple-500/50 rounded-xl px-6"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      className="bg-purple-600 hover:bg-purple-700 rounded-xl px-6"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                </div>

                {showHistory && (
                  <div className="w-72 border-l border-purple-500/20 pl-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold">Chat History</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="relative text-xs text-purple-300 hover:text-purple-200 
                            bg-purple-500/10 hover:bg-purple-500/20 rounded-lg px-3 h-6 
                            flex items-center gap-1 overflow-hidden transition-all duration-300
                            group active:scale-95 active:translate-y-0.5"
                          onClick={clearHistory}
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 
                            via-purple-500/10 to-purple-500/0 group-hover:via-purple-500/20 
                            animate-shine"></span>
                          <Trash2 className="h-3 w-3" />
                          一键清空
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-purple-500/20 h-6 w-6 p-0 rounded-lg"
                          onClick={() => setShowHistory(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 overflow-y-auto max-h-[calc(80vh-6rem)] thin-scrollbar">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`text-xs p-3 rounded-xl ${
                            msg.sender === 'user' ? 'bg-purple-500/20' : 'bg-gray-800/50'
                          }`}
                        >
                          <div className="font-medium mb-1">
                            {msg.sender === 'user' ? 'You' : chatbot.name}
                          </div>
                          <div className="line-clamp-2">{msg.text}</div>
                          {msg.timestamp && (
                            <div className="text-[10px] text-gray-400 mt-1">
                              {new Date(msg.timestamp).toLocaleString()}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

