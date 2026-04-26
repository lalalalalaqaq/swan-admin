# Tech Stack

本文档只记录当前仓库现状，不重写目标栈，不提前发明未来标准。

## Current Stack

- 前端框架：React 19 + TypeScript + Vite
- 路由：TanStack Router
- 数据请求与缓存：TanStack Query + Axios
- UI 体系：shadcn/ui + Radix UI + Tailwind CSS v4
- 表格：TanStack Table
- 表单与校验：React Hook Form + Zod
- 状态管理：Zustand
- 图表：Recharts
- 通知与反馈：Sonner
- 测试：Vitest + Playwright browser mode
- 代码风格与质量：ESLint + Prettier

## Stack Rules

- 优先复用仓库已存在依赖。
- 不随意引入第二套同类方案。
- 新能力优先接到现有请求层、路由层、表单层、表格层中。
- 能用现有组件体系解决的问题，不额外引入新的 UI 框架。

## Not Covered Yet

- 后端技术栈
- 数据库选型
- 部署与 CI 细节
- 未来新增基础设施规范

以上内容如需固化，后续单独补充 spec。
