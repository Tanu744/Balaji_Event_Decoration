"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=800",
    title: "Elegant Wedding Decorations",
    description: "Beautiful mandap and stage setups for your special day",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=800",
    title: "Birthday Party Themes",
    description: "Colorful and fun decorations for memorable celebrations",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=800",
    title: "Corporate Event Setups",
    description: "Professional decorations for business functions",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=600&width=800",
    title: "Balloon Artistry",
    description: "Creative balloon decorations and sculptures",
  },
]

export function ImageSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white max-w-md">
            <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
            <p className="text-lg opacity-90">{slide.description}</p>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
