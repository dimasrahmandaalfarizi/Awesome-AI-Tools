# Awesome AI Tools — UI/UX Design System Standards (Anti-AI-Slop & Zero-Emoji)

This document establishes the strict, non-negotiable UI/UX and visual engineering standards for the **Awesome AI Tools** codebase. All human contributors and AI coding agents MUST adhere to these rules.

---

## 🚫 Rule 1: Strict Zero-Emoji UI Standard (Non-Negotiable)

1. **NO Unicode Emojis in UI Components**:
   - **Prohibited**: Do NOT use emojis (`🚀`, `✨`, `🤖`, `⚡`, `🛡️`, `💡`, `🔥`, `📱`, `🛠️`, `🎉`, etc.) anywhere in user-facing JSX/TSX elements, buttons, titles, cards, navigation tabs, or status indicators.
   - **Why**: Emojis in web UI produce an amateurish, AI-generated template aesthetic ("AI Slop"), lack responsive vector scaling, and render inconsistently across OS platforms (macOS vs Windows vs Android).
   - **Required**: Always use sharp, monochrome vector SVG icons from `lucide-react` with deliberate stroke widths (`w-3.5 h-3.5` or `w-4 h-4`), muted foreground styling (`text-[var(--muted)]`), and semantic meaning.

2. **Emoji Conversion Guide**:

| Legacy Emoji | Approved Lucide Icon | Usage |
| :--- | :--- | :--- |
| `✨`, `🪄` | `Layers`, `Cpu`, or plain clean typography | Features / High-level sections |
| `🛡️` | `Shield` | Security, auditing, AgentShield |
| `🚀` | `Layers`, `ArrowRight` | Quickstart, deployments, releases |
| `🤖` | `Bot` | AI Agents, autonomous workers |
| `⚡` | `Zap`, `Cpu` | Performance, inference speed, local runtime |
| `💡` | `Terminal`, `Info` | Hints, code triggers, shortcuts |
| `📱` | `Smartphone`, `ExternalLink` | Mobile & cross-platform frameworks |
| `🛠️` | `Wrench`, `Settings` | Developer tools, stack configurations |
| `🧪` | `CheckCircle2`, `TestTube` | Testing, TDD, quality assurance |

---

## 🎨 Rule 2: Precision Monochrome & Hairline Palette

1. **Monochrome Zinc System (`Zinc-950 / Zinc-900 / Zinc-800`)**:
   - **Page Background**: Pure black / deep slate (`#09090b` / `var(--background)`).
   - **Card / Surface Background**: Dark zinc surface (`#121215` / `var(--surface)`).
   - **Surface Hover**: Subdued hover state (`#18181b` / `var(--surface-hover)`).
   - **Hairline Borders**: 1px crisp borders (`#27272a` / `var(--border)`), subtle highlight on focus/hover (`border-zinc-700` or `border-[var(--foreground)]/40`).

2. **No Rainbow or Neon Gradients**:
   - Never apply multi-stop saturated gradients (`bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500`).
   - Use high-contrast solid whites (`#fafafa` / `var(--foreground)`) and subtle status accents (e.g. `emerald-500` for live status, `red-500` for errors).

---

## 📐 Rule 3: Component Radius & Spacing Hierarchy

| Component | Allowed Radius | Padding Standard |
| :--- | :--- | :--- |
| **Buttons (`Button`)** | `rounded-lg` (8px) | `h-9 px-3.5 py-2` (compact & tactile) |
| **Cards & Containers** | `rounded-2xl` (16px) or `rounded-xl` (12px) | `p-5` (dense information architecture) |
| **Badges (`Badge`)** | `rounded-md` (6px) | `px-2 py-0.5 text-[11px] font-mono` |
| **Search / Text Inputs** | `rounded-xl` (12px) | `h-10 text-xs md:text-sm pl-10` |
| **Tabs / Filters** | `rounded-xl` (12px) | `px-3.5 py-2 text-xs font-medium` |

---

## 🔤 Rule 4: Typography & Information Architecture

1. **Tight Header Tracking**:
   - All `h1`, `h2`, `h3`, `h4` headers must use `tracking-tight` (`letter-spacing: -0.03em`) with sharp font weights (`font-bold` / `font-semibold`).
2. **Monospace Metadata (`JetBrains Mono`)**:
   - Commands (`/<slash-command>`, `@rules`), CLI snippets (`npx awesome-ai-tools init`), file paths (`.cursor/rules/*.mdc`), and token metrics must use `font-mono text-[11px]` with subtle border framing.
3. **High Density**:
   - Avoid empty hero cards or sprawling whitespace. Prioritize clear headings, actionable subheadings, and instantaneous copy/download actions.
