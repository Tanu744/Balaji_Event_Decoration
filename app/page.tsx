"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Heart,
  Sparkles,
  Calendar,
  Users,
  Award,
  Instagram,
  Facebook,
  MessageCircle,
  Send,
  Menu,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ImageSlideshow } from "@/components/image-slideshow"
import { GalleryLightbox } from "@/components/gallery-lightbox"
import { BookingForm } from "@/components/booking-form"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [contactFormData, setContactFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventDate: "",
    eventType: "",
    message: "",
  })
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsContactSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactFormData),
      })

      if (response.ok) {
        setContactSubmitted(true)
        setContactFormData({
          name: "",
          phone: "",
          email: "",
          eventDate: "",
          eventType: "",
          message: "",
        })
      }
    } catch (error) {
      console.error("Contact form error:", error)
    } finally {
      setIsContactSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-rose-100 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* TODO: Replace with actual Mehndipur Balaji image */}
              {/* <Image 
                src="/mehndipur-balaji-logo.jpg" 
                alt="Mehndipur Balaji" 
                width={48} 
                height={48} 
                className="rounded-full"
              /> */}
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                  Balaji Event & Decorations
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Making Every Celebration Memorable</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="#home" className="text-gray-700 dark:text-gray-300 hover:text-rose-600 transition-colors">
                  Home
                </Link>
                <Link href="#about" className="text-gray-700 dark:text-gray-300 hover:text-rose-600 transition-colors">
                  About
                </Link>
                <Link
                  href="#services"
                  className="text-gray-700 dark:text-gray-300 hover:text-rose-600 transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="#gallery"
                  className="text-gray-700 dark:text-gray-300 hover:text-rose-600 transition-colors"
                >
                  Gallery
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-700 dark:text-gray-300 hover:text-rose-600 transition-colors"
                >
                  Contact
                </Link>
                <Button
                  onClick={() => setShowBookingForm(true)}
                  className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
                >
                  Book Now
                </Button>
              </nav>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <nav className="flex flex-col space-y-4 mt-4">
                <Link href="#home" className="text-gray-700 dark:text-gray-300 hover:text-rose-600 transition-colors">
                  Home
                </Link>
                <Link href="#about" className="text-gray-700 dark:text-gray-300 hover:text-rose-600 transition-colors">
                  About
                </Link>
                <Link
                  href="#services"
                  className="text-gray-700 dark:text-gray-300 hover:text-rose-600 transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="#gallery"
                  className="text-gray-700 dark:text-gray-300 hover:text-rose-600 transition-colors"
                >
                  Gallery
                </Link>
                <Link
                  href="#contact"
                  className="text-gray-700 dark:text-gray-300 hover:text-rose-600 transition-colors"
                >
                  Contact
                </Link>
                <Button
                  onClick={() => {
                    setShowBookingForm(true)
                    setIsMenuOpen(false)
                  }}
                  className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 w-full"
                >
                  Book Now
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white"
              onClick={() => setShowBookingForm(false)}
            >
              <X className="w-6 h-6" />
            </Button>
            <BookingForm />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-purple-600/20 dark:from-rose-600/10 dark:to-purple-600/10"></div>
        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <Badge className="bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-800">
                  ✨ Premium Event Decorations
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight dark:text-white">
                  Making Every
                  <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent block">
                    Celebration
                  </span>
                  Memorable
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                  Transform your special moments with our exquisite decoration services. From intimate gatherings to
                  grand celebrations, we bring your vision to life with creativity and elegance.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => setShowBookingForm(true)}
                  className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-lg px-8 py-6"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Event
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-600 dark:text-rose-400 dark:hover:bg-rose-950 text-lg px-8 py-6"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-rose-500" />
                  <span>500+ Events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span>Happy Clients</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageSlideshow />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Premium Quality</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Guaranteed Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 mb-4">
              About Us
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Crafting Dreams Into Reality
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              With years of experience and a passion for perfection, Balaji Event and Decorations has been the trusted
              choice for creating unforgettable celebrations across the region.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-rose-50 to-white dark:from-rose-950 dark:to-gray-800">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  To transform every celebration into a magical experience through innovative designs, quality
                  materials, and exceptional service that exceeds expectations.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-gray-800">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  To be the leading event decoration company, known for creativity, reliability, and the ability to
                  bring any vision to life with artistic excellence.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-950 dark:to-gray-800">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Quality, creativity, and customer satisfaction are at the heart of everything we do. We believe every
                  event deserves to be extraordinary.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-gradient-to-br from-gray-50 to-rose-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-800 mb-4">
              Our Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Complete Event Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From intimate gatherings to grand celebrations, we offer comprehensive decoration services tailored to
              your unique style and budget.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Wedding Decorations",
                description: "Elegant and romantic setups for your special day",
                icon: "💒",
                features: ["Mandap Decoration", "Stage Setup", "Floral Arrangements", "Lighting Design"],
              },
              {
                title: "Birthday Parties",
                description: "Fun and colorful themes for all ages",
                icon: "🎂",
                features: ["Theme Decorations", "Balloon Arrangements", "Photo Booths", "Custom Backdrops"],
              },
              {
                title: "Corporate Events",
                description: "Professional setups for business functions",
                icon: "🏢",
                features: ["Conference Setup", "Product Launches", "Award Ceremonies", "Team Events"],
              },
              {
                title: "Balloon Decorations",
                description: "Creative balloon artistry for any occasion",
                icon: "🎈",
                features: ["Balloon Arches", "Centerpieces", "Sculptures", "Organic Designs"],
              },
              {
                title: "Stage & Lighting",
                description: "Professional stage setups with stunning lighting",
                icon: "🎭",
                features: ["Stage Design", "LED Lighting", "Sound Setup", "Backdrop Creation"],
              },
              {
                title: "Custom Packages",
                description: "Tailored solutions for unique requirements",
                icon: "✨",
                features: ["Personalized Themes", "Budget Planning", "Full Service", "Consultation"],
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800"
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-200">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-rose-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
                  >
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section id="gallery" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 mb-4">
              Our Work
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6">
              Gallery of Celebrations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Take a look at some of our recent projects and see how we've transformed ordinary spaces into
              extraordinary experiences.
            </p>
          </div>
          <GalleryLightbox />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-rose-50 dark:from-purple-950 dark:to-rose-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 mb-4">
              Testimonials
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about their experience with
              us.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                event: "Wedding Decoration",
                rating: 5,
                review:
                  "Absolutely stunning! They transformed our wedding venue into a fairy tale. Every detail was perfect and the team was so professional.",
                image: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "Rajesh Kumar",
                event: "Birthday Party",
                rating: 5,
                review:
                  "Amazing balloon decorations for my daughter's birthday. The kids were thrilled and the setup was beyond our expectations!",
                image: "/placeholder.svg?height=60&width=60",
              },
              {
                name: "Sunita Patel",
                event: "Corporate Event",
                rating: 5,
                review:
                  "Professional service for our company's annual function. They understood our requirements perfectly and delivered exceptional results.",
                image: "/placeholder.svg?height=60&width=60",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.event}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 mb-4">
              Get In Touch
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6">Let's Plan Your Event</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to make your celebration unforgettable? Contact us today for a free consultation and quote.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">Phone</p>
                      <p className="text-gray-600 dark:text-gray-400">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">Email</p>
                      <p className="text-gray-600 dark:text-gray-400">info@balajievents.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">Address</p>
                      <p className="text-gray-600 dark:text-gray-400">123 Event Street, Decoration City, DC 12345</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 dark:text-gray-200">Send us a Message</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contactSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400">We'll get back to you within 24 hours.</p>
                    <Button onClick={() => setContactSubmitted(false)} variant="outline" className="mt-4">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Name</label>
                        <Input
                          required
                          value={contactFormData.name}
                          onChange={(e) => setContactFormData((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Phone</label>
                        <Input
                          required
                          value={contactFormData.phone}
                          onChange={(e) => setContactFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Email</label>
                      <Input
                        type="email"
                        required
                        value={contactFormData.email}
                        onChange={(e) => setContactFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Event Date
                        </label>
                        <Input
                          type="date"
                          value={contactFormData.eventDate}
                          onChange={(e) => setContactFormData((prev) => ({ ...prev, eventDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Event Type
                        </label>
                        <select
                          value={contactFormData.eventType}
                          onChange={(e) => setContactFormData((prev) => ({ ...prev, eventType: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                          <option value="">Select event type</option>
                          <option value="wedding">Wedding</option>
                          <option value="birthday">Birthday Party</option>
                          <option value="corporate">Corporate Event</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Message</label>
                      <Textarea
                        required
                        value={contactFormData.message}
                        onChange={(e) => setContactFormData((prev) => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us about your event requirements..."
                        rows={4}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isContactSubmitting}
                      className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700"
                    >
                      {isContactSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                {/* TODO: Replace with actual Mehndipur Balaji image */}
                {/* <Image 
                  src="/mehndipur-balaji-logo.jpg" 
                  alt="Mehndipur Balaji" 
                  width={40} 
                  height={40} 
                  className="rounded-full"
                /> */}
                <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Balaji Event & Decorations</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Creating magical moments and unforgettable celebrations with our expert decoration services.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Wedding Decorations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Birthday Parties
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Corporate Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Balloon Decorations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#gallery" className="hover:text-white transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📞 +91 98765 43210</p>
                <p>✉️ info@balajievents.com</p>
                <p>📍 123 Event Street, Decoration City</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Balaji Event and Decorations. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
