# Validation

## Route Checks

- 无关主路由不再出现在导航和主流程中
- `Dashboard`、`Tasks`、`Logs`、`Sign In`、`OTP` 可达
- 未纳入本阶段的模板页不再作为默认入口暴露

## UI Checks

- 侧边栏只出现与阶段目标一致的入口
- 顶部导航、搜索项、命令菜单不再出现 `Apps`、`Chats`、`Users`、`Clerk`、`Help Center`
- `Dashboard`、`Tasks`、`Logs` 都是统一的业务化占位骨架

## Content Checks

- 页面中不再出现聊天、销售、用户管理、Clerk 或 SaaS 模板概念
- 登录流程只暴露 `Sign In + OTP`
- 业务化标题、说明和空态能够清楚表达“这是量化管理后台骨架”

## Technical Checks

- 不新增第二套路由、UI、请求或状态管理方案
- 不引入真实 API 依赖作为本阶段完成条件
- 继续沿用现有 `shadcn/ui`、`TanStack Router` 和布局壳层

## Merge Bar

- 用户第一次打开后台时，不会误判这是通用 SaaS 模板
- 下一阶段 `Phase 02 身份认证接入` 可以直接在收敛后的壳层上继续实施
- 文档和实现边界一致，没有把基线整理偷偷扩展成接口联调或新功能开发
