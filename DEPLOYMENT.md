# 部署步驟 - 將網站部署到 Vercel（免費）

## 1. 準備工作

### 安裝必要工具
```bash
# 安裝 Node.js (如果還沒有)
# 訪問 https://nodejs.org 下載安裝

# 在終端驗證
node --version
npm --version
```

## 2. 設置 GitHub 倉庫

```bash
# 初始化 git
cd creditcard-rewards-2026
git init
git add .
git commit -m "Initial commit"

# 創建 GitHub 倉庫
# 訪問 https://github.com/new
# 創建倉庫 "creditcard-rewards-2026"
# 執行以下命令推送代碼

git remote add origin https://github.com/YOUR_USERNAME/creditcard-rewards-2026.git
git branch -M main
git push -u origin main
```

## 3. 部署到 Vercel

### 方法 A：使用 Vercel CLI（推薦）

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 登入 Vercel
vercel login

# 部署
vercel
```

### 方法 B：Vercel 網頁界面

1. 訪問 https://vercel.com
2. 使用 GitHub 帳號登入
3. 點擊 "Import Project"
4. 選擇 "creditcard-rewards-2026" 倉庫
5. 配置環境變量
6. 點擊 "Deploy"

## 4. 配置環境變量

在 Vercel 儀表板：
1. 進入 Settings → Environment Variables
2. 添加以下變量：
   - `MONGODB_URI`: 您的 MongoDB 連接字符串
   - `JWT_SECRET`: 隨機字符串
   - `ADMIN_USERNAME`: 管理員用戶名
   - `ADMIN_PASSWORD`: 管理員密碼

## 5. 設置 MongoDB 免費數據庫

1. 訪問 https://www.mongodb.com/cloud/atlas
2. 創建免費賬號
3. 創建新集群
4. 獲取連接字符串
5. 替換為環境變量

## 6. 配置域名（可選）

1. 購買域名（如 namecheap.com、godaddy.com 等）
2. 在 Vercel 儀表板添加域名
3. 配置 DNS 記錄

## 部署完成！

您的網站現在應該已經上線，訪問：
- 首頁: https://creditcard2026.vercel.app
- 管理後台: https://creditcard2026.vercel.app/admin/login

## 持續部署

每次推送代碼到 GitHub，Vercel 會自動部署新版本。

```bash
# 修改內容後
git add .
git commit -m "Update content"
git push origin main

# Vercel 會自動部署！
```

## 常見問題

Q: 如何查看部署日誌？
A: 在 Vercel 儀表板 → Deployments → 選擇部署 → 查看 Logs

Q: 如何回滾到上一版本？
A: Vercel 儀表板 → Deployments → 點擊之前的部署 → Redeploy

Q: 免費方案有限制嗎？
A: Vercel 免費方案無限制，包括部署次數和請求數量。
