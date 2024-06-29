export default async function handler(req, res) {
    const {  gitUrl, appName, port, dockerDir, envFields} = req.body;
    const dataToSend = {
        name: appName,
        url: gitUrl,
        port: port,
        envVars: envFields.map(env => ({
            name: env.name,
            value: env.value
        }))
      };
    console.log(dataToSend)

    if (req.method === 'POST') {
        try {
            // const userid = '1';
            const response = await fetch(`http://go:8088/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });
    
            if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log(data)
            res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching data from Go backend:', error);
            res.status(500).json({ message: 'Failed to fetch data from Go backend' });
        }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }