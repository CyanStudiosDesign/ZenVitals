import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  ArrowUpRight,
  Quote,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react"
import FeaturedProducts from "../featured-products"
import FeaturedSection from "../featured-section"

const Hero = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-12 pb-20 max-w-7xl mx-auto">
        <div className=" grid w-full max-w-7xl mx-auto px-4 md:px-0 grid-cols-2 md:grid-cols-12 ">
          {/* Top Row: Main Heading forced to one line */}
          <h1 className="font-bold col-span-2 md:col-span-12 italic text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter uppercase whitespace-nowrap leading-none">
            THE FUTURE OF HEALTH
          </h1>

          {/* Bottom Row: Flex Container */}
          {/* 1. Subtext */}
          <p className="hidden md:block md:text-base text-gray-600 col-span-5 self-center">
            Our supplements are engineered to bridge the gap between biological
            necessity and modern lifestyle.
          </p>
          <div className="hidden md:block md:col-span-1" />
          <div className="col-span-2 md:col-span-6 flex items-center justify-end gap-4">
            <div className="w-12 lg:w-20 h-1 md:h-2 bg-black" />

            {/* 3. The Closing Heading: No wrap here either to keep it snappy */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold italic uppercase tracking-tighter whitespace-nowrap leading-[0.8]">
              Is Clear
            </h2>
          </div>

          <p className="block md:hidden text-lg mt-4 md:text-base text-gray-600 col-span-2 self-center">
            Our supplements are engineered to bridge the gap between biological
            necessity and modern lifestyle.
          </p>
        </div>

        {/* Action Grid */}
        <div className="flex md:grid flex-col-reverse md:grid-cols-5 gap-12 lg:gap-20 items-start mt-12">
          {/* Left Content - Center aligned on mobile, Left on desktop */}
          <div className="flex flex-col col-span-2 mt-12 w-full items-center text-center gap-2 ">
            {/* Header & Subtext */}
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-black whitespace-nowrap">
              Generate your plan
            </h2>
            <p className="text-black text-base ">
              Take a quick test to better understand your needs.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center flex-col gap-2 mt-4 w-full max-w-70">
              {/* Black Primary Button */}
              <LocalizedClientLink
                href="/quiz"
                className="group flex items-center justify-between bg-black text-white rounded-full p-2 pr-6  transition-all hover:bg-gray-900 shadow-lg"
              >
                <div className="bg-white text-black rounded-full p-2 group-hover:rotate-45 transform transition-all duration-500">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <span className="grow px-10 whitespace-nowrap text-center">
                  Take a general test
                </span>
              </LocalizedClientLink>

              {/* Gradient Secondary Button */}
              <LocalizedClientLink
                href="/store"
                className="group flex items-center justify-between bg-linear-to-r to-[#206bff] via-[#9838ff] from-[#ff427b] text-white rounded-full p-2 pr-6 transition-all hover:opacity-90 shadow-[0_10px_20px_-10px_rgba(93,129,232,0.5)]"
              >
                <div className="bg-white/20 text-white rounded-full p-2 group-hover:scale-105 transition-transform duration-300">
                  <Store className="h-4 w-4" />
                </div>
                <span className="grow px-10 text-center font-semibold">
                  Explore shop
                </span>
              </LocalizedClientLink>
            </div>
            <div className="w-full flex justify-start absolute md:relative mt-12">
              <img src="/Ayurvedic.png" className="w-40 md:w-52 lg:w-64"></img>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative col-span-3 aspect-4/3 rounded-4xl overflow-hidden bg-gray-100 shadow-2xl">
            <img
              src="/HealthyMan.jpeg"
              alt="Elderly healthy man"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Mission Statement */}
        <p className="text-center text-2xl md:text-4xl mt-32 max-w-4xl mx-auto leading-tight text-gray-700 font-normal">
          Getting all of the{" "}
          <span className="text-[#ff427b] font-semibold">
            nutrients you need
          </span>{" "}
          simply cannot be done{" "}
          <span className="text-[#9838ff] font-semibold">
            without supplements.
          </span>{" "}
          Supplements are a necessity, not a{" "}
          <span className="text-[#206bff] font-semibold">luxury.</span>
        </p>
      </section>

      {/* Featured Products Section */}

      {/* Testimonials Section */}
      <section className="bg-[#F8F8F8] py-20 px-6 md:px-12 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Quote className="h-12 w-12 text-black mb-6 fill-black" />
            <h3 className="text-2xl md:text-4xl font-bold leading-tight max-w-md">
              I never realized how poor my sleep was until I started tracking
              it. Now I wake up fresher and know exactly what helps me rest
              better.
            </h3>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden" />
              <div>
                <p className="font-bold text-sm">Angela Summer</p>
                <p className="text-xs text-gray-500">Book Writer</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 aspect-square rounded-2xl bg-gray-100 overflow-hidden">
              <img
                src="/sleep-woman.jpg"
                alt="Woman with coffee"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs italic text-gray-600">
                  "This app showed me how small habits like staying up too
                  late—were affecting my sleep..."
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-200" />
                  <span className="text-[10px] font-bold">Karen Smith</span>
                </div>
              </div>
              <button className="text-xs font-bold border-b border-black self-start pb-1">
                See More Sleeping Stories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-4xl font-extrabold italic uppercase tracking-tighter">
            From the Blog
          </h2>
          <div className="flex gap-2">
            <button className="p-2 border rounded-full hover:bg-gray-50">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 border rounded-full hover:bg-gray-50">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "5 Habits That Ruin Your Sleep", img: "/blog-1.jpg" },
            {
              title: "The Science of Better Sleep",
              img: "/blog-2.jpg",
              desc: "Discover how sleep cycles work...",
            },
            { title: "How Sleep Impacts Your Mood", img: "/blog-3.jpg" },
            { title: "Why Implementation Matters", img: "/blog-4.jpg" },
          ].map((post, i) => (
            <div
              key={i}
              className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-3/4"
            >
              <img
                src={post.img}
                alt={post.title}
                className="object-cover w-full h-full transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <h4 className="text-white font-bold leading-tight">
                  {post.title}
                </h4>
                {post.desc && (
                  <p className="text-white/60 text-[10px] mt-2 line-clamp-2">
                    {post.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hero
