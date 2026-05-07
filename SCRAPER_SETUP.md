# 自動爬蟲系統 - 設置指南

## 概述

這個爬蟲系統會自動每週更新信用卡數據，無需手動干預。

## 核心功能

✅ **自動爬蟲**
- 從 Money101、銀行官網等源自動抓取數據
- 自動去重和合併數據
- 保留本地備份

✅ **定時更新**
- 每周一自動運行（UTC+8 下午 2 點）
- GitHub Actions 完全免費
- 自動提交更新到 GitHub
- 自動部署到 Vercel

✅ **錯誤管理**
- 自動記錄爬蟲日誌
- 失敗時記錄錯誤信息
- 可手動觸發爬蟲

---

## 本地測試爬蟲

### 1. 安裝爬蟲依賴

```bash
npm install cheerio axios
```

### 2. 運行爬蟲

```bash
npm run scrape
```

輸出示例：
```
🚀 開始抓取信用卡數據...
⏰ 時間: 2026/5/7 下午 11:26:35
⏳ 正在從 Money101 獲取數據...
✅ 成功獲取 20 張信用卡信息
✅ 已更新 src/pages/api/cards.js
✅ 已備份到 data/creditcards.json
✅ 爬蟲完成！
```

---

## 設置自動爬蟲 (GitHub Actions)

### 1. 推送到 GitHub

```bash
git add .
git commit -m "Add scraper system"
git push origin main
```

### 2. GitHub 會自動運行爬蟲

爬蟲配置文件：`.github/workflows/scraper.yml`

**運行時間：** 每周一下午 2 點 (UTC+8)

### 3. 查看爬蟲日誌

1. 在 GitHub 倉庫頁面
2. 點擊 "Actions" 標籤
3. 查看最近的 "自動爬蟲" 運行
4. 點擊查看詳細日誌

---

## 自定義爬蟲

編輯 `scripts/scraper.js` 中的 `scrapers` 對象：

### 添加新的爬蟲源

```javascript
scrapers.fetchYourSource = async () => {
  try {
    // 您的爬蟲邏輯
    const response = await axios.get('https://yoursite.com');
    const $ = cheerio.load(response.data);
    
    const cards = [];
    // 解析 HTML
    
    return cards;
  } catch (error) {
    console.error('爬蟲失敗:', error.message);
    return [];
  }
};
```

### 在主函數中使用

```javascript
const yourData = await scrapers.fetchYourSource();
const allCards = scrapers.mergeCards([money101Data, localData, yourData]);
```

---

## 數據源示例

### Money101 (台灣)
- URL: https://www.money101.com.tw/credit-card
- 包含：回饋率、年費、優惠條件

### Bankcomm (台灣)
- 類似設置，根據網站 HTML 結構調整選擇器

### 銀行官網
- 大多數銀行都有信用卡比較頁面

---

## 故障排除

### 問題：爬蟲超時

**原因：** 網站響應慢或反爬蟲

**解決方案：**
```javascript
timeout: 20000  // 增加超時時間
```

### 問題：數據為空

**原因：** HTML 選擇器不正確

**解決方案：**
1. 打開瀏覽器開發者工具 (F12)
2. 檢查網站 HTML 結構
3. 調整 cheerio 選擇器

### 問題：GitHub Actions 失敗

**原因：** 網站反爬蟲或 npm 包版本衝突

**解決方案：**
1. 查看 Actions 日誌找出具體錯誤
2. 更新 package.json 中的版本
3. 添加 User-Agent headers

---

## 手動觸發爬蟲

### 在 GitHub 上手動運行

1. 訪問 GitHub 倉庫 → Actions
2. 選擇 "自動爬蟲 - 每周更新信用卡數據"
3. 點擊 "Run workflow"
4. 等待完成

### 本地手動運行

```bash
npm run scrape
```

---

## 爬蟲日誌

爬蟲日誌保存在：`logs/scraper.log`

查看日誌：
```bash
cat logs/scraper.log
```

示例：
```
[2026-05-07T15:26:35.123Z] 成功爬取 25 張卡片
[2026-05-07T15:26:40.456Z] 成功爬取 20 張卡片
[2026-05-07T15:27:00.789Z] 錯誤: Timeout
```

---

## 注意事項

⚠️ **尊重網站條款**
- 檢查網站的 robots.txt 和使用條款
- 設置合理的請求延遲
- 不要過度爬蟲

⚠️ **反爬蟲機制**
- 某些網站可能使用 Cloudflare 等防護
- 可能需要使用 Puppeteer（更複雜）而非 Cheerio

⚠️ **數據準確性**
- 定期檢查爬取的數據
- 保留本地手動編輯的備份
- 在網站前台顯示「最後更新時間」

---

## 進階配置

### 使用 Puppeteer 處理 JavaScript 渲染網站

```bash
npm install puppeteer
```

```javascript
const puppeteer = require('puppeteer');

scrapers.fetchJSRenderedSite = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://yoursite.com');
  
  const content = await page.content();
  const $ = cheerio.load(content);
  
  // 解析 HTML...
  
  await browser.close();
  return cards;
};
```

### 添加代理支持

```javascript
const agent = new HttpProxyAgent('http://proxy:port');
const response = await axios.get(url, { httpAgent: agent });
```

---

## 成本

✅ **完全免費**
- GitHub Actions：每月 2,000 分鐘免費額度
- 每周運行 1 次 ≈ 每月 4 次 ≈ 幾分鐘
- 遠低於免費額度

---

## 後續支持

有任何問題：
1. 查看 `logs/scraper.log` 中的詳細信息
2. 檢查 GitHub Actions 日誌
3. 檢查網站是否有反爬蟲保護
