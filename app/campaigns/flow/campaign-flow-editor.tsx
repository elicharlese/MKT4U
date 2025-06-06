"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  MessageSquare,
  Users,
  Calendar,
  BarChart3,
  ArrowRight,
  Plus,
  Trash2,
  Settings,
  Edit,
  Sparkles,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define types for campaign nodes and connections
type NodeType = "trigger" | "email" | "social" | "condition" | "delay" | "audience" | "action"
type NodeStatus = "active" | "draft" | "completed" | "scheduled"

interface CampaignNode {
  id: string
  type: NodeType
  title: string
  description: string
  status: NodeStatus
  position: { x: number; y: number }
  icon: React.ReactNode
  color: string
}

interface Connection {
  from: string
  to: string
}

// Initial campaign flow data
const initialNodes: CampaignNode[] = [
  {
    id: "trigger-1",
    type: "trigger",
    title: "Campaign Start",
    description: "Begins the campaign flow",
    status: "active",
    position: { x: 100, y: 100 },
    icon: <Sparkles className="h-5 w-5" />,
    color: "bg-primary text-primary-foreground",
  },
  {
    id: "email-1",
    type: "email",
    title: "Welcome Email",
    description: "Send initial welcome email",
    status: "active",
    position: { x: 300, y: 100 },
    icon: <Mail className="h-5 w-5" />,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    id: "delay-1",
    type: "delay",
    title: "3 Day Delay",
    description: "Wait for 3 days",
    status: "scheduled",
    position: { x: 500, y: 100 },
    icon: <Calendar className="h-5 w-5" />,
    color: "bg-accent text-accent-foreground",
  },
  {
    id: "email-2",
    type: "email",
    title: "Follow-up Email",
    description: "Send follow-up with offer",
    status: "draft",
    position: { x: 700, y: 100 },
    icon: <Mail className="h-5 w-5" />,
    color: "bg-secondary text-secondary-foreground",
  },
  {
    id: "social-1",
    type: "social",
    title: "Social Media Post",
    description: "Post to Instagram and Facebook",
    status: "draft",
    position: { x: 300, y: 250 },
    icon: <MessageSquare className="h-5 w-5" />,
    color: "bg-purple-500 text-white",
  },
  {
    id: "audience-1",
    type: "audience",
    title: "Segment Audience",
    description: "Filter by engagement level",
    status: "draft",
    position: { x: 500, y: 250 },
    icon: <Users className="h-5 w-5" />,
    color: "bg-pink-500 text-white",
  },
]

const initialConnections: Connection[] = [
  { from: "trigger-1", to: "email-1" },
  { from: "email-1", to: "delay-1" },
  { from: "delay-1", to: "email-2" },
  { from: "trigger-1", to: "social-1" },
  { from: "social-1", to: "audience-1" },
]

export function CampaignFlowEditor() {
  const [nodes, setNodes] = useState<CampaignNode[]>(initialNodes)
  const [connections, setConnections] = useState<Connection[]>(initialConnections)
  const [selectedNode, setSelectedNode] = useState<CampaignNode | null>(null)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isCreatingConnection, setIsCreatingConnection] = useState(false)
  const [connectionStart, setConnectionStart] = useState<string | null>(null)

  // Handle node selection
  const handleNodeSelect = (node: CampaignNode) => {
    setSelectedNode(node)
  }

  // Handle node drag start
  const handleDragStart = (e: React.MouseEvent, nodeId: string, node: CampaignNode) => {
    setDraggedNode(nodeId)
    // Calculate offset to maintain relative position during drag
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    e.stopPropagation()
  }

  // Handle node dragging
  const handleDrag = useCallback(
    (e: React.MouseEvent) => {
      if (!draggedNode) return

      setNodes((prev) =>
        prev.map((node) => {
          if (node.id === draggedNode) {
            return {
              ...node,
              position: {
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y,
              },
            }
          }
          return node
        }),
      )
      e.preventDefault()
      e.stopPropagation()
    },
    [draggedNode, dragOffset],
  )

  // Handle node drag end
  const handleDragEnd = () => {
    setDraggedNode(null)
  }

  // Handle canvas mouse events for dragging
  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (draggedNode) {
      handleDrag(e)
    }
  }

  const handleCanvasMouseUp = () => {
    if (draggedNode) {
      handleDragEnd()
    }
  }

  // Add a new node
  const addNode = (type: NodeType) => {
    const newId = `${type}-${nodes.length + 1}`

    let icon = <Sparkles className="h-5 w-5" />
    let color = "bg-primary text-primary-foreground"

    switch (type) {
      case "email":
        icon = <Mail className="h-5 w-5" />
        color = "bg-secondary text-secondary-foreground"
        break
      case "social":
        icon = <MessageSquare className="h-5 w-5" />
        color = "bg-purple-500 text-white"
        break
      case "delay":
        icon = <Calendar className="h-5 w-5" />
        color = "bg-accent text-accent-foreground"
        break
      case "audience":
        icon = <Users className="h-5 w-5" />
        color = "bg-pink-500 text-white"
        break
      case "condition":
        icon = <Settings className="h-5 w-5" />
        color = "bg-blue-500 text-white"
        break
      case "action":
        icon = <BarChart3 className="h-5 w-5" />
        color = "bg-green-500 text-white"
        break
    }

    const newNode: CampaignNode = {
      id: newId,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      description: `Description for new ${type}`,
      status: "draft",
      position: { x: 400, y: 400 }, // Default position
      icon,
      color,
    }

    setNodes([...nodes, newNode])
    setSelectedNode(newNode)
  }

  // Delete a node
  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter((node) => node.id !== nodeId))
    setConnections(connections.filter((conn) => conn.from !== nodeId && conn.to !== nodeId))
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null)
    }
  }

  // Update a node
  const updateNode = (updatedNode: CampaignNode) => {
    setNodes(nodes.map((node) => (node.id === updatedNode.id ? updatedNode : node)))
    setSelectedNode(updatedNode)
  }

  // Start creating a connection
  const startConnection = (nodeId: string) => {
    setIsCreatingConnection(true)
    setConnectionStart(nodeId)
  }

  // Complete a connection
  const completeConnection = (targetId: string) => {
    if (connectionStart && connectionStart !== targetId) {
      // Check if connection already exists
      const connectionExists = connections.some((conn) => conn.from === connectionStart && conn.to === targetId)

      if (!connectionExists) {
        setConnections([...connections, { from: connectionStart, to: targetId }])
      }
    }

    setIsCreatingConnection(false)
    setConnectionStart(null)
  }

  // Delete a connection
  const deleteConnection = (fromId: string, toId: string) => {
    setConnections(connections.filter((conn) => !(conn.from === fromId && conn.to === toId)))
  }

  // Calculate connection lines
  const getConnectionPath = (fromNode: CampaignNode, toNode: CampaignNode) => {
    const fromX = fromNode.position.x + 100 // Node width is 200, so center is at x + 100
    const fromY = fromNode.position.y + 50 // Node height is 100, so center is at y + 50
    const toX = toNode.position.x + 100
    const toY = toNode.position.y + 50

    // Simple straight line for now
    return `M ${fromX} ${fromY} L ${toX} ${toY}`
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Add Node
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Campaign Node</DialogTitle>
                <DialogDescription>Select the type of node you want to add to your campaign flow.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2 border-secondary/30 hover:bg-secondary/10"
                  onClick={() => {
                    addNode("email")
                  }}
                >
                  <Mail className="h-8 w-8 text-secondary" />
                  <span>Email</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2 border-purple-500/30 hover:bg-purple-500/10"
                  onClick={() => {
                    addNode("social")
                  }}
                >
                  <MessageSquare className="h-8 w-8 text-purple-500" />
                  <span>Social Media</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2 border-accent/30 hover:bg-accent/10"
                  onClick={() => {
                    addNode("delay")
                  }}
                >
                  <Calendar className="h-8 w-8 text-accent" />
                  <span>Delay</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2 border-pink-500/30 hover:bg-pink-500/10"
                  onClick={() => {
                    addNode("audience")
                  }}
                >
                  <Users className="h-8 w-8 text-pink-500" />
                  <span>Audience</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2 border-blue-500/30 hover:bg-blue-500/10"
                  onClick={() => {
                    addNode("condition")
                  }}
                >
                  <Settings className="h-8 w-8 text-blue-500" />
                  <span>Condition</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2 border-green-500/30 hover:bg-green-500/10"
                  onClick={() => {
                    addNode("action")
                  }}
                >
                  <BarChart3 className="h-8 w-8 text-green-500" />
                  <span>Action</span>
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="border-primary/20 text-primary hover:bg-primary/10"
            onClick={() => setIsCreatingConnection(!isCreatingConnection)}
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            {isCreatingConnection ? "Cancel Connection" : "Create Connection"}
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm">Draft</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-sm">Completed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card className="border border-primary/20 overflow-hidden">
            <div className="h-1 bg-primary w-full"></div>
            <CardHeader>
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-accent mr-2" />
                <CardTitle>Campaign Flow Canvas</CardTitle>
              </div>
              <CardDescription>
                Drag nodes to position them and click on node connectors to create flows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="relative h-[600px] border rounded-md bg-slate-50 overflow-auto"
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
              >
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {connections.map((conn, index) => {
                    const fromNode = nodes.find((n) => n.id === conn.from)
                    const toNode = nodes.find((n) => n.id === conn.to)

                    if (!fromNode || !toNode) return null

                    const path = getConnectionPath(fromNode, toNode)

                    return (
                      <g key={`conn-${index}`}>
                        <path
                          d={path}
                          stroke="rgba(138, 43, 226, 0.6)"
                          strokeWidth="2"
                          fill="none"
                          markerEnd="url(#arrowhead)"
                        />
                        <circle
                          cx={(fromNode.position.x + 100 + toNode.position.x + 100) / 2}
                          cy={(fromNode.position.y + 50 + toNode.position.y + 50) / 2}
                          r="6"
                          fill="rgba(138, 43, 226, 0.6)"
                          className="cursor-pointer"
                          onClick={() => deleteConnection(conn.from, conn.to)}
                        />
                      </g>
                    )
                  })}

                  {/* Arrow marker definition */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="rgba(138, 43, 226, 0.6)" />
                    </marker>
                  </defs>
                </svg>

                {/* Nodes */}
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`absolute w-[200px] rounded-md shadow-md cursor-move transition-shadow hover:shadow-lg ${
                      selectedNode?.id === node.id ? "ring-2 ring-primary" : ""
                    }`}
                    style={{
                      left: `${node.position.x}px`,
                      top: `${node.position.y}px`,
                    }}
                    onMouseDown={(e) => handleDragStart(e, node.id, node)}
                    onClick={() => handleNodeSelect(node)}
                  >
                    <div className={`p-3 rounded-t-md ${node.color}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {node.icon}
                          <h3 className="font-medium">{node.title}</h3>
                        </div>
                        <div className="flex gap-1">
                          <button
                            className="p-1 rounded-full hover:bg-white/20"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNode(node.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-white border-x border-b rounded-b-md">
                      <p className="text-xs text-muted-foreground mb-2">{node.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              node.status === "active"
                                ? "bg-green-500"
                                : node.status === "draft"
                                  ? "bg-amber-500"
                                  : node.status === "scheduled"
                                    ? "bg-blue-500"
                                    : "bg-gray-500"
                            }`}
                          ></div>
                          <span className="text-xs capitalize">{node.status}</span>
                        </div>

                        {/* Connection points */}
                        <div className="flex gap-2">
                          {isCreatingConnection && (
                            <>
                              {connectionStart !== node.id ? (
                                <button
                                  className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    completeConnection(node.id)
                                  }}
                                >
                                  To
                                </button>
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs animate-pulse">
                                  From
                                </div>
                              )}
                            </>
                          )}

                          {!isCreatingConnection && (
                            <button
                              className="w-6 h-6 rounded-full bg-primary/20 text-primary hover:bg-primary/30 flex items-center justify-center"
                              onClick={(e) => {
                                e.stopPropagation()
                                startConnection(node.id)
                              }}
                            >
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border border-secondary/20 overflow-hidden">
            <div className="h-1 bg-secondary w-full"></div>
            <CardHeader>
              <div className="flex items-center">
                <Edit className="h-5 w-5 text-secondary-foreground mr-2" />
                <CardTitle>Node Properties</CardTitle>
              </div>
              <CardDescription>
                {selectedNode ? "Edit the selected node properties" : "Select a node to edit its properties"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedNode ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="node-title">Title</Label>
                    <Input
                      id="node-title"
                      value={selectedNode.title}
                      onChange={(e) => updateNode({ ...selectedNode, title: e.target.value })}
                      className="border-secondary/20 focus-visible:ring-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="node-description">Description</Label>
                    <Textarea
                      id="node-description"
                      value={selectedNode.description}
                      onChange={(e) => updateNode({ ...selectedNode, description: e.target.value })}
                      className="min-h-[80px] border-secondary/20 focus-visible:ring-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="node-status">Status</Label>
                    <Select
                      value={selectedNode.status}
                      onValueChange={(value) =>
                        updateNode({
                          ...selectedNode,
                          status: value as NodeStatus,
                        })
                      }
                    >
                      <SelectTrigger className="border-secondary/20 focus-visible:ring-secondary">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedNode.type === "email" && (
                    <div className="space-y-2">
                      <Label htmlFor="email-subject">Email Subject</Label>
                      <Input
                        id="email-subject"
                        placeholder="Enter email subject"
                        className="border-secondary/20 focus-visible:ring-secondary"
                      />
                    </div>
                  )}

                  {selectedNode.type === "delay" && (
                    <div className="space-y-2">
                      <Label htmlFor="delay-duration">Delay Duration (days)</Label>
                      <Input
                        id="delay-duration"
                        type="number"
                        min="1"
                        placeholder="Enter days"
                        className="border-secondary/20 focus-visible:ring-secondary"
                      />
                    </div>
                  )}

                  {selectedNode.type === "audience" && (
                    <div className="space-y-2">
                      <Label htmlFor="audience-segment">Audience Segment</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="border-secondary/20 focus-visible:ring-secondary">
                          <SelectValue placeholder="Select segment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subscribers</SelectItem>
                          <SelectItem value="engaged">Engaged Users</SelectItem>
                          <SelectItem value="inactive">Inactive Users</SelectItem>
                          <SelectItem value="new">New Subscribers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    onClick={() => setSelectedNode(null)}
                  >
                    Apply Changes
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Edit className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground">Select a node from the canvas to edit its properties</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border border-accent/20 overflow-hidden mt-6">
            <div className="h-1 bg-accent w-full"></div>
            <CardHeader>
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-accent mr-2" />
                <CardTitle>Campaign Templates</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-accent/20 text-accent-foreground hover:bg-accent/10"
                >
                  <Mail className="h-4 w-4 mr-2 text-accent" />
                  Email Drip Campaign
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-accent/20 text-accent-foreground hover:bg-accent/10"
                >
                  <MessageSquare className="h-4 w-4 mr-2 text-accent" />
                  Social Media Campaign
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-accent/20 text-accent-foreground hover:bg-accent/10"
                >
                  <Users className="h-4 w-4 mr-2 text-accent" />
                  Lead Nurturing Flow
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-accent/20 text-accent-foreground hover:bg-accent/10"
                >
                  <Calendar className="h-4 w-4 mr-2 text-accent" />
                  Event Promotion
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card className="border border-primary/20 overflow-hidden">
            <div className="h-1 bg-primary w-full"></div>
            <CardHeader>
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-accent mr-2" />
                <CardTitle>Campaign Flow Overview</CardTitle>
              </div>
              <CardDescription>Summary of your campaign flow and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4 p-4 border border-primary/10 rounded-lg bg-primary/5">
                  <h3 className="text-lg font-medium text-primary">Flow Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Nodes:</span>
                      <span className="font-medium">{nodes.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Nodes:</span>
                      <span className="font-medium">{nodes.filter((n) => n.status === "active").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Connections:</span>
                      <span className="font-medium">{connections.length}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-4 border border-secondary/10 rounded-lg bg-secondary/5">
                  <h3 className="text-lg font-medium text-secondary-foreground">Node Types</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{nodes.filter((n) => n.type === "email").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Social:</span>
                      <span className="font-medium">{nodes.filter((n) => n.type === "social").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delay:</span>
                      <span className="font-medium">{nodes.filter((n) => n.type === "delay").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Other:</span>
                      <span className="font-medium">
                        {nodes.filter((n) => !["email", "social", "delay"].includes(n.type)).length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-4 border border-accent/10 rounded-lg bg-accent/5">
                  <h3 className="text-lg font-medium text-accent-foreground">Status Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active:</span>
                      <span className="font-medium">{nodes.filter((n) => n.status === "active").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Draft:</span>
                      <span className="font-medium">{nodes.filter((n) => n.status === "draft").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Scheduled:</span>
                      <span className="font-medium">{nodes.filter((n) => n.status === "scheduled").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">{nodes.filter((n) => n.status === "completed").length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card className="border border-secondary/20 overflow-hidden">
            <div className="h-1 bg-secondary w-full"></div>
            <CardHeader>
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-secondary-foreground mr-2" />
                <CardTitle>Campaign Analytics</CardTitle>
              </div>
              <CardDescription>Performance metrics for your campaign flow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-background/80">
                <div className="flex flex-col items-center text-center p-4">
                  <BarChart3 className="h-10 w-10 text-secondary/40 mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Analytics will be available once your campaign is active
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-secondary/30 text-secondary-foreground hover:bg-secondary/10"
                  >
                    View Sample Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="border border-accent/20 overflow-hidden">
            <div className="h-1 bg-accent w-full"></div>
            <CardHeader>
              <div className="flex items-center">
                <Settings className="h-5 w-5 text-accent-foreground mr-2" />
                <CardTitle>Campaign Flow Settings</CardTitle>
              </div>
              <CardDescription>Configure settings for your campaign flow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="flow-name">Flow Name</Label>
                      <Input
                        id="flow-name"
                        placeholder="Enter flow name"
                        defaultValue="Spring Marketing Campaign"
                        className="border-accent/20 focus-visible:ring-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="flow-description">Description</Label>
                      <Textarea
                        id="flow-description"
                        placeholder="Enter flow description"
                        defaultValue="Multi-channel campaign for spring product launch"
                        className="min-h-[100px] border-accent/20 focus-visible:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="flow-status">Flow Status</Label>
                      <Select defaultValue="draft">
                        <SelectTrigger className="border-accent/20 focus-visible:ring-accent">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="flow-schedule">Schedule</Label>
                      <Select defaultValue="now">
                        <SelectTrigger className="border-accent/20 focus-visible:ring-accent">
                          <SelectValue placeholder="Select schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">Start Immediately</SelectItem>
                          <SelectItem value="later">Schedule for Later</SelectItem>
                          <SelectItem value="manual">Manual Activation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="outline" className="border-accent/30 text-accent-foreground hover:bg-accent/10">
                    Reset to Default
                  </Button>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

