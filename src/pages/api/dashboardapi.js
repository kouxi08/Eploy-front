export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // '1'を直接使用してGoバックエンドにリクエストを送信
      const response = await fetch('http://go:8088/dashboard', {
        headers: {
          'Authorization': 'Bearer 1'
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data from Go backend:', error);
      res.status(500).json({ message: 'Failed to fetch data from Go backend' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}