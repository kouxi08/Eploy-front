// pages/api/dashboard.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // フロントエンドからのトークンを取得
      const token = req.headers.authorization.split(' ')[1];
      
      const response = await fetch('http://localhost:8080/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch data from Go backend' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}


