"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Users, MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react"

const services = [
  { id: "wedding", name: "Wedding Decoration", price: "₹50,000 - ₹2,00,000" },
  { id: "birthday", name: "Birthday Party", price: "₹5,000 - ₹25,000" },
  { id: "corporate", name: "Corporate Event", price: "₹15,000 - ₹75,000" },
  { id: "balloon", name: "Balloon Decoration", price: "₹2,000 - ₹15,000" },
  { id: "stage", name: "Stage & Lighting", price: "₹10,000 - ₹50,000" },
  { id: "custom", name: "Custom Package", price: "Price on Request" },
]

export function BookingForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventTime: "",
    venue: "",
    guestCount: "",
    services: [] as string[],
    budget: "",
    message: "",
  })

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Replace with your actual booking submission logic
    // Example: Send to your backend API or email service
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would typically send the data to your backend
      console.log("Booking submitted:", formData)

      // TODO: Add your booking submission code here
      // const response = await fetch('/api/booking', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      setIsSubmitted(true)
    } catch (error) {
      console.error("Booking submission error:", error)
      // Handle error (show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-lg max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Booking Request Submitted!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your booking request. We'll contact you within 24 hours to discuss your event details and
            provide a detailed quote.
          </p>
          <div className="bg-rose-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-rose-700">
              <strong>Next Steps:</strong> Our team will call you to confirm details, schedule a consultation, and
              provide a customized quote for your event.
            </p>
          </div>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                name: "",
                email: "",
                phone: "",
                eventDate: "",
                eventTime: "",
                venue: "",
                guestCount: "",
                services: [],
                budget: "",
                message: "",
              })
            }}
            variant="outline"
          >
            Submit Another Booking
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl text-gray-800">Book Your Event</CardTitle>
        <CardDescription className="text-lg">
          Fill out the form below and we'll create a customized quote for your special celebration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                <Users className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                <Mail className="w-4 h-4 inline mr-2" />
                Email *
              </label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number *
              </label>
              <Input
                required
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                <Calendar className="w-4 h-4 inline mr-2" />
                Event Date *
              </label>
              <Input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, eventDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                <Clock className="w-4 h-4 inline mr-2" />
                Event Time
              </label>
              <Input
                type="time"
                value={formData.eventTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, eventTime: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                <Users className="w-4 h-4 inline mr-2" />
                Guest Count
              </label>
              <Input
                type="number"
                value={formData.guestCount}
                onChange={(e) => setFormData((prev) => ({ ...prev, guestCount: e.target.value }))}
                placeholder="Approximate number"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              <MapPin className="w-4 h-4 inline mr-2" />
              Event Venue
            </label>
            <Input
              value={formData.venue}
              onChange={(e) => setFormData((prev) => ({ ...prev, venue: e.target.value }))}
              placeholder="Venue name and address"
            />
          </div>

          {/* Services Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-4 block">Select Services Required *</label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.services.includes(service.id)
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200 hover:border-rose-300"
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{service.name}</h4>
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        formData.services.includes(service.id) ? "border-rose-500 bg-rose-500" : "border-gray-300"
                      }`}
                    >
                      {formData.services.includes(service.id) && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{service.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Budget Range</label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="">Select budget range</option>
              <option value="under-10k">Under ₹10,000</option>
              <option value="10k-25k">₹10,000 - ₹25,000</option>
              <option value="25k-50k">₹25,000 - ₹50,000</option>
              <option value="50k-100k">₹50,000 - ₹1,00,000</option>
              <option value="100k-200k">₹1,00,000 - ₹2,00,000</option>
              <option value="above-200k">Above ₹2,00,000</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Additional Requirements</label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Tell us about your vision, theme preferences, special requirements, or any other details..."
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={isLoading || formData.services.length === 0}
              className="bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 px-8 py-3 text-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Booking Request
                </>
              )}
            </Button>
            <p className="text-sm text-gray-600 mt-2">We'll contact you within 24 hours with a detailed quote</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
