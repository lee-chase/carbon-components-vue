import { configure, addDecorator, addParameters } from '@storybook/vue';
import { themes } from '@storybook/theming';
// import addons from '@storybook/addons';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs } from '@storybook/addon-knobs';
import { withCarbonTheme } from '@carbon/storybook-addon-theme/vue';
// import addons from '@storybook/addons';

import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';

// import {
//   CARBON_CURRENT_THEME,
//   // CARBON_TYPE_TOKEN,
// } from '@carbon/storybook-addon-theme';

import '!style-loader!css-loader!postcss-loader!sass-loader!./styles.scss';

addDecorator(withKnobs);
addDecorator(withNotes);
addDecorator(withCarbonTheme);

// addons.getChannel().on(CARBON_CURRENT_THEME, theme => {
//   debugger;
//   document.documentElement.setAttribute('storybook-carbon-theme', theme);
// });

// addons.getChannel().on(`CARBON_CURRENT_THEME`, theme => {
//   console.log('Well this is a turn up', theme);
// });

addParameters({
  options: {
    name: 'Carbon Components in Vue.js',
    url: 'https://github.com/carbon-design-system/carbon-components-vue/blob/master/packages/core/README.md',
    theme: themes.dark,
    isToolshown: true,
    showPanel: true,
  },
  carbonTheme: {
    theme: 'g100',
    themes: ['white', 'g100'],
  },
});

Vue.use(VueHighlightJS);

function loadStories() {
  const req = require.context('../stories', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
