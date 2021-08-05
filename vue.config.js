/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const packageConfig = require('./package.json');

const { vue } = packageConfig.dependencies;

const isProduction = process.env.NODE_ENV === 'production';
const getVersion = (dep) => dep.match(/\d.*?$/)[0];

const cdns = [
  `https://cdn.jsdelivr.net/npm/vue@${getVersion(vue)}/dist/vue.min.js`,
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
      };
    }
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
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
      },
    },
  },
};
