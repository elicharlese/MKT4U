"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles } from "lucide-react"

export function AttractionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Here you would normally handle the response
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card className="border border-primary/20">
          <CardHeader>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              <CardTitle>Business Information</CardTitle>
            </div>
            <CardDescription>Tell us about your business and marketing goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" placeholder="Your Business Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select required>
                  <SelectTrigger id="industry" className="w-full">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="business-description">Business Description</Label>
              <Textarea
                id="business-description"
                placeholder="Briefly describe your business, products, and services"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketing-goals">Marketing Goals</Label>
              <Textarea
                id="marketing-goals"
                placeholder="What are your primary marketing goals? (e.g., increase brand awareness, generate leads, boost sales)"
                className="min-h-[100px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-secondary/20">
          <CardHeader>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-secondary-foreground mr-2" />
              <CardTitle>Target Audience</CardTitle>
            </div>
            <CardDescription>Describe your current and ideal target audience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-audience">Current Audience Description</Label>
              <Textarea
                id="current-audience"
                placeholder="Describe the clients you're currently attracting (demographics, behaviors, needs)"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ideal-audience">Ideal Client Profile</Label>
              <Textarea
                id="ideal-audience"
                placeholder="Describe your ideal clients (who you want to attract)"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Age Range (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="age-18-24" />
                  <Label htmlFor="age-18-24" className="text-sm font-normal">
                    18-24
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="age-25-34" />
                  <Label htmlFor="age-25-34" className="text-sm font-normal">
                    25-34
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="age-35-44" />
                  <Label htmlFor="age-35-44" className="text-sm font-normal">
                    35-44
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="age-45-54" />
                  <Label htmlFor="age-45-54" className="text-sm font-normal">
                    45-54
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="age-55-64" />
                  <Label htmlFor="age-55-64" className="text-sm font-normal">
                    55-64
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="age-65-plus" />
                  <Label htmlFor="age-65-plus" className="text-sm font-normal">
                    65+
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-accent/20">
          <CardHeader>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-accent-foreground mr-2" />
              <CardTitle>Marketing Approach</CardTitle>
            </div>
            <CardDescription>Tell us about your current marketing strategies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Which marketing channels do you currently use? (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="channel-social" />
                  <Label htmlFor="channel-social" className="text-sm font-normal">
                    Social Media
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="channel-email" />
                  <Label htmlFor="channel-email" className="text-sm font-normal">
                    Email Marketing
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="channel-content" />
                  <Label htmlFor="channel-content" className="text-sm font-normal">
                    Content Marketing
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="channel-seo" />
                  <Label htmlFor="channel-seo" className="text-sm font-normal">
                    SEO
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="channel-ppc" />
                  <Label htmlFor="channel-ppc" className="text-sm font-normal">
                    Paid Advertising
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="channel-events" />
                  <Label htmlFor="channel-events" className="text-sm font-normal">
                    Events
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>How would you describe your current marketing messaging?</Label>
              <RadioGroup defaultValue="informational">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="informational" id="messaging-informational" />
                  <Label htmlFor="messaging-informational" className="text-sm font-normal">
                    Informational/Educational
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="promotional" id="messaging-promotional" />
                  <Label htmlFor="messaging-promotional" className="text-sm font-normal">
                    Promotional/Sales-focused
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="storytelling" id="messaging-storytelling" />
                  <Label htmlFor="messaging-storytelling" className="text-sm font-normal">
                    Storytelling/Brand-focused
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mixed" id="messaging-mixed" />
                  <Label htmlFor="messaging-mixed" className="text-sm font-normal">
                    Mixed approach
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketing-challenges">What are your biggest marketing challenges?</Label>
              <Textarea
                id="marketing-challenges"
                placeholder="Describe the challenges you face in attracting your ideal clients"
                className="min-h-[100px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-primary/20">
          <CardHeader>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              <CardTitle>Content Samples</CardTitle>
            </div>
            <CardDescription>Provide examples of your marketing content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website-url">Website URL</Label>
              <Input id="website-url" type="url" placeholder="https://www.example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="social-media">Social Media Profiles (one per line)</Label>
              <Textarea
                id="social-media"
                placeholder="https://www.instagram.com/yourbusiness
https://www.facebook.com/yourbusiness
https://www.linkedin.com/company/yourbusiness"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-examples">Additional Content Examples</Label>
              <Textarea
                id="content-examples"
                placeholder="Paste examples of your marketing copy, ad text, or email content here"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        <CardFooter className="flex justify-end pt-6">
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? "Submitting..." : "Submit for Analysis"}
          </Button>
        </CardFooter>
      </div>
    </form>
  )
}

