# Roadmap

路线图按很小阶段推进，目标是持续交付，不做大爆炸式重构。顺序固定为：先 `swan-app-mgt` 打底，再扩展到 `squirrel` 和 `scargil`。

## Phase 01 `Completed`

项目基线整理。  
目标：清理模板残留，保留可复用后台骨架。

已完成项：

- 收敛主入口到 `Dashboard`、`Tasks`、`Logs`
- 收敛认证主流程到 `Sign In`、`OTP`
- 移除或下线 `Apps`、`Chats`、`Users`、`Clerk`、`Help Center` 等模板入口
- 将 `Dashboard`、`Tasks`、`Logs` 改为业务化占位骨架
- 清理通用 SaaS 文案、团队信息和无关演示内容

## Phase 02

身份认证接入。  
目标：接 `swan-app-mgt` 登录、登出、Token、TOTP。

## Phase 03

权限与路由守卫。  
目标：接真实角色信息，完成基础访问控制。

## Phase 04

后台导航重构。  
目标：形成 Dashboard / Tasks / Logs 的有效主导航。

## Phase 05

Dashboard 首版。  
目标：展示任务概览与近期关键信息。

## Phase 06

任务中心接入。  
目标：接任务列表、筛选、新建、编辑、批量操作。

## Phase 07

操作日志查询。  
目标：接日志列表、筛选、详情查看。

## Phase 08

后台体验完善。  
目标：统一错误处理、空态、加载态、鉴权失效处理。

## Phase 09

`squirrel` 行情看板一期。  
目标：只做只读市场观察页面。

## Phase 10

`squirrel` 看板增强。  
目标：增加筛选、分组、关键指标展示。

## Phase 11

`scargil` 策略管理一期。  
目标：展示策略列表、状态、关键参数。

## Phase 12

`scargil` 策略操作增强。  
目标：补充创建、编辑、启停等管理动作。

## Phase 13

统一观测与收尾。  
目标：把三套系统在后台内形成一致的导航、反馈和权限体验。
