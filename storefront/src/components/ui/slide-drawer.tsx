import React, { useState, useEffect, useRef } from "react"

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const drawerRef = useRef<HTMLDivElement>(null)
  // Inside your component
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [isAnimateIn, setIsAnimateIn] = useState(false)

  // Handle opening/closing logic
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)

      // We use requestAnimationFrame to ensure the '100%' state is
      // actually rendered in the DOM before we trigger the slide up.
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimateIn(true)
        })
      })

      document.body.style.overflow = "hidden"
      return () => cancelAnimationFrame(raf)
    } else {
      setIsAnimateIn(false)
      const timer = setTimeout(() => setShouldRender(false), 300)
      document.body.style.overflow = "unset"
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Touch/Mouse Start
  const handleStart = (clientY: number) => {
    setIsDragging(true)
    setStartY(clientY)
  }

  // Touch/Mouse Move
  const handleMove = (clientY: number) => {
    if (!isDragging) return
    const deltaY = clientY - startY
    // Only allow dragging downwards (positive delta)
    if (deltaY > 0) {
      setCurrentY(deltaY)
    }
  }

  // Touch/Mouse End
  const handleEnd = () => {
    if (currentY > 100) {
      onClose()
    }
    setIsDragging(false)
    setCurrentY(0)
  }
  if (!shouldRender) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimateIn ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative w-full bg-zinc-100 rounded-t-3xl shadow-2xl transition-all duration-300 ease-out"
        style={{
          height: "80vh",
          // Make sure this logic is solid
          transform: `translateY(${
            !isAnimateIn ? "100%" : isDragging ? `${currentY}px` : "0px"
          })`,
          transition: isDragging
            ? "none"
            : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        // Mouse Events
        onMouseDown={(e) => handleStart(e.clientY)}
        onMouseMove={(e) => handleMove(e.clientY)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        // Touch Events
        onTouchStart={(e) => handleStart(e.touches[0].clientY)}
        onTouchMove={(e) => handleMove(e.touches[0].clientY)}
        onTouchEnd={handleEnd}
      >
        {/* Drag Handle */}
        <div className="flex justify-center py-4 cursor-grab active:cursor-grabbing">
          <div className="w-16 h-1.5 rounded-full bg-zinc-300" />
        </div>

        <div className="p-6 h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}

export default Drawer
