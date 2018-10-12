# webpack的基本配置

## 项目运行

本地打包
```
npm run dev
```

## 其他
使用的插件包括:
- **html-webpack-plugin**：用于生成html文件，并将打包后的js引入html中
- **clean-webpack-plugin**：用于清除文件，如清除通过hash打包后的出口文件打包多次后会出现冗余的文件
- **extract-text-webpack-plugin**：用于将css或其他文件单独打包，以外链形式引入