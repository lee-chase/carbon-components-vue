export const splitSlotArgs = (argsIn = {}) => {
  const keys = Object.keys(argsIn || {});
  const slots = {};
  const args = {};
  keys.forEach(key => {
    if (key.startsWith('slot.')) {
      slots[key.substr(5)] = argsIn[key];
    } else {
      args[key] = argsIn[key];
    }
  });

  return { args, slots };
};
