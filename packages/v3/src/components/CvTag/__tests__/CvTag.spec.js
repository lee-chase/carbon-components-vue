import { shallowMount } from '@vue/test-utils';
import { CvTag } from '..';

import { carbonPrefix, getBlockClass } from '../../../global/settings';
const blockClass = getBlockClass('tag');

describe('CvTag', () => {
  it('CvTag - default', () => {
    const tagKind = 'red';
    const tagLabel = 'test tag label';
    const wrapper = shallowMount(CvTag, {
      props: {
        kind: tagKind,
        label: tagLabel,
        filter: false,
      },
    });

    // check if the root span exists
    // - verify classes on the root span
    const tagSpan = wrapper.find(`.${blockClass}`);
    expect(tagSpan.classes()).toContain(`${blockClass}--${tagKind}`);

    // check if the label exists
    // - verify the tag label class
    // - verify if the label's content is equal to the given label text
    const labelSpan = tagSpan.find(`.${blockClass}__label`);
    expect(labelSpan.element.textContent).toEqual(tagLabel);

    // check if the remove button exists
    // - it should not, because the filter is set to false
    expect(tagSpan.find('button').exists()).toBe(false);
  });

  it('CvTag - filter', () => {
    const tagKind = 'green';
    const tagLabel = 'test tag with filter';
    const wrapper = shallowMount(CvTag, {
      props: {
        kind: tagKind,
        label: tagLabel,
        filter: true,
      },
    });

    // check if the root span exists
    // - verify classes on the root span
    const tagSpan = wrapper.find(`.${blockClass}`);
    expect(tagSpan.classes()).toContain(`${blockClass}--${tagKind}`);

    // check if the label exists
    // - verify the tag label class
    // - verify if the label's content is equal to the given label text
    const labelSpan = tagSpan.find(`.${blockClass}__label`);
    expect(labelSpan.element.textContent).toEqual(tagLabel);

    // check if the remove button exists
    // - it should not, because the filter is set to false
    const removeButton = tagSpan.find('button');
    expect(removeButton.exists()).toBe(true);

    // click on remove button
    removeButton.element.click();

    // check if it emitted remove
    expect(wrapper.emitted().remove).toBeTruthy();
  });

  it('CvTag - disabled', () => {
    const tagKind = 'red';
    const tagLabel = 'test tag label';
    const wrapper = shallowMount(CvTag, {
      props: {
        kind: tagKind,
        label: tagLabel,
        filter: false,
        disabled: true,
      },
    });

    // check if the root span exists
    // - verify tag disabled class on span
    const tagSpan = wrapper.find(`.${blockClass}`);
    expect(tagSpan.classes()).toContain(`${blockClass}--disabled`);

    // Call onRemove directly to test disabled path
    wrapper.vm.onRemove();
    // check if it emitted remove
    expect(wrapper.emitted().remove).toBeFalsy();
  });

  it('Renders a skeleton CvTag', () => {
    const tagKind = 'red';
    const tagLabel = 'test tag label';
    const wrapper = shallowMount(CvTag, {
      props: {
        kind: tagKind,
        label: tagLabel,
        filter: true,
        disabled: true,
        skeleton: true,
      },
    });

    // check if the root span exists
    // - verify tag disabled class on span
    const tagSpan = wrapper.find(`.${blockClass}`);
    expect(tagSpan.classes()).toContain(`${carbonPrefix}--skeleton`);

    // Call onRemove directly to test disabled path
    wrapper.vm.onRemove();
    // check if it emitted remove
    expect(wrapper.emitted().remove).toBeFalsy();
  });
});
