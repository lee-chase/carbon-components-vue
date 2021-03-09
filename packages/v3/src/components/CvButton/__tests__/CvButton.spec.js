import { shallowMount } from '@vue/test-utils';
import { getBlockClass } from '../../../global/settings';

import { CvButton } from '..';

const blockClass = getBlockClass('btn');

describe('CvButton', () => {
  it('renders button and slot', async () => {
    const slotContent = 'slot content';
    const wrapper = shallowMount(CvButton, {
      slots: {
        default: slotContent,
      },
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain(`${blockClass}`);
    expect(button.classes()).toContain(`${blockClass}--primary`);

    expect(button.text()).toBe(slotContent);
  });

  it('Raises click event when clicked', async () => {
    const wrapper = shallowMount(CvButton);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
