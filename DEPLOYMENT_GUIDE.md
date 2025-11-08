# 完整部署指南：Next.js + Spring Boot + AWS (EC2 + RDS)

> 本文档记录了从本地开发环境迁移到云端生产环境的完整过程，包括遇到的问题和解决方案。

## 📋 目录

- [项目背景](#项目背景)
- [架构概览](#架构概览)
- [前端 API 配置](#前端-api-配置)
- [Nginx 反向代理配置](#nginx-反向代理配置)
- [SSL/HTTPS 配置](#sslhttps-配置)
- [问题排查与解决](#问题排查与解决)
- [维护与监控](#维护与监控)

---

## 项目背景

### 原始架构
- **前端**: Next.js 部署在 Vercel (HTTPS)
- **后端**: Spring Boot 运行在本地 `localhost:8080` (HTTP)
- **数据库**: Oracle 运行在本地

### 目标架构
- **前端**: Next.js 部署在 Vercel (HTTPS)
- **后端**: Spring Boot 部署在 AWS EC2 (HTTPS)
- **数据库**: 迁移到 AWS RDS

### 核心挑战
**Mixed Content 问题**: HTTPS 网站无法调用 HTTP API，浏览器会阻止请求。

---

## 架构概览

### 最终架构图

```
用户浏览器
    ↓ HTTPS
Vercel (https://www.nctuaa.org.tw)
    ↓ HTTPS
AWS EC2 - Nginx Docker (https://api.nctuaa.org.tw:443)
    ↓ HTTP (内部网络)
Spring Boot (localhost:8080)
    ↓
AWS RDS (数据库)
```

### 关键组件

| 组件 | 技术栈 | 端口 | 协议 |
|------|--------|------|------|
| 前端 | Next.js on Vercel | 443 | HTTPS |
| 反向代理 | Nginx (Docker) | 80, 443 | HTTP/HTTPS |
| 后端 | Spring Boot | 8080 | HTTP |
| 数据库 | AWS RDS | 1521 | TCP |

---

## 前端 API 配置

### 1. 创建 Axios 实例

```javascript
// app/api/axiosinstance.js
import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL || "https://api.nctuaa.org.tw/api";
console.log("🔗 API Base URL:", apiURL);

const axiosInstance = axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
```

**设计理念**:
- **环境变量优先**: 允许在不同环境使用不同 API
- **默认值**: 生产环境使用 HTTPS 域名
- **Console 日志**: 方便调试，确认使用的 API 地址

### 2. 本地开发配置

创建 `.env.local` 文件：

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

**为什么需要**:
- 本地开发时连接本地 Spring Boot
- 生产环境使用代码中的默认值

---

## Nginx 反向代理配置

### 为什么需要 Nginx？

1. **解决 Mixed Content**: HTTPS 页面需要 HTTPS API
2. **统一入口**: 隐藏内部端口，提供标准 443 端口
3. **负载均衡**: 未来可扩展多个后端实例

### 发现现有环境

```bash
sudo docker ps
# 发现已有 Nginx 容器 (WordPress 项目)
# CONTAINER ID: 42f8f75d0c2a
# PORTS: 0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
```

**决策**: 利用现有容器，不安装新的 Nginx

### 配置步骤

#### 1. 创建 API 配置

```bash
cat > /tmp/api.conf << 'EOF'
server {
    listen 80;
    server_name api.nctuaa.org.tw;

    location / {
        proxy_pass http://172.17.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

sudo docker cp /tmp/api.conf 42f8f75d0c2a:/etc/nginx/conf.d/api.conf
sudo docker exec 42f8f75d0c2a nginx -t
sudo docker exec 42f8f75d0c2a nginx -s reload
```

**关键配置解释**:
- `172.17.0.1`: Docker 默认网关，指向宿主机
- `proxy_pass`: 转发到 Spring Boot 的 8080 端口
- `proxy_set_header`: 传递原始请求信息

#### 2. 验证配置

```bash
curl -H "Host: api.nctuaa.org.tw" http://localhost/api/constitution/queryConstitutions
# 返回 405 说明代理工作正常
```

---

## SSL/HTTPS 配置

### DNS 配置

在域名管理面板添加 A 记录：

| 类型 | 名称 | 值 | TTL |
|------|------|-----|-----|
| A | api | 3.115.1.98 | 86400 |

**验证**:
```bash
ping api.nctuaa.org.tw
# 应该返回 3.115.1.98
```

### 获取 SSL 证书

#### 问题：容器太旧无法安装 Certbot

**解决方案**: 使用 Certbot Docker 容器

```bash
# 1. 停止 Nginx
sudo docker stop 42f8f75d0c2a

# 2. 获取证书
sudo docker run -it --rm \
  -v /home/ubuntu/ssl:/etc/letsencrypt \
  -p 80:80 -p 443:443 \
  certbot/certbot certonly --standalone \
  -d api.nctuaa.org.tw \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email

# 3. 重启 Nginx
sudo docker start 42f8f75d0c2a
```

#### 问题：防火墙阻止

**解决方案**: 在 AWS 安全组添加规则

| 类型 | 端口 | 来源 |
|------|------|------|
| HTTP | 80 | 0.0.0.0/0 |
| HTTPS | 443 | 0.0.0.0/0 |

### 配置 Nginx 使用 SSL

#### 问题：符号链接无法复制

**解决方案**: 复制实际文件

```bash
sudo docker cp /home/ubuntu/ssl/archive/api.nctuaa.org.tw/fullchain1.pem 42f8f75d0c2a:/etc/nginx/ssl/api.fullchain.pem
sudo docker cp /home/ubuntu/ssl/archive/api.nctuaa.org.tw/privkey1.pem 42f8f75d0c2a:/etc/nginx/ssl/api.privkey.pem
```

#### 更新配置

```bash
cat > /tmp/api-ssl.conf << 'EOF'
server {
    listen 80;
    server_name api.nctuaa.org.tw;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name api.nctuaa.org.tw;

    ssl_certificate /etc/nginx/ssl/api.fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/api.privkey.pem;

    location / {
        proxy_pass http://172.17.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

sudo docker cp /tmp/api-ssl.conf 42f8f75d0c2a:/etc/nginx/conf.d/api.conf
sudo docker exec 42f8f75d0c2a nginx -t
sudo docker exec 42f8f75d0c2a nginx -s reload
```

### 证书自动续期

```bash
cat > /home/ubuntu/renew-ssl.sh << 'EOF'
#!/bin/bash
sudo docker stop 42f8f75d0c2a
sudo docker run -it --rm \
  -v /home/ubuntu/ssl:/etc/letsencrypt \
  -p 80:80 -p 443:443 \
  certbot/certbot renew
sudo docker start 42f8f75d0c2a
sleep 5
sudo docker cp /home/ubuntu/ssl/archive/api.nctuaa.org.tw/fullchain1.pem 42f8f75d0c2a:/etc/nginx/ssl/api.fullchain.pem
sudo docker cp /home/ubuntu/ssl/archive/api.nctuaa.org.tw/privkey1.pem 42f8f75d0c2a:/etc/nginx/ssl/api.privkey.pem
sudo docker exec 42f8f75d0c2a nginx -s reload
EOF

chmod +x /home/ubuntu/renew-ssl.sh
(crontab -l 2>/dev/null; echo "0 0 1 * * /home/ubuntu/renew-ssl.sh") | crontab -
```

---

## 问题排查与解决

### 问题 1: Vercel 环境变量不生效

**现象**: Console 显示 `http://localhost:8080/api`

**原因**: Vercel 使用了旧的构建缓存

**解决方案**:
1. Vercel Dashboard → Deployments → Redeploy
2. **取消勾选** "Use existing Build Cache"
3. 或提交代码触发新构建

### 问题 2: Mixed Content 错误

**现象**: 浏览器阻止 HTTPS 页面调用 HTTP API

**解决方案**: 为 API 配置 HTTPS（本文档的核心内容）

### 问题 3: CORS 错误

**解决方案**: 在 Spring Boot 添加 CORS 配置

```java
@CrossOrigin(origins = {"http://localhost:3000", "https://www.nctuaa.org.tw"})
```

### 问题 4: 端口被占用

**解决方案**: 利用现有 Nginx 容器，添加新配置

### 问题 5: RDS 连接失败 (ORA-12541)

**现象**: `Cannot connect. No listener at host`

**常见原因**:
1. **本地 IP 变更** ⭐ 最常见
2. RDS 实例停止
3. 安全组规则错误

**解决方案**:

```bash
# 1. 检查当前 IP
curl ifconfig.me

# 2. 更新 RDS 安全组规则
# AWS Console → Security Groups → 编辑入站规则
# 将 Source 改为新的 IP/32

# 3. 或使用 SSH 隧道（推荐）
ssh -i key.pem -L 1521:rds-endpoint:1521 ubuntu@ec2-ip
```

**预防措施**:
- 使用 SSH 隧道而不是直接连接
- 或关闭 RDS 公网访问，只允许 VPC 内部访问

---

## 维护与监控

### 日常检查

```bash
# 检查容器状态
sudo docker ps

# 查看 Nginx 日志
sudo docker logs --tail 100 42f8f75d0c2a

# 测试 API
curl https://api.nctuaa.org.tw/api/health
```

### 证书监控

```bash
# 检查证书有效期
sudo docker run --rm -v /home/ubuntu/ssl:/etc/letsencrypt certbot/certbot certificates
```

---

## 总结

### 关键决策

1. **利用现有 Nginx 容器**: 避免端口冲突，资源利用更高效
2. **使用 Certbot Docker**: 绕过容器系统版本限制
3. **复制实际证书文件**: 解决符号链接问题
4. **环境变量 + 默认值**: 灵活支持多环境部署

### 最佳实践

1. **分离配置**: 使用环境变量管理不同环境
2. **自动化**: 证书续期、健康检查自动化
3. **日志监控**: 及时发现和解决问题
4. **安全第一**: HTTPS、CORS、防火墙配置

---

**文档版本**: 1.0  
**最后更新**: 2025-11-03  
**作者**: David
