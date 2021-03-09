import { computed } from 'vue';
import { carbonPrefix, getBlockClass } from '../../global/settings';
import { buttonKinds, buttonSizes } from './consts.js';

const blockClass = getBlockClass('btn');

export const props = {
  /**
   * disabled by property or if skeleton
   */
  disabled: Boolean,

  icon: {
    type: [String, Object],
    default: undefined,
  },
  kind: {
    type: String,
    default: 'primary',
    validator: val => {
      const valid = buttonKinds.includes(val);
      if (!valid) {
        console.error(
          `Invalid button kind specified "${val}". Valid values are [${buttonKinds}]`
        );
      }
      return valid;
    },
  },
  size: {
    type: String,
    default: '',
    validator: val => {
      const valid = buttonSizes.includes(val);
      if (!valid) {
        console.error(
          `Invalid button size specified "${val}". Valid values are [${buttonSizes.slice(
            1
          )}]`
        );
      }
      return valid;
    },
  },
};

export const useCvButtonCommon = (
  kind,
  size,
  skeleton = false,
  iconOnly = false,
  selected = false
) => {
  const buttonClasses = computed(() => {
    const classes = [`${blockClass}`];
    const lowerCaseKind = kind.toLowerCase();

    if (skeleton) {
      classes.push(`${carbonPrefix}--skeleton`);
    }

    if (iconOnly) {
      classes.push(`${blockClass}--icon-only`);

      if (selected && lowerCaseKind === 'ghost') {
        classes.push(`${blockClass}--selected`);
      }
    }

    if (kind && !skeleton) {
      classes.push(`${blockClass}--${lowerCaseKind}`);
    }

    if (size) {
      const _size = size === 'small' ? 'sm' : size;
      classes.push(`${blockClass}--${_size}`);
    }

    return classes;
  });

  return { buttonClasses };
};
