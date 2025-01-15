'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// 使用本地图片路径
const randomImages = [
  "/images/random-1.png",
  "/images/random-2.png",
  "/images/random-3.png",
  "/images/random-4.png"
]

export default function ImageCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % randomImages.length);
    }, 2100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] mb-6 rounded-xl overflow-hidden">
      {randomImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Random Walk ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover absolute top-0 left-0 transform transition-all duration-2000 ease-in-out ${
            index === currentImageIndex 
              ? 'opacity-100 scale-105'
              : index === ((currentImageIndex - 1 + randomImages.length) % randomImages.length)
                ? 'opacity-0 scale-110'
                : 'opacity-0 scale-100'
          }`}
          priority={index === 0}
          onLoad={() => {
            if (index === currentImageIndex) {
              setIsLoading(false);
            }
          }}
          onError={(e) => {
            console.error(`Error loading image: ${src}`);
          }}
        />
      ))}
      
      {/* 加载状态 */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-purple-900/50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      
      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/30 to-transparent"></div>
    </div>
  )
} 