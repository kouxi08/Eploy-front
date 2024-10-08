export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res
                    .status(401)
                    .json({ message: 'Authorization header is missing' });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token is missing' });
            }

            const response = await fetch(`http://go:8088/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching data from Go backend:', error);
            res.status(500).json({
                message: 'Failed to fetch data from Go backend',
            });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
