import { configure, addDecorator, addParameters } from '@storybook/vue';
import { themes } from '@storybook/theming';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs } from '@storybook/addon-knobs';
import addons from '@storybook/addons';

import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';

import {
  CARBON_CURRENT_THEME,
  // CARBON_TYPE_TOKEN,
} from './addon-carbon-theme/shared';

import '!style-loader!css-loader!postcss-loader!sass-loader!./styles.scss';

addDecorator(withKnobs);
addDecorator(withNotes);

addons.getChannel().on(CARBON_CURRENT_THEME, theme => {
  document.documentElement.setAttribute('storybook-carbon-theme', theme);
});

addParameters({
  options: {
    name: 'Carbon Components in Vue.js',
    url: 'https://github.com/carbon-design-system/carbon-components-vue/blob/master/packages/core/README.md',
    theme: themes.dark,
    isToolshown: true,
    showPanel: true,
  },
});

Vue.use(VueHighlightJS);

function loadStories() {
  const req = require.context('../stories', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
