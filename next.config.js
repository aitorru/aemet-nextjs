const webpack = require('webpack');

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    },
    future: {
        webpack5: true,
    },
    env: {
        TZ: 'Europe/Madrid',
    },
}