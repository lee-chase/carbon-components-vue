import { shallowMount } from '@vue/test-utils';
import { getBlockClass } from '../../../global/settings';

import { CvButtonSet } from '..';

const blockClass = getBlockClass('btn');

describe('CvButtonSeet', () => {
  it('renders button set and slot', async () => {
    const slotContent = 'slot content';
    const wrapper = shallowMount(CvButtonSet, {
      slots: {
        default: slotContent,
      },
    });

    const buttonSet = wrapper.find(`.${blockClass}-set`);
    expect(buttonSet).not.toBeUndefined();
    expect(buttonSet.text()).toBe(slotContent);
  });

  it('renders button set stacked and slot', async () => {
    const slotContent = 'slot content';
    const wrapper = shallowMount(CvButtonSet, {
      slots: {
        default: slotContent,
      },
      props: {
        stacked: true,
      },
    });

    const buttonSet = wrapper.find(`.${blockClass}-set`);
    expect(buttonSet).not.toBeUndefined();
    expect(buttonSet.classes()).toContain(`${blockClass}-set--stacked`);
    expect(buttonSet.text()).toBe(slotContent);
  });
});
