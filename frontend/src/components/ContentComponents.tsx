import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "./utils"
import { Button } from "./button"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Avatar, AvatarFallback } from "./avatar"

export function MemoContent() {
  const [memoText, setMemoText] = React.useState("")

  return (
    <div className="h-full">
      <textarea
        className="w-full h-full p-4 text-lg bg-background border-none resize-none focus:outline-none focus:ring-0"
        placeholder="Start typing your memo here..."
        value={memoText}
        onChange={(e) => setMemoText(e.target.value)}
      />
    </div>
  )
}

export function CitationExplorerContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Citation Explorer</h2>
      <p>Explore and manage your citations here.</p>
    </div>
  )
}

export function KnowledgeGraphContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Knowledge Graph</h2>
      <p>Visualize your knowledge connections here.</p>
    </div>
  )
}

export function NetworkGraphContent() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Network Graph</h2>
      <p>Explore your network connections here.</p>
    </div>
  )
}