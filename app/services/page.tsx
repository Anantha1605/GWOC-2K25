"use client";

import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ImageCarousel from "./components/image-carousel";
import FeaturesCarousel from "./components/category-carousel";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function ServicesPage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const bestSellersRef = useRef(null);
  const textSectionRef = useRef(null);
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: false });

  const heroInView = useInView(heroRef, { once: false });
  const servicesInView = useInView(servicesRef, { once: false });
  const bestSellersInView = useInView(bestSellersRef, { once: false });
  const textSectionInView = useInView(textSectionRef, { once: false });

  return (
    <main className="min-h-screen bg-service_black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold"
          style={{ color: '#E8E4D3' }}
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-12"
        >
          Go from design to site with Framer, the web builder for creative pros.
        </motion.p>
        <motion.div
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="relative flex items-center justify-center w-14 h-14"
        >
          <ChevronDown className="h-6 w-6 absolute" />
          <Button
            variant="outline"
            className="rounded-full w-14 h-14 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="min-h-screen py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <div className="order-2 md:order-1">
              <ImageCarousel />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={servicesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2 flex flex-col justify-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#E8E4D3' }}>New and Trustworthy</h2>
              <p className="text-zinc-400 mb-8">Install the plugin and convert your designs to a responsive site.</p>
              <Button className="w-fit">Book Now</Button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              ref={bestSellersRef}
              initial={{ opacity: 0, x: -20 }}
              animate={bestSellersInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#E8E4D3' }}>Best Sellers</h2>
              <p className="text-zinc-400 mb-8">Browse dozens of templates. Click, duplicate, customize.</p>
              <Button className="w-fit">Book Now</Button>
            </motion.div>
            <div>
              <ImageCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#E8E4D3" }}>
              Featured Services
            </h2>
            <p className="text-zinc-400">Discover our comprehensive range of services</p>
          </motion.div>
          <FeaturesCarousel />
        </div>
      </section>

      {/* Text Section */}
      <section ref={textSectionRef} className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={textSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-4 text-3xl md:text-4xl"
          style={{ color: '#E8E4D3' }}
        >
          <p>Lorem ipsum dolor sit amet, consectetur.</p>
          <p>Ut enim ad minim veniam, quis nostrud laboris.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate.</p>
        </motion.div>
      </section>
    </main>
  );
}

