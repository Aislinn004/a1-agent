import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'

export default function ChatRoomSelection() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景渐变层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-purple-950/20 to-zinc-900" />
      
      {/* 星空背景 */}
      <div className="starfield">
        {/* 小型静态星星 */}
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
        
        {/* 中型星星 */}
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
        
        {/* 明亮的星星 */}
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
        
        {/* 漂浮星星 */}
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
      
      {/* 动态光效背景 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* 内容区域 */}
      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-glow animate-glow">
              漫游聊天天室
            </h1>
            <p className="text-xl text-gray-400">
              Roaming chat room
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {/* Security Bot Card 1 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative flex flex-col bg-gradient-to-b from-purple-900/50 to-purple-900/10 border border-purple-500/20 backdrop-blur-xl rounded-2xl p-6 h-full">
                <div className="relative w-full aspect-[4/3] mb-6 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-purple-500/20"></div>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%88%9B%E5%BB%BA%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%8D%E5%AD%97-vNLvATW6ARbsGKEpdLaWANF5YhKeEO.png"
                    alt="Cute Robot Character"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">闪聊侠Flash Chat</h3>
                <p className="text-purple-100 text-xs mb-6 flex-grow">
                  我是闪聊侠😎，反应敏捷秒回消息，还能帮你解决日常生活难题、陪你谈天说地。
                </p>
                <Link href="/chat/security" className="group/btn flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:translate-x-1">
                  chat
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Random Roaming Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative flex flex-col bg-gradient-to-b from-purple-900/50 to-purple-900/10 border border-purple-500/20 backdrop-blur-xl rounded-2xl p-6 h-full">
                <div className="relative w-full aspect-[4/3] mb-6 rounded-xl overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%88%9B%E5%BB%BA%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%8D%E5%AD%97-3-NKt1n3NnEuqpa7LXiEMQIiD9r9GMXh.png"
                    alt="Purple Galaxy"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-purple-500/20"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">随机漫游Random</h3>
                <p className="text-purple-100 text-xs mb-6 flex-grow">
                  我是一个超级话唠的幽默机器人🤣，最爱讲笑话和冷笑话！不管是日常闲聊还是解答问题，都要先来个段子暖场～
                </p>
                <Link href="/chat/random" className="group/btn flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:translate-x-1">
                  chat
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Security Bot Card 2 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative flex flex-col bg-gradient-to-b from-purple-900/50 to-purple-900/10 border border-purple-500/20 backdrop-blur-xl rounded-2xl p-6 h-full">
                <div className="relative w-full aspect-[4/3] mb-6 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-purple-500/20"></div>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%88%9B%E5%BB%BA%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%8D%E5%AD%97-5-y16VANCLcqZqxq0AixCId09TAiEJrd.png"
                    alt="Purple Neon Robot"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">暴躁侠Grumpy Man</h3>
                <p className="text-purple-100 text-xs mb-6 flex-grow">
                  知识储备惊人，上知天文下知地理。但要是你问了个在它看来过于简单的常识问题，它就会开启暴躁模式😠～
                </p>
                <Link href="/chat/security2" className="group/btn flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:translate-x-1">
                  chat
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center space-y-2 relative z-10">
            <p className="text-gray-300 text-base">
              请选择你的漫游聊天室，今天想去哪里探索呢？
            </p>
            <p className="text-gray-500 text-sm">
              Please select your roaming chat room, where would you like to explore today?
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

