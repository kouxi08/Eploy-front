import fs from 'fs/promises';

const handler = async (req: any, res: any) => {
    const { nodeVersion, packageManager, workDir, port, envFields } = req.body;

    interface PackageManagerCommands {
        packageCopyCommand: string;
        installCommand: string;
        startCommand: string;
    }

    interface PackageManagerConfig {
        npm: PackageManagerCommands;
        yarn: PackageManagerCommands;
        pnpm: PackageManagerCommands;
        bun: PackageManagerCommands;
    }

    const packageCommands: PackageManagerConfig = {
        npm: {
            packageCopyCommand: 'package*.json ./',
            installCommand: 'npm install',
            startCommand: '["npm start"]',
        },
        yarn: {
            packageCopyCommand: '["package.json", "yarn.lock", "./"]',
            installCommand: 'yarn install',
            startCommand: '["yarn start"]',
        },
        pnpm: {
            packageCopyCommand: '["package.json", "yarn.lock", "./"]',
            installCommand: 'pnpm install',
            startCommand: '["pnpm start"]',
        },
        bun: {
            packageCopyCommand: '["package.json", "yarn.lock", "./"]',
            installCommand: 'pnpm install',
            startCommand: '["pnpm start"]',
        },
    };

    const selectedPackageManager: PackageManagerCommands =
        packageCommands[packageManager as keyof PackageManagerConfig];
    const jsonFilePath = 'src/create-template.json';
    try {
        const data = await fs.readFile(jsonFilePath, 'utf8');
        const config = JSON.parse(data);

        const parsedEnvFields = JSON.parse(envFields);

        const lines = [
            `${config.version}${nodeVersion}`,
            `${config.workdir}${workDir}\n`,
            `${config.copycommand}${selectedPackageManager.packageCopyCommand}`,
            `${config.copycommand}${config.copydir}\n`,
        ];

        if (parsedEnvFields.length > 0) {
            parsedEnvFields.forEach((env: any) => {
                lines.push(`${config.arg}${env.name}`);
            });
            lines.push('');
            parsedEnvFields.forEach((env: any) => {
                lines.push(`${config.env}${env.name}=&{${env.name}}`);
            });
            lines.push('');
        }

        lines.push(
            `${config.runcommand}${selectedPackageManager.installCommand}`,
            `${config.cmdcommand}${selectedPackageManager.startCommand}\n`,
            `${config.port}${port}`,
            `${config.expose}${port}`,
        );

        const textData = lines.join('\n');

        res.status(200).json({ textData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default handler;
