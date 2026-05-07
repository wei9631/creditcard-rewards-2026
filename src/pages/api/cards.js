
// 自動更新於 2026/5/7 下午11:32:48
const mockCards = [
  {
    "id": "local_3",
    "name": "玉山紅利卡",
    "bank": "玉山銀行",
    "category": "紅利點數",
    "cashback": 3,
    "annualFee": 800,
    "description": "指定通路消費 3% 紅利回饋",
    "applyUrl": "#",
    "source": "Manual",
    "lastUpdated": "2026-05-07T15:32:48.540Z"
  },
  {
    "id": "local_2",
    "name": "無敵現金卡",
    "bank": "中國信託",
    "category": "現金回饋",
    "cashback": 2,
    "annualFee": 1200,
    "description": "一般消費 2% 現金回饋，年費可由回饋抵扣",
    "applyUrl": "#",
    "source": "Manual",
    "lastUpdated": "2026-05-07T15:32:48.540Z"
  },
  {
    "id": "local_1",
    "name": "現金回饋卡",
    "bank": "台灣銀行",
    "category": "現金回饋",
    "cashback": 1.5,
    "annualFee": 0,
    "description": "一般消費回饋 1.5%，無最低消費限制",
    "applyUrl": "#",
    "source": "Manual",
    "lastUpdated": "2026-05-07T15:32:48.540Z"
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(mockCards);
  } else {
    res.status(405).json({ message: '方法不允許' });
  }
}
