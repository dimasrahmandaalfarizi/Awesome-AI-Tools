You are a Senior Product Manager, Senior UI/UX Designer, Senior Software Architect, and Senior Full Stack Engineer.

Your task is to design and build a modern, production-ready web application from scratch.

# PROJECT NAME

Awesome AI Dev Tools

Tagline:
The largest curated collection of AI tools, frameworks, MCP servers, agents, prompts, and resources for developers.

---

# PROJECT VISION

Build the best open-source platform for developers to discover, compare, search, and explore AI tools.

This is NOT just another Awesome List repository.

The platform should become the "Product Hunt + Awesome List + Documentation" for AI developer tools.

It must be visually impressive, fast, scalable, SEO-friendly, and community-driven.

The experience should feel modern, premium, and enjoyable.

---

# TARGET USERS

- Software Engineers
- Students
- Startup Founders
- AI Engineers
- Machine Learning Engineers
- Web Developers
- Mobile Developers
- DevOps Engineers
- Open Source Contributors

---

# PRIMARY GOALS

Users should be able to:

• Discover new AI tools
• Compare AI tools
• Search tools instantly
• Filter by category
• Save favorite tools
• Read concise descriptions
• Access official websites
• Explore trending tools
• Find open-source alternatives

---

# MVP FEATURES

## Home Page

Modern hero section

Large search bar

Featured categories

Trending tools

Recently added

Popular collections

Call-to-action for contributions

---

## Categories

Examples:

AI IDE

Coding Assistant

LLM

Agent Framework

MCP Server

Image Generation

Video Generation

Audio AI

Prompt Engineering

Deployment

Database

Vector Database

Automation

Browser AI

Productivity

Documentation

Testing

Security

Research

Open Source

---

## Tool Detail Page

Each tool contains:

Name

Logo

Description

Category

Pricing

Open Source status

GitHub Repository

Official Website

Supported Platforms

Best For

Features

Pros

Cons

Alternative Tools

Screenshots

Tags

Last Updated

---

## Search

Instant search

Autocomplete

Search by:

Name

Category

Tags

Description

---

## Filters

Category

Open Source

Free

Paid

Platform

Popularity

Recently Added

---

## Trending Section

Trending This Week

Most Viewed

Most Starred

Editor's Picks

---

## Comparison

Users can compare multiple tools.

Example:

Cursor vs Windsurf

Claude vs ChatGPT

OpenHands vs AutoGen

Show differences using tables.

---

## Collections

Examples:

Best AI Coding Tools

Best AI IDEs

Best Free AI

Best Open Source AI

Best MCP Servers

Best AI Agents

Best AI for Students

---

## Favorites

Users can bookmark tools.

---

## Responsive Design

Desktop

Tablet

Mobile

---

## Dark Mode

Default theme.

Support light mode.

---

## SEO

Optimized metadata

Open Graph

Twitter Cards

Structured Data

Dynamic Sitemap

---

## Accessibility

Keyboard navigation

Proper contrast

ARIA support

Semantic HTML

---

## Performance

Lazy loading

Image optimization

Fast page transitions

Optimized assets

Minimal bundle size

---

# ADMIN PANEL (Future)

Admin login

Add tools

Edit tools

Delete tools

Manage categories

Upload logos

Upload screenshots

Approve community submissions

Analytics dashboard

---

# COMMUNITY (Future)

Users can submit tools.

Users can report broken links.

Users can suggest edits.

Users can vote.

Users can comment.

---

# DESIGN STYLE

Premium

Minimal

Modern

Developer-focused

Inspired by:

Linear

Vercel

Stripe

Raycast

Supabase

GitHub

Tailwind UI

Notion

Avoid excessive decoration.

Whitespace is important.

Use smooth animations.

---

# COLOR PALETTE

Background

#09090B

Surface

#18181B

Primary

#4F46E5

Secondary

#22C55E

Accent

#06B6D4

Text

#FAFAFA

Muted

#A1A1AA

Border

#27272A

Danger

#EF4444

Warning

#F59E0B

---

# TYPOGRAPHY

Headings

Space Grotesk

Body

Inter

Monospace

JetBrains Mono

---

# ICONS

Lucide Icons

Simple Icons

Heroicons

---

# UI COMPONENTS

Cards

Search

Filter Chips

Badges

Tabs

Accordion

Drawer

Modal

Pagination

Toast

Tooltip

Dropdown

Command Palette

Skeleton Loading

Empty States

404 Page

Loading Animations

---

# ANIMATIONS

Subtle only.

Framer Motion

Fade

Slide

Scale

Hover interactions

Card lift

Animated gradients

Smooth page transitions

---

# DATABASE STRUCTURE

Category

id

name

slug

icon

description

createdAt

Tool

id

name

slug

description

logo

website

github

pricing

isOpenSource

platform

categoryId

lastUpdated

featured

createdAt

Tag

id

name

slug

ToolTag

toolId

tagId

Collection

id

title

slug

description

CollectionTool

collectionId

toolId

Favorite

userId

toolId

---

# RECOMMENDED TECH STACK

Frontend

Next.js

React

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

Backend

Supabase

PostgreSQL

Storage

Supabase Storage

Authentication

Supabase Auth

Deployment

Vercel

---

# PROJECT STRUCTURE

Follow scalable enterprise architecture.

Separate:

components

features

hooks

lib

types

utils

services

constants

data

public

styles

app

---

# CODING STANDARDS

Reusable components

Strict TypeScript

Clean architecture

Atomic design principles

Consistent naming

Server Components when possible

Client Components only when necessary

Avoid duplicated code

---

# README

Generate a professional README including:

Overview

Features

Screenshots placeholders

Installation

Development

Deployment

Contributing

License

Roadmap

---

# ROADMAP

Phase 1

Core platform

Phase 2

Authentication

Favorites

Phase 3

Community submissions

Phase 4

Admin dashboard

Phase 5

Public API

Phase 6

AI recommendations

---

# SUCCESS METRICS

Fast loading

Responsive

Excellent Lighthouse score

SEO optimized

Accessible

Easy to contribute

Easy to scale

Production ready

---

# DETAILED FRONTEND & UX SPECIFICATIONS

## 1. Micro-interactions & User Experience
- **Command Palette (`Cmd+K` / `Ctrl+K`)**: Global shortcut to trigger a unified search interface. Users can search tools, navigate categories, or toggle themes directly from this modal.
- **Copy to Clipboard**: Code snippets (e.g., npm install commands), prompts, or URLs must have a one-click copy button with a sleek toast notification.
- **Framer Motion Animations**:
  - Spotlight hover effects on tool cards (glowing borders tracking the cursor).
  - Spring-based micro-animations for buttons and dropdowns.
  - Skeleton loaders for all async data fetching to prevent layout shift.

## 2. Tool Detail Page Layout
- **Sticky Table of Contents (ToC)**: A sidebar that tracks scroll position, allowing quick jumps to "Features", "Pricing", or "Alternatives".
- **Media Gallery**: High-quality screenshot presentation. Use a lightbox modal or a smooth carousel slider to view multiple images.
- **Terminal Snippets**: For CLI tools (e.g., Aider, Copilot CLI), display installation commands in a macOS-style terminal window component with syntax highlighting.

## 3. Responsive Strategy
- **Mobile Filters**: On desktop, filters reside in a left sidebar. On mobile, they must convert into a Bottom Sheet (Drawer) that swipes up to save screen space.
- **Comparison Tables**: Standard tables fail on mobile. On mobile screens, comparison views should convert to a stacked card format or enable horizontal snapping scroll.

## 4. Advanced SEO & Metadata (Frontend)
- **Structured Data (JSON-LD)**: Implement `SoftwareApplication` schema for every tool page. This allows Google to display ratings, price, and supported OS directly in search results.
- **Dynamic Open Graph (OG) Images**: Use `@vercel/og` to automatically generate unique share images for each tool, displaying its logo, name, and category on a branded background.

## 5. Next.js Component Architecture
Adopt a feature-based structure for scalability:
- `components/ui/`: Standard UI components (buttons, inputs, dialogs) typically from shadcn/ui.
- `components/features/`: Domain-specific components (e.g., `ToolCard`, `CategorySidebar`, `ComparisonTable`).
- `components/layouts/`: Structural components (e.g., `Navbar`, `Footer`, `SidebarLayout`).

## 6. Collections Presentation
- **"Playlist" Style Layout**: Collections should feel curated (like Spotify playlists). Feature a large banner with a title and description, followed by a list view of tools (instead of a grid) emphasizing rank and curated reasoning for each tool.

---

# FINAL INSTRUCTION
Generate the entire project as if it were intended to become one of GitHub's most-starred open-source repositories.

Prioritize maintainability, scalability, developer experience, clean UI, reusable architecture, and excellent documentation.

Whenever there are multiple possible implementations, choose the one that is modern, production-ready, and follows current best practices.