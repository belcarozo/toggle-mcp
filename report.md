# Local Paxel — Builder Stats Report

_Scope: Sources: claude. Generated entirely on-device — nothing uploaded._

## Corpus
- Sources: **claude** (179 files, 53 sessions, 362 prompts)
- Transcripts parsed: **179** (28,266 events, 0 unparseable)
- Date range: **2026-08-14 → 2026-09-14** (32 days span, **21 active days**)
- Timezone: -03 (UTC-03:00)

## Volume
- Sessions: **53**
- Genuine prompts (human-typed): **362**  (+88 slash-command invocations)
- Avg prompt length: **1386 chars** (median 84)
- Assistant turns: 11,932 · tool calls: **6,429** · thinking blocks: 3,557

## Tools
- Tool diversity: **52 distinct tools** (normalized entropy 0.455)
- MCP share: **2%** (106 MCP / 6,323 native)
- Top tools:
  - `Bash` · 2,826 ████████████████████████████
  - `Read` · 1,701 █████████████████
  - `Edit` · 522 █████
  - `Grep` · 397 ████
  - `Write` · 159 ██
  - `Glob` · 138 █
  - `Agent` · 137 █
  - `ToolSearch` · 118 █
  - `AskUserQuestion` · 76 █
  - `WebFetch` · 53 █
  - `WebSearch` · 47 █
  - `ScheduleWakeup` · 44 █
  - `Skill` · 38 █
  - `ExitPlanMode` · 19 █
  - `mcp__context7__query-docs` · 14 █
  - `mcp__claude_ai_Atlassian__getJiraIssue` · 11 █
  - `TaskOutput` · 11 █
  - `TodoWrite` · 10 █
  - `mcp__context7__resolve-library-id` · 10 █
  - `ReportFindings` · 10 █
  - `mcp__claude_ai_Google_Calendar__list_events` · 8 █
  - `mcp__toggl__toggl_whoami` · 7 █
  - `SendMessage` · 6 █
  - `EnterPlanMode` · 6 █
  - `mcp__toggl__plan_week` · 5 █
  - `mcp__toggl__apply_week` · 5 █
  - `mcp__claude_ai_Figma__get_design_context` · 5 █
  - `TaskStop` · 4 █
  - `mcp__time__get_current_time` · 4 █
  - `mcp__claude_ai_Figma__get_metadata` · 4 █
  - `mcp__claude_ai_Slack__slack_search_public_and_private` · 3 █
  - `mcp__claude_ai_Atlassian__getAccessibleAtlassianResources` · 3 █
  - `mcp__claude_ai_Google_Calendar__search_events` · 3 █
  - `mcp__filesystem__read_text_file` · 3 █
  - `mcp__codegraph__codegraph_explore` · 2 █
  - `mcp__claude_ai_Google_Calendar__list_calendars` · 2 █
  - `mcp__filesystem__write_file` · 2 █
  - `mcp__claude_ai_Figma__search_design_system` · 2 █
  - `mcp__git__git_status` · 1 █
  - `mcp__git__git_log` · 1 █
  - `mcp__git__git_add` · 1 █
  - `mcp__git__git_reset` · 1 █
  - `mcp__toggl__git_activity` · 1 █
  - `mcp__filesystem__list_allowed_directories` · 1 █
  - `mcp__filesystem__directory_tree` · 1 █
  - `mcp__filesystem__get_file_info` · 1 █
  - `mcp__filesystem__move_file` · 1 █
  - `mcp__claude_ai_Figma__get_screenshot` · 1 █
  - `mcp__claude_ai_Slack__slack_read_thread` · 1 █
  - `ListAgents` · 1 █
  - `mcp__github__get_me` · 1 █
  - `mcp__github__create_repository` · 1 █
- Category mix: {'explore': 2531, 'execute': 2908, 'produce': 710, 'delegate': 137, 'ask': 76, 'plan': 35, 'other': 32}

## Code velocity
- **Git churn (gold standard): 6,030 lines** (+5,481 / -549) across 30 commits in 3/4 repos on disk
  - **123 lines/hour** over 49.1 active hours
  - By repo: toggl-mcp (3,906), myr (1,660), myr-verify (464)
- Tool-only churn (Edit/Write — what most profilers see): 21,005 lines. Git/tool ratio: **0.3×** — note this is **partial**: only 3 of 4 repos were counted (the rest are missing from disk, have no commits under your git email, or were too large to scan in time)
- Shell-authored work the Edit/Write path misses entirely: 172 file-writing Bash calls, ~1,919 lines of heredoc/redirect content

## Behavior
- Planning ratio (explore : doing): **1.62** (explore 6,088 vs doing 3,747, excluding 8 planning dispatches)
- Avg session: **60 min** (median 22)
- Errors: **233 tool errors** (3.6 per 100 tool calls); 218 recovered (94%); 44 API retries
- Iteration depth (edits/file before commit): mean **2.2**, median 1, p90 4, **max 20** — 2 files hammered >15× in one session
- Actions per prompt: **7.7** · questions asked: 76 · background: 56 · scheduled: 44

## Rhythm
- Peak hours (local): **11:00, 12:00, 16:00**
- Preferred days: **Mon, Tue, Thu**
- Hours:
  - 00  0
  - 01  0
  - 02  0
  - 03  0
  - 04  0
  - 05  0
  - 06  0
  - 07  0
  - 08 █ 6
  - 09 ██████ 1453
  - 10 ██████████ 2519
  - 11 ████████████████████████ 6154
  - 12 ███████████████ 3832
  - 13 ██████ 1411
  - 14 ████████ 1930
  - 15 █████ 1231
  - 16 █████████████ 3231
  - 17 ███████████ 2931
  - 18 █ 291
  - 19  0
  - 20  0
  - 21 █ 2
  - 22  0
  - 23  0
- Days:
  - Mon ████████████████████████ 7864
  - Tue ██████████████ 4598
  - Wed ████████████ 3870
  - Thu ██████████████ 4482
  - Fri █████████████ 4177
  - Sat  0
  - Sun  0

## Progression (monthly)
_Month-over-month evolution — the slope matters more than the totals when plan limits cap any single month._
- **2026-08** · prompts ████████████████ 184 · tool calls ████████████████ 3,750 · 11 active days · 36 sessions · ~14,802 lines · top model claude-sonnet-5
- **2026-09** · prompts ███████████████ 178 · tool calls ███████████ 2,679 · 10 active days · 18 sessions · ~6,203 lines · top model claude-sonnet-5

## Stack
- Models: claude-sonnet-5 (7595), claude-haiku-4-5-20251001 (2609), claude-opus-5 (1709), <synthetic> (19)
- Top skills: review-diff (15), slim-pr-description (15), systematic-debugging (13), implement-feature (8), cerberus (8), share-extension-imports (8), capture-learning (6), verify-change (6), track-week (6), spike-plan (4)
- Subagent types: explore-codebase (34), general-purpose (22), Explore (18), code-reviewer (16), simulator-driver (9), Plan (7), design-system-reviewer (5), jira-scribe (5), docs-researcher (5), claude (5)
- Top projects (events, sessions):
  - myr · 18,448 events · 42 sessions
  - gnomon · 2,960 events · 9 sessions
  - toggl-mcp · 1,293 events · 4 sessions
  - ios · 660 events · 2 sessions
  - logic · 365 events · 12 sessions
  - hooks · 64 events · 1 sessions
  - myr-verify · 35 events · 2 sessions
  - screens · 26 events · 1 sessions
  - scoring · 5 events · 1 sessions
  - .claude · 3 events · 1 sessions

## Autonomy
- **Autonomy score: 48.8/100**
- Components: {'actions_per_prompt': 13.8, 'delegation': 20.0, 'scheduling_background': 15.0, 'low_question_rate': 0.0}

## Agentic Quotient (AQ) — how you operate agents
_The scorecard above grades how you **build** (gstack); AQ grades how you **operate agents**._
- **AQ: 92/100 — Elite** _(custom metric, not from paxel; Breadth · Craft · Efficiency · Savvy)_
  - **Breadth** (30%): **87.6**
    - Orchestration: **29.3/33** (subagent_types=15, fanout_median=3, o_harn=1.0, frequency=0.917, frequency_score=1.0, frequency_confidence=1.0, frequency_weight=0.3, coordination_quality=0.84, orchestratable_sessions=24, delegated_orchestratable_sessions=22)
    - Skill fluency: **18.3/22** (skills_distinct=23, tool_calls=6429, skills_total=116, skills_total_per_call=0.018043, skills_total_per_call_target=0.009, process_skills_matched=True)
    - Tool command (MCP + CLI): **23.2/28** (mcp_servers=11, clis=37, tool_calls=6429, toolsearch_calls=118)
    - Discipline: **16.8/17** (tool_calls=6429, task_tool_calls=0, planning_practice_share=0.3396, planning_practice_target=0.3, planning_practice_eligible_sessions=53)
  - **Craft** (35%): **93.0**
    - Verification: **28.0/35** (tool_calls=6429, shell_test_runs=97, test_covered_change_sessions=15, eligible_change_sessions=25, test_coverage=0.6, review_skills=36, review_skills_per_call=0.0056, review_skills_per_call_target=0.004)
    - Grounding: **25.0/25** (planning_ratio=1.62)
    - Context Intelligence: **20.0/20** (grounded_sessions=25, write_sessions=25, total_sessions=53, coverage=1.0, target_coverage=0.6, grounded_session_rule=knowledge-MCP call OR explore-class project/data/design MCP call before a later Edit/Write/MultiEdit/NotebookEdit in the same session, score_formula=coverage = evidence_eligible_sessions / eligible_change_sessions; score = min(1, coverage / 0.60))
    - Compounding: **20.0/20** (tool_calls=6429, compounding_writes=58, compounding_writes_per_call=0.009022, compounding_writes_per_call_target=0.0018, compounding_skills_matched=True)
  - **Efficiency** (20%): **89.4**
    - Recovery: **89.4/100** (recovery_ratio=0.936, api_retries=44, api_per_100_tools=0.684)
  - **Savvy** (15%): **100.0**
    - Model mix: **50.0/50** (distinct_models=4, offload_share=0.36, routing={'state': 'unmeasured', 'score': None, 'successful_lower_tier_pairs': 0, 'eligible_completed_substantive_pairs': 0, 'excluded_reasons': {}})
    - Token economy: **50.0/50** (tool_calls=6429, cli_share=0.97)
- MCP vs CLI _(described, not graded)_: **CLI** 3,879 calls / 37 tools · **MCP** 106 calls / 11 servers · ratio 36.6:1 CLI-first
- Tool diversity _(described)_: 52 distinct tools, entropy 0.455