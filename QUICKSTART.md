## 快速開始 - 5 分鐘內部署您的信用卡比價網站

### 前置要求
- Windows/Mac/Linux 系統
- 已安裝 Node.js（訪問 https://nodejs.org）
- GitHub 帳號（訪問 https://github.com）
- Vercel 帳號（訪問 https://vercel.com）

---

## 步驟 1：安裝依賴

```bash
# 進入項目目錄
cd creditcard-rewards-2026

# 安裝所有依賴
npm install
```

**預期時間：3-5 分鐘**

---

## 步驟 2：本地測試

```bash
# 啟動開發服務器
npm run dev
```

訪問 http://localhost:3000 查看網站

**默認帳號**
- 用戶名: `admin`
- 密碼: `admin123456`

**快捷鏈接**
- 首頁: http://localhost:3000
- 管理後台: http://localhost:3000/admin/login

---

## 步驟 3：修改信用卡數據

### 方式 A：編輯 API 文件（快速）

編輯 `src/pages/api/cards.js`，修改 `mockCards` 數據：

```javascript
const mockCards = [
  {
    name: '您的卡片名稱',
    bank: '銀行名稱',
    category: '現金回饋',
    cashback: 2.0,
    annualFee: 0,
  },
  // 添加更多卡片...
];
```

修改後，刷新瀏覽器即可看到更新。

### 方式 B：使用管理後台（推薦）

1. 訪問 http://localhost:3000/admin/login
2. 輸入默認帳號
3. 點擊「添加新信用卡」
4. 填寫信息並保存

---

## 步驟 4：修改網站信息

### 修改首頁文案

編輯 `src/pages/index.js`：

```javascript
<h1>您的網站標題</h1>
<p>您的網站描述</p>
```

### 修改網站顏色

編輯 `tailwind.config.js`：

```javascript
colors: {
  primary: '#您的顏色代碼',
  secondary: '#您的顏色代碼',
  accent: '#您的顏色代碼',
}
```

### 修改頁腳

編輯 `src/components/Layout.js` 中的 footer 部分

---

## 步驟 5：部署到 Vercel（免費）

### 5.1 推送到 GitHub

```bash
# 初始化 git
git init
git add .
git commit -m "Initial commit"

# 創建 GitHub 倉庫
# 訪問 https://github.com/new 創建新倉庫 "creditcard-rewards-2026"

# 推送代碼
git remote add origin https://github.com/YOUR_USERNAME/creditcard-rewards-2026.git
git branch -M main
git push -u origin main
```

### 5.2 部署到 Vercel

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 登入並部署
vercel
```

或訪問 https://vercel.com，使用 GitHub 登入後導入倉庫。

---

## 步驟 6：配置環境變量

在 Vercel 儀表板中設置：

1. Settings → Environment Variables
2. 添加以下變量：
   - `ADMIN_USERNAME`: `admin`
   - `ADMIN_PASSWORD`: `admin123456`

---

## 部署完成！ 🎉

您的網站現在已上線，訪問：
```
https://creditcard-2026-YOUR_USERNAME.vercel.app
```

**管理後台登入：**
```
https://creditcard-2026-YOUR_USERNAME.vercel.app/admin/login
```

---

## 常用命令

| 命令 | 說明 |
|------|------|
| `npm run dev` | 啟動本地開發服務器 |
| `npm run build` | 構建生產版本 |
| `npm run start` | 啟動生產服務器 |
| `npm run lint` | 檢查代碼質量 |
| `git push origin main` | 推送更新（會自動重新部署） |

---

## 下一步：優化和增長

1. **添加廣告**
   - 詳見 `SEO_MONETIZATION.md`
   
2. **SEO 優化**
   - 詳見 `SEO_MONETIZATION.md`
   
3. **長期維護**
   - 詳見 `MAINTENANCE.md`
   
4. **內容更新**
   - 每周更新信用卡數據
   - 定期發布新文章

---

## 常見問題

**Q: 如何修改已上線網站的內容？**
A: 
```bash
# 修改代碼
# 推送更新
git add .
git commit -m "Update content"
git push origin main
# Vercel 會自動重新部署（約 1-2 分鐘）
```

**Q: 如何增加更多信用卡？**
A: 通過管理後台添加，或編輯 `src/pages/api/cards.js`

**Q: 廣告什麼時候開始賺錢？**
A: 申請 Google AdSense，審批通過後可開始賺錢（通常 1-2 周）

**Q: 能修改管理員密碼嗎？**
A: 可以，編輯 `.env.local` 中的 `ADMIN_PASSWORD`

---

## 支援和資源

- 📚 完整文檔: 查看 README.md
- 🚀 部署指南: 查看 DEPLOYMENT.md
- 💰 變現指南: 查看 SEO_MONETIZATION.md
- 🛠️ 維護指南: 查看 MAINTENANCE.md

---

**祝您成功！如有問題，請參閱相關文檔。**
