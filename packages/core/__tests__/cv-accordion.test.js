import { shallowMount as shallow } from '@vue/test-utils';
import { testComponent } from './_helpers';
import { CvAccordion, CvAccordionItem, CvAccordionSkeleton } from '@/components/cv-accordion';
import { settings as carbonSettings } from 'carbon-components';

const carbonPrefix = carbonSettings.prefix;

describe('CvAccordion', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('matches render', async () => {
    const wrapper = shallow(CvAccordion, {
      slots: {
        default: '<div class="cv-accordion-item-stub">StubbyMcStubFace</div>',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});

describe('CvAccordionSkeleton', () => {
  // ***************
  // PROP CHECKS
  // ***************

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('matches render', async () => {
    const wrapper = shallow(CvAccordionSkeleton);
    await wrapper.vm.$nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
});

describe('CvAccordionItem', () => {
  // ***************
  // PROP CHECKS
  // ***************
  testComponent.propsAreType(CvAccordionItem, ['open'], Boolean);

  testComponent.propsHaveDefault(CvAccordionItem, ['open']);

  // ***************
  // SNAPSHOT TESTS
  // ***************
  it('matches render', async () => {
    const wrapper = shallow(CvAccordionItem, {
      propsData: { id: '1' },
      slots: {
        default: '<div class="cv-accordion-item-stub">StubbyMcStubFace</div>',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches render open', async () => {
    const wrapper = shallow(CvAccordionItem, {
      propsData: {
        id: '1',
        open: true,
      },
      slots: {
        default: '<div class="cv-accordion-item-stub">StubbyMcStubFace</div>',
      },
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toMatchSnapshot();
  });

  // ***************
  // FUNCTIONAL TESTS
  // ***************
  it('closed to open to closed', async () => {
    const wrapper = shallow(CvAccordionItem, {
      slots: {
        default: '<div class="cv-accordion-item-stub">StubbyMcStubFace</div>',
      },
    });
    await wrapper.vm.$nextTick();
    const button = wrapper.find('button');

    expect(button.attributes('aria-expanded')).toEqual('false');
    expect(wrapper.classes()).not.toContain(`${carbonPrefix}--accordion__item--active`);

    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(button.attributes('aria-expanded')).toEqual('true');
    expect(wrapper.classes()).toContain(`${carbonPrefix}--accordion__item--active`);

    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(button.attributes('aria-expanded')).toEqual('false');
    expect(wrapper.classes()).not.toContain(`${carbonPrefix}--accordion__item--active`);
  });

  it('topen to closed to open', async () => {
    const wrapper = shallow(CvAccordionItem, {
      propsData: {
        open: true,
      },
      slots: {
        default: '<div class="cv-accordion-item-stub">StubbyMcStubFace</div>',
      },
    });
    await wrapper.vm.$nextTick();
    const button = wrapper.find('button');

    expect(button.attributes('aria-expanded')).toEqual('true');
    expect(wrapper.classes()).toContain(`${carbonPrefix}--accordion__item--active`);

    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(button.attributes('aria-expanded')).toEqual('false');
    expect(wrapper.classes()).not.toContain(`${carbonPrefix}--accordion__item--active`);

    wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(button.attributes('aria-expanded')).toEqual('true');
    expect(wrapper.classes()).toContain(`${carbonPrefix}--accordion__item--active`);
  });
});
