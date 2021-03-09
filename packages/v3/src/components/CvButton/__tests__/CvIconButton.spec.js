import { shallowMount } from '@vue/test-utils';
import { carbonPrefix, getBlockClass } from '../../../global/settings';

import { CvIconButton } from '..';

const blockClass = getBlockClass('btn');

describe('CvIconButton', () => {
  it('renders button and slot', () => {
    const labelContent = 'label content';
    const wrapper = shallowMount(CvIconButton, {
      props: {
        label: labelContent,
      },
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain(`${blockClass}`);
    expect(button.classes()).toContain(`${blockClass}--primary`);

    const assistiveText = button.find(`.${carbonPrefix}--assistive-text`);
    expect(assistiveText.text()).toBe(labelContent);
  });

  it('Raises click event when clicked', async () => {
    const wrapper = shallowMount(CvIconButton);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('renders ghost icon button with selected state', () => {
    const labelContent = 'label content';
    const wrapper = shallowMount(CvIconButton, {
      props: {
        kind: 'ghost',
        label: labelContent,
        selected: true,
      },
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain(`${blockClass}`);
    expect(button.classes()).toContain(`${blockClass}--ghost`);
    expect(button.classes()).toContain(`${blockClass}--selected`);

    const assistiveText = button.find(`.${carbonPrefix}--assistive-text`);
    expect(assistiveText.text()).toBe(labelContent);
  });
});
