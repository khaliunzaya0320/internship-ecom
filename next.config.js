/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: [],
    webpack: (config, { isServer }) => {
        // Exclude problematic Windows directories from file watching
        config.watchOptions = {
            ...config.watchOptions,
            ignored: [
                '**/node_modules/**',
                '**/.git/**',
                '**/.next/**',
                '**/node_modules',
                '**/.git',
                '**/.next',
                '**/C:/Users/*/Application Data/**',
                '**/C:/Users/*/AppData/**',
                '**/C:/ProgramData/**',
            ],
        };

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
