# 常见配置参考

## 普通项目

tsconfig.json

```json
{
  "compilerOptions": {
    "declaration": true,
    "esModuleInterop": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "strict": true,
    "skipLibCheck": true,
    "target": "es2019",
    "jsx": "react",
    "lib": ["dom", "dom.iterable", "esnext"]
  },
  "exclude": [
    "**/node_modules",
    "**/examples",
    "**/dist",
    "**/fixtures",
    "**/*.test.ts",
    "**/*.e2e.ts",
    "**/templates",
    "ui"
  ]
}
```

附加选项



## monorepo 项目

结构

```bash
.
├── apps
│   └── app1
│       └── tsconfig.json
├── packages
│   └── shared
│       └── tsconfig.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── tsconfig.json
```

配置参考

/tsconfig.base.json

```json
{
  "compilerOptions": {
    "declaration": true,
    "esModuleInterop": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "strict": true,
    "skipLibCheck": true,
    "target": "es2019",
    "jsx": "react",
    "lib": ["dom", "dom.iterable", "esnext"]
  },
  "exclude": [
    "**/node_modules",
    "**/examples",
    "**/dist",
    "**/fixtures",
    "**/*.test.ts",
    "**/*.e2e.ts",
    "**/templates",
    "ui"
  ]
}
```

/tsconfig.json

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["*"],
      "utils": ["./packages/utils"]
    }
  }
}
```

/packages/shared/tsconfig.json

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```
