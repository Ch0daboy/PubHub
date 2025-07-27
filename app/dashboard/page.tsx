"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { getPlatformLogo } from "@/components/platform-logos"

export default function DashboardPage() {
  const [selectedPost, setSelectedPost] = useState(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState({})

  const platforms = [
    {
      id: "youtube",
      name: "YouTube",
      channelName: "TechWithSarah",
      followers: "125K subscribers",
      posts: [
        {
          id: "yt-001",
          title: "How to Build React Apps",
          time: "2 hours ago",
          engagement: "1.2K views",
          crossPlatform: "8/9",
          description: "Complete tutorial on building modern React applications with hooks and context",
          views: 1200,
          likes: 89,
          comments: 23,
          shares: 12,
          platforms: ["TikTok", "Instagram", "Twitter", "LinkedIn", "Blog", "Newsletter", "Pinterest", "Facebook"],
        },
        {
          id: "yt-002",
          title: "JavaScript ES6 Features",
          time: "1 day ago",
          engagement: "2.3K views",
          crossPlatform: "6/9",
          description: "Deep dive into modern JavaScript features and best practices",
          views: 2300,
          likes: 156,
          comments: 45,
          shares: 28,
          platforms: ["Twitter", "LinkedIn", "Blog", "Newsletter", "Pinterest", "Facebook"],
        },
        {
          id: "yt-003",
          title: "CSS Grid Layout Guide",
          time: "2 days ago",
          engagement: "1.8K views",
          crossPlatform: "4/9",
          description: "Master CSS Grid with practical examples and real-world projects",
          views: 1800,
          likes: 134,
          comments: 31,
          shares: 19,
          platforms: ["Instagram", "Pinterest", "Blog", "Newsletter"],
        },
        {
          id: "yt-004",
          title: "Node.js Backend Setup",
          time: "3 days ago",
          engagement: "3.1K views",
          crossPlatform: "7/9",
          description: "Step-by-step guide to setting up a Node.js backend with Express",
          views: 3100,
          likes: 234,
          comments: 67,
          shares: 45,
          platforms: ["TikTok", "Twitter", "LinkedIn", "Blog", "Newsletter", "Pinterest", "Facebook"],
        },
        {
          id: "yt-005",
          title: "Web Development Roadmap 2025",
          time: "4 days ago",
          engagement: "4.5K views",
          crossPlatform: "9/9",
          description: "Complete roadmap for becoming a web developer in 2025",
          views: 4500,
          likes: 389,
          comments: 98,
          shares: 76,
          platforms: ["TikTok", "Instagram", "Twitter", "LinkedIn", "Blog", "Newsletter", "Pinterest", "Facebook"],
        },
      ],
    },
    {
      id: "tiktok",
      name: "TikTok",
      channelName: "TechWithSarah",
      followers: "89K followers",
      posts: [
        {
          id: "tt-001",
          title: "Quick React Tips",
          time: "1 hour ago",
          engagement: "850 views",
          crossPlatform: "5/9",
          description: "30-second React tips that will make you a better developer",
          views: 850,
          likes: 67,
          comments: 12,
          shares: 8,
          platforms: ["Instagram", "Twitter", "YouTube", "Pinterest", "Facebook"],
        },
        {
          id: "tt-002",
          title: "CSS Tricks in 60 Seconds",
          time: "6 hours ago",
          engagement: "1.2K views",
          crossPlatform: "3/9",
          description: "Amazing CSS tricks you can learn in under a minute",
          views: 1200,
          likes: 89,
          comments: 15,
          shares: 11,
          platforms: ["Instagram", "Pinterest", "YouTube"],
        },
        {
          id: "tt-003",
          title: "JavaScript One-Liners",
          time: "12 hours ago",
          engagement: "2.1K views",
          crossPlatform: "6/9",
          description: "Powerful JavaScript one-liners that will blow your mind",
          views: 2100,
          likes: 156,
          comments: 28,
          shares: 23,
          platforms: ["Instagram", "Twitter", "YouTube", "LinkedIn", "Blog", "Newsletter"],
        },
        {
          id: "tt-004",
          title: "VS Code Extensions",
          time: "1 day ago",
          engagement: "1.8K views",
          crossPlatform: "4/9",
          description: "Must-have VS Code extensions for web developers",
          views: 1800,
          likes: 134,
          comments: 22,
          shares: 17,
          platforms: ["YouTube", "Twitter", "LinkedIn", "Blog"],
        },
        {
          id: "tt-005",
          title: "Git Commands Cheat Sheet",
          time: "2 days ago",
          engagement: "3.2K views",
          crossPlatform: "7/9",
          description: "Essential Git commands every developer should know",
          views: 3200,
          likes: 245,
          comments: 41,
          shares: 34,
          platforms: ["Instagram", "Twitter", "YouTube", "LinkedIn", "Blog", "Newsletter", "Pinterest"],
        },
      ],
    },
    {
      id: "instagram",
      name: "Instagram",
      channelName: "TechWithSarah",
      followers: "67K followers",
      posts: [
        {
          id: "ig-001",
          title: "Behind the scenes",
          time: "3 hours ago",
          engagement: "234 likes",
          crossPlatform: "2/9",
          description: "Behind the scenes of creating tech content and tutorials",
          views: 1500,
          likes: 234,
          comments: 18,
          shares: 9,
          platforms: ["TikTok", "YouTube"],
        },
        {
          id: "ig-002",
          title: "Code Setup Tour",
          time: "8 hours ago",
          engagement: "456 likes",
          crossPlatform: "5/9",
          description: "Tour of my coding setup and workspace organization",
          views: 2100,
          likes: 456,
          comments: 32,
          shares: 21,
          platforms: ["TikTok", "YouTube", "Pinterest", "Twitter", "Blog"],
        },
        {
          id: "ig-003",
          title: "Programming Languages Comparison",
          time: "1 day ago",
          engagement: "678 likes",
          crossPlatform: "8/9",
          description: "Visual comparison of popular programming languages",
          views: 3200,
          likes: 678,
          comments: 54,
          shares: 43,
          platforms: ["TikTok", "YouTube", "Twitter", "LinkedIn", "Blog", "Newsletter", "Pinterest", "Facebook"],
        },
        {
          id: "ig-004",
          title: "Web Dev Tools Carousel",
          time: "2 days ago",
          engagement: "543 likes",
          crossPlatform: "6/9",
          description: "Essential tools every web developer should use",
          views: 2800,
          likes: 543,
          comments: 41,
          shares: 28,
          platforms: ["YouTube", "Twitter", "LinkedIn", "Blog", "Newsletter", "Pinterest"],
        },
        {
          id: "ig-005",
          title: "Coding Motivation Quote",
          time: "3 days ago",
          engagement: "789 likes",
          crossPlatform: "3/9",
          description: "Inspirational quote for developers having a tough day",
          views: 4100,
          likes: 789,
          comments: 67,
          shares: 52,
          platforms: ["Twitter", "LinkedIn", "Pinterest"],
        },
      ],
    },
    {
      id: "twitter",
      name: "Twitter",
      channelName: "TechWithSarah",
      followers: "45K followers",
      posts: [
        {
          id: "tw-001",
          title: "React Hooks Thread",
          time: "4 hours ago",
          engagement: "123 retweets",
          crossPlatform: "6/9",
          description: "Comprehensive thread about React Hooks and their use cases",
          views: 2300,
          likes: 456,
          comments: 89,
          shares: 123,
          platforms: ["YouTube", "TikTok", "LinkedIn", "Blog", "Newsletter", "Pinterest"],
        },
        {
          id: "tw-002",
          title: "JavaScript Tips",
          time: "8 hours ago",
          engagement: "89 retweets",
          crossPlatform: "4/9",
          description: "Quick JavaScript tips for better code quality",
          views: 1800,
          likes: 234,
          comments: 45,
          shares: 89,
          platforms: ["YouTube", "LinkedIn", "Blog", "Newsletter"],
        },
        {
          id: "tw-003",
          title: "Web Dev Resources",
          time: "1 day ago",
          engagement: "234 retweets",
          crossPlatform: "7/9",
          description: "Curated list of web development resources and tools",
          views: 3400,
          likes: 567,
          comments: 123,
          shares: 234,
          platforms: ["YouTube", "Instagram", "LinkedIn", "Blog", "Newsletter", "Pinterest", "Facebook"],
        },
        {
          id: "tw-004",
          title: "CSS Grid Tips",
          time: "2 days ago",
          engagement: "156 retweets",
          crossPlatform: "5/9",
          description: "Advanced CSS Grid techniques for responsive layouts",
          views: 2100,
          likes: 345,
          comments: 67,
          shares: 156,
          platforms: ["YouTube", "Instagram", "Blog", "Newsletter", "Pinterest"],
        },
        {
          id: "tw-005",
          title: "Career Advice Thread",
          time: "3 days ago",
          engagement: "345 retweets",
          crossPlatform: "8/9",
          description: "Career advice for aspiring web developers",
          views: 4200,
          likes: 789,
          comments: 234,
          shares: 345,
          platforms: ["YouTube", "Instagram", "TikTok", "LinkedIn", "Blog", "Newsletter", "Pinterest", "Facebook"],
        },
      ],
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      channelName: "TechWithSarah",
      followers: "23K connections",
      posts: [
        {
          id: "li-001",
          title: "Tech Industry Insights",
          time: "6 hours ago",
          engagement: "89 reactions",
          crossPlatform: "5/9",
          description: "Latest insights on tech industry trends and opportunities",
          views: 1200,
          likes: 89,
          comments: 23,
          shares: 12,
          platforms: ["YouTube", "Twitter", "Blog", "Newsletter", "Facebook"],
        },
        {
          id: "li-002",
          title: "Remote Work Tips",
          time: "1 day ago",
          engagement: "156 reactions",
          crossPlatform: "6/9",
          description: "Productivity tips for remote software developers",
          views: 2100,
          likes: 156,
          comments: 45,
          shares: 28,
          platforms: ["YouTube", "Twitter", "Instagram", "Blog", "Newsletter", "Facebook"],
        },
        {
          id: "li-003",
          title: "Learning Path Guide",
          time: "2 days ago",
          engagement: "234 reactions",
          crossPlatform: "7/9",
          description: "Structured learning path for becoming a full-stack developer",
          views: 3200,
          likes: 234,
          comments: 67,
          shares: 45,
          platforms: ["YouTube", "Twitter", "Instagram", "Blog", "Newsletter", "Pinterest", "Facebook"],
        },
        {
          id: "li-004",
          title: "Interview Preparation",
          time: "3 days ago",
          engagement: "178 reactions",
          crossPlatform: "4/9",
          description: "Technical interview preparation guide for developers",
          views: 1800,
          likes: 178,
          comments: 34,
          shares: 23,
          platforms: ["YouTube", "Blog", "Newsletter", "Facebook"],
        },
        {
          id: "li-005",
          title: "Open Source Contribution",
          time: "4 days ago",
          engagement: "123 reactions",
          crossPlatform: "6/9",
          description: "How to start contributing to open source projects",
          views: 2400,
          likes: 123,
          comments: 56,
          shares: 34,
          platforms: ["YouTube", "Twitter", "Blog", "Newsletter", "Pinterest", "Facebook"],
        },
      ],
    },
    {
      id: "facebook",
      name: "Facebook",
      channelName: "TechWithSarah",
      followers: "34K followers",
      posts: [
        {
          id: "fb-001",
          title: "Web Development Community",
          time: "5 hours ago",
          engagement: "67 reactions",
          crossPlatform: "4/9",
          description: "Building a supportive web development community",
          views: 890,
          likes: 67,
          comments: 12,
          shares: 8,
          platforms: ["YouTube", "LinkedIn", "Blog", "Newsletter"],
        },
        {
          id: "fb-002",
          title: "Coding Bootcamp Review",
          time: "1 day ago",
          engagement: "123 reactions",
          crossPlatform: "6/9",
          description: "Honest review of popular coding bootcamps",
          views: 1500,
          likes: 123,
          comments: 34,
          shares: 19,
          platforms: ["YouTube", "Twitter", "LinkedIn", "Blog", "Newsletter", "Pinterest"],
        },
        {
          id: "fb-003",
          title: "Tech Stack Comparison",
          time: "2 days ago",
          engagement: "89 reactions",
          crossPlatform: "7/9",
          description: "Comparing popular tech stacks for web development",
          views: 2100,
          likes: 89,
          comments: 23,
          shares: 15,
          platforms: ["YouTube", "Twitter", "Instagram", "LinkedIn", "Blog", "Newsletter", "Pinterest"],
        },
        {
          id: "fb-004",
          title: "Freelancing Tips",
          time: "3 days ago",
          engagement: "156 reactions",
          crossPlatform: "5/9",
          description: "Essential tips for freelance web developers",
          views: 1800,
          likes: 156,
          comments: 45,
          shares: 28,
          platforms: ["YouTube", "LinkedIn", "Blog", "Newsletter", "Pinterest"],
        },
        {
          id: "fb-005",
          title: "Developer Tools Review",
          time: "4 days ago",
          engagement: "234 reactions",
          crossPlatform: "8/9",
          description: "Review of essential developer tools and software",
          views: 2800,
          likes: 234,
          comments: 67,
          shares: 42,
          platforms: ["YouTube", "Twitter", "Instagram", "LinkedIn", "Blog", "Newsletter", "Pinterest"],
        },
      ],
    },
    {
      id: "pinterest",
      name: "Pinterest",
      channelName: "TechWithSarah",
      followers: "12K followers",
      posts: [
        {
          id: "pt-001",
          title: "Web Design Inspiration",
          time: "7 hours ago",
          engagement: "45 saves",
          crossPlatform: "3/9",
          description: "Beautiful web design inspiration and UI patterns",
          views: 560,
          likes: 45,
          comments: 8,
          shares: 23,
          platforms: ["Instagram", "Blog", "Newsletter"],
        },
        {
          id: "pt-002",
          title: "Color Palette Guide",
          time: "1 day ago",
          engagement: "89 saves",
          crossPlatform: "5/9",
          description: "Professional color palettes for web projects",
          views: 1200,
          likes: 89,
          comments: 15,
          shares: 34,
          platforms: ["Instagram", "Twitter", "Blog", "Newsletter", "Facebook"],
        },
        {
          id: "pt-003",
          title: "Typography Trends",
          time: "2 days ago",
          engagement: "123 saves",
          crossPlatform: "6/9",
          description: "Latest typography trends in web design",
          views: 1800,
          likes: 123,
          comments: 23,
          shares: 45,
          platforms: ["Instagram", "Twitter", "LinkedIn", "Blog", "Newsletter", "Facebook"],
        },
        {
          id: "pt-004",
          title: "CSS Animation Examples",
          time: "3 days ago",
          engagement: "67 saves",
          crossPlatform: "4/9",
          description: "Creative CSS animation examples and tutorials",
          views: 890,
          likes: 67,
          comments: 12,
          shares: 19,
          platforms: ["YouTube", "Instagram", "Blog", "Newsletter"],
        },
        {
          id: "pt-005",
          title: "Mobile UI Patterns",
          time: "4 days ago",
          engagement: "156 saves",
          crossPlatform: "7/9",
          description: "Mobile UI design patterns and best practices",
          views: 2300,
          likes: 156,
          comments: 34,
          shares: 67,
          platforms: ["Instagram", "Twitter", "LinkedIn", "Blog", "Newsletter", "Facebook"],
        },
      ],
    },
    {
      id: "blog",
      name: "Blog",
      channelName: "TechWithSarah",
      followers: "15K readers",
      posts: [
        {
          id: "bl-001",
          title: "Complete React Guide 2025",
          time: "1 day ago",
          engagement: "234 views",
          crossPlatform: "8/9",
          description: "Comprehensive guide to React development in 2025",
          views: 2340,
          likes: 89,
          comments: 23,
          shares: 45,
          platforms: ["YouTube", "TikTok", "Instagram", "Twitter", "LinkedIn", "Newsletter", "Pinterest", "Facebook"],
        },
        {
          id: "bl-002",
          title: "JavaScript Performance Tips",
          time: "3 days ago",
          engagement: "189 views",
          crossPlatform: "6/9",
          description: "Advanced JavaScript performance optimization techniques",
          views: 1890,
          likes: 67,
          comments: 15,
          shares: 28,
          platforms: ["YouTube", "Twitter", "LinkedIn", "Newsletter", "Pinterest", "Facebook"],
        },
        {
          id: "bl-003",
          title: "CSS Grid vs Flexbox",
          time: "5 days ago",
          engagement: "156 views",
          crossPlatform: "5/9",
          description: "When to use CSS Grid vs Flexbox in your projects",
          views: 1560,
          likes: 45,
          comments: 12,
          shares: 19,
          platforms: ["YouTube", "Instagram", "Twitter", "Newsletter", "Pinterest"],
        },
        {
          id: "bl-004",
          title: "Node.js Best Practices",
          time: "1 week ago",
          engagement: "298 views",
          crossPlatform: "7/9",
          description: "Essential Node.js best practices for production apps",
          views: 2980,
          likes: 123,
          comments: 34,
          shares: 56,
          platforms: ["YouTube", "Twitter", "LinkedIn", "Newsletter", "Pinterest", "Facebook"],
        },
        {
          id: "bl-005",
          title: "Web Accessibility Guide",
          time: "1 week ago",
          engagement: "167 views",
          crossPlatform: "4/9",
          description: "Making your websites accessible to everyone",
          views: 1670,
          likes: 56,
          comments: 18,
          shares: 23,
          platforms: ["LinkedIn", "Newsletter", "Pinterest", "Facebook"],
        },
      ],
    },
    {
      id: "newsletter",
      name: "Newsletter",
      channelName: "TechWithSarah",
      followers: "8K subscribers",
      posts: [
        {
          id: "nl-001",
          title: "Weekly Tech Roundup #47",
          time: "3 days ago",
          engagement: "89% open rate",
          crossPlatform: "6/9",
          description: "Weekly roundup of tech news and development updates",
          views: 7120,
          likes: 234,
          comments: 45,
          shares: 67,
          platforms: ["YouTube", "Twitter", "LinkedIn", "Blog", "Pinterest", "Facebook"],
        },
        {
          id: "nl-002",
          title: "React 19 Features Preview",
          time: "1 week ago",
          engagement: "92% open rate",
          crossPlatform: "7/9",
          description: "Preview of upcoming React 19 features and changes",
          views: 7360,
          likes: 189,
          comments: 34,
          shares: 56,
          platforms: ["YouTube", "TikTok", "Twitter", "LinkedIn", "Blog", "Pinterest", "Facebook"],
        },
        {
          id: "nl-003",
          title: "Career Growth Tips",
          time: "2 weeks ago",
          engagement: "87% open rate",
          crossPlatform: "5/9",
          description: "Tips for advancing your career as a developer",
          views: 6960,
          likes: 156,
          comments: 28,
          shares: 42,
          platforms: ["LinkedIn", "Blog", "Pinterest", "Facebook"],
        },
        {
          id: "nl-004",
          title: "JavaScript Frameworks 2025",
          time: "3 weeks ago",
          engagement: "91% open rate",
          crossPlatform: "8/9",
          description: "State of JavaScript frameworks in 2025",
          views: 7280,
          likes: 267,
          comments: 56,
          shares: 89,
          platforms: ["YouTube", "TikTok", "Twitter", "LinkedIn", "Blog", "Pinterest", "Facebook"],
        },
        {
          id: "nl-005",
          title: "Web Performance Checklist",
          time: "1 month ago",
          engagement: "88% open rate",
          crossPlatform: "4/9",
          description: "Essential web performance optimization checklist",
          views: 7040,
          likes: 123,
          comments: 23,
          shares: 34,
          platforms: ["Blog", "Pinterest", "Facebook"],
        },
      ],
    },
  ]

  const allPlatformNames = [
    "TikTok",
    "Instagram",
    "Twitter",
    "LinkedIn",
    "Blog",
    "Newsletter",
    "Pinterest",
    "Facebook",
    "YouTube",
  ]

  const handlePlatformToggle = (postId, platform) => {
    setSelectedPlatforms((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [platform]: !prev[postId]?.[platform],
      },
    }))
  }

  const handleSynchronize = (postId) => {
    const selected = selectedPlatforms[postId] || {}
    const selectedPlatformList = Object.keys(selected).filter((platform) => selected[platform])

    if (selectedPlatformList.length > 0) {
      // Here you would implement the actual synchronization logic
      console.log(`Synchronizing post ${postId} to platforms:`, selectedPlatformList)

      // Reset selections after sync
      setSelectedPlatforms((prev) => ({
        ...prev,
        [postId]: {},
      }))
    }
  }

  const getMissingPlatforms = (post) => {
    return allPlatformNames.filter((platform) => !post.platforms.includes(platform))
  }

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-black via-neutral-900 to-emerald-900/20">
      {/* Platform Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.id} className="bg-neutral-900 border-neutral-700">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  {getPlatformLogo(platform.name, "w-8 h-8")}
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-white tracking-wider">{platform.channelName}</CardTitle>
                  <p className="text-sm text-neutral-400">{platform.followers}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {platform.posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-2 bg-neutral-800 rounded hover:bg-neutral-700 transition-colors cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold font-mono">{post.crossPlatform}</span>
                      </div>
                      <div>
                        <div className="text-xs text-white">{post.title}</div>
                        <div className="text-xs text-neutral-500">{post.engagement}</div>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-400 font-mono">{post.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-white tracking-wider">{selectedPost.title}</CardTitle>
                <p className="text-sm text-neutral-400 font-mono">{selectedPost.id}</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedPost(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">POST DETAILS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Views:</span>
                        <span className="text-white font-mono">{selectedPost.views?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Likes:</span>
                        <span className="text-white font-mono">{selectedPost.likes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Comments:</span>
                        <span className="text-white font-mono">{selectedPost.comments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Shares:</span>
                        <span className="text-white font-mono">{selectedPost.shares}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">
                      CROSS-PLATFORM COVERAGE
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Coverage</span>
                        <span className="text-white font-mono">{selectedPost.crossPlatform}</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(selectedPost.platforms.length / 9) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">PUBLISHED ON</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.platforms.map((platform) => (
                        <div key={platform} className="flex items-center gap-2 bg-neutral-800 rounded px-2 py-1">
                          {getPlatformLogo(platform.toLowerCase(), "w-4 h-4")}
                          <span className="text-xs text-neutral-300">{platform}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">MISSING PLATFORMS</h3>
                    <div className="space-y-2">
                      {getMissingPlatforms(selectedPost).map((platform) => (
                        <div key={platform} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getPlatformLogo(platform.toLowerCase(), "w-4 h-4")}
                            <span className="text-xs text-neutral-300">{platform}</span>
                          </div>
                          <Checkbox
                            checked={selectedPlatforms[selectedPost.id]?.[platform] || false}
                            onCheckedChange={() => handlePlatformToggle(selectedPost.id, platform)}
                          />
                        </div>
                      ))}
                    </div>

                    {getMissingPlatforms(selectedPost).length > 0 && (
                      <Button
                        onClick={() => handleSynchronize(selectedPost.id)}
                        className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white"
                        disabled={!Object.values(selectedPlatforms[selectedPost.id] || {}).some(Boolean)}
                      >
                        Synchronize Selected Platforms
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">DESCRIPTION</h3>
                <p className="text-sm text-neutral-300">{selectedPost.description}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Edit Post</Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  View Analytics
                </Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  Boost Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
