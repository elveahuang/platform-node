# platform-lite

## 后端

```bash
# 开发模式启动 
NODE_ENV=development node server.js
# 生产模式启动 
NODE_ENV=production node server.js
# 后台服务启动
NODE_ENV=production pm2 start server.js --name api
```
