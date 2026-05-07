export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // 簡單的認證 (生產環境應使用真實認證)
    if (username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD) {
      // 設置 token (實際應使用 JWT)
      res.setHeader('Set-Cookie', `auth=true; Path=/; HttpOnly`);
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ error: '用戶名或密碼錯誤' });
    }
  } else {
    res.status(405).json({ message: '方法不允許' });
  }
}
