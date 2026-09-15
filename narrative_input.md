# Narrative input (LOCAL ONLY — for the archetype/traits pass)

Full metrics:
```json
{
  "scope": "Sources: claude",
  "generated_local_only": true,
  "corpus": {
    "sources": {
      "claude": {
        "files": 179,
        "sessions": 53,
        "prompts": 362
      }
    },
    "files_parsed": 179,
    "lines_total": 28266,
    "lines_unparseable": 0,
    "date_range": [
      "2026-08-14T13:46:00.975000-03:00",
      "2026-09-14T16:29:25.873000-03:00"
    ],
    "window": null,
    "observed_range": [
      "2026-08-14T13:46:00.975000-03:00",
      "2026-09-14T16:29:25.873000-03:00"
    ],
    "span_days": 32,
    "active_days": 21,
    "timezone": "-03 (UTC-03:00)",
    "antigravity_experimental": null
  },
  "volume": {
    "total_sessions": 53,
    "total_prompts": 362,
    "command_invocations": 88,
    "total_instructions": 450,
    "avg_prompt_length_chars": 1385.9,
    "median_prompt_length_chars": 83.5,
    "assistant_turns": 11932,
    "tool_calls_total": 6429,
    "sidechain_tool_calls": 2976,
    "thinking_blocks": 3557
  },
  "tools": {
    "tool_diversity": 52,
    "tool_entropy_normalized": 0.455,
    "mcp_calls": 106,
    "native_calls": 6323,
    "mcp_share": 0.016,
    "top_tools": [
      [
        "Bash",
        2826
      ],
      [
        "Read",
        1701
      ],
      [
        "Edit",
        522
      ],
      [
        "Grep",
        397
      ],
      [
        "Write",
        159
      ],
      [
        "Glob",
        138
      ],
      [
        "Agent",
        137
      ],
      [
        "ToolSearch",
        118
      ],
      [
        "AskUserQuestion",
        76
      ],
      [
        "WebFetch",
        53
      ],
      [
        "WebSearch",
        47
      ],
      [
        "ScheduleWakeup",
        44
      ],
      [
        "Skill",
        38
      ],
      [
        "ExitPlanMode",
        19
      ],
      [
        "mcp__context7__query-docs",
        14
      ],
      [
        "mcp__claude_ai_Atlassian__getJiraIssue",
        11
      ],
      [
        "TaskOutput",
        11
      ],
      [
        "TodoWrite",
        10
      ],
      [
        "mcp__context7__resolve-library-id",
        10
      ],
      [
        "ReportFindings",
        10
      ],
      [
        "mcp__claude_ai_Google_Calendar__list_events",
        8
      ],
      [
        "mcp__toggl__toggl_whoami",
        7
      ],
      [
        "SendMessage",
        6
      ],
      [
        "EnterPlanMode",
        6
      ],
      [
        "mcp__toggl__plan_week",
        5
      ],
      [
        "mcp__toggl__apply_week",
        5
      ],
      [
        "mcp__claude_ai_Figma__get_design_context",
        5
      ],
      [
        "TaskStop",
        4
      ],
      [
        "mcp__time__get_current_time",
        4
      ],
      [
        "mcp__claude_ai_Figma__get_metadata",
        4
      ],
      [
        "mcp__claude_ai_Slack__slack_search_public_and_private",
        3
      ],
      [
        "mcp__claude_ai_Atlassian__getAccessibleAtlassianResources",
        3
      ],
      [
        "mcp__claude_ai_Google_Calendar__search_events",
        3
      ],
      [
        "mcp__filesystem__read_text_file",
        3
      ],
      [
        "mcp__codegraph__codegraph_explore",
        2
      ],
      [
        "mcp__claude_ai_Google_Calendar__list_calendars",
        2
      ],
      [
        "mcp__filesystem__write_file",
        2
      ],
      [
        "mcp__claude_ai_Figma__search_design_system",
        2
      ],
      [
        "mcp__git__git_status",
        1
      ],
      [
        "mcp__git__git_log",
        1
      ],
      [
        "mcp__git__git_add",
        1
      ],
      [
        "mcp__git__git_reset",
        1
      ],
      [
        "mcp__toggl__git_activity",
        1
      ],
      [
        "mcp__filesystem__list_allowed_directories",
        1
      ],
      [
        "mcp__filesystem__directory_tree",
        1
      ],
      [
        "mcp__filesystem__get_file_info",
        1
      ],
      [
        "mcp__filesystem__move_file",
        1
      ],
      [
        "mcp__claude_ai_Figma__get_screenshot",
        1
      ],
      [
        "mcp__claude_ai_Slack__slack_read_thread",
        1
      ],
      [
        "ListAgents",
        1
      ],
      [
        "mcp__github__get_me",
        1
      ],
      [
        "mcp__github__create_repository",
        1
      ]
    ],
    "category_breakdown": {
      "explore": 2531,
      "execute": 2908,
      "produce": 710,
      "delegate": 137,
      "ask": 76,
      "plan": 35,
      "other": 32
    },
    "mcp_servers": [
      [
        "context7",
        24
      ],
      [
        "toggl",
        18
      ],
      [
        "claude_ai_Atlassian",
        14
      ],
      [
        "claude_ai_Google_Calendar",
        13
      ],
      [
        "claude_ai_Figma",
        12
      ],
      [
        "filesystem",
        9
      ],
      [
        "claude_ai_Slack",
        4
      ],
      [
        "time",
        4
      ],
      [
        "git",
        4
      ],
      [
        "codegraph",
        2
      ],
      [
        "github",
        2
      ]
    ],
    "top_mcp_servers": [
      [
        "context7",
        24
      ],
      [
        "toggl",
        18
      ],
      [
        "claude_ai_Atlassian",
        14
      ],
      [
        "claude_ai_Google_Calendar",
        13
      ],
      [
        "claude_ai_Figma",
        12
      ],
      [
        "filesystem",
        9
      ],
      [
        "claude_ai_Slack",
        4
      ],
      [
        "time",
        4
      ],
      [
        "git",
        4
      ],
      [
        "codegraph",
        2
      ],
      [
        "github",
        2
      ]
    ],
    "mcp_servers_distinct": 11,
    "mcp_knowledge_calls": 26,
    "mcp_knowledge_servers": 2,
    "mcp_knowledge_server_names": [
      "codegraph",
      "context7"
    ],
    "mcp_grounded_sessions": 22,
    "mcp_write_sessions": 32,
    "mcp_grounded_session_names": [
      "02648f8a-ba1b-43ff-994c-2cef3690edde",
      "179fc659-c5e7-4819-99d3-c04c39536f1d",
      "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
      "32c6a897-b7f6-423a-860a-89c14004a769",
      "4248fab8-1bcf-4d5d-b09d-d4c26b112089",
      "46e9e73f-fc12-4de0-a0c4-e2af10aed8b2",
      "57b26093-98a8-49ca-bfbf-2e5255e59359",
      "60239a67-eec1-45f9-bfab-fac1f865966c",
      "6de78b56-9227-4742-af63-cebef841f7c7",
      "703ea2db-8899-4c30-a95d-49d2de8728b0",
      "7c66cc47-ccc1-4569-9264-7f42a5dc615b",
      "8cfa4c31-61c7-4790-b1bf-c0534f972f0c",
      "8ea10be0-fa67-4296-ad5a-c53f11ff00b6",
      "9413715b-9c39-454b-98bd-8bc41699cf85",
      "959c566d-13cc-4b7f-b59d-77c1a5a43a0c",
      "a1bc9211-371f-4c50-88ff-f7ee9a1148d5",
      "a23fe1ff-fd2e-4a44-88d6-e74cabd83eef",
      "a3ff6ae5-c4e1-491b-85ae-c6dd7dbeda3d",
      "c512003b-3668-4411-8afb-bc79556fbace",
      "e22d806f-8a24-4d76-831a-6ad563591bed",
      "ee590dc8-30d8-4db8-b34b-2c77fa9c2fe6",
      "f450ab37-7a5e-40e7-bb92-f1c5a423234a"
    ],
    "mcp_subcategory_breakdown": {
      "communication": {
        "calls": 17,
        "servers": 2
      },
      "data": {
        "calls": 18,
        "servers": 1
      },
      "design": {
        "calls": 12,
        "servers": 1
      },
      "infra": {
        "calls": 1,
        "servers": 1
      },
      "knowledge": {
        "calls": 26,
        "servers": 2
      },
      "other": {
        "calls": 16,
        "servers": 3
      },
      "project": {
        "calls": 16,
        "servers": 2
      }
    },
    "clis": [
      [
        "grep",
        1187
      ],
      [
        "git",
        794
      ],
      [
        "find",
        317
      ],
      [
        "cat",
        313
      ],
      [
        "ls",
        308
      ],
      [
        "sed",
        201
      ],
      [
        "rg",
        155
      ],
      [
        "pnpm",
        136
      ],
      [
        "python3",
        110
      ],
      [
        "npx",
        47
      ],
      [
        "vitest",
        46
      ],
      [
        "node",
        45
      ],
      [
        "npm",
        40
      ],
      [
        "mkdir",
        31
      ],
      [
        "tsc",
        31
      ],
      [
        "rm",
        20
      ],
      [
        "curl",
        17
      ],
      [
        "python",
        10
      ],
      [
        "cp",
        9
      ],
      [
        "pod",
        7
      ],
      [
        "brew",
        6
      ],
      [
        "jq",
        5
      ],
      [
        "chmod",
        5
      ],
      [
        "awk",
        5
      ],
      [
        "expo",
        5
      ],
      [
        "eslint",
        5
      ],
      [
        "open",
        5
      ],
      [
        "jest",
        3
      ],
      [
        "xcodebuild",
        3
      ],
      [
        "pip3",
        3
      ],
      [
        "pip",
        2
      ],
      [
        "pytest",
        2
      ],
      [
        "prettier",
        2
      ],
      [
        "yarn",
        1
      ],
      [
        "swift",
        1
      ],
      [
        "gh",
        1
      ],
      [
        "ssh",
        1
      ]
    ],
    "clis_distinct": 37,
    "cli_calls": 3879,
    "toolsearch_calls": 118,
    "task_tool_calls": 0,
    "agent_calls": 137
  },
  "velocity": {
    "git_churn_total": 6030,
    "git_insertions": 5481,
    "git_deletions": 549,
    "git_commits_real": 30,
    "git_velocity_lines_per_hour": 122.9,
    "git_repos_with_commits": 3,
    "git_repos_seen": 4,
    "git_per_repo": [
      [
        "toggl-mcp",
        3858,
        48,
        4
      ],
      [
        "myr",
        1159,
        501,
        25
      ],
      [
        "myr-verify",
        464,
        0,
        1
      ]
    ],
    "tool_churn_edit_write": 21005,
    "tool_lines_added": 15743,
    "tool_lines_removed": 5262,
    "tool_velocity_lines_per_hour": 428.1,
    "shell_write_calls": 172,
    "shell_authored_lines_est": 1919,
    "active_hours": 49.1,
    "git_commits_grep": 13,
    "git_churn_basis": [
      "2026-08-14",
      "2026-09-15"
    ]
  },
  "behavior": {
    "planning_ratio_explore_to_doing": 1.62,
    "explore_actions": 6088,
    "produce_actions": 710,
    "execute_actions": 2908,
    "delegate_actions": 137,
    "planning_dispatch_actions": 8,
    "avg_session_minutes": 59.6,
    "median_session_minutes": 21.9,
    "longest_run_minutes": 185.2,
    "polite_prompts": 44,
    "error_recovery_ratio": 0.936,
    "error_rate_per_100_tools": 3.6,
    "tool_errors": 233,
    "recovered_errors": 218,
    "api_errors_retries": 44,
    "fanout_median": 3,
    "max_session_fanout": 14,
    "parallel_dispatch_turns": 0,
    "delegating_sessions": 29,
    "parallel_session_share": 0.724,
    "iteration_depth_mean": 2.16,
    "iteration_depth_median": 1,
    "iteration_depth_p90": 4,
    "iteration_depth_max": 20,
    "files_hammered_over_15x": 2,
    "actions_per_prompt": 7.7,
    "questions_asked": 76,
    "background_tasks": 56,
    "scheduled_actions": 44,
    "shell_test_runs": 97,
    "plan_sessions": 18,
    "planning_skill_sessions": 18,
    "planning_skill_eligible_sessions": 53,
    "planning_skill_unmeasured_sessions": 0,
    "planning_skill_session_scope_state": "measured",
    "planning_skill_session_share": 0.339623,
    "planning_skill_session_coverage": 1.0,
    "eligible_change_sessions": 25,
    "test_covered_change_sessions": 15,
    "planned_eligible_sessions": 12,
    "evidence_eligible_sessions": 25,
    "orchestratable_sessions": 24,
    "delegated_orchestratable_sessions": 22,
    "ordered_facts_state": "measured",
    "sidechain_label_state": "measured",
    "linked_model_pairs": [
      {
        "provider": "anthropic",
        "parent_session": "06a66014-6aec-4476-bed7-a1647b335d4b",
        "child_session": "a12dffb0919b0d894",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 5,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "06a66014-6aec-4476-bed7-a1647b335d4b",
        "child_session": "a8dcf1d4aa3151b90",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 30,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "20cff7a0-1f9b-435c-8045-6d6c9c3f6762",
        "child_session": "abfd43dc855edb68f",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "20cff7a0-1f9b-435c-8045-6d6c9c3f6762",
        "child_session": "ad2baeb6099a0e04d",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "20cff7a0-1f9b-435c-8045-6d6c9c3f6762",
        "child_session": "ac01515b0af0afe65",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 38,
        "writes": 16
      },
      {
        "provider": "anthropic",
        "parent_session": "20cff7a0-1f9b-435c-8045-6d6c9c3f6762",
        "child_session": "a6aa88a514c4be31f",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 38,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "c113cd7e-50d4-4dd8-bba6-c12c0a1ff2fb",
        "child_session": "a06350cfe99c77716",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 4,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e22d806f-8a24-4d76-831a-6ad563591bed",
        "child_session": "adafe42f42d45630e",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 31,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e22d806f-8a24-4d76-831a-6ad563591bed",
        "child_session": "a56d1fd50843867c5",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 37,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e22d806f-8a24-4d76-831a-6ad563591bed",
        "child_session": "a8195f5feed6b7b4e",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 22,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e22d806f-8a24-4d76-831a-6ad563591bed",
        "child_session": "ae098bc1d5e1dfb6e",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 35,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e22d806f-8a24-4d76-831a-6ad563591bed",
        "child_session": "ae5da9becb1cbdd0d",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 23,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e22d806f-8a24-4d76-831a-6ad563591bed",
        "child_session": "a10a8d5659b78afeb",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 25,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e22d806f-8a24-4d76-831a-6ad563591bed",
        "child_session": "a00b42b6c20f2d4a7",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 27,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "02648f8a-ba1b-43ff-994c-2cef3690edde",
        "child_session": "a4a9f823053198205",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 56,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "02648f8a-ba1b-43ff-994c-2cef3690edde",
        "child_session": "afa8a613fe4ac9f4e",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 33,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "02648f8a-ba1b-43ff-994c-2cef3690edde",
        "child_session": "abcdbbc3f82e48d7a",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 5,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "02648f8a-ba1b-43ff-994c-2cef3690edde",
        "child_session": "a12011fb9ac3e982a",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 6,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "02648f8a-ba1b-43ff-994c-2cef3690edde",
        "child_session": "ad569c780338190df",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 40,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "02648f8a-ba1b-43ff-994c-2cef3690edde",
        "child_session": "a30c6479888abeecf",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 43,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "02648f8a-ba1b-43ff-994c-2cef3690edde",
        "child_session": "affe226a3dfa51f4b",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 33,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "02648f8a-ba1b-43ff-994c-2cef3690edde",
        "child_session": "ae90ba9606d11f19a",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 24,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "02648f8a-ba1b-43ff-994c-2cef3690edde",
        "child_session": "aa0750e40a13f26c8",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 27,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "02648f8a-ba1b-43ff-994c-2cef3690edde",
        "child_session": "a2959cb89bdc107fe",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 41,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "0c308e91-647c-421f-a897-692aad6bb709",
        "child_session": "a1ae4c2503eb0c3f8",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 20,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "179fc659-c5e7-4819-99d3-c04c39536f1d",
        "child_session": "a39799e87ae60b64c",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 51,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "179fc659-c5e7-4819-99d3-c04c39536f1d",
        "child_session": "ac795b45d4324bf71",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 20,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "a15875da1810e3b16",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 19,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "a170e63705650eb4f",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 26,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "a8954a3ecb0f1f4d7",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "a3087ea3e4c545efc",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "a429f9f9b0b1f9764",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 26,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "a314d291964c1adb4",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "a976c0319ab74058c",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "a6d8bf24c5a09fca6",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 8,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "a0a7b30887a3bf546",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 23,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "a90ac5377a35ad085",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 46,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "af532a6626d4f7b6f",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "a2cfd2c9ca7b95dff",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "ac65049497f214359",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "1bc4b225-e14d-4c82-9b2f-e8c8606c6504",
        "child_session": "aaf643ea5f237e654",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 22,
        "writes": 5
      },
      {
        "provider": "anthropic",
        "parent_session": "32c6a897-b7f6-423a-860a-89c14004a769",
        "child_session": "a9468d7e7d58629e4",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "32c6a897-b7f6-423a-860a-89c14004a769",
        "child_session": "a9a464c91abaf170e",
        "lead_model": "claude-haiku-4-5-20251001",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 70,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "32c6a897-b7f6-423a-860a-89c14004a769",
        "child_session": "a7125d3fdb8716f1d",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 19,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "4461d2f1-90c1-4fa9-bccf-3c992cd3bd15",
        "child_session": "a719f8d3031cfd5d4",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 9,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "4461d2f1-90c1-4fa9-bccf-3c992cd3bd15",
        "child_session": "ae3757d5d66f4ea7e",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "46e9e73f-fc12-4de0-a0c4-e2af10aed8b2",
        "child_session": "a8174cb0798984f96",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 8,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "47eeb42a-8af4-4890-8ff1-8f47331f4055",
        "child_session": "a2d3f1bc7c06bfa38",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 17,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "47eeb42a-8af4-4890-8ff1-8f47331f4055",
        "child_session": "ae98936568bf5edcd",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 21,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "47eeb42a-8af4-4890-8ff1-8f47331f4055",
        "child_session": "af16db17a4f45a504",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 15,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "6de78b56-9227-4742-af63-cebef841f7c7",
        "child_session": "a5df8c6c781994454",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 15,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "6de78b56-9227-4742-af63-cebef841f7c7",
        "child_session": "a910558d4843dbaf1",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 13,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "703ea2db-8899-4c30-a95d-49d2de8728b0",
        "child_session": "aa159f761fd3a4a8a",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 56,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "703ea2db-8899-4c30-a95d-49d2de8728b0",
        "child_session": "a33ed66f6a71ce1e4",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 72,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "703ea2db-8899-4c30-a95d-49d2de8728b0",
        "child_session": "a34dbfc696ba9ba28",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 76,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "703ea2db-8899-4c30-a95d-49d2de8728b0",
        "child_session": "af8580b9231e93592",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 1,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "703ea2db-8899-4c30-a95d-49d2de8728b0",
        "child_session": "af0b44307d6f9a756",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 60,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "703ea2db-8899-4c30-a95d-49d2de8728b0",
        "child_session": "a9cd829333c99d637",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 26,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "703ea2db-8899-4c30-a95d-49d2de8728b0",
        "child_session": "a395d0a543c9448a0",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 24,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "703ea2db-8899-4c30-a95d-49d2de8728b0",
        "child_session": "af5edf0046f30f423",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 24,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "703ea2db-8899-4c30-a95d-49d2de8728b0",
        "child_session": "a89d0bab3b9242090",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 15,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "703ea2db-8899-4c30-a95d-49d2de8728b0",
        "child_session": "a0b10e132dd538c92",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 18,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "745b2d09-c8e8-4fc6-91c2-4e7f0c332cb2",
        "child_session": "afbee6b3c504187ed",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 39,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "7755b10e-0663-4d58-9554-b23f8fffe557",
        "child_session": "ab81612391498eb14",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 24,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "7c66cc47-ccc1-4569-9264-7f42a5dc615b",
        "child_session": "af2f51e3309541b5b",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 41,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "7c66cc47-ccc1-4569-9264-7f42a5dc615b",
        "child_session": "a9f3069d57d314884",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "7c66cc47-ccc1-4569-9264-7f42a5dc615b",
        "child_session": "a915fe3e9b11be911",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 25,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "82fb5a6a-9838-4edc-92cc-8dfe2595f8dc",
        "child_session": "a7c6b356ea6440265",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 3,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "8cfa4c31-61c7-4790-b1bf-c0534f972f0c",
        "child_session": "a4c74fb6b66aa1c89",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 63,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "8cfa4c31-61c7-4790-b1bf-c0534f972f0c",
        "child_session": "a966d623344f68cc5",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "9413715b-9c39-454b-98bd-8bc41699cf85",
        "child_session": "a17a5df232b29e82e",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "959c566d-13cc-4b7f-b59d-77c1a5a43a0c",
        "child_session": "ad8b74edbef8e9a07",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "959c566d-13cc-4b7f-b59d-77c1a5a43a0c",
        "child_session": "a20227a61a10a72f9",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "959c566d-13cc-4b7f-b59d-77c1a5a43a0c",
        "child_session": "a46f6fc8e2417dcde",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "959c566d-13cc-4b7f-b59d-77c1a5a43a0c",
        "child_session": "a6f345af486cac94d",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "959c566d-13cc-4b7f-b59d-77c1a5a43a0c",
        "child_session": "a15067ee332227c90",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "959c566d-13cc-4b7f-b59d-77c1a5a43a0c",
        "child_session": "af602bb12747a22e6",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "959c566d-13cc-4b7f-b59d-77c1a5a43a0c",
        "child_session": "af647c086f5de9fe4",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 19,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a23fe1ff-fd2e-4a44-88d6-e74cabd83eef",
        "child_session": "ac747441ef6828221",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 35,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a23fe1ff-fd2e-4a44-88d6-e74cabd83eef",
        "child_session": "a0807fe0a708d7234",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 14,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a23fe1ff-fd2e-4a44-88d6-e74cabd83eef",
        "child_session": "aad3e65034173dd05",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 23,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a23fe1ff-fd2e-4a44-88d6-e74cabd83eef",
        "child_session": "a2155344fade218cf",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 10,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a3ff6ae5-c4e1-491b-85ae-c6dd7dbeda3d",
        "child_session": "a08ab7750156e6ae8",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a3ff6ae5-c4e1-491b-85ae-c6dd7dbeda3d",
        "child_session": "a9bdef66294e54af8",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a3ff6ae5-c4e1-491b-85ae-c6dd7dbeda3d",
        "child_session": "a7554c89b89ff22ba",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a3ff6ae5-c4e1-491b-85ae-c6dd7dbeda3d",
        "child_session": "ad469036c8305cdb5",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 40,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a3ff6ae5-c4e1-491b-85ae-c6dd7dbeda3d",
        "child_session": "a86bf51a66b93bc74",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a3ff6ae5-c4e1-491b-85ae-c6dd7dbeda3d",
        "child_session": "afc7421dc6c3598bc",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a3ff6ae5-c4e1-491b-85ae-c6dd7dbeda3d",
        "child_session": "a20f694eb727f670a",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a3ff6ae5-c4e1-491b-85ae-c6dd7dbeda3d",
        "child_session": "a9bcf55ec7bb61fd9",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a3ff6ae5-c4e1-491b-85ae-c6dd7dbeda3d",
        "child_session": "af8772dba3a9b5f89",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "c512003b-3668-4411-8afb-bc79556fbace",
        "child_session": "ae81933b1dfa97a2e",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "c512003b-3668-4411-8afb-bc79556fbace",
        "child_session": "ae5cee838133bddce",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "c512003b-3668-4411-8afb-bc79556fbace",
        "child_session": "aea1121a88266828b",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 53,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "c512003b-3668-4411-8afb-bc79556fbace",
        "child_session": "a9acd1a4076f889e4",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 41,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "c512003b-3668-4411-8afb-bc79556fbace",
        "child_session": "ad2c7668ffefcbd39",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 21,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "c512003b-3668-4411-8afb-bc79556fbace",
        "child_session": "a358bc5cf7f0b97a6",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "c512003b-3668-4411-8afb-bc79556fbace",
        "child_session": "a3ddd0e468e9945c1",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 8,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "c512003b-3668-4411-8afb-bc79556fbace",
        "child_session": "a0d39177cafa84b45",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 28,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e382a50b-63b0-4d13-b94c-e4463d306cfb",
        "child_session": "a4cc65610c5863a15",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e382a50b-63b0-4d13-b94c-e4463d306cfb",
        "child_session": "a7dce39302b5575b2",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e382a50b-63b0-4d13-b94c-e4463d306cfb",
        "child_session": "a075ab0ca271e047a",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e382a50b-63b0-4d13-b94c-e4463d306cfb",
        "child_session": "aeb2b564757dc1d5a",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e382a50b-63b0-4d13-b94c-e4463d306cfb",
        "child_session": "a8b296bc7bd4d33b7",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e382a50b-63b0-4d13-b94c-e4463d306cfb",
        "child_session": "a530483490de8311a",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "e382a50b-63b0-4d13-b94c-e4463d306cfb",
        "child_session": "afeb775078e9a53ad",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": false,
        "substantive_calls": 0,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "ee590dc8-30d8-4db8-b34b-2c77fa9c2fe6",
        "child_session": "a89b7cca2116d096f",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 17,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "f450ab37-7a5e-40e7-bb92-f1c5a423234a",
        "child_session": "a2e07be08b30c6530",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 41,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "f450ab37-7a5e-40e7-bb92-f1c5a423234a",
        "child_session": "a809b5fc44a73005f",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 13,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a1bc9211-371f-4c50-88ff-f7ee9a1148d5",
        "child_session": "a5a4bdd25ae458a89",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 6,
        "writes": 1
      },
      {
        "provider": "anthropic",
        "parent_session": "a1bc9211-371f-4c50-88ff-f7ee9a1148d5",
        "child_session": "a6f27e0f3a68c667b",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 1,
        "writes": 1
      },
      {
        "provider": "anthropic",
        "parent_session": "a1bc9211-371f-4c50-88ff-f7ee9a1148d5",
        "child_session": "a89c14b9b4aa9aaf0",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 12,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a1bc9211-371f-4c50-88ff-f7ee9a1148d5",
        "child_session": "abcb6e7f3ceb14e9b",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 13,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a1bc9211-371f-4c50-88ff-f7ee9a1148d5",
        "child_session": "ae2e6a2dafc32719a",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 12,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a1bc9211-371f-4c50-88ff-f7ee9a1148d5",
        "child_session": "afcb22f6255c84919",
        "lead_model": "claude-opus-5",
        "child_model": "claude-opus-5[1m]",
        "completed": true,
        "substantive_calls": 11,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a1bc9211-371f-4c50-88ff-f7ee9a1148d5",
        "child_session": "a187629df19c07171",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-haiku-4-5-20251001",
        "completed": true,
        "substantive_calls": 39,
        "writes": 0
      },
      {
        "provider": "anthropic",
        "parent_session": "a1bc9211-371f-4c50-88ff-f7ee9a1148d5",
        "child_session": "aa2cc17ff3f21942a",
        "lead_model": "claude-sonnet-5",
        "child_model": "claude-sonnet-5",
        "completed": true,
        "substantive_calls": 22,
        "writes": 0
      }
    ],
    "linked_model_routing_state": "unmeasured",
    "no_tool_activity": false
  },
  "rhythm": {
    "hour_histogram_local": {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 6,
      "9": 1453,
      "10": 2519,
      "11": 6154,
      "12": 3832,
      "13": 1411,
      "14": 1930,
      "15": 1231,
      "16": 3231,
      "17": 2931,
      "18": 291,
      "19": 0,
      "20": 0,
      "21": 2,
      "22": 0,
      "23": 0
    },
    "weekday_histogram": {
      "Mon": 7864,
      "Tue": 4598,
      "Wed": 3870,
      "Thu": 4482,
      "Fri": 4177,
      "Sat": 0,
      "Sun": 0
    },
    "peak_hours_local": [
      11,
      12,
      16
    ],
    "preferred_days": [
      "Mon",
      "Tue",
      "Thu"
    ]
  },
  "progression": {
    "monthly": [
      {
        "month": "2026-08",
        "prompts": 184,
        "tool_calls": 3750,
        "sessions": 36,
        "active_days": 11,
        "tool_churn_lines": 14802,
        "models": [
          [
            "claude-sonnet-5",
            4240
          ],
          [
            "claude-opus-5",
            1376
          ],
          [
            "claude-haiku-4-5-20251001",
            1186
          ]
        ],
        "top_model": "claude-sonnet-5",
        "tokens_input": 40440,
        "tokens_output": 5028018,
        "tokens_cache_read": 621370519,
        "tokens_cache_creation": 32113247,
        "tokens_total": 658552224
      },
      {
        "month": "2026-09",
        "prompts": 178,
        "tool_calls": 2679,
        "sessions": 18,
        "active_days": 10,
        "tool_churn_lines": 6203,
        "models": [
          [
            "claude-sonnet-5",
            3355
          ],
          [
            "claude-haiku-4-5-20251001",
            1423
          ],
          [
            "claude-opus-5",
            333
          ]
        ],
        "top_model": "claude-sonnet-5",
        "tokens_input": 19103,
        "tokens_output": 3903366,
        "tokens_cache_read": 483368588,
        "tokens_cache_creation": 32019422,
        "tokens_total": 519310479
      }
    ]
  },
  "stack": {
    "models": [
      [
        "claude-sonnet-5",
        7595
      ],
      [
        "claude-haiku-4-5-20251001",
        2609
      ],
      [
        "claude-opus-5",
        1709
      ],
      [
        "<synthetic>",
        19
      ]
    ],
    "top_skills": [
      [
        "review-diff",
        15
      ],
      [
        "slim-pr-description",
        15
      ],
      [
        "systematic-debugging",
        13
      ],
      [
        "implement-feature",
        8
      ],
      [
        "cerberus",
        8
      ],
      [
        "share-extension-imports",
        8
      ],
      [
        "capture-learning",
        6
      ],
      [
        "verify-change",
        6
      ],
      [
        "track-week",
        6
      ],
      [
        "spike-plan",
        4
      ],
      [
        "simulator-screenshot-verify",
        4
      ],
      [
        "writing-plans",
        3
      ],
      [
        "generate-qa-notes",
        3
      ],
      [
        "retro",
        3
      ],
      [
        "code-review",
        3
      ],
      [
        "find-docs",
        2
      ],
      [
        "figma-implement-design",
        2
      ],
      [
        "brainstorm",
        2
      ],
      [
        "sdd-tasks",
        1
      ],
      [
        "difficult-bug",
        1
      ],
      [
        "context7-mcp",
        1
      ],
      [
        "jira-ticket-authoring",
        1
      ],
      [
        "run-skill-generator",
        1
      ]
    ],
    "skills_distinct": 23,
    "skills_total": 116,
    "model_signal_missing": false,
    "subagent_types_distinct": 15,
    "max_session_subagent_types": 7,
    "skills_all": [
      [
        "review-diff",
        15
      ],
      [
        "slim-pr-description",
        15
      ],
      [
        "systematic-debugging",
        13
      ],
      [
        "implement-feature",
        8
      ],
      [
        "cerberus",
        8
      ],
      [
        "share-extension-imports",
        8
      ],
      [
        "capture-learning",
        6
      ],
      [
        "verify-change",
        6
      ],
      [
        "track-week",
        6
      ],
      [
        "spike-plan",
        4
      ],
      [
        "simulator-screenshot-verify",
        4
      ],
      [
        "writing-plans",
        3
      ],
      [
        "generate-qa-notes",
        3
      ],
      [
        "retro",
        3
      ],
      [
        "code-review",
        3
      ],
      [
        "find-docs",
        2
      ],
      [
        "figma-implement-design",
        2
      ],
      [
        "brainstorm",
        2
      ],
      [
        "sdd-tasks",
        1
      ],
      [
        "difficult-bug",
        1
      ],
      [
        "context7-mcp",
        1
      ],
      [
        "jira-ticket-authoring",
        1
      ],
      [
        "run-skill-generator",
        1
      ]
    ],
    "compounding_writes": 58,
    "subagent_types": [
      [
        "explore-codebase",
        34
      ],
      [
        "general-purpose",
        22
      ],
      [
        "Explore",
        18
      ],
      [
        "code-reviewer",
        16
      ],
      [
        "simulator-driver",
        9
      ],
      [
        "Plan",
        7
      ],
      [
        "design-system-reviewer",
        5
      ],
      [
        "jira-scribe",
        5
      ],
      [
        "docs-researcher",
        5
      ],
      [
        "claude",
        5
      ]
    ],
    "top_projects": [
      [
        "myr",
        18448,
        42
      ],
      [
        "gnomon",
        2960,
        9
      ],
      [
        "toggl-mcp",
        1293,
        4
      ],
      [
        "ios",
        660,
        2
      ],
      [
        "logic",
        365,
        12
      ],
      [
        "hooks",
        64,
        1
      ],
      [
        "myr-verify",
        35,
        2
      ],
      [
        "screens",
        26,
        1
      ],
      [
        "scoring",
        5,
        1
      ],
      [
        ".claude",
        3,
        1
      ]
    ]
  },
  "autonomy": {
    "autonomy_score_0_100": 48.8,
    "components": {
      "actions_per_prompt": 13.8,
      "delegation": 20.0,
      "scheduling_background": 15.0,
      "low_question_rate": 0.0
    }
  },
  "token_usage": {
    "total_input": 59543,
    "total_output": 8931384,
    "total_cache_read": 1104739107,
    "total_cache_creation": 64132669,
    "by_model": [
      {
        "model_id": "claude-sonnet-5",
        "model": "Sonnet 5",
        "input": 15162,
        "output": 6896447,
        "cache_read": 902243881,
        "cache_creation": 45745130
      },
      {
        "model_id": "claude-opus-5",
        "model": "Opus 5",
        "input": 13813,
        "output": 1440172,
        "cache_read": 109656161,
        "cache_creation": 10849587
      },
      {
        "model_id": "claude-haiku-4-5-20251001",
        "model": "Haiku 4.5",
        "input": 30568,
        "output": 594765,
        "cache_read": 92839065,
        "cache_creation": 7537952
      },
      {
        "model_id": "<synthetic>",
        "model": "<synthetic>",
        "input": 0,
        "output": 0,
        "cache_read": 0,
        "cache_creation": 0
      }
    ]
  },
  "agentic": {
    "aq_0_100": 92,
    "tier": "Elite",
    "pillars": [
      {
        "name": "Breadth",
        "weight": 30,
        "score": 87.6,
        "axes": [
          {
            "name": "Orchestration",
            "base_weight": 33,
            "weight": 33,
            "normalized_score": 0.888,
            "score": 29.3,
            "signals": {
              "subagent_types": 15,
              "fanout_median": 3,
              "o_harn": 1.0,
              "frequency": 0.917,
              "frequency_score": 1.0,
              "frequency_confidence": 1.0,
              "frequency_weight": 0.3,
              "coordination_quality": 0.84,
              "orchestratable_sessions": 24,
              "delegated_orchestratable_sessions": 22
            }
          },
          {
            "name": "Skill fluency",
            "base_weight": 22,
            "weight": 22,
            "normalized_score": 0.83,
            "score": 18.3,
            "signals": {
              "skills_distinct": 23,
              "tool_calls": 6429,
              "skills_total": 116,
              "skills_total_per_call": 0.018043,
              "skills_total_per_call_target": 0.009,
              "process_skills_matched": true
            }
          },
          {
            "name": "Tool command (MCP + CLI)",
            "base_weight": 28,
            "weight": 28,
            "normalized_score": 0.829166666666667,
            "score": 23.2,
            "signals": {
              "mcp_servers": 11,
              "clis": 37,
              "tool_calls": 6429,
              "toolsearch_calls": 118
            }
          },
          {
            "name": "Discipline",
            "base_weight": 17,
            "weight": 17,
            "normalized_score": 0.986666666666667,
            "score": 16.8,
            "signals": {
              "tool_calls": 6429,
              "task_tool_calls": 0,
              "planning_practice_share": 0.3396,
              "planning_practice_target": 0.3,
              "planning_practice_eligible_sessions": 53
            }
          }
        ]
      },
      {
        "name": "Craft",
        "weight": 35,
        "score": 93.0,
        "axes": [
          {
            "name": "Verification",
            "base_weight": 35,
            "weight": 35,
            "normalized_score": 0.8,
            "score": 28.0,
            "signals": {
              "tool_calls": 6429,
              "shell_test_runs": 97,
              "test_covered_change_sessions": 15,
              "eligible_change_sessions": 25,
              "test_coverage": 0.6,
              "review_skills": 36,
              "review_skills_per_call": 0.0056,
              "review_skills_per_call_target": 0.004
            }
          },
          {
            "name": "Grounding",
            "base_weight": 25,
            "weight": 25,
            "normalized_score": 1.0,
            "score": 25.0,
            "signals": {
              "planning_ratio": 1.62
            }
          },
          {
            "name": "Context Intelligence",
            "base_weight": 20,
            "weight": 20,
            "normalized_score": 1.0,
            "score": 20.0,
            "signals": {
              "grounded_sessions": 25,
              "write_sessions": 25,
              "total_sessions": 53,
              "coverage": 1.0,
              "target_coverage": 0.6,
              "grounded_session_rule": "knowledge-MCP call OR explore-class project/data/design MCP call before a later Edit/Write/MultiEdit/NotebookEdit in the same session",
              "score_formula": "coverage = evidence_eligible_sessions / eligible_change_sessions; score = min(1, coverage / 0.60)"
            }
          },
          {
            "name": "Compounding",
            "base_weight": 20,
            "weight": 20,
            "normalized_score": 1.0,
            "score": 20.0,
            "signals": {
              "tool_calls": 6429,
              "compounding_writes": 58,
              "compounding_writes_per_call": 0.009022,
              "compounding_writes_per_call_target": 0.0018,
              "compounding_skills_matched": true
            }
          }
        ]
      },
      {
        "name": "Efficiency",
        "weight": 20,
        "score": 89.4,
        "axes": [
          {
            "name": "Recovery",
            "base_weight": 50,
            "weight": 100,
            "normalized_score": 0.894270088660756,
            "score": 89.4,
            "signals": {
              "recovery_ratio": 0.936,
              "api_retries": 44,
              "api_per_100_tools": 0.684
            }
          }
        ],
        "not_applicable": [
          "Steering leverage"
        ]
      },
      {
        "name": "Savvy",
        "weight": 15,
        "score": 100.0,
        "axes": [
          {
            "name": "Model mix",
            "base_weight": 50,
            "weight": 50,
            "normalized_score": 1.0,
            "score": 50.0,
            "signals": {
              "distinct_models": 4,
              "offload_share": 0.36,
              "routing": {
                "state": "unmeasured",
                "score": null,
                "successful_lower_tier_pairs": 0,
                "eligible_completed_substantive_pairs": 0,
                "excluded_reasons": {}
              }
            },
            "partial_terms": {
              "scored": 2,
              "total": 3,
              "weight_scored": 0.7
            }
          },
          {
            "name": "Token economy",
            "base_weight": 50,
            "weight": 50,
            "normalized_score": 1.0,
            "score": 50.0,
            "signals": {
              "tool_calls": 6429,
              "cli_share": 0.97
            }
          }
        ]
      }
    ],
    "score_contract_id": "19:19:19",
    "steering_leverage": {
      "state": "withheld_unvalidated_band",
      "actions_per_prompt": 7.7
    },
    "mcp_vs_cli": {
      "cli_calls": 3879,
      "cli_distinct": 37,
      "mcp_calls": 106,
      "mcp_distinct": 11,
      "ratio": 36.6
    },
    "tool_diversity": {
      "distinct": 52,
      "entropy": 0.455
    }
  },
  "_timing_compute_aq_s": 0.00011062499834224582,
  "monthly_noticed_stats": [
    {
      "month": "2026-08",
      "range_start": "2026-08-01",
      "range_end": "2026-08-31",
      "stats": {
        "volume": {
          "total_sessions": 36,
          "total_prompts": 184,
          "tool_calls_total": 3750,
          "assistant_turns": 6816,
          "thinking_blocks": 1980
        },
        "shipping": {
          "git_churn_total": 20809,
          "tool_churn_edit_write": 14802,
          "shell_authored_lines_est": 1539,
          "git_repos_seen": 4,
          "git_repos_with_commits": 3,
          "active_hours": 26.7
        },
        "iteration": {
          "depth_mean": 2.09,
          "depth_median": 1,
          "depth_p90": 4,
          "depth_max": 20,
          "files_over_15x": 1
        },
        "errors": {
          "tool_errors": 149,
          "error_rate_per_100_tools": 4.0,
          "error_recovery_ratio": 0.94
        },
        "models": {
          "top_models": [
            {
              "model_id": "claude-sonnet-5",
              "label": "Sonnet 5",
              "turns": 4240,
              "pct": 0.622
            },
            {
              "model_id": "claude-opus-5",
              "label": "Opus 5",
              "turns": 1376,
              "pct": 0.202
            },
            {
              "model_id": "claude-haiku-4-5-20251001",
              "label": "Haiku 4.5",
              "turns": 1186,
              "pct": 0.174
            },
            {
              "model_id": "<synthetic>",
              "label": "<synthetic>",
              "turns": 14,
              "pct": 0.002
            }
          ]
        },
        "rhythm": {
          "peak_hours_local": [
            11,
            17,
            12
          ],
          "weekday_histogram": {
            "Mon": 5078,
            "Tue": 1685,
            "Wed": 1837,
            "Thu": 2399,
            "Fri": 3115,
            "Sat": 0,
            "Sun": 0
          },
          "preferred_days": [
            "Mon",
            "Fri",
            "Thu"
          ]
        },
        "prompts": {
          "avg_length_chars": 903.8,
          "median_length_chars": 74.0,
          "polite_prompts": 22,
          "questions_asked": 54
        },
        "agents": {
          "delegate_actions": 80,
          "background_tasks": 22,
          "scheduled_actions": 2,
          "fanout_median": 2
        },
        "sessions": {
          "longest_run_minutes": 185.2
        },
        "tools": {
          "top_tools": [
            {
              "name": "Bash",
              "calls": 1740
            },
            {
              "name": "Read",
              "calls": 939
            },
            {
              "name": "Edit",
              "calls": 321
            },
            {
              "name": "Grep",
              "calls": 162
            },
            {
              "name": "Write",
              "calls": 124
            },
            {
              "name": "Agent",
              "calls": 80
            },
            {
              "name": "ToolSearch",
              "calls": 72
            },
            {
              "name": "AskUserQuestion",
              "calls": 54
            },
            {
              "name": "Glob",
              "calls": 43
            },
            {
              "name": "WebFetch",
              "calls": 42
            },
            {
              "name": "WebSearch",
              "calls": 32
            },
            {
              "name": "Skill",
              "calls": 20
            },
            {
              "name": "ExitPlanMode",
              "calls": 11
            },
            {
              "name": "mcp__context7__query-docs",
              "calls": 11
            },
            {
              "name": "TaskOutput",
              "calls": 11
            },
            {
              "name": "TodoWrite",
              "calls": 10
            },
            {
              "name": "mcp__context7__resolve-library-id",
              "calls": 9
            },
            {
              "name": "ReportFindings",
              "calls": 6
            },
            {
              "name": "mcp__claude_ai_Google_Calendar__list_events",
              "calls": 5
            },
            {
              "name": "mcp__claude_ai_Figma__get_design_context",
              "calls": 5
            },
            {
              "name": "SendMessage",
              "calls": 4
            },
            {
              "name": "mcp__toggl__toggl_whoami",
              "calls": 4
            },
            {
              "name": "mcp__claude_ai_Atlassian__getJiraIssue",
              "calls": 4
            },
            {
              "name": "mcp__claude_ai_Figma__get_metadata",
              "calls": 4
            },
            {
              "name": "mcp__claude_ai_Slack__slack_search_public_and_private",
              "calls": 3
            },
            {
              "name": "EnterPlanMode",
              "calls": 3
            },
            {
              "name": "mcp__claude_ai_Google_Calendar__search_events",
              "calls": 3
            },
            {
              "name": "mcp__filesystem__read_text_file",
              "calls": 3
            },
            {
              "name": "mcp__claude_ai_Google_Calendar__list_calendars",
              "calls": 2
            },
            {
              "name": "mcp__toggl__plan_week",
              "calls": 2
            },
            {
              "name": "mcp__toggl__apply_week",
              "calls": 2
            },
            {
              "name": "mcp__filesystem__write_file",
              "calls": 2
            },
            {
              "name": "ScheduleWakeup",
              "calls": 2
            },
            {
              "name": "mcp__claude_ai_Figma__search_design_system",
              "calls": 2
            },
            {
              "name": "mcp__time__get_current_time",
              "calls": 1
            },
            {
              "name": "mcp__git__git_status",
              "calls": 1
            },
            {
              "name": "mcp__git__git_log",
              "calls": 1
            },
            {
              "name": "mcp__git__git_add",
              "calls": 1
            },
            {
              "name": "mcp__git__git_reset",
              "calls": 1
            },
            {
              "name": "mcp__filesystem__list_allowed_directories",
              "calls": 1
            },
            {
              "name": "mcp__filesystem__directory_tree",
              "calls": 1
            },
            {
              "name": "mcp__filesystem__get_file_info",
              "calls": 1
            },
            {
              "name": "mcp__filesystem__move_file",
              "calls": 1
            },
            {
              "name": "mcp__claude_ai_Figma__get_screenshot",
              "calls": 1
            },
            {
              "name": "mcp__claude_ai_Slack__slack_read_thread",
              "calls": 1
            },
            {
              "name": "mcp__github__get_me",
              "calls": 1
            },
            {
              "name": "mcp__github__create_repository",
              "calls": 1
            }
          ]
        },
        "skills": {
          "top_skills": [
            {
              "name": "review-diff",
              "calls": 7
            },
            {
              "name": "systematic-debugging",
              "calls": 7
            },
            {
              "name": "cerberus",
              "calls": 6
            },
            {
              "name": "verify-change",
              "calls": 6
            },
            {
              "name": "share-extension-imports",
              "calls": 6
            },
            {
              "name": "capture-learning",
              "calls": 5
            },
            {
              "name": "implement-feature",
              "calls": 5
            },
            {
              "name": "slim-pr-description",
              "calls": 5
            },
            {
              "name": "simulator-screenshot-verify",
              "calls": 4
            },
            {
              "name": "retro",
              "calls": 3
            },
            {
              "name": "track-week",
              "calls": 3
            },
            {
              "name": "spike-plan",
              "calls": 2
            },
            {
              "name": "writing-plans",
              "calls": 2
            },
            {
              "name": "generate-qa-notes",
              "calls": 2
            },
            {
              "name": "figma-implement-design",
              "calls": 2
            },
            {
              "name": "brainstorm",
              "calls": 2
            },
            {
              "name": "sdd-tasks",
              "calls": 1
            },
            {
              "name": "difficult-bug",
              "calls": 1
            },
            {
              "name": "context7-mcp",
              "calls": 1
            },
            {
              "name": "jira-ticket-authoring",
              "calls": 1
            },
            {
              "name": "find-docs",
              "calls": 1
            },
            {
              "name": "run-skill-generator",
              "calls": 1
            }
          ]
        },
        "mcp_servers": {
          "top_mcp_servers": [
            {
              "server": "context7",
              "calls": 20
            },
            {
              "server": "claude_ai_Figma",
              "calls": 12
            },
            {
              "server": "claude_ai_Google_Calendar",
              "calls": 10
            },
            {
              "server": "filesystem",
              "calls": 9
            },
            {
              "server": "toggl",
              "calls": 8
            },
            {
              "server": "claude_ai_Slack",
              "calls": 4
            },
            {
              "server": "git",
              "calls": 4
            },
            {
              "server": "claude_ai_Atlassian",
              "calls": 4
            },
            {
              "server": "github",
              "calls": 2
            },
            {
              "server": "time",
              "calls": 1
            }
          ]
        }
      },
      "token_usage": {
        "total_input": 40440,
        "total_output": 5028018,
        "total_cache_read": 621370519,
        "total_cache_creation": 32113247,
        "by_model": [
          {
            "model_id": "claude-sonnet-5",
            "model": "Sonnet 5",
            "input": 8463,
            "output": 3642560,
            "cache_read": 490834372,
            "cache_creation": 21804398
          },
          {
            "model_id": "claude-opus-5",
            "model": "Opus 5",
            "input": 13147,
            "output": 1083030,
            "cache_read": 85640771,
            "cache_creation": 6859248
          },
          {
            "model_id": "claude-haiku-4-5-20251001",
            "model": "Haiku 4.5",
            "input": 18830,
            "output": 302428,
            "cache_read": 44895376,
            "cache_creation": 3449601
          },
          {
            "model_id": "<synthetic>",
            "model": "<synthetic>",
            "input": 0,
            "output": 0,
            "cache_read": 0,
            "cache_creation": 0
          }
        ]
      }
    },
    {
      "month": "2026-09",
      "range_start": "2026-09-01",
      "range_end": "2026-09-30",
      "stats": {
        "volume": {
          "total_sessions": 18,
          "total_prompts": 178,
          "tool_calls_total": 2679,
          "assistant_turns": 5116,
          "thinking_blocks": 1577
        },
        "shipping": {
          "git_churn_total": 385,
          "tool_churn_edit_write": 6203,
          "shell_authored_lines_est": 380,
          "git_repos_seen": 4,
          "git_repos_with_commits": 2,
          "active_hours": 22.2
        },
        "iteration": {
          "depth_mean": 2.31,
          "depth_median": 1.0,
          "depth_p90": 6,
          "depth_max": 17,
          "files_over_15x": 1
        },
        "errors": {
          "tool_errors": 84,
          "error_rate_per_100_tools": 3.1,
          "error_recovery_ratio": 0.929
        },
        "models": {
          "top_models": [
            {
              "model_id": "claude-sonnet-5",
              "label": "Sonnet 5",
              "turns": 3355,
              "pct": 0.656
            },
            {
              "model_id": "claude-haiku-4-5-20251001",
              "label": "Haiku 4.5",
              "turns": 1423,
              "pct": 0.278
            },
            {
              "model_id": "claude-opus-5",
              "label": "Opus 5",
              "turns": 333,
              "pct": 0.065
            },
            {
              "model_id": "<synthetic>",
              "label": "<synthetic>",
              "turns": 5,
              "pct": 0.001
            }
          ]
        },
        "rhythm": {
          "peak_hours_local": [
            11,
            12,
            16
          ],
          "weekday_histogram": {
            "Mon": 2786,
            "Tue": 2913,
            "Wed": 2033,
            "Thu": 2083,
            "Fri": 1062,
            "Sat": 0,
            "Sun": 0
          },
          "preferred_days": [
            "Tue",
            "Mon",
            "Thu"
          ]
        },
        "prompts": {
          "avg_length_chars": 1884.2,
          "median_length_chars": 101.5,
          "polite_prompts": 22,
          "questions_asked": 22
        },
        "agents": {
          "delegate_actions": 57,
          "background_tasks": 34,
          "scheduled_actions": 42,
          "fanout_median": 3
        },
        "sessions": {
          "longest_run_minutes": 121.4
        },
        "tools": {
          "top_tools": [
            {
              "name": "Bash",
              "calls": 1086
            },
            {
              "name": "Read",
              "calls": 762
            },
            {
              "name": "Grep",
              "calls": 235
            },
            {
              "name": "Edit",
              "calls": 201
            },
            {
              "name": "Glob",
              "calls": 95
            },
            {
              "name": "Agent",
              "calls": 57
            },
            {
              "name": "ToolSearch",
              "calls": 46
            },
            {
              "name": "ScheduleWakeup",
              "calls": 42
            },
            {
              "name": "Write",
              "calls": 35
            },
            {
              "name": "AskUserQuestion",
              "calls": 22
            },
            {
              "name": "Skill",
              "calls": 18
            },
            {
              "name": "WebSearch",
              "calls": 15
            },
            {
              "name": "WebFetch",
              "calls": 11
            },
            {
              "name": "ExitPlanMode",
              "calls": 8
            },
            {
              "name": "mcp__claude_ai_Atlassian__getJiraIssue",
              "calls": 7
            },
            {
              "name": "TaskStop",
              "calls": 4
            },
            {
              "name": "ReportFindings",
              "calls": 4
            },
            {
              "name": "EnterPlanMode",
              "calls": 3
            },
            {
              "name": "mcp__claude_ai_Atlassian__getAccessibleAtlassianResources",
              "calls": 3
            },
            {
              "name": "mcp__time__get_current_time",
              "calls": 3
            },
            {
              "name": "mcp__toggl__toggl_whoami",
              "calls": 3
            },
            {
              "name": "mcp__claude_ai_Google_Calendar__list_events",
              "calls": 3
            },
            {
              "name": "mcp__toggl__plan_week",
              "calls": 3
            },
            {
              "name": "mcp__toggl__apply_week",
              "calls": 3
            },
            {
              "name": "mcp__context7__query-docs",
              "calls": 3
            },
            {
              "name": "SendMessage",
              "calls": 2
            },
            {
              "name": "mcp__codegraph__codegraph_explore",
              "calls": 2
            },
            {
              "name": "mcp__toggl__git_activity",
              "calls": 1
            },
            {
              "name": "ListAgents",
              "calls": 1
            },
            {
              "name": "mcp__context7__resolve-library-id",
              "calls": 1
            }
          ]
        },
        "skills": {
          "top_skills": [
            {
              "name": "slim-pr-description",
              "calls": 10
            },
            {
              "name": "review-diff",
              "calls": 8
            },
            {
              "name": "systematic-debugging",
              "calls": 6
            },
            {
              "name": "code-review",
              "calls": 3
            },
            {
              "name": "implement-feature",
              "calls": 3
            },
            {
              "name": "track-week",
              "calls": 3
            },
            {
              "name": "share-extension-imports",
              "calls": 2
            },
            {
              "name": "cerberus",
              "calls": 2
            },
            {
              "name": "spike-plan",
              "calls": 2
            },
            {
              "name": "capture-learning",
              "calls": 1
            },
            {
              "name": "generate-qa-notes",
              "calls": 1
            },
            {
              "name": "find-docs",
              "calls": 1
            },
            {
              "name": "writing-plans",
              "calls": 1
            }
          ]
        },
        "mcp_servers": {
          "top_mcp_servers": [
            {
              "server": "claude_ai_Atlassian",
              "calls": 10
            },
            {
              "server": "toggl",
              "calls": 10
            },
            {
              "server": "context7",
              "calls": 4
            },
            {
              "server": "time",
              "calls": 3
            },
            {
              "server": "claude_ai_Google_Calendar",
              "calls": 3
            },
            {
              "server": "codegraph",
              "calls": 2
            }
          ]
        }
      },
      "token_usage": {
        "total_input": 19103,
        "total_output": 3903366,
        "total_cache_read": 483368588,
        "total_cache_creation": 32019422,
        "by_model": [
          {
            "model_id": "claude-sonnet-5",
            "model": "Sonnet 5",
            "input": 6699,
            "output": 3253887,
            "cache_read": 411409509,
            "cache_creation": 23940732
          },
          {
            "model_id": "claude-haiku-4-5-20251001",
            "model": "Haiku 4.5",
            "input": 11738,
            "output": 292337,
            "cache_read": 47943689,
            "cache_creation": 4088351
          },
          {
            "model_id": "claude-opus-5",
            "model": "Opus 5",
            "input": 666,
            "output": 357142,
            "cache_read": 24015390,
            "cache_creation": 3990339
          },
          {
            "model_id": "<synthetic>",
            "model": "<synthetic>",
            "input": 0,
            "output": 0,
            "cache_read": 0,
            "cache_creation": 0
          }
        ]
      }
    }
  ],
  "coverage": {
    "2026-08": {
      "flag": "complete",
      "indexed_interactive_sessions": 1,
      "available_transcripts": 36,
      "interactive_coverage": 36.0,
      "transcript_only_sessions": 35
    },
    "2026-09": {
      "flag": "unknown",
      "indexed_interactive_sessions": null,
      "available_transcripts": 18,
      "interactive_coverage": null,
      "transcript_only_sessions": 18
    }
  },
  "scoring_inputs_version": 19,
  "scoring_inputs_by_source": {
    "claude": {
      "window": {
        "scoring_inputs_version": 19,
        "aq_version": 19,
        "gstack_version": 19,
        "score_contract_id": "19:19:19",
        "source": "claude",
        "volume": {
          "total_sessions": 53,
          "total_prompts": 362,
          "total_instructions": 450,
          "tool_calls_total": 6429,
          "sidechain_tool_calls": 2976,
          "thinking_blocks": 3557
        },
        "velocity": {
          "active_hours": 49.1,
          "tool_churn_edit_write": 21005,
          "shell_authored_lines_est": 1919
        },
        "behavior": {
          "planning_ratio_explore_to_doing": 1.62,
          "actions_per_prompt": 7.7,
          "questions_asked": 76,
          "error_recovery_ratio": 0.936,
          "error_rate_per_100_tools": 3.6,
          "api_errors_retries": 44,
          "fanout_median": 3,
          "max_session_fanout": 14,
          "parallel_dispatch_turns": 0,
          "delegating_sessions": 29,
          "parallel_session_share": 0.724,
          "shell_test_runs": 97,
          "plan_sessions": 18,
          "planning_skill_sessions": 18,
          "eligible_change_sessions": 25,
          "test_covered_change_sessions": 15,
          "planned_eligible_sessions": 12,
          "evidence_eligible_sessions": 25,
          "ordered_facts_state": "measured",
          "sidechain_label_state": "measured",
          "linked_model_pairs": [
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 5,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 30,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 38,
              "writes": 16
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 38,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 4,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 31,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 37,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 22,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 35,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 23,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 25,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 27,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 56,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 33,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 5,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 6,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 40,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 43,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 33,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 24,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 27,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 41,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 20,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 51,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 20,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 19,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 26,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 26,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 8,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 23,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 46,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 22,
              "writes": 5
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-haiku-4-5-20251001",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 70,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 19,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 9,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 8,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 17,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 21,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 15,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 15,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 13,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 56,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 72,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 76,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 1,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 60,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 26,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 24,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 24,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 15,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 18,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 39,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 24,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 41,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 25,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 3,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 63,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 19,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 35,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 14,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 23,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 10,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 40,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 53,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 41,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 21,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 8,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 28,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": false,
              "substantive_calls": 0,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 17,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 41,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 13,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 6,
              "writes": 1
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 1,
              "writes": 1
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 12,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 13,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 12,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-opus-5",
              "child_model": "claude-opus-5[1m]",
              "completed": true,
              "substantive_calls": 11,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-haiku-4-5-20251001",
              "completed": true,
              "substantive_calls": 39,
              "writes": 0
            },
            {
              "provider": "anthropic",
              "lead_model": "claude-sonnet-5",
              "child_model": "claude-sonnet-5",
              "completed": true,
              "substantive_calls": 22,
              "writes": 0
            }
          ],
          "linked_model_routing_state": "unmeasured",
          "delegate_actions": 137,
          "background_tasks": 56,
          "iteration_depth_mean": 2.16,
          "iteration_depth_p90": 4,
          "iteration_depth_max": 20,
          "files_hammered_over_15x": 2,
          "no_tool_activity": false,
          "orchestratable_sessions": 24,
          "delegated_orchestratable_sessions": 22,
          "planning_skill_eligible_sessions": 53,
          "planning_skill_unmeasured_sessions": 0,
          "planning_skill_session_scope_state": "measured",
          "planning_skill_session_share": 0.339623,
          "planning_skill_session_coverage": 1.0
        },
        "stack": {
          "skills_distinct": 23,
          "skills_total": 116,
          "compounding_writes": 58,
          "subagent_types_distinct": 15,
          "max_session_subagent_types": 7,
          "subagent_types": [
            [
              "explore-codebase",
              34
            ],
            [
              "general-purpose",
              22
            ],
            [
              "Explore",
              18
            ],
            [
              "code-reviewer",
              16
            ],
            [
              "simulator-driver",
              9
            ],
            [
              "Plan",
              7
            ],
            [
              "design-system-reviewer",
              5
            ],
            [
              "jira-scribe",
              5
            ],
            [
              "docs-researcher",
              5
            ],
            [
              "claude",
              5
            ]
          ],
          "top_skills": [
            [
              "review-diff",
              15
            ],
            [
              "slim-pr-description",
              15
            ],
            [
              "systematic-debugging",
              13
            ],
            [
              "implement-feature",
              8
            ],
            [
              "cerberus",
              8
            ],
            [
              "share-extension-imports",
              8
            ],
            [
              "capture-learning",
              6
            ],
            [
              "verify-change",
              6
            ],
            [
              "track-week",
              6
            ],
            [
              "spike-plan",
              4
            ],
            [
              "simulator-screenshot-verify",
              4
            ],
            [
              "writing-plans",
              3
            ],
            [
              "generate-qa-notes",
              3
            ],
            [
              "retro",
              3
            ],
            [
              "code-review",
              3
            ],
            [
              "find-docs",
              2
            ],
            [
              "figma-implement-design",
              2
            ],
            [
              "brainstorm",
              2
            ],
            [
              "sdd-tasks",
              1
            ],
            [
              "difficult-bug",
              1
            ],
            [
              "context7-mcp",
              1
            ],
            [
              "jira-ticket-authoring",
              1
            ],
            [
              "run-skill-generator",
              1
            ]
          ],
          "skills_all": [
            [
              "review-diff",
              15
            ],
            [
              "slim-pr-description",
              15
            ],
            [
              "systematic-debugging",
              13
            ],
            [
              "implement-feature",
              8
            ],
            [
              "cerberus",
              8
            ],
            [
              "share-extension-imports",
              8
            ],
            [
              "capture-learning",
              6
            ],
            [
              "verify-change",
              6
            ],
            [
              "track-week",
              6
            ],
            [
              "spike-plan",
              4
            ],
            [
              "simulator-screenshot-verify",
              4
            ],
            [
              "writing-plans",
              3
            ],
            [
              "generate-qa-notes",
              3
            ],
            [
              "retro",
              3
            ],
            [
              "code-review",
              3
            ],
            [
              "find-docs",
              2
            ],
            [
              "figma-implement-design",
              2
            ],
            [
              "brainstorm",
              2
            ],
            [
              "sdd-tasks",
              1
            ],
            [
              "difficult-bug",
              1
            ],
            [
              "context7-mcp",
              1
            ],
            [
              "jira-ticket-authoring",
              1
            ],
            [
              "run-skill-generator",
              1
            ]
          ],
          "models": [
            [
              "claude-sonnet-5",
              7595
            ],
            [
              "claude-haiku-4-5-20251001",
              2609
            ],
            [
              "claude-opus-5",
              1709
            ],
            [
              "<synthetic>",
              19
            ]
          ]
        },
        "tools": {
          "agent_calls": 137,
          "mcp_servers_distinct": 11,
          "clis_distinct": 37,
          "toolsearch_calls": 118,
          "task_tool_calls": 0,
          "cli_calls": 3879,
          "mcp_calls": 106,
          "tool_diversity": 52,
          "tool_entropy_normalized": 0.455,
          "mcp_knowledge_calls": 26,
          "mcp_knowledge_servers": 2,
          "mcp_knowledge_server_names": [
            "codegraph",
            "context7"
          ],
          "mcp_grounded_sessions": 22,
          "mcp_write_sessions": 32,
          "mcp_subcategory_breakdown": {
            "communication": {
              "calls": 17,
              "servers": 2
            },
            "data": {
              "calls": 18,
              "servers": 1
            },
            "design": {
              "calls": 12,
              "servers": 1
            },
            "infra": {
              "calls": 1,
              "servers": 1
            },
            "knowledge": {
              "calls": 26,
              "servers": 2
            },
            "other": {
              "calls": 16,
              "servers": 3
            },
            "project": {
              "calls": 16,
              "servers": 2
            }
          },
          "top_tools": [
            [
              "Bash",
              2826
            ],
            [
              "Read",
              1701
            ],
            [
              "Edit",
              522
            ],
            [
              "Grep",
              397
            ],
            [
              "Write",
              159
            ],
            [
              "Glob",
              138
            ],
            [
              "Agent",
              137
            ],
            [
              "ToolSearch",
              118
            ],
            [
              "AskUserQuestion",
              76
            ],
            [
              "WebFetch",
              53
            ],
            [
              "WebSearch",
              47
            ],
            [
              "ScheduleWakeup",
              44
            ],
            [
              "Skill",
              38
            ],
            [
              "ExitPlanMode",
              19
            ],
            [
              "mcp__context7__query-docs",
              14
            ],
            [
              "mcp__claude_ai_Atlassian__getJiraIssue",
              11
            ],
            [
              "TaskOutput",
              11
            ],
            [
              "TodoWrite",
              10
            ],
            [
              "mcp__context7__resolve-library-id",
              10
            ],
            [
              "ReportFindings",
              10
            ],
            [
              "mcp__claude_ai_Google_Calendar__list_events",
              8
            ],
            [
              "mcp__toggl__toggl_whoami",
              7
            ],
            [
              "SendMessage",
              6
            ],
            [
              "EnterPlanMode",
              6
            ],
            [
              "mcp__toggl__plan_week",
              5
            ],
            [
              "mcp__toggl__apply_week",
              5
            ],
            [
              "mcp__claude_ai_Figma__get_design_context",
              5
            ],
            [
              "TaskStop",
              4
            ],
            [
              "mcp__time__get_current_time",
              4
            ],
            [
              "mcp__claude_ai_Figma__get_metadata",
              4
            ],
            [
              "mcp__claude_ai_Slack__slack_search_public_and_private",
              3
            ],
            [
              "mcp__claude_ai_Atlassian__getAccessibleAtlassianResources",
              3
            ],
            [
              "mcp__claude_ai_Google_Calendar__search_events",
              3
            ],
            [
              "mcp__filesystem__read_text_file",
              3
            ],
            [
              "mcp__codegraph__codegraph_explore",
              2
            ],
            [
              "mcp__claude_ai_Google_Calendar__list_calendars",
              2
            ],
            [
              "mcp__filesystem__write_file",
              2
            ],
            [
              "mcp__claude_ai_Figma__search_design_system",
              2
            ],
            [
              "mcp__git__git_status",
              1
            ],
            [
              "mcp__git__git_log",
              1
            ],
            [
              "mcp__git__git_add",
              1
            ],
            [
              "mcp__git__git_reset",
              1
            ],
            [
              "mcp__toggl__git_activity",
              1
            ],
            [
              "mcp__filesystem__list_allowed_directories",
              1
            ],
            [
              "mcp__filesystem__directory_tree",
              1
            ],
            [
              "mcp__filesystem__get_file_info",
              1
            ],
            [
              "mcp__filesystem__move_file",
              1
            ],
            [
              "mcp__claude_ai_Figma__get_screenshot",
              1
            ],
            [
              "mcp__claude_ai_Slack__slack_read_thread",
              1
            ],
            [
              "ListAgents",
              1
            ],
            [
              "mcp__github__get_me",
              1
            ],
            [
              "mcp__github__create_repository",
              1
            ]
          ]
        },
        "token_usage": {
          "total_input": 59543,
          "total_output": 8931384,
          "total_cache_read": 1104739107,
          "total_cache_creation": 64132669,
          "by_model": [
            {
              "model_id": "claude-sonnet-5",
              "model": "Sonnet 5",
              "input": 15162,
              "output": 6896447,
              "cache_read": 902243881,
              "cache_creation": 45745130
            },
            {
              "model_id": "claude-opus-5",
              "model": "Opus 5",
              "input": 13813,
              "output": 1440172,
              "cache_read": 109656161,
              "cache_creation": 10849587
            },
            {
              "model_id": "claude-haiku-4-5-20251001",
              "model": "Haiku 4.5",
              "input": 30568,
              "output": 594765,
              "cache_read": 92839065,
              "cache_creation": 7537952
            },
            {
              "model_id": "<synthetic>",
              "model": "<synthetic>",
              "input": 0,
              "output": 0,
              "cache_read": 0,
              "cache_creation": 0
            }
          ]
        }
      },
      "monthly": [
        {
          "scoring_inputs_version": 19,
          "aq_version": 19,
          "gstack_version": 19,
          "score_contract_id": "19:19:19",
          "source": "claude",
          "volume": {
            "total_sessions": 36,
            "total_prompts": 184,
            "total_instructions": 244,
            "tool_calls_total": 3750,
            "sidechain_tool_calls": 1725,
            "thinking_blocks": 1980
          },
          "velocity": {
            "active_hours": 26.7,
            "tool_churn_edit_write": 14802,
            "shell_authored_lines_est": 1539
          },
          "behavior": {
            "planning_ratio_explore_to_doing": 1.44,
            "actions_per_prompt": 8.3,
            "questions_asked": 54,
            "error_recovery_ratio": 0.94,
            "error_rate_per_100_tools": 4.0,
            "api_errors_retries": 39,
            "fanout_median": 2,
            "max_session_fanout": 14,
            "parallel_dispatch_turns": null,
            "delegating_sessions": 17,
            "parallel_session_share": 0.706,
            "shell_test_runs": 53,
            "plan_sessions": 13,
            "planning_skill_sessions": 13,
            "eligible_change_sessions": 15,
            "test_covered_change_sessions": 5,
            "planned_eligible_sessions": 8,
            "evidence_eligible_sessions": 15,
            "ordered_facts_state": "measured",
            "sidechain_label_state": "measured",
            "linked_model_pairs": [],
            "linked_model_routing_state": "unsupported",
            "delegate_actions": 80,
            "background_tasks": 22,
            "iteration_depth_mean": 2.09,
            "iteration_depth_p90": 4,
            "iteration_depth_max": 20,
            "files_hammered_over_15x": 1,
            "no_tool_activity": false,
            "orchestratable_sessions": 15,
            "delegated_orchestratable_sessions": 13,
            "planning_skill_eligible_sessions": 36,
            "planning_skill_unmeasured_sessions": 0,
            "planning_skill_session_scope_state": "measured",
            "planning_skill_session_share": 0.361111,
            "planning_skill_session_coverage": 1.0
          },
          "stack": {
            "skills_distinct": 22,
            "skills_total": 73,
            "compounding_writes": 50,
            "subagent_types_distinct": 15,
            "max_session_subagent_types": 7,
            "subagent_types": [
              [
                "Explore",
                14
              ],
              [
                "explore-codebase",
                12
              ],
              [
                "general-purpose",
                11
              ],
              [
                "code-reviewer",
                10
              ],
              [
                "Plan",
                5
              ],
              [
                "claude",
                5
              ],
              [
                "simulator-driver",
                4
              ],
              [
                "design-system-reviewer",
                4
              ],
              [
                "docs-researcher",
                4
              ],
              [
                "rn-perf-auditor",
                3
              ]
            ],
            "top_skills": [
              [
                "review-diff",
                7
              ],
              [
                "systematic-debugging",
                7
              ],
              [
                "cerberus",
                6
              ],
              [
                "verify-change",
                6
              ],
              [
                "share-extension-imports",
                6
              ],
              [
                "capture-learning",
                5
              ],
              [
                "implement-feature",
                5
              ],
              [
                "slim-pr-description",
                5
              ],
              [
                "simulator-screenshot-verify",
                4
              ],
              [
                "retro",
                3
              ],
              [
                "track-week",
                3
              ],
              [
                "spike-plan",
                2
              ],
              [
                "writing-plans",
                2
              ],
              [
                "generate-qa-notes",
                2
              ],
              [
                "figma-implement-design",
                2
              ]
            ],
            "skills_all": [
              [
                "review-diff",
                7
              ],
              [
                "systematic-debugging",
                7
              ],
              [
                "cerberus",
                6
              ],
              [
                "verify-change",
                6
              ],
              [
                "share-extension-imports",
                6
              ],
              [
                "capture-learning",
                5
              ],
              [
                "implement-feature",
                5
              ],
              [
                "slim-pr-description",
                5
              ],
              [
                "simulator-screenshot-verify",
                4
              ],
              [
                "retro",
                3
              ],
              [
                "track-week",
                3
              ],
              [
                "spike-plan",
                2
              ],
              [
                "writing-plans",
                2
              ],
              [
                "generate-qa-notes",
                2
              ],
              [
                "figma-implement-design",
                2
              ],
              [
                "brainstorm",
                2
              ],
              [
                "sdd-tasks",
                1
              ],
              [
                "difficult-bug",
                1
              ],
              [
                "context7-mcp",
                1
              ],
              [
                "jira-ticket-authoring",
                1
              ],
              [
                "find-docs",
                1
              ],
              [
                "run-skill-generator",
                1
              ]
            ],
            "models": [
              [
                "claude-sonnet-5",
                4240
              ],
              [
                "claude-opus-5",
                1376
              ],
              [
                "claude-haiku-4-5-20251001",
                1186
              ],
              [
                "<synthetic>",
                14
              ]
            ]
          },
          "tools": {
            "agent_calls": 80,
            "mcp_servers_distinct": 10,
            "clis_distinct": 37,
            "toolsearch_calls": 72,
            "task_tool_calls": 0,
            "cli_calls": 2550,
            "mcp_calls": 74,
            "tool_diversity": 47,
            "tool_entropy_normalized": 0.458,
            "mcp_knowledge_calls": 20,
            "mcp_knowledge_servers": 1,
            "mcp_knowledge_server_names": [
              "context7"
            ],
            "mcp_grounded_sessions": 10,
            "mcp_write_sessions": 18,
            "mcp_subcategory_breakdown": {
              "communication": {
                "calls": 14,
                "servers": 2
              },
              "data": {
                "calls": 8,
                "servers": 1
              },
              "design": {
                "calls": 12,
                "servers": 1
              },
              "infra": {
                "calls": 1,
                "servers": 1
              },
              "knowledge": {
                "calls": 20,
                "servers": 1
              },
              "other": {
                "calls": 13,
                "servers": 3
              },
              "project": {
                "calls": 6,
                "servers": 2
              }
            },
            "top_tools": [
              [
                "Bash",
                1740
              ],
              [
                "Read",
                939
              ],
              [
                "Edit",
                321
              ],
              [
                "Grep",
                162
              ],
              [
                "Write",
                124
              ],
              [
                "Agent",
                80
              ],
              [
                "ToolSearch",
                72
              ],
              [
                "AskUserQuestion",
                54
              ],
              [
                "Glob",
                43
              ],
              [
                "WebFetch",
                42
              ],
              [
                "WebSearch",
                32
              ],
              [
                "Skill",
                20
              ],
              [
                "ExitPlanMode",
                11
              ],
              [
                "mcp__context7__query-docs",
                11
              ],
              [
                "TaskOutput",
                11
              ],
              [
                "TodoWrite",
                10
              ],
              [
                "mcp__context7__resolve-library-id",
                9
              ],
              [
                "ReportFindings",
                6
              ],
              [
                "mcp__claude_ai_Google_Calendar__list_events",
                5
              ],
              [
                "mcp__claude_ai_Figma__get_design_context",
                5
              ]
            ]
          },
          "token_usage": {
            "by_model": []
          },
          "month": "2026-08"
        },
        {
          "scoring_inputs_version": 19,
          "aq_version": 19,
          "gstack_version": 19,
          "score_contract_id": "19:19:19",
          "source": "claude",
          "volume": {
            "total_sessions": 18,
            "total_prompts": 178,
            "total_instructions": 206,
            "tool_calls_total": 2679,
            "sidechain_tool_calls": 1251,
            "thinking_blocks": 1577
          },
          "velocity": {
            "active_hours": 22.2,
            "tool_churn_edit_write": 6203,
            "shell_authored_lines_est": 380
          },
          "behavior": {
            "planning_ratio_explore_to_doing": 1.91,
            "actions_per_prompt": 6.9,
            "questions_asked": 22,
            "error_recovery_ratio": 0.929,
            "error_rate_per_100_tools": 3.1,
            "api_errors_retries": 5,
            "fanout_median": 3,
            "max_session_fanout": 14,
            "parallel_dispatch_turns": null,
            "delegating_sessions": 13,
            "parallel_session_share": 0.692,
            "shell_test_runs": 44,
            "plan_sessions": 5,
            "planning_skill_sessions": 5,
            "eligible_change_sessions": 11,
            "test_covered_change_sessions": 11,
            "planned_eligible_sessions": 4,
            "evidence_eligible_sessions": 11,
            "ordered_facts_state": "measured",
            "sidechain_label_state": "measured",
            "linked_model_pairs": [],
            "linked_model_routing_state": "unsupported",
            "delegate_actions": 57,
            "background_tasks": 34,
            "iteration_depth_mean": 2.31,
            "iteration_depth_p90": 6,
            "iteration_depth_max": 17,
            "files_hammered_over_15x": 1,
            "no_tool_activity": false,
            "orchestratable_sessions": 10,
            "delegated_orchestratable_sessions": 10,
            "planning_skill_eligible_sessions": 18,
            "planning_skill_unmeasured_sessions": 0,
            "planning_skill_session_scope_state": "measured",
            "planning_skill_session_share": 0.277778,
            "planning_skill_session_coverage": 1.0
          },
          "stack": {
            "skills_distinct": 13,
            "skills_total": 43,
            "compounding_writes": 8,
            "subagent_types_distinct": 11,
            "max_session_subagent_types": 6,
            "subagent_types": [
              [
                "explore-codebase",
                22
              ],
              [
                "general-purpose",
                11
              ],
              [
                "code-reviewer",
                6
              ],
              [
                "simulator-driver",
                5
              ],
              [
                "Explore",
                4
              ],
              [
                "jira-scribe",
                3
              ],
              [
                "Plan",
                2
              ],
              [
                "security-reviewer",
                1
              ],
              [
                "docs-researcher",
                1
              ],
              [
                "design-system-reviewer",
                1
              ]
            ],
            "top_skills": [
              [
                "slim-pr-description",
                10
              ],
              [
                "review-diff",
                8
              ],
              [
                "systematic-debugging",
                6
              ],
              [
                "code-review",
                3
              ],
              [
                "implement-feature",
                3
              ],
              [
                "track-week",
                3
              ],
              [
                "share-extension-imports",
                2
              ],
              [
                "cerberus",
                2
              ],
              [
                "spike-plan",
                2
              ],
              [
                "capture-learning",
                1
              ],
              [
                "generate-qa-notes",
                1
              ],
              [
                "find-docs",
                1
              ],
              [
                "writing-plans",
                1
              ]
            ],
            "skills_all": [
              [
                "slim-pr-description",
                10
              ],
              [
                "review-diff",
                8
              ],
              [
                "systematic-debugging",
                6
              ],
              [
                "code-review",
                3
              ],
              [
                "implement-feature",
                3
              ],
              [
                "track-week",
                3
              ],
              [
                "share-extension-imports",
                2
              ],
              [
                "cerberus",
                2
              ],
              [
                "spike-plan",
                2
              ],
              [
                "capture-learning",
                1
              ],
              [
                "generate-qa-notes",
                1
              ],
              [
                "find-docs",
                1
              ],
              [
                "writing-plans",
                1
              ]
            ],
            "models": [
              [
                "claude-sonnet-5",
                3355
              ],
              [
                "claude-haiku-4-5-20251001",
                1423
              ],
              [
                "claude-opus-5",
                333
              ],
              [
                "<synthetic>",
                5
              ]
            ]
          },
          "tools": {
            "agent_calls": 57,
            "mcp_servers_distinct": 6,
            "clis_distinct": 24,
            "toolsearch_calls": 46,
            "task_tool_calls": 0,
            "cli_calls": 1329,
            "mcp_calls": 32,
            "tool_diversity": 30,
            "tool_entropy_normalized": 0.524,
            "mcp_knowledge_calls": 6,
            "mcp_knowledge_servers": 2,
            "mcp_knowledge_server_names": [
              "codegraph",
              "context7"
            ],
            "mcp_grounded_sessions": 12,
            "mcp_write_sessions": 15,
            "mcp_subcategory_breakdown": {
              "communication": {
                "calls": 3,
                "servers": 1
              },
              "data": {
                "calls": 10,
                "servers": 1
              },
              "knowledge": {
                "calls": 6,
                "servers": 2
              },
              "other": {
                "calls": 3,
                "servers": 1
              },
              "project": {
                "calls": 10,
                "servers": 1
              }
            },
            "top_tools": [
              [
                "Bash",
                1086
              ],
              [
                "Read",
                762
              ],
              [
                "Grep",
                235
              ],
              [
                "Edit",
                201
              ],
              [
                "Glob",
                95
              ],
              [
                "Agent",
                57
              ],
              [
                "ToolSearch",
                46
              ],
              [
                "ScheduleWakeup",
                42
              ],
              [
                "Write",
                35
              ],
              [
                "AskUserQuestion",
                22
              ],
              [
                "Skill",
                18
              ],
              [
                "WebSearch",
                15
              ],
              [
                "WebFetch",
                11
              ],
              [
                "ExitPlanMode",
                8
              ],
              [
                "mcp__claude_ai_Atlassian__getJiraIssue",
                7
              ],
              [
                "TaskStop",
                4
              ],
              [
                "ReportFindings",
                4
              ],
              [
                "EnterPlanMode",
                3
              ],
              [
                "mcp__claude_ai_Atlassian__getAccessibleAtlassianResources",
                3
              ],
              [
                "mcp__time__get_current_time",
                3
              ]
            ]
          },
          "token_usage": {
            "by_model": []
          },
          "month": "2026-09"
        }
      ]
    }
  }
}
```

## Opening prompts (first human message per session — characteristic asks)

- [2026-08-14 · gnomon] this is my first interaction with Claude code after using cursor. I want you to plan and orchestrate: - how to migrate all my cursor skills, mcps, etc that I use on the daily - how to have good ai strategy. specifically, this project measures AI usage and scores. Let's configure 
- [2026-08-17 · gnomon] [Request interrupted by user]
- [2026-08-17 · myr] [Request interrupted by user]
- [2026-08-17 · myr] Supported site share sheet saving issues    Image preview isnt showing for External Supported Site Recipes (working fine for PI Brand Website recipes)  Clicking on Open doesn't show recipe although it can be opened from All saves. (working fine for PI Brand Website recipes).  The
- [2026-08-17 · myr] [Request interrupted by user]
- [2026-08-17 · myr] [Request interrupted by user]
- [2026-08-19 · myr] <task-notification> <task-id>a1ae4c2503eb0c3f8</task-id> <tool-use-id>toolu_01STNZXtfX7GquM8Ne4ABceq</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/0c308e91-647c-421f-a897-692aad6bb709/tasks/a1ae4c2503eb0c3f8.output</output-file> <status>compl
- [2026-08-20 · myr] <ide_selection>The user selected the lines 49 to 49 from /Users/belen.carozo/projects/myr/src/components/Snackbar/Snackbar.stories.tsx: Recipe imported! Honey-Lemon Cottage Cheese Pancakes is ready!  This may or may not be related to the current task.</ide_selection> this is the 
- [2026-08-24 · gnomon] why don't i have any mcps connected?
- [2026-08-24 · gnomon] [Request interrupted by user]
- [2026-08-24 · gnomon] grea
- [2026-08-24 · myr] please do the oneline fix
- [2026-08-26 · myr] plan how to build a Toggle MCP using API. Use mcp Context7 to review api docs. In particular, I'd like the MCP to scan my branches (ticket name) commits (for the exact time), calendar entries (meetings) and fill my time tracking roughly, so that I can get a baseline to then perfe
- [2026-08-26 · myr] <ide_opened_file>The user opened the file /Users/belen.carozo/projects/myr/src/api/clipping/parseSaveClippedRecipeResult.ts in the IDE. This may or may not be related to the current task.</ide_opened_file> please check wether you have API access to context7. fetch the pokeapi doc
- [2026-08-26 · myr] [Request interrupted by user]
- [2026-08-26 · myr] yes please
- [2026-08-26 · gnomon] plan how to improve the MCP + CLI metric, the one that is lower right now
- [2026-08-26 · myr] codegraph init
- [2026-08-26 · myr] codegraph
- [2026-08-27 · toggl-mcp] use the github MCP to upload this repo to my github
- [2026-08-27 · gnomon] [Request interrupted by user]
- [2026-08-27 · gnomon] please give me a summary of my latest slack messages
- [2026-08-27 · myr] [Request interrupted by user]
- [2026-08-28 · myr] please help me integrate the Filesystem MCP
- [2026-08-28 · myr] <task-notification> <task-id>a719f8d3031cfd5d4</task-id> <tool-use-id>toolu_01NRuA7AUmKcVAdq8kBJND5G</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/4461d2f1-90c1-4fa9-bccf-3c992cd3bd15/tasks/a719f8d3031cfd5d4.output</output-file> <status>compl
- [2026-08-28 · myr] let's integrate this MCPS   https://github.com/modelcontextprotocol/servers/tree/main/src/memory https://github.com/modelcontextprotocol/servers/tree/main/src/git https://github.com/modelcontextprotocol/servers/tree/main/src/time https://github.com/modelcontextprotocol/servers/tr
- [2026-08-28 · myr] <ide_opened_file>The user opened the file /Users/belen.carozo/projects/myr/src/components/recipe/useRecipeBottomBarActions.ts in the IDE. This may or may not be related to the current task.</ide_opened_file> ok actually now that I think about it, let's not log an event for the ac
- [2026-08-28 · gnomon] check my metrics with uvx --refresh --from git+https://github.com/xmartlabs/gnomon@latest xl-ai-insights claude --local  and lets reevaluate what can I do to improve my score
- [2026-08-31 · myr] [Request interrupted by user]
- [2026-08-31 · myr] [Request interrupted by user]
- [2026-08-31 · myr] trigger a subagent to fix each of these pr comments for this branch compared to the freeze/post-launch branch, use haiku for subagents:  1modules/social-save-push-suppression/ios/SocialSavePushSuppressionModule.swift: consumePendingBackgroundPush doesn't appear to be called anywh
- [2026-09-01 · myr] <ide_opened_file>The user opened the file /Users/belen.carozo/projects/myr/src/components/SocialSavePushSnackbarHost.tsx in the IDE. This may or may not be related to the current task.</ide_opened_file> trigger a subagent to fix each of these pr comments for this branch compared 
- [2026-09-01 · myr] [Request interrupted by user]
- [2026-09-02 · myr] and the navigation from the share extension remains correct?
- [2026-09-02 · myr] this can't be reproduced in qa (as far as i'm aware). basically, App Check token expires 1h after app has been closed. so, in the share sheet, if the backend returns to any endpoint the string "App Check Failed" or "App Check", the app is automatically opened and the flow continu
- [2026-09-02 · myr] <task-notification> <task-id>a15875da1810e3b16</task-id> <tool-use-id>toolu_012F4CBMfRkfHiESJUpL7aGb</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/1bc4b225-e14d-4c82-9b2f-e8c8606c6504/tasks/a15875da1810e3b16.output</output-file> <status>compl
- [2026-09-03 · myr] <ide_opened_file>The user opened the file /Users/belen.carozo/projects/myr/src/contexts/AuthProvider.tsx in the IDE. This may or may not be related to the current task.</ide_opened_file> is there a reason why when a successful silent push arrives, it is categorized as a fail and 
- [2026-09-04 · myr] <ide_opened_file>The user opened the file /Users/belen.carozo/projects/myr/.env in the IDE. This may or may not be related to the current task.</ide_opened_file> the original post copy should be updated in the floating action menu as well
- [2026-09-07 · myr] <ide_selection>The user selected the lines 610 to 610 from /Users/belen.carozo/projects/myr/assets/locales/en.json: Original  This may or may not be related to the current task.</ide_selection> yes
- [2026-09-08 · myr] [Request interrupted by user]
- [2026-09-08 · myr] if the commit just says something like "fix", use the branch name
- [2026-09-08 · myr] <task-notification> <task-id>a4c74fb6b66aa1c89</task-id> <tool-use-id>toolu_01MpG1gbp8UJxDpa2w8tN26m</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/8cfa4c31-61c7-4790-b1bf-c0534f972f0c/tasks/a4c74fb6b66aa1c89.output</output-file> <status>compl
- [2026-09-09 · myr] <ide_opened_file>The user opened the file /Users/belen.carozo/projects/myr/src/components/RecipeImage/RecipeImage.stories.tsx in the IDE. This may or may not be related to the current task.</ide_opened_file> please fix those
- [2026-09-10 · myr] [Request interrupted by user for tool use]
- [2026-09-14 · myr] <ide_opened_file>The user opened the file /Users/belen.carozo/projects/myr/src/hooks/useShareExtensionPendingRoute.ts in the IDE. This may or may not be related to the current task.</ide_opened_file> please migrate everything I have confugured in cursor to vscode
- [2026-09-14 · myr] yes please
- [2026-09-14 · toggl-mcp] [Request interrupted by user]
- [2026-09-14 · myr] expand just a bit on this plan to show progress on async flows. JUST A BIT, 1  short paragraph per option max  option 1  store in progress jobs on frontend  keep track of them if they succeed or fail  update the status using push/silent push notifications  if in progress save tak

## Longest prompts (most detailed specs)

- [50055 chars · myr] default	14:16:32.151990-0300	runningboardd	'(null)' Submitting extension overlay (host PID 397, path /private/var/containers/Bundle/Application/C6DCF609-5150-48F7-9086-23B7950CEE89/MyRecipes.app/PlugIns/MyRecipesShareExtension.appex/MyRecipesShareExtension): <dictionary: 0xd9f36b
- [50055 chars · myr] here are the logs default	11:07:23.980273-0300	Instagram	Performing activity <UISocialActivity: 0x15594fac0> activityType:com.people.myrecipes.share activityTitle:UISocialActivity (com.people.myrecipes.share) default	11:07:23.980952-0300	Instagram	Executing activity <UISocialActi
- [50055 chars · myr] default	11:12:32.660177-0300	MyRecipesShareExtension	Extension `/private/var/containers/Bundle/Application/48293CC4-1939-48C3-9095-E66C9641B9E4/MyRecipes.app/PlugIns/MyRecipesShareExtension.appex/MyRecipesShareExtension` of type: `` launched. default	11:12:32.660182-0300	MyRecipe
- [18553 chars · myr] <task-notification> <task-id>a90ac5377a35ad085</task-id> <tool-use-id>toolu_016SADa1Ktf6SvC6MVcVuUe4</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/1bc4b225-e14d-4c82-9b2f-e8c8606c6504/tasks/a90ac5377a35ad085.output</output-file> <status>compl
- [12364 chars · myr] default	11:14:15.968801-0300	MyRecipesShareExtension	nw_endpoint_resolver_update [C1.1.1 Hostname#c5b0e874:443 in_progress resolver (satisfied (Path is satisfied), interface: en0[802.11], ipv4, dns, uses wifi, LQM: moderate)] Adding endpoint handler for IPv4#4774305d:443 default	
- [11444 chars · myr] <task-notification> <task-id>a2e07be08b30c6530</task-id> <tool-use-id>toolu_012oEMgNvudLJCP5gneFbmE3</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/f450ab37-7a5e-40e7-bb92-f1c5a423234a/tasks/a2e07be08b30c6530.output</output-file> <status>compl
- [10599 chars · myr] <task-notification> <task-id>a5df8c6c781994454</task-id> <tool-use-id>toolu_01Qdks9WBPJ499V8qbP2awP6</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/6de78b56-9227-4742-af63-cebef841f7c7/tasks/a5df8c6c781994454.output</output-file> <status>compl
- [10589 chars · myr] <task-notification> <task-id>a915fe3e9b11be911</task-id> <tool-use-id>toolu_01ASREQR6S5ndgLjtKWxbiQo</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/7c66cc47-ccc1-4569-9264-7f42a5dc615b/tasks/a915fe3e9b11be911.output</output-file> <status>compl
- [8873 chars · myr] <task-notification> <task-id>a0a7b30887a3bf546</task-id> <tool-use-id>toolu_01T1kbMiobEdbFhU3oXxVHRw</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/1bc4b225-e14d-4c82-9b2f-e8c8606c6504/tasks/a0a7b30887a3bf546.output</output-file> <status>compl
- [8854 chars · myr] <task-notification> <task-id>ae88ef33286efbd13</task-id> <tool-use-id>toolu_01FjusFprjrN3CZDr4qUPXJB</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/8ea10be0-fa67-4296-ad5a-c53f11ff00b6/tasks/ae88ef33286efbd13.output</output-file> <status>compl
- [8854 chars · myr] <task-notification> <task-id>ae88ef33286efbd13</task-id> <tool-use-id>toolu_01FjusFprjrN3CZDr4qUPXJB</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/8ea10be0-fa67-4296-ad5a-c53f11ff00b6/tasks/ae88ef33286efbd13.output</output-file> <status>compl
- [8834 chars · myr] <task-notification> <task-id>ad2c7668ffefcbd39</task-id> <tool-use-id>toolu_0127AYJSpbUPMRJk5Q7aWDY7</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/c512003b-3668-4411-8afb-bc79556fbace/tasks/ad2c7668ffefcbd39.output</output-file> <status>compl
- [8300 chars · gnomon] <task-notification> <task-id>a6aa88a514c4be31f</task-id> <tool-use-id>toolu_01DV5P1L5ggmktMYezcLKxjH</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-gnomon/20cff7a0-1f9b-435c-8045-6d6c9c3f6762/tasks/a6aa88a514c4be31f.output</output-file> <status>co
- [7903 chars · myr] <task-notification> <task-id>aa627d7e7b9ceca1d</task-id> <tool-use-id>toolu_01S42o7uyaV8ZQa7HPDe3Md1</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/8ea10be0-fa67-4296-ad5a-c53f11ff00b6/tasks/aa627d7e7b9ceca1d.output</output-file> <status>compl
- [7903 chars · myr] <task-notification> <task-id>aa627d7e7b9ceca1d</task-id> <tool-use-id>toolu_01S42o7uyaV8ZQa7HPDe3Md1</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/8ea10be0-fa67-4296-ad5a-c53f11ff00b6/tasks/aa627d7e7b9ceca1d.output</output-file> <status>compl
- [7809 chars · myr] <task-notification> <task-id>ab81612391498eb14</task-id> <tool-use-id>toolu_011Sc2ppNDeYpd1dGUpTvPtD</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/7755b10e-0663-4d58-9554-b23f8fffe557/tasks/ab81612391498eb14.output</output-file> <status>compl
- [7588 chars · myr] <task-notification> <task-id>a9acd1a4076f889e4</task-id> <tool-use-id>toolu_01PhkwFBE87ZAg9DsVeBUR6U</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/c512003b-3668-4411-8afb-bc79556fbace/tasks/a9acd1a4076f889e4.output</output-file> <status>compl
- [7583 chars · myr] <task-notification> <task-id>a15875da1810e3b16</task-id> <tool-use-id>toolu_012F4CBMfRkfHiESJUpL7aGb</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/1bc4b225-e14d-4c82-9b2f-e8c8606c6504/tasks/a15875da1810e3b16.output</output-file> <status>compl
- [7392 chars · myr] <task-notification> <task-id>a910558d4843dbaf1</task-id> <tool-use-id>toolu_01BrivcnFqbJg5biarFWVZYe</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/6de78b56-9227-4742-af63-cebef841f7c7/tasks/a910558d4843dbaf1.output</output-file> <status>compl
- [6907 chars · myr] <task-notification> <task-id>aedbd06ba2d4ab7f1</task-id> <tool-use-id>toolu_01KfocEmc78LpEX7zFrCJjJt</tool-use-id> <output-file>/private/tmp/claude-502/-Users-belen-carozo-projects-myr/8ea10be0-fa67-4296-ad5a-c53f11ff00b6/tasks/aedbd06ba2d4ab7f1.output</output-file> <status>compl