# 2026年信用卡回饋比價網站

一個現代化、SEO友好的信用卡回饋比較平台，支持廣告變現。

## 功能特性

- 📊 信用卡回饋比較表
- 🔍 高級搜索和排序功能
- 📱 完全響應式設計
- 🛠️ 簡單易用的管理後台
- 🚀 SEO優化（自動生成sitemap、meta標籤）
- 💰 廣告位置預留
- 🔐 安全的管理員登入

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 設置環境變量

編輯 `.env.local` 文件，添加您的 MongoDB 連接字符串。

### 3. 運行開發服務器

```bash
npm run dev
```

訪問 http://localhost:3000

### 4. 訪問管理後台

http://localhost:3000/admin/login

默認帳號：admin  
默認密碼：admin123456

## 部署到 Vercel (免費)

1. 將代碼推送到 GitHub
2. 訪問 https://vercel.com
3. 點擊「Import Project」並選擇您的 GitHub 倉庫
4. 添加環境變量
5. 點擊 Deploy

## 項目結構

```
creditcard-rewards-2026/
├── src/
│   ├── pages/           # 頁面
│   │   ├── api/        # API 路由
│   │   ├── admin/      # 管理後台
│   │   └── index.js    # 首頁
│   ├── components/      # React 組件
│   ├── lib/            # 工具函數
│   ├── models/         # Mongoose 模型
│   └── styles/         # CSS 文件
├── public/             # 靜態文件
├── .env.local          # 環境變量
├── next.config.js      # Next.js 配置
└── package.json
```

## 修改內容指南

### 1. 修改首頁文案

編輯 `src/pages/index.js` 中的文本內容

### 2. 添加/修改信用卡數據

方法 A：通過管理後台 (推薦)
- 訪問 http://localhost:3000/admin/dashboard
- 點擊「添加信用卡」或編輯現有卡片

方法 B：直接編輯數據文件
- 編輯 `src/data/creditcards.json`

### 3. 修改網站顏色

編輯 `tailwind.config.js` 中的 `colors` 部分

### 4. 添加 Google AdSense 廣告

編輯 `src/components/AdBanner.js`

## SEO 優化

- 自動生成 sitemap: `/public/sitemap.xml`
- 每個頁面都有 meta 標籤
- 符合 Google 最佳做法

## 維護建議

- 每周更新一次信用卡回饋數據
- 定期檢查 Google Search Console 的搜索排名
- 監控網站流量和用戶行為

## 常見問題

### Q: 如何添加新的信用卡類型？
A: 在管理後台點擊「添加信用卡」，填寫相關信息即可。

### Q: 如何設置廣告？
A: 在 `src/components` 中編輯廣告組件，集成 Google AdSense 或其他廣告平台。

### Q: 網站上線後如何修改內容？
A: 訪問 `/admin` 後台即可輕鬆修改所有內容，無需改代碼。

## 許可證

MIT
