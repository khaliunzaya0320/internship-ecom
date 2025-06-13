/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: [],
    webpack: (config, { isServer }) => {
        // Completely disable file watching for problematic Windows directories
        config.watchOptions = {
            poll: false,
            ignored: [
                '**/node_modules/**',
                '**/.git/**',
                '**/.next/**',
                '**/node_modules',
                '**/.git',
                '**/.next',
                /C:[\\\/]Users[\\\/][^\\\/]+[\\\/]Application Data/,
                /C:[\\\/]Users[\\\/][^\\\/]+[\\\/]AppData/,
                /C:[\\\/]Users[\\\/][^\\\/]+[\\\/]Cookies/,
                /C:[\\\/]Users[\\\/][^\\\/]+[\\\/]Local Settings/,
                /C:[\\\/]Users[\\\/][^\\\/]+[\\\/]My Documents/,
                /C:[\\\/]Users[\\\/][^\\\/]+[\\\/]NetHood/,
                /C:[\\\/]Users[\\\/][^\\\/]+[\\\/]PrintHood/,
                /C:[\\\/]Users[\\\/][^\\\/]+[\\\/]Recent/,
                /C:[\\\/]Users[\\\/][^\\\/]+[\\\/]SendTo/,
                /C:[\\\/]Users[\\\/][^\\\/]+[\\\/]Start Menu/,
                /C:[\\\/]Users[\\\/][^\\\/]+[\\\/]Templates/,
                /C:[\\\/]ProgramData/,
                /C:[\\\/]Windows/,
                /C:[\\\/]System Volume Information/,
            ],
        };

        // Override the resolve.modules to limit where webpack looks for modules
        config.resolve.modules = [
            'node_modules',
            process.cwd() + '/src',
            process.cwd() + '/node_modules'
        ];

        // Additional webpack optimizations
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                os: false,
            };
        }

        return config;
    },
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
