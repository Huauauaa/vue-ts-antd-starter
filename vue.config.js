const path = require('path');

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
  publicPath:
    process.env.NODE_ENV === 'production' ? '/vue-ts-antd-starter/' : '/',
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) =>
      addStyleResource(config.module.rule('less').oneOf(type)),
    );
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
