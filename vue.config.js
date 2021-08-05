/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const packageConfig = require('./package.json');

const {
  vue,
  vuex,
  'vue-router': vueRouter,
  'ant-design-vue': antd,
} = packageConfig.dependencies;

const isProduction = process.env.NODE_ENV === 'production';
const getVersion = (dep) => dep.match(/\d.*?$/)[0];

const cdns = [
  `https://cdn.jsdelivr.net/npm/vue@${getVersion(vue)}/dist/vue.min.js`,
  `https://cdn.jsdelivr.net/npm/vuex@${getVersion(vuex)}/dist/vuex.min.js`,
  `https://cdn.jsdelivr.net/npm/vue-router@${getVersion(
    vueRouter,
  )}/dist/vue-router.min.js`,
  `https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.js`,
  `https://cdn.jsdelivr.net/npm/ant-design-vue@${getVersion(
    antd,
  )}/dist/antd.min.js`,
];

function configHTML(args) {
  const options = args[0];
  if (isProduction) {
    options.injectScript = cdns
      .map((cdn) => `<script src="${cdn}" rel="prefetch"></script>`)
      .join('');
  }

  return args;
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(
          __dirname,
          './node_modules/ant-design-vue/lib/style/themes/default.less',
        ),
        path.resolve(__dirname, './src/assets/var.less'),
      ],
    });
}

module.exports = {
  configureWebpack: (config) => {
    if (isProduction) {
      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'ant-design-vue': 'antd',
      };
    }
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
      new LodashWebpackPlugin(),
    );
  },
  publicPath:
    process.env.NODE_ENV === 'production' ? '/vue-ts-antd-starter/' : '/',
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) =>
      addStyleResource(config.module.rule('less').oneOf(type)),
    );

    config.plugin('html').tap(configHTML);
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#ea5c7d',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
      },
    },
  },
};
