"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="relative aspect-square sm:aspect-auto sm:h-[calc(100vh-7rem)]">
      {/* Main Carousel */}
      <div className="overflow-hidden rounded-3xl h-full">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <Container
              key={image.id}
              className="min-w-full relative h-full overflow-hidden bg-ui-bg-subtle"
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 2}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </Container>
          ))}
        </div>
      </div>

      {/* Thumbnail Selectors (Overlay) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 px-4 py-2 rounded-full">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(index)}
            className={`relative w-12 h-12 rounded-full overflow-hidden transition-all ${
              activeIndex === index
                ? "ring-2 ring-white scale-105"
                : "opacity-70"
            }`}
          >
            {!!image.url && (
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
