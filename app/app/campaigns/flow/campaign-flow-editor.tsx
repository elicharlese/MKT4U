"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trash2,
  Mail,
  MessageSquare,
  FileText,
  Clock,
  Users,
  Sparkles,
  Workflow,
  Layers,
  Settings,
  PanelLeft,
  PanelRight,
} from "lucide-react"

// Node types for the flow editor
type NodeType = "email" | "sms" | "social" | "condition" | "delay" | "audience"
type Node = {
  id: string
  type: NodeType
  position: { x: number; y: number }
  data: {
    title: string
    description?: string
    [key: string]: any
  }
}

type Connection = {
  id: string
  source: string
  target: string
}

export function CampaignFlowEditor() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "start",
      type: "audience",
      position: { x: 400, y: 50 },
      data: {
        title: "Campaign Start",
        description: "Target audience: All subscribers",
      },
    },
    {
      id: "email1",
      type: "email",
      position: { x: 400, y: 200 },
      data: {
        title: "Welcome Email",
        description: "Introduction to the spring collection",
      },
    },
    {
      id: "delay1",
      type: "delay",
      position: { x: 400, y: 350 },
      data: {
        title: "Wait 3 Days",
        description: "Delay before follow-up",
      },
    },
    {
      id: "email2",
      type: "email",
      position: { x: 400, y: 500 },
      data: {
        title: "Follow-up Email",
        description: "Featured products and special offer",
      },
    },
  ])

  const [connections, setConnections] = useState<Connection[]>([
    { id: "conn1", source: "start", target: "email1" },
    { id: "conn2", source: "email1", target: "delay1" },
    { id: "conn3", source: "delay1", target: "email2" },
  ])

  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Handle node selection
  const handleNodeClick = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNode(nodeId)
  }

  // Handle canvas click to deselect
  const handleCanvasClick = () => {
    setSelectedNode(null)
  }

  // Start dragging a node
  const handleNodeDragStart = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return

    setIsDragging(true)
    setDraggedNode(nodeId)

    // Calculate offset from mouse position to node position
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const offsetX = e.clientX - rect.left - node.position.x
      const offsetY = e.clientY - rect.top - node.position.y
      setDragOffset({ x: offsetX, y: offsetY })
    }
  }

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedNode) return

    const node = nodes.find((n) => n.id === draggedNode)
    if (!node || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const newX = e.clientX - rect.left - dragOffset.x
    const newY = e.clientY - rect.top - dragOffset.y

    // Update node position
    setNodes(nodes.map((n) => (n.id === draggedNode ? { ...n, position: { x: newX, y: newY } } : n)))
  }

  // End dragging
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      setDraggedNode(null)
    }
  }

  // Add a new node
  const addNode = (type: NodeType) => {
    const newId = `node-${Date.now()}`
    const newNode: Node = {
      id: newId,
      type,
      position: { x: 200, y: 200 },
      data: {
        title: getDefaultTitle(type),
        description: "",
      },
    }

    setNodes([...nodes, newNode])
    setSelectedNode(newId)
  }

  // Get default title based on node type
  const getDefaultTitle = (type: NodeType): string => {
    switch (type) {
      case "email":
        return "New Email"
      case "sms":
        return "New SMS"
      case "social":
        return "Social Media Post"
      case "condition":
        return "Condition"
      case "delay":
        return "Delay"
      case "audience":
        return "Audience Segment"
      default:
        return "New Node"
    }
  }

  // Delete selected node
  const deleteSelectedNode = () => {
    if (!selectedNode) return

    // Remove connections to/from this node
    const filteredConnections = connections.filter(
      (conn) => conn.source !== selectedNode && conn.target !== selectedNode,
    )

    // Remove the node
    const filteredNodes = nodes.filter((node) => node.id !== selectedNode)

    setConnections(filteredConnections)
    setNodes(filteredNodes)
    setSelectedNode(null)
  }

  // Update node data
  const updateNodeData = (key: string, value: any) => {
    if (!selectedNode) return

    setNodes(
      nodes.map((node) =>
        node.id === selectedNode
          ? {
              ...node,
              data: {
                ...node.data,
                [key]: value,
              },
            }
          : node,
      ),
    )
  }

  // Get node by ID
  const getNodeById = (id: string) => {
    return nodes.find((node) => node.id === id)
  }

  // Get selected node
  const getSelectedNodeData = () => {
    if (!selectedNode) return null
    return getNodeById(selectedNode)
  }

  // Connect two nodes
  const connectNodes = (sourceId: string, targetId: string) => {
    const newConnection: Connection = {
      id: `conn-${Date.now()}`,
      source: sourceId,
      target: targetId,
    }
    setConnections([...connections, newConnection])
  }

  // Render node based on type
  const renderNode = (node: Node) => {
    const isSelected = selectedNode === node.id

    // Base styles
    const baseClasses = `absolute rounded-lg shadow-md transition-all duration-200 w-64 cursor-move ${
      isSelected ? "ring-2 ring-primary" : ""
    }`

    // Type-specific styles
    let typeClasses = ""
    let icon = null

    switch (node.type) {
      case "email":
        typeClasses = "bg-primary/10 border border-primary/30"
        icon = <Mail className="h-5 w-5 text-primary" />
        break
      case "sms":
        typeClasses = "bg-secondary/10 border border-secondary/30"
        icon = <MessageSquare className="h-5 w-5 text-secondary-foreground" />
        break
      case "social":
        typeClasses = "bg-accent/10 border border-accent/30"
        icon = <FileText className="h-5 w-5 text-accent-foreground" />
        break
      case "condition":
        typeClasses = "bg-yellow-500/10 border border-yellow-500/30"
        icon = <Workflow className="h-5 w-5 text-yellow-500" />
        break
      case "delay":
        typeClasses = "bg-blue-500/10 border border-blue-500/30"
        icon = <Clock className="h-5 w-5 text-blue-500" />
        break
      case "audience":
        typeClasses = "bg-green-500/10 border border-green-500/30"
        icon = <Users className="h-5 w-5 text-green-500" />
        break
      default:
        typeClasses = "bg-gray-100 border border-gray-300"
    }

    return (
      <div
        key={node.id}
        className={`${baseClasses} ${typeClasses}`}
        style={{
          left: `${node.position.x}px`,
          top: `${node.position.y}px`,
        }}
        onClick={(e) => handleNodeClick(node.id, e)}
        onMouseDown={(e) => handleNodeDragStart(node.id, e)}
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {icon}
              <h3 className="ml-2 font-medium text-sm">{node.data.title}</h3>
            </div>
            {isSelected && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteSelectedNode()
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          {node.data.description && <p className="text-xs text-muted-foreground">{node.data.description}</p>}
        </div>
      </div>
    )
  }

  // Render connections between nodes
  const renderConnections = () => {
    return connections.map((connection) => {
      const sourceNode = getNodeById(connection.source)
      const targetNode = getNodeById(connection.target)

      if (!sourceNode || !targetNode) return null

      // Calculate connection points
      const sourceX = sourceNode.position.x + 128 // half of node width
      const sourceY = sourceNode.position.y + 50 // approximate bottom of node
      const targetX = targetNode.position.x + 128 // half of node width
      const targetY = targetNode.position.y // top of node

      // Create SVG path
      const path = `M${sourceX},${sourceY} C${sourceX},${sourceY + 50} ${targetX},${targetY - 50} ${targetX},${targetY}`

      return (
        <svg
          key={connection.id}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: -1 }}
        >
          <path d={path} stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground" />
          <path d={`M${targetX},${targetY} l-5,-10 l10,0 z`} fill="currentColor" className="text-muted-foreground" />
        </svg>
      )
    })
  }

  // Node properties panel
  const renderNodeProperties = () => {
    const node = getSelectedNodeData()
    if (!node) return null

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="node-title">Title</Label>
          <Input id="node-title" value={node.data.title} onChange={(e) => updateNodeData("title", e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="node-description">Description</Label>
          <Textarea
            id="node-description"
            value={node.data.description || ""}
            onChange={(e) => updateNodeData("description", e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Type-specific properties */}
        {node.type === "email" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="email-subject">Email Subject</Label>
              <Input
                id="email-subject"
                value={node.data.subject || ""}
                onChange={(e) => updateNodeData("subject", e.target.value)}
                placeholder="Enter email subject line"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-sender">Sender</Label>
              <Input
                id="email-sender"
                value={node.data.sender || ""}
                onChange={(e) => updateNodeData("sender", e.target.value)}
                placeholder="name@example.com"
              />
            </div>
          </>
        )}

        {node.type === "delay" && (
          <div className="space-y-2">
            <Label>Delay Duration</Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="1"
                max="30"
                value={node.data.days || 1}
                onChange={(e) => updateNodeData("days", Number.parseInt(e.target.value))}
                className="w-20"
              />
              <Select value={node.data.timeUnit || "days"} onValueChange={(value) => updateNodeData("timeUnit", value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Time unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {node.type === "audience" && (
          <div className="space-y-2">
            <Label htmlFor="audience-segment">Audience Segment</Label>
            <Select value={node.data.segment || "all"} onValueChange={(value) => updateNodeData("segment", value)}>
              <SelectTrigger id="audience-segment">
                <SelectValue placeholder="Select segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subscribers</SelectItem>
                <SelectItem value="new">New Subscribers</SelectItem>
                <SelectItem value="active">Active Customers</SelectItem>
                <SelectItem value="inactive">Inactive Customers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {node.type === "condition" && (
          <div className="space-y-4">
            <Label>Condition Type</Label>
            <Select
              value={node.data.conditionType || "opened"}
              onValueChange={(value) => updateNodeData("conditionType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opened">Email Opened</SelectItem>
                <SelectItem value="clicked">Link Clicked</SelectItem>
                <SelectItem value="purchased">Made Purchase</SelectItem>
                <SelectItem value="custom">Custom Condition</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-250px)] min-h-[600px] border rounded-lg overflow-hidden bg-background">
      {/* Left Panel - Node Types */}
      {showLeftPanel && (
        <div className="w-64 border-r p-4 flex flex-col">
          <h3 className="font-medium mb-4 flex items-center">
            <Layers className="h-4 w-4 mr-2" />
            Node Types
          </h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start border-primary/20 text-primary hover:bg-primary/10"
              onClick={() => addNode("email")}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-secondary/20 text-secondary-foreground hover:bg-secondary/10"
              onClick={() => addNode("sms")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              SMS
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-accent/20 text-accent-foreground hover:bg-accent/10"
              onClick={() => addNode("social")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Social Post
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10"
              onClick={() => addNode("condition")}
            >
              <Workflow className="h-4 w-4 mr-2" />
              Condition
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-blue-500/20 text-blue-500 hover:bg-blue-500/10"
              onClick={() => addNode("delay")}
            >
              <Clock className="h-4 w-4 mr-2" />
              Delay
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-green-500/20 text-green-500 hover:bg-green-500/10"
              onClick={() => addNode("audience")}
            >
              <Users className="h-4 w-4 mr-2" />
              Audience
            </Button>
          </div>

          <div className="mt-auto pt-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground"
              onClick={() => setShowLeftPanel(false)}
            >
              <PanelLeft className="h-4 w-4 mr-2" />
              Hide Panel
            </Button>
          </div>
        </div>
      )}

      {/* Canvas */}
      <div
        className="flex-1 relative overflow-auto bg-muted/20"
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {!showLeftPanel && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 left-2 text-muted-foreground"
            onClick={() => setShowLeftPanel(true)}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}

        {!showRightPanel && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-muted-foreground"
            onClick={() => setShowRightPanel(true)}
          >
            <PanelRight className="h-4 w-4" />
          </Button>
        )}

        <div className="min-h-full min-w-full h-[2000px] w-[2000px]">
          {renderConnections()}
          {nodes.map(renderNode)}
        </div>
      </div>

      {/* Right Panel - Properties */}
      {showRightPanel && (
        <div className="w-80 border-l p-4 flex flex-col">
          <h3 className="font-medium mb-4 flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Properties
          </h3>

          {selectedNode ? (
            renderNodeProperties()
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
              <Sparkles className="h-10 w-10 mb-4 text-accent/40" />
              <p>Select a node to edit its properties</p>
              <p className="text-xs mt-2">Or add a new node from the left panel</p>
            </div>
          )}

          <div className="mt-auto pt-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground"
              onClick={() => setShowRightPanel(false)}
            >
              <PanelRight className="h-4 w-4 mr-2" />
              Hide Panel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

