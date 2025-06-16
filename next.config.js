/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    serverExternalPackages: [],
    webpack: (config, { isServer }) => {
        config.watchOptions = {
            ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
        };

        config.resolve.modules = [
            'node_modules',
            process.cwd() + '/src',
            process.cwd() + '/node_modules',
        ];

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
