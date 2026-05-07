const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

/**
 * 信用卡數據爬蟲
 * 從 Money101 和其他比較網站抓取最新信用卡信息
 */

const scrapers = {
  // 示例爬蟲：從 API 或靜態源獲取數據
  fetchMoney101Data: async () => {
    try {
      console.log('⏳ 正在從 Money101 獲取數據...');
      
      // 注意：Money101 可能需要特殊的 User-Agent
      const response = await axios.get('https://www.money101.com.tw/credit-card', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const cards = [];

      // 根據網站結構調整選擇器
      // 這是一個示例，實際需要根據網站 HTML 結構修改
      $('.card-item').each((index, element) => {
        const name = $(element).find('.card-name').text().trim();
        const bank = $(element).find('.bank-name').text().trim();
        const cashback = parseFloat($(element).find('.cashback-rate').text().trim());
        const annualFee = parseInt($(element).find('.annual-fee').text().trim()) || 0;
        const description = $(element).find('.description').text().trim();
        const applyUrl = $(element).find('a.apply-btn').attr('href');

        if (name && bank) {
          cards.push({
            id: `money101_${index}`,
            name,
            bank,
            category: '現金回饋',
            cashback: isNaN(cashback) ? 0 : cashback,
            annualFee,
            description,
            applyUrl: applyUrl || '#',
            source: 'Money101',
            lastUpdated: new Date().toISOString()
          });
        }
      });

      return cards;
    } catch (error) {
      console.error('❌ Money101 爬蟲失敗:', error.message);
      return [];
    }
  },

  // 本地數據源（作為備份）
  getLocalData: () => {
    return [
      {
        id: 'local_1',
        name: '現金回饋卡',
        bank: '台灣銀行',
        category: '現金回饋',
        cashback: 1.5,
        annualFee: 0,
        description: '一般消費回饋 1.5%，無最低消費限制',
        applyUrl: '#',
        source: 'Manual',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'local_2',
        name: '無敵現金卡',
        bank: '中國信託',
        category: '現金回饋',
        cashback: 2.0,
        annualFee: 1200,
        description: '一般消費 2% 現金回饋，年費可由回饋抵扣',
        applyUrl: '#',
        source: 'Manual',
        lastUpdated: new Date().toISOString()
      },
      {
        id: 'local_3',
        name: '玉山紅利卡',
        bank: '玉山銀行',
        category: '紅利點數',
        cashback: 3.0,
        annualFee: 800,
        description: '指定通路消費 3% 紅利回饋',
        applyUrl: '#',
        source: 'Manual',
        lastUpdated: new Date().toISOString()
      }
    ];
  },

  // 合併和去重
  mergeCards: (arrays) => {
    const merged = [];
    const seen = new Set();

    arrays.forEach(array => {
      array.forEach(card => {
        const key = `${card.bank}_${card.name}`;
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(card);
        }
      });
    });

    return merged.sort((a, b) => b.cashback - a.cashback);
  }
};

/**
 * 主爬蟲函數
 */
const runScraper = async () => {
  console.log('🚀 開始抓取信用卡數據...');
  console.log(`⏰ 時間: ${new Date().toLocaleString('zh-TW')}`);

  try {
    // 獲取多個源的數據
    const money101Data = await scrapers.fetchMoney101Data();
    const localData = scrapers.getLocalData();

    // 合併數據
    const allCards = scrapers.mergeCards([money101Data, localData]);

    console.log(`✅ 成功獲取 ${allCards.length} 張信用卡信息`);

    // 保存到 API 文件
    const apiFile = path.join(__dirname, '../src/pages/api/cards.js');
    const cardsCode = `
// 自動更新於 ${new Date().toLocaleString('zh-TW')}
const mockCards = ${JSON.stringify(allCards, null, 2)};

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(mockCards);
  } else {
    res.status(405).json({ message: '方法不允許' });
  }
}
`;

    fs.writeFileSync(apiFile, cardsCode, 'utf8');
    console.log('✅ 已更新 src/pages/api/cards.js');

    // 保存到 JSON 文件（備份）
    const backupFile = path.join(__dirname, '../data/creditcards.json');
    fs.mkdirSync(path.dirname(backupFile), { recursive: true });
    fs.writeFileSync(backupFile, JSON.stringify(allCards, null, 2), 'utf8');
    console.log('✅ 已備份到 data/creditcards.json');

    // 記錄爬蟲日誌
    const logFile = path.join(__dirname, '../logs/scraper.log');
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
    const logMessage = `[${new Date().toISOString()}] 成功爬取 ${allCards.length} 張卡片\n`;
    fs.appendFileSync(logFile, logMessage, 'utf8');

    console.log('✅ 爬蟲完成！');
    return { success: true, count: allCards.length };

  } catch (error) {
    console.error('❌ 爬蟲出錯:', error);
    
    // 記錄錯誤
    const logFile = path.join(__dirname, '../logs/scraper.log');
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
    const logMessage = `[${new Date().toISOString()}] 錯誤: ${error.message}\n`;
    fs.appendFileSync(logFile, logMessage, 'utf8');

    return { success: false, error: error.message };
  }
};

// 如果直接運行此腳本
if (require.main === module) {
  runScraper().then(result => {
    process.exit(result.success ? 0 : 1);
  });
}

module.exports = { runScraper, scrapers };
