<template>
  <li
    data-accordion-item
    class="cv-accordion-item"
    :class="[
      `${blockClass}__item`,

      {
        [`${blockClass}__item--disabled`]: disabled,
        [`${blockClass}__item--active`]: isOpen,
        [`${blockClass}__item--${animation}`]: animation,
      },
    ]"
    @animationend="onAnimationEnd"
  >
    <button
      :disabled="disabled"
      ref="button"
      type="button"
      :class="`${blockClass}__heading`"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="cvId"
      @click.prevent.stop="onClick"
    >
      <ChevronRight16 :class="`${blockClass}__arrow`" />
      <p :class="`${blockClass}__title`">
        <!-- @slot title of the accordion item -->
        <slot name="title"></slot>
      </p>
    </button>
    <div :id="cvId" :class="`${blockClass}__content`">
      <!-- @slot content of accordion item -->
      <slot name="content"></slot>
    </div>
  </li>
</template>

<script>
import { onMounted, onBeforeUnmount, inject, ref } from 'vue';
import { getBlockClass } from '../../global/settings';
import { useCvId, props as propsCvId } from '../../use/cvId';
import { ChevronRight16 } from '@carbon/icons-vue/';

const { id } = propsCvId;
const blockClass = getBlockClass('accordion');

export default {
  name: 'CvAccordionItem',
  components: { ChevronRight16 },
  props: {
    /**
     * disables this accodion item
     */
    disabled: Boolean,
    /**
     * id for element, optional uses cvId if not set
     */
    id,
    /**
     * initial open state of the accordion item
     */
    open: Boolean,
  },
  setup(props) {
    // Accordion methods
    const registerItem = inject('registerItem');
    const deregisterItem = inject('deregisterItem');
    const onAccItemChagne = inject('onAccItemChagne');

    // Accordion item methods
    const cvId = useCvId(props);
    const isOpen = ref(props.open);
    const animation = ref('');

    const toggleOpen = force => {
      const newValue = typeof force !== 'undefined' ? force : !isOpen.value;

      animation.value = newValue ? 'expanding' : 'collapsing';
      isOpen.value = newValue;
      onAccItemChagne(cvId.value, newValue);
    };

    const onClick = () => {
      toggleOpen(!isOpen.value);
    };

    const onAnimationEnd = () => {
      animation.value = '';
    };

    onMounted(() => {
      registerItem(cvId.value, { open: isOpen.value, toggleOpen });
    });

    onBeforeUnmount(() => {
      deregisterItem(cvId.value);
    });

    return { animation, blockClass, cvId, onClick, onAnimationEnd, isOpen };
  },
};
</script>

<style lang="scss"></style>
