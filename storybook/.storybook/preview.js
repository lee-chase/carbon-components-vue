import { configure, addDecorator, addParameters } from '@storybook/vue';
import { themes } from '@storybook/theming';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs } from '@storybook/addon-knobs';

import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';
import '!style-loader!css-loader!postcss-loader!sass-loader!./styles.scss';

addDecorator(withKnobs);
addDecorator(withNotes);

// export const parameters = {
//   themes: [
//     { name: 'twitter', class: 'theme-twt', color: '#00aced', default: true },
//     { name: 'facebook', class: 'theme-fb', color: '#3b5998' },
//   ],
// };

addParameters({
  options: {
    name: 'Carbon Components in Vue.js',
    url: 'https://github.com/carbon-design-system/carbon-components-vue/blob/master/packages/core/README.md',
    theme: themes.dark,
    isToolshown: true,
    showPanel: true,
  },
  themes: {
    clearable: false,
    list: [
      { name: 'Carbon:white', class: 'carbon-theme--white', color: '#ffffff' },
      { name: 'Carbon:g10', class: 'carbon-theme--g10', color: '#f4f4f4', default: true },
      { name: 'Carbon:g90', class: 'carbon-theme--g90', color: '#262626' },
      { name: 'Carbon:g100', class: 'carbon-theme--g100', color: '#161616' },
    ],
  },
});

Vue.use(VueHighlightJS);

function loadStories() {
  const req = require.context('../stories', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
