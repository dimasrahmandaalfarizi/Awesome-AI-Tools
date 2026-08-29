---
name: Travel Planner
description: 旅行/行程规划需求时使用:规划去某地旅行、X天X城、带老人孩子、自驾、假期安排等。产出逐日行程表、预算估算(经济/舒适/奢华三档)、交通住宿建议、景点美食清单。必须先问预算,预算未确认只输出问题清单;事实数据带来源和查询日期。
frameworks: [Travel, travel, itinerary, planning, trip, AAS Core, Agentic]
---

# Travel Planner

旅行/行程规划需求时使用:规划去某地旅行、X天X城、带老人孩子、自驾、假期安排等。产出逐日行程表、预算估算(经济/舒适/奢华三档)、交通住宿建议、景点美食清单。必须先问预算,预算未确认只输出问题清单;事实数据带来源和查询日期。

## Category & Classification
- **Domain**: Travel
- **Risk Profile**: `safe`
- **Source**: community
- **Triggers**: `travel`, `itinerary`, `planning`, `trip`, `chinese`, `planner`

## Usage & Execution Guidelines
1. **Context Activation**: Invoke this skill when dealing with travel planner tasks or related sub-problems.
2. **Rule Enforcement**: Follow industrial best practices, keep implementations modular, and ensure complete type-safety.
3. **Verification**: Run comprehensive diagnostics and edge-case unit tests before marking task as complete.

## Supported Agent Harnesses
- **Claude Code**: `/travel-planner`
- **Antigravity / OpenAI Codex**: `.agents/skills/travel-planner/SKILL.md`
- **Cursor**: `.cursor/rules/travel-planner.mdc`

