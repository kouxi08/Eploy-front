// pages/api/dashboardapi.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
      }

      const response = await fetch('http://localhost:8080/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data from Go backend:', error);
      res.status(500).json({ message: 'Failed to fetch data from Go backend' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
