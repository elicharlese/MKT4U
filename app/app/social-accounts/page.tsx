import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Plus,
  ExternalLink,
  RefreshCw,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SocialAccountsPage() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight gradient-heading">Social Media Accounts</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect your social media advertisement accounts to streamline your marketing campaigns
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-accent rounded-full my-2"></div>
          </div>
        </section>

        <Alert className="bg-primary/5 border-primary/20">
          <Sparkles className="h-4 w-4 text-primary" />
          <AlertTitle>Connect your accounts</AlertTitle>
          <AlertDescription>
            Link your social media advertisement accounts to create and manage campaigns directly from MKT4U.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50">
            <TabsTrigger
              value="accounts"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Connected Accounts
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              API Settings
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Permissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Facebook */}
              <Card className="border border-primary/20 overflow-hidden">
                <div className="h-1 bg-blue-600 w-full"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 text-white p-2 rounded-full">
                      <Facebook className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Facebook Ads</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Connected
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Account</span>
                      <span className="font-medium">MKT4U Business</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Ad Account ID</span>
                      <span className="font-medium">act_1234567890</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <span className="font-medium text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Last Synced</span>
                      <span className="font-medium">Today, 10:45 AM</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/10 px-6 py-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-600/30 text-blue-600 hover:bg-blue-600/10">
                    Manage
                    <ExternalLink className="h-3.5 w-3.5 ml-2" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Instagram */}
              <Card className="border border-primary/20 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 w-full"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 text-white p-2 rounded-full">
                      <Instagram className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Instagram</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Connected
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Account</span>
                      <span className="font-medium">@mkt4u_official</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Business ID</span>
                      <span className="font-medium">17841405822304914</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <span className="font-medium text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Last Synced</span>
                      <span className="font-medium">Today, 10:45 AM</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/10 px-6 py-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" className="border-pink-500/30 text-pink-500 hover:bg-pink-500/10">
                    Manage
                    <ExternalLink className="h-3.5 w-3.5 ml-2" />
                  </Button>
                </CardFooter>
              </Card>

              {/* LinkedIn */}
              <Card className="border border-primary/20 overflow-hidden">
                <div className="h-1 bg-blue-700 w-full"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-700 text-white p-2 rounded-full">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">LinkedIn Ads</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
                    <AlertCircle className="h-3.5 w-3.5 mr-1" />
                    Not Connected
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-muted-foreground mb-4">Connect your LinkedIn Ads account to manage campaigns</p>
                    <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Twitter */}
              <Card className="border border-primary/20 overflow-hidden">
                <div className="h-1 bg-sky-500 w-full"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-sky-500 text-white p-2 rounded-full">
                      <Twitter className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Twitter Ads</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
                    <AlertCircle className="h-3.5 w-3.5 mr-1" />
                    Not Connected
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-muted-foreground mb-4">Connect your Twitter Ads account to manage campaigns</p>
                    <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect Twitter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* YouTube */}
              <Card className="border border-primary/20 overflow-hidden">
                <div className="h-1 bg-red-600 w-full"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-red-600 text-white p-2 rounded-full">
                      <Youtube className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">YouTube Ads</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
                    <AlertCircle className="h-3.5 w-3.5 mr-1" />
                    Not Connected
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      Connect your YouTube/Google Ads account to manage campaigns
                    </p>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect YouTube
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Add New Platform */}
              <Card className="border border-dashed border-primary/20 overflow-hidden bg-muted/5">
                <CardContent className="flex flex-col items-center justify-center h-full py-10 text-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Add New Platform</h3>
                  <p className="text-muted-foreground mb-4">Connect additional social media advertising platforms</p>
                  <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                    Add Platform
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="border border-secondary/20">
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Manage your API keys and authentication settings for social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-secondary-foreground">Facebook & Instagram</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fb-app-id">App ID</Label>
                      <Input id="fb-app-id" value="1234567890123456" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fb-app-secret">App Secret</Label>
                      <Input id="fb-app-secret" value="••••••••••••••••••••••••••••••" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fb-access-token">Access Token</Label>
                      <Input id="fb-access-token" value="EAABZAn0P9ZCgkBAJ..." type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fb-token-expiry">Token Expiry</Label>
                      <Input id="fb-token-expiry" value="2025-06-15" readOnly />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="fb-auto-refresh" defaultChecked />
                    <Label htmlFor="fb-auto-refresh">Auto-refresh token before expiry</Label>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium text-secondary-foreground">Twitter</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter-api-key">API Key</Label>
                      <Input id="twitter-api-key" placeholder="Enter your Twitter API key" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter-api-secret">API Secret</Label>
                      <Input id="twitter-api-secret" type="password" placeholder="Enter your Twitter API secret" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter-access-token">Access Token</Label>
                      <Input id="twitter-access-token" placeholder="Enter your Twitter access token" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter-token-secret">Token Secret</Label>
                      <Input id="twitter-token-secret" type="password" placeholder="Enter your Twitter token secret" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium text-secondary-foreground">LinkedIn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin-client-id">Client ID</Label>
                      <Input id="linkedin-client-id" placeholder="Enter your LinkedIn client ID" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin-client-secret">Client Secret</Label>
                      <Input
                        id="linkedin-client-secret"
                        type="password"
                        placeholder="Enter your LinkedIn client secret"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="border-secondary/20 text-secondary-foreground hover:bg-secondary/10"
                  >
                    Reset
                  </Button>
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="mt-6">
            <Card className="border border-accent/20">
              <CardHeader>
                <CardTitle>Account Permissions</CardTitle>
                <CardDescription>Manage what MKT4U can access and do with your social media accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-accent-foreground">Facebook & Instagram</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="fb-read-ads">Read Ad Accounts</Label>
                          <p className="text-sm text-muted-foreground">Access to view ad accounts and campaigns</p>
                        </div>
                        <Switch id="fb-read-ads" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="fb-manage-ads">Manage Ads</Label>
                          <p className="text-sm text-muted-foreground">Create, edit, and delete ad campaigns</p>
                        </div>
                        <Switch id="fb-manage-ads" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="fb-read-insights">Read Insights</Label>
                          <p className="text-sm text-muted-foreground">
                            Access to ad performance metrics and analytics
                          </p>
                        </div>
                        <Switch id="fb-read-insights" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="fb-manage-pages">Manage Pages</Label>
                          <p className="text-sm text-muted-foreground">Access to manage Facebook Pages</p>
                        </div>
                        <Switch id="fb-manage-pages" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-4">
                    <h3 className="text-lg font-medium text-accent-foreground">Twitter</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="twitter-read">Read Tweets</Label>
                          <p className="text-sm text-muted-foreground">Access to read tweets and timeline</p>
                        </div>
                        <Switch id="twitter-read" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="twitter-write">Write Tweets</Label>
                          <p className="text-sm text-muted-foreground">Post tweets on your behalf</p>
                        </div>
                        <Switch id="twitter-write" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="twitter-ads">Manage Ads</Label>
                          <p className="text-sm text-muted-foreground">Create and manage Twitter ad campaigns</p>
                        </div>
                        <Switch id="twitter-ads" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-4">
                    <h3 className="text-lg font-medium text-accent-foreground">LinkedIn</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="linkedin-profile">Read Profile</Label>
                          <p className="text-sm text-muted-foreground">Access to read LinkedIn profile information</p>
                        </div>
                        <Switch id="linkedin-profile" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="linkedin-share">Share Content</Label>
                          <p className="text-sm text-muted-foreground">Post content on your LinkedIn profile</p>
                        </div>
                        <Switch id="linkedin-share" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="linkedin-ads">Advertising API</Label>
                          <p className="text-sm text-muted-foreground">Create and manage LinkedIn ad campaigns</p>
                        </div>
                        <Switch id="linkedin-ads" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">
                    <Button variant="outline" className="border-accent/20 text-accent-foreground hover:bg-accent/10">
                      Reset to Default
                    </Button>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Save Permissions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

