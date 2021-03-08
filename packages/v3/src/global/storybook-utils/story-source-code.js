import { splitSlotArgs } from '.';

export const storySourceCode = (
  templateSource,
  argsIn,
  replacing = 'v-bind="args"'
) => {
  const getPropReplacement = (key, val) => {
    if (key.startsWith('slots.')) return '';

    const type = typeof val;
    switch (type) {
      case 'boolean':
        return val ? key : '';
      case 'string':
        return `${key}="${val}"`;
      default:
        return `:${key}="${val}"`;
    }
  };

  // const getReplacement = (key, val, replacing, multiSlot) => {
  //   let oldValue, newValue;

  //   if (key.startsWith('slot.')) {
  //     // replace <template v-slot:name />
  //     const slotName = key.substr(5); // 'slot.' is 5 chars
  //     oldValue = replacing.slot(slotName);
  //     if (multiSlot || slotName !== 'default') {
  //       newValue = `\n\t<template slot:${slotName}>${val}</template>`; // always a string no need to quote
  //     } else {
  //       newValue = val;
  //     }
  //   } else {
  //     oldValue = replacing.props;
  //     const type = typeof val;
  //     switch (type) {
  //       case 'boolean':
  //         newValue = val ? key : '';
  //         break;
  //       case 'string':
  //         newValue = `${key}="${val}"`;
  //         break;
  //       default:
  //         newValue = `:${key}="${val}"`;
  //         break;
  //     }
  //   }

  //   return { oldValue, newValue };
  // };

  const { args, slots } = splitSlotArgs(argsIn);
  let result =
    typeof templateSource === 'function' ? slots.join(`\n\t`) : templateSource;

  const propsKeys = Object.keys(args);
  if (propsKeys.length > 0) {
    // replace props
    result = result.replace(
      replacing,
      propsKeys
        .map(key => getPropReplacement(key, args[key]))
        .filter(item => item !== '')
        .join(' ')
    );
  } else {
    result = result.replace(replacing, '');
  }

  // const slotsKeys = Object.keys(slots);
  // const multiSlot = slotsKeys.length > 1;
  // const resultSlotRegex = /{{slots\.([^}]*)}}/g;
  // let match;
  // while ((match = resultSlotRegex.exec(result)) !== null) {
  //   if (slots[match[1]]) {
  //     result = result.replace(
  //       match[0],
  //       getReplacement(match[1], slots[match[1]], replacing, multiSlot)
  //     );
  //   }
  // }

  // if (slotsKeys.length > 0) {
  //   // replace slots
  //   const replacements = slotsKeys.map(key =>
  //     getReplacement(key, slots[key], replacing, multiSlot)
  //   );

  //   for (const replacement of replacements) {
  //     result = result.replace(replacement.oldValue, replacement.newValue);
  //   }
  // add \n at last template
  result = result.replace(/<\/template>(?!.*<\/template>)/, `</template>\n`);

  const doubleSpace = '  ';
  while (result.indexOf(doubleSpace) > -1) {
    result = result.replace(doubleSpace, ' ');
  }

  return result;
};

export const storyParametersObject = (
  parameters,
  templateSource,
  args,
  replacing = 'v-bind="args"'
) => {
  const code = storySourceCode(templateSource, args, replacing);

  if (!parameters) {
    parameters = { docs: { source: { code } } };
  } else {
    if (!parameters.docs) {
      parameters.docs = { source: { code } };
    } else {
      if (!parameters.docs.source) {
        parameters.docs.source = { code };
      } else {
        parameters.docs.source.code = code;
      }
    }
  }
  return parameters;
};
