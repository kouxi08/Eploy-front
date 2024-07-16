export default async function handler(req, res) {
    const { gitUrl, appName, port, dockerDir, envFields } = req.body;
    const dataToSend = {
        name: appName,
        git_repo_url: gitUrl,
        port: port,
        environments: envFields.map((env) => ({
            name: env.name,
            value: env.value,
        })),
    };

    if (req.method === 'POST') {
        try {
            const authHeader = req.headers.authorization;
            // console.log(authHeader)
            if (!authHeader) {
                return res
                    .status(401)
                    .json({ message: 'Authorization header is missing' });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token is missing' });
            }
            console.log(JSON.stringify(dataToSend));
            const response = await fetch('http://go:8088/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSend),
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
