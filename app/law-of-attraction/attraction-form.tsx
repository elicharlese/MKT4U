"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, Sparkles } from "lucide-react"
import { analyzeAttraction } from "./actions"

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  industry: z.string({
    required_error: "Please select an industry.",
  }),
  targetAudience: z.string().min(10, {
    message: "Please provide more details about your target audience.",
  }),
  marketingGoals: z.string().min(10, {
    message: "Please describe your marketing goals in more detail.",
  }),
  currentChannels: z.array(z.string()).refine((value) => value.length > 0, {
    message: "Select at least one marketing channel.",
  }),
  brandTone: z.enum(["formal", "casual", "professional", "friendly", "authoritative"], {
    required_error: "Please select a brand tone.",
  }),
  contentType: z.string({
    required_error: "Please select your primary content type.",
  }),
  budgetRange: z.string({
    required_error: "Please select your marketing budget range.",
  }),
  successMetrics: z.string().min(10, {
    message: "Please describe your success metrics in more detail.",
  }),
})

export function AttractionForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      targetAudience: "",
      marketingGoals: "",
      currentChannels: [],
      successMetrics: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // In a real implementation, this would call a server action to process the form
      // and analyze the client attraction patterns
      await analyzeAttraction(values)

      // Navigate to results tab or page
      router.push("/law-of-attraction/results")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="border border-primary/20 overflow-hidden">
          <div className="h-1 bg-primary w-full"></div>
          <CardHeader>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-accent mr-2" />
              <CardTitle>Company Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Company Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your company name"
                      {...field}
                      className="border-primary/20 focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Industry</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-primary/20 focus-visible:ring-primary">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border border-secondary/20 overflow-hidden">
          <div className="h-1 bg-secondary w-full"></div>
          <CardHeader>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-accent mr-2" />
              <CardTitle>Marketing Strategy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary-foreground">Target Audience</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your current target audience in detail"
                      className="min-h-[100px] border-secondary/20 focus-visible:ring-secondary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Include demographics, interests, pain points, and behaviors</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketingGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-secondary-foreground">Marketing Goals</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What are your primary marketing objectives?"
                      className="min-h-[100px] border-secondary/20 focus-visible:ring-secondary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Examples: brand awareness, lead generation, customer retention</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentChannels"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-secondary-foreground">Current Marketing Channels</FormLabel>
                    <FormDescription>Select all channels you currently use</FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Social Media",
                      "Email",
                      "Content Marketing",
                      "SEO",
                      "Paid Advertising",
                      "Events",
                      "PR",
                      "Direct Mail",
                    ].map((channel) => (
                      <FormItem key={channel} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-4 w-4 mt-1 text-secondary border-secondary/30 focus:ring-secondary"
                            checked={field.value?.includes(channel)}
                            onChange={(e) => {
                              const checked = e.target.checked
                              const updatedValue = checked
                                ? [...(field.value || []), channel]
                                : (field.value || []).filter((value) => value !== channel)
                              field.onChange(updatedValue)
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{channel}</FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="border border-accent/20 overflow-hidden">
          <div className="h-1 bg-accent w-full"></div>
          <CardHeader>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-accent mr-2" />
              <CardTitle>Brand & Content</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="brandTone"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-accent-foreground">Brand Tone</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="formal" className="text-accent border-accent/30" />
                        </FormControl>
                        <FormLabel className="font-normal">Formal</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="casual" className="text-accent border-accent/30" />
                        </FormControl>
                        <FormLabel className="font-normal">Casual</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="professional" className="text-accent border-accent/30" />
                        </FormControl>
                        <FormLabel className="font-normal">Professional</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="friendly" className="text-accent border-accent/30" />
                        </FormControl>
                        <FormLabel className="font-normal">Friendly</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="authoritative" className="text-accent border-accent/30" />
                        </FormControl>
                        <FormLabel className="font-normal">Authoritative</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-accent-foreground">Primary Content Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-accent/20 focus-visible:ring-accent">
                        <SelectValue placeholder="Select your primary content type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="blog">Blog Posts</SelectItem>
                      <SelectItem value="video">Video Content</SelectItem>
                      <SelectItem value="social">Social Media Posts</SelectItem>
                      <SelectItem value="whitepaper">Whitepapers/Guides</SelectItem>
                      <SelectItem value="podcast">Podcasts</SelectItem>
                      <SelectItem value="infographic">Infographics</SelectItem>
                      <SelectItem value="email">Email Newsletters</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border border-dashed rounded-lg p-6 text-center bg-accent/5 border-accent/30">
              <Upload className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2 text-accent-foreground">Upload Marketing Materials</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload examples of your current marketing materials for more accurate analysis
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-accent/30 text-accent-foreground hover:bg-accent/10"
              >
                Select Files
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Supports PDF, JPG, PNG (Max 5MB each)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-primary/20 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary w-full"></div>
          <CardHeader>
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-accent mr-2" />
              <CardTitle>Budget & Metrics</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="budgetRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Marketing Budget Range (Monthly)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-primary/20 focus-visible:ring-primary">
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="under5k">Under $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="over100k">Over $100,000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="successMetrics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Success Metrics</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How do you measure marketing success?"
                      className="min-h-[100px] border-primary/20 focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Examples: conversion rate, customer acquisition cost, ROI</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Submit & Analyze"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

