# 自動爬蟲系統 - 快速開始

您現在有了一個**完全自動化的爬蟲系統**！無需手動更新信用卡數據。

## ⚡ 快速開始（3步）

### 步驟 1：安裝爬蟲依賴

```bash
npm install cheerio
```

### 步驟 2：本地測試爬蟲

```bash
npm run scrape
```

**預期輸出：**
```
🚀 開始抓取信用卡數據...
⏰ 時間: 2026/5/7 下午 11:26:35
⏳ 正在從 Money101 獲取數據...
✅ 成功獲取 20 張信用卡信息
✅ 已更新 src/pages/api/cards.js
✅ 已備份到 data/creditcards.json
✅ 爬蟲完成！
```

### 步驟 3：推送到 GitHub 自動運行

```bash
git add .
git commit -m "Add automatic scraper system"
git push origin main
```

**之後：** 每周一自動運行爬蟲，無需您做任何操作！ ✅

---

## 🎯 工作原理

```
每周一下午2點 (UTC+8)
        ↓
GitHub Actions 觸發
        ↓
運行 scraper.js
        ↓
從多個源抓取數據
        ↓
合併和去重
        ↓
自動更新 API
        ↓
自動提交 GitHub
        ↓
自動部署 Vercel
        ↓
✅ 網站自動更新！
```

---

## 📊 爬蟲支持的數據源

目前已集成：
- ✅ Money101 台灣信用卡比較
- ✅ 本地備份數據
- ✅ 自動去重合併

可輕鬆添加：
- 🔹 Bankcomm
- 🔹 銀行官網
- 🔹 其他比較網站

---

## 🔧 自定義爬蟲

### 修改爬蟲時間

編輯 `.github/workflows/scraper.yml`：

```yaml
schedule:
  # 改成每天運行
  - cron: '0 6 * * *'
```

Cron 時間表：
- `'0 6 * * 1'` = 每周一 下午2點 (UTC+8)
- `'0 6 * * *'` = 每天 下午2點
- `'0 0 * * 0'` = 每周日 凌晨8點

### 添加新的爬蟲源

編輯 `scripts/scraper.js`，在 `scrapers` 對象中添加：

```javascript
scrapers.fetchBankcomm = async () => {
  try {
    const response = await axios.get('https://www.bankcomm.com.tw/...');
    const $ = cheerio.load(response.data);
    const cards = [];
    
    // 解析 HTML 並提取數據
    $('.card-row').each((i, el) => {
      cards.push({
        name: $(el).find('.name').text(),
        bank: 'Bankcomm',
        // ... 其他字段
      });
    });
    
    return cards;
  } catch (error) {
    console.error('Bankcomm 爬蟲失敗:', error.message);
    return [];
  }
};
```

然後在主函數中使用：
```javascript
const bankcommData = await scrapers.fetchBankcomm();
const allCards = scrapers.mergeCards([money101Data, bankcommData, localData]);
```

---

## 📋 檢查爬蟲狀態

### 查看 GitHub Actions 日誌

1. 訪問您的 GitHub 倉庫
2. 點擊「Actions」標籤
3. 選擇「自動爬蟲 - 每周更新信用卡數據」
4. 查看最近的運行記錄

### 查看爬蟲日誌文件

```bash
cat logs/scraper.log
```

### 查看備份數據

```bash
cat data/creditcards.json
```

---

## ✋ 手動觸發爬蟲

### 方式 1：GitHub UI

1. GitHub 倉庫 → Actions
2. 選擇「自動爬蟲」workflow
3. 點擊「Run workflow」按鈕

### 方式 2：本地命令

```bash
npm run scrape
```

---

## ⚠️ 注意事項

1. **尊重網站條款**
   - 閱讀網站的 robots.txt
   - 遵守使用政策
   - 不要過度爬蟲

2. **反爬蟲保護**
   - 某些網站使用 Cloudflare
   - 可能需要 User-Agent headers
   - 必要時升級至 Puppeteer

3. **數據準確性**
   - 定期檢查爬取的數據
   - 重要信息保留備份
   - 網站前台顯示「最後更新」時間

---

## 🚀 進階功能

### 添加數據庫支持

連接 MongoDB 自動保存歷史數據：

```javascript
const mongoose = require('mongoose');

// 連接 MongoDB
await mongoose.connect(process.env.MONGODB_URI);

// 保存數據
await CreditCard.insertMany(allCards);
```

### 發送通知

爬蟲完成時發送通知：

```javascript
// 發送 Email
const nodemailer = require('nodemailer');
// ... 配置 nodemailer

// 發送 Slack 消息
await fetch('https://hooks.slack.com/...', {
  method: 'POST',
  body: JSON.stringify({ text: '爬蟲完成！' })
});
```

---

## 📚 相關文檔

- 詳細配置：[SCRAPER_SETUP.md](SCRAPER_SETUP.md)
- 爬蟲代碼：[scripts/scraper.js](scripts/scraper.js)
- Workflow 配置：[.github/workflows/scraper.yml](.github/workflows/scraper.yml)

---

## 💬 常見問題

**Q: 爬蟲什麼時候運行？**
A: 每周一下午 2 點 (UTC+8，即 UTC 6:00)

**Q: 失敗了怎麼辦？**
A: 查看 GitHub Actions 日誌找出原因，或手動運行 `npm run scrape`

**Q: 如何修改爬蟲源？**
A: 編輯 `scripts/scraper.js` 中的 scrapers 對象

**Q: 會超額計費嗎？**
A: 不會，GitHub Actions 每月免費 2,000 分鐘，足夠用

---

**祝您的網站自動更新順利！** 🎉
