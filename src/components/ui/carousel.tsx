import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface CarouselSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
}

export interface CarouselProps {
  slides?: CarouselSlide[];
  className?: string;
}

const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    title: "Abstract Geometry",
    subtitle: "Dark monochrome architecture",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    title: "Quantum Neural Node",
    subtitle: "Distributed cluster infrastructure",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    title: "Cyber Security Enclave",
    subtitle: "Zero-trust network layer",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
    title: "Developer Workspace",
    subtitle: "High-precision pair programming",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    title: "Hardware Telemetry",
    subtitle: "Edge compute diagnostics",
  },
];

export function Carousel({
  slides = DEFAULT_SLIDES,
  className,
}: CarouselProps) {
  const [[page, direction], setPage] = React.useState([0, 0]);

  const paginate = (newDirection: number) => {
    const nextIndex = page + newDirection;
    if (nextIndex >= 0 && nextIndex < slides.length) {
      setPage([nextIndex, newDirection]);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const currentSlide = slides[page];

  return (
    <div
      className={cn(
        "relative w-full rounded-3xl border border-zinc-800/80 bg-[#121215] p-3 select-none overflow-hidden shadow-xl",
        className
      )}
    >
      {/* Slide Viewport */}
      <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 350, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-end">
              <span className="font-extrabold text-sm text-white">
                {currentSlide.title}
              </span>
              {currentSlide.subtitle && (
                <span className="text-[11px] text-zinc-400">
                  {currentSlide.subtitle}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between mt-3 px-2">
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage([i, i > page ? 1 : -1])}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                page === i ? "w-6 bg-white" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
              )}
            />
          ))}
        </div>

        {/* Directional Controls with Disabled States */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => paginate(-1)}
            className="p-1.5 rounded-full bg-[#1c1c21] border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={page === slides.length - 1}
            onClick={() => paginate(1)}
            className="p-1.5 rounded-full bg-[#1c1c21] border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
