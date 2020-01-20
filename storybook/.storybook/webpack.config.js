const path = require('path');
const autoprefixer = require('autoprefixer')({ overrideBrowserslist: ['last 2 versions', 'ie >= 10'] });
const customProperties = require('postcss-custom-properties');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  config.plugins.push(
    new CopyPlugin([
      {
        context: '../docs/carbon-vue-icon/',
        from: '*',
        to: 'static/media/carbon-vue-icon/',
      },
    ])
  );

  config.module.rules.push({
    test: /-story\.js$/,
    include: path.resolve(__dirname, '../stories'),
    loader: require.resolve('@storybook/addon-storysource/loader'),
    options: {
      prettierConfig: {
        parser: 'babel', // Remove warnings when loading story source files
      },
    },
    enforce: 'pre',
  });

  const sassLoader = {
    loader: 'sass-loader',
    options: {
      prependData() {
        return `
          $feature-flags: (
            ui-shell: true,
            enable-css-custom-properties: true,
          );
        `;
      },
      sassOptions: {
        includePaths: [path.resolve(__dirname, '..', 'node_modules')],
      },
      sourceMap: true,
    },
  };

  config.module.rules.push({
    test: /\.(s){0,1}css$/,
    sideEffects: true,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => {
            const autoPrefixer = require('autoprefixer')({
              overrideBrowserslist: ['last 1 version', 'ie >= 11'],
            });
            return [customProperties(), autoPrefixer];
          },
          sourceMap: true,
        },
      },
      sassLoader,
    ],
  });

  config.module.rules.push({
    test: /\.jsonl$/,
    loaders: ['jsonlines-loader'],
  });

  // auto prefix anything in a vue file
  config.resolve.extensions.push('.js', '.vue', '.json', '.jsonl');

  let vueLoaderConfig = config.module.rules.find(item => {
    return item.loader && item.loader.indexOf('vue-loader') > -1;
  });
  vueLoaderConfig.options = {
    ...vueLoaderConfig.options,
    postcss: [autoprefixer],
  };

  return config;
};
