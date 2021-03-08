import { action } from '@storybook/addon-actions';
import { CvButton } from './';
import { buttonKinds, buttonSizes } from './consts';
import {
  sbCompPrefix,
  splitSlotArgs,
  storybookControlsFromProps,
  storyParametersObject,
} from '../../assets/utils';
import { sbBtnPrefix } from './storybook-utils';
import { props as commonCvButtonProps } from './CvButtonCommon';
import {
  Bee20,
  Carbon20,
  Watson20,
  IbmCloud20,
  EdtLoop20,
  IbmSecurity20,
} from '@carbon/icons-vue';
import { iconAsSvgString } from '../../assets/images/example-icon-svg.js.js.js.js';
import iconAsSvgSymbolPath from '../../assets/images/example-icons.svg';
import iconAsSvgPath from '../../assets/images/example-icon.svg';

const icons = {
  Bee20,
  Carbon20,
  Watson20,
  IbmCloud20,
  EdtLoop20,
  IbmSecurity20,
  iconAsSvgPath,
  iconAsSvgSymbolPath,
  iconAsSvgString,
};

export default {
  title: `${sbCompPrefix}/${sbBtnPrefix}/CvButton`,
  component: CvButton,
  argTypes: {
    ...storybookControlsFromProps(commonCvButtonProps),
    icon: { control: { type: 'select', options: Object.keys(icons) } },
    kind: {
      control: { type: 'select', options: buttonKinds },
      defaultValue: CvButton.props.kind.default,
    },
    size: {
      control: {
        type: 'select',
        options: buttonSizes,
      },
      defaultValue: CvButton.props.size.default,
    },
  },
};

const template = slots =>
  `<cv-button @click="onClick" v-bind="args">${slots}</cv-button>`;
const Template = (argsIn, { argTypes }) => {
  let { args, slots } = splitSlotArgs(argsIn);
  // update args
  args = { ...args, icon: icons[args.icon] };

  return {
    props: Object.keys(argTypes),
    components: { CvButton },
    setup() {
      return { args, slots, onClick: action('click') };
    },
    template: template(slots.join('')),
  };
};

export const Default = Template.bind({});
Default.args = {
  kind: 'primary',
  'slot.default': 'Button',
};
Default.parameters = storyParametersObject(
  Default.parameters,
  template,
  Default.args
);
