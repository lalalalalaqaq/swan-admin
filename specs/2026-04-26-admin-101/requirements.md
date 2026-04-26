# Requirements

## Guidance

本规格以以下文档为唯一指导来源：

- `specs/constitution/mission.md`
- `specs/constitution/tech-stack.md`
- `specs/constitution/roadmap.md`

## Background

当前仓库仍保留大量通用后台模板残留，包括无关路由、无关导航、SaaS 文案、销售类假数据和演示页面。这与 Swan-Admin 作为个人量化业务统一管理后台的使命不一致，也会阻碍后续 `Phase 02 身份认证接入` 的推进。

## Goal

将现有项目收敛为面向量化管理后台的最小业务骨架，为后续认证、权限、任务和日志能力接入提供干净入口。

## In Scope

- 主入口只保留 `Dashboard`、`Tasks`、`Logs`
- 认证流程只保留 `Sign In`、`OTP`
- `Dashboard`、`Tasks`、`Logs` 统一改为业务化占位骨架
- 继续复用现有布局壳层、路由体系、组件体系

## Out of Scope

- 接入真实 API
- 接入真实权限与角色控制
- 补充真实业务数据
- 新增路线图之外的新页面

## Removals

- `Apps`
- `Chats`
- `Users`
- `Clerk`
- `Help Center`
- 多余 auth demo，如 `Sign Up`、`Forgot Password`、`Sign In 2 Col`
- 销售类、社交类、SaaS 模板文案与假数据

## Decisions

- `Logs` 即使暂未接真实能力，也必须有占位页和路由
- `Dashboard`、`Tasks`、`Logs` 不保留现有模板内容，只保留业务化空态骨架
- 组件与基础设施优先复用现有 `shadcn/ui`、`TanStack Router`、现有布局壳层
- 本阶段只做模板残留清理和骨架收敛，不与真实后端联动
