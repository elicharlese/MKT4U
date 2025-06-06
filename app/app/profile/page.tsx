"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Check, Edit, Mail, MapPin, Phone, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    setProfileSaved(true)

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setProfileSaved(false)
    }, 3000)
  }

  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences</p>
      </div>

      {profileSaved && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your profile has been updated successfully.</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile picture" />
                <AvatarFallback className="text-4xl">JD</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-semibold">Jane Doe</h2>
            <p className="text-muted-foreground">Marketing Specialist</p>
            <div className="flex items-center mt-2 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>San Francisco, CA</span>
            </div>
            <div className="w-full mt-6 space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>jane.doe@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="w-full">
              <h3 className="font-medium mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Social Media</Badge>
                <Badge variant="secondary">Content Creation</Badge>
                <Badge variant="secondary">SEO</Badge>
                <Badge variant="secondary">Analytics</Badge>
                <Badge variant="secondary">Campaign Management</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and public profile</CardDescription>
            </div>
            <Button variant={isEditing ? "ghost" : "outline"} size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                "Cancel"
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue="Jane"
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue="Doe"
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="jane.doe@example.com"
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    defaultValue="San Francisco, CA"
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    defaultValue="Marketing Specialist"
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  defaultValue="Marketing professional with 5+ years of experience in digital marketing, social media management, and content creation. Passionate about creating engaging campaigns that drive results."
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted resize-none" : "resize-none"}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            {isEditing && <Button onClick={handleSave}>Save Changes</Button>}
          </CardFooter>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Your recent activity and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="min-w-10 pt-1">
                  <Badge variant="outline" className="rounded-full h-8 w-8 flex items-center justify-center p-0">
                    <User className="h-4 w-4" />
                  </Badge>
                </div>
                <div>
                  <p className="font-medium">Updated profile information</p>
                  <p className="text-sm text-muted-foreground">Yesterday at 2:45 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="min-w-10 pt-1">
                  <Badge variant="outline" className="rounded-full h-8 w-8 flex items-center justify-center p-0">
                    <Check className="h-4 w-4" />
                  </Badge>
                </div>
                <div>
                  <p className="font-medium">Completed "Social Media Strategy" campaign</p>
                  <p className="text-sm text-muted-foreground">March 28, 2024 at 10:15 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="min-w-10 pt-1">
                  <Badge variant="outline" className="rounded-full h-8 w-8 flex items-center justify-center p-0">
                    <User className="h-4 w-4" />
                  </Badge>
                </div>
                <div>
                  <p className="font-medium">Joined the platform</p>
                  <p className="text-sm text-muted-foreground">March 15, 2024 at 9:30 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

