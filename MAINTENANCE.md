# 內容更新指南 - 長期維護

## 快速修改內容

### 1. 修改首頁文案

編輯文件：`src/pages/index.js`

```javascript
// 修改標題
<h1 className="text-4xl md:text-5xl font-bold mb-4">
  2026年信用卡回饋比價  // ← 修改這裡
</h1>

// 修改描述
<p className="text-lg md:text-xl text-blue-100 mb-8">
  智慧比較信用卡優惠，找到最適合您的回饋方案  // ← 修改這裡
</p>
```

### 2. 更新信用卡數據

#### 方法 A：通過管理後台（推薦）

1. 訪問 https://yoursite.com/admin/login
2. 輸入帳號：admin
3. 輸入密碼：admin123456
4. 點擊「添加新信用卡」或編輯現有卡片
5. 填寫信息並保存

#### 方法 B：直接編輯 API

編輯文件：`src/pages/api/cards.js`

```javascript
const mockCards = [
  {
    id: 1,
    name: '新卡片名稱',        // ← 修改卡片名稱
    bank: '銀行名稱',          // ← 修改銀行
    category: '現金回饋',      // ← 修改類型
    cashback: 2.0,            // ← 修改回饋率
    annualFee: 0,             // ← 修改年費
    description: '卡片描述',   // ← 修改描述
    applyUrl: '#'             // ← 修改申請連結
  },
  // 添加更多卡片...
];
```

### 3. 修改網站顏色

編輯文件：`tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1f2937',    // ← 修改主顏色
      secondary: '#3b82f6',  // ← 修改次顏色
      accent: '#10b981',     // ← 修改強調顏色
    },
  },
},
```

### 4. 修改頁腳信息

編輯文件：`src/components/Layout.js`

```javascript
<div>
  <h3 className="font-bold mb-3">關於本站</h3>
  <p className="text-gray-400 text-sm">
    您的公司介紹和聯繫信息  // ← 修改這裡
  </p>
</div>
```

### 5. 添加 Google AdSense

編輯文件：`src/components/AdBanner.js`

```javascript
{/* 替換為您的 Google AdSense 代碼 */}
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<ins className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client="ca-pub-YOUR_ID_HERE"  // ← 您的 AdSense ID
     data-ad-slot="YOUR_SLOT_ID"           // ← 您的 slot ID
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

## SEO 優化

### 1. 修改 Meta 標籤

編輯 `src/pages/index.js`：

```javascript
<title>您的網站標題 - 信用卡比較</title>
<meta name="description" content="您的網站描述，包含關鍵詞" />
<meta name="keywords" content="信用卡, 回饋, 比價, 2026" />
```

### 2. 生成 Sitemap

在根目錄創建 `public/sitemap.xml`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com</loc>
    <lastmod>2026-01-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yoursite.com/admin/login</loc>
    <lastmod>2026-01-01</lastmod>
    <priority>0.5</priority>
  </url>
</urlset>
```

### 3. 提交給 Google

1. 訪問 https://search.google.com/search-console
2. 添加您的網站
3. 提交 Sitemap（public/sitemap.xml）
4. 监控搜索表現

## 監控流量

### Google Analytics

1. 訪問 https://analytics.google.com
2. 創建新帳號
3. 複製追蹤 ID
4. 在 `src/pages/_app.js` 中添加：

```javascript
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 維護檢查清單

### 每周
- [ ] 檢查網站是否正常運行
- [ ] 查看 Google Analytics 流量
- [ ] 檢查是否有錯誤信息

### 每月
- [ ] 更新信用卡數據
- [ ] 檢查廣告點擊率
- [ ] 優化內容

### 每季度
- [ ] 分析用戶行為
- [ ] 更新網站設計
- [ ] 檢查 SEO 排名

## 備份和還原

### 備份代碼

```bash
# 創建備份
git tag -a v1.0.0 -m "Backup version 1.0.0"
git push origin v1.0.0

# 查看歷史版本
git log --oneline

# 還原到某個版本
git revert COMMIT_HASH
```

### 備份數據

定期導出 MongoDB 數據：

```bash
mongoexport --uri="YOUR_MONGODB_URI" --out backup.json
```

## 常見問題

Q: 如何隱藏「管理後台」鏈接？
A: 編輯 `src/components/Layout.js`，刪除或註釋管理後台鏈接

Q: 如何增加信用卡條數的限制？
A: 沒有限制，直接在後台添加即可

Q: 如何關閉搜索功能？
A: 編輯 `src/pages/index.js`，移除 SearchBar 組件

Q: 如何修改管理員密碼？
A: 編輯 `.env.local` 中的 `ADMIN_PASSWORD`
