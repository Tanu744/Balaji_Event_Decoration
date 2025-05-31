"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=400",
    title: "Wedding Mandap Decoration",
    category: "Wedding",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=400",
    title: "Birthday Party Setup",
    category: "Birthday",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=400",
    title: "Corporate Event Stage",
    category: "Corporate",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=400",
    title: "Balloon Arch Design",
    category: "Balloon",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=400",
    title: "Engagement Ceremony",
    category: "Wedding",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=400",
    title: "Theme Party Decoration",
    category: "Birthday",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=400",
    title: "Conference Hall Setup",
    category: "Corporate",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=400",
    title: "Balloon Sculpture",
    category: "Balloon",
  },
]

export function GalleryLightbox() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [filter, setFilter] = useState("All")

  const categories = ["All", "Wedding", "Birthday", "Corporate", "Balloon"]

  const filteredImages = filter === "All" ? galleryImages : galleryImages.filter((img) => img.category === filter)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length)
    }
  }

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            onClick={() => setFilter(category)}
            className={filter === category ? "bg-gradient-to-r from-rose-500 to-purple-600" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold">{image.title}</p>
                <p className="text-sm opacity-90">{image.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={filteredImages[selectedImage].src || "/placeholder.svg"}
              alt={filteredImages[selectedImage].title}
              width={800}
              height={600}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{filteredImages[selectedImage].title}</h3>
              <p className="text-sm opacity-90">{filteredImages[selectedImage].category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
