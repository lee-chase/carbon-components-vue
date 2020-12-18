<template>
  <div class="cv-code-snippet-oneline" :class="[`${carbonPrefix}--snippet`, `${carbonPrefix}--snippet--single`]">
    <div :class="`${carbonPrefix}--snippet-container`" ref="container" @scroll="measure">
      <pre>
        <slot></slot>
      </pre>
      <resize-observer @notify="handleResize" />
    </div>
    <div v-if="hasLeftOverflow" :class="`${carbonPrefix}--snippet__overflow-indicator--left`" />
    <div v-if="hasRightOverflow" :class="`${carbonPrefix}--snippet__overflow-indicator--right`" />

    <cv-feedback-button
      v-if="!hideCopyButton"
      :feedback="copyFeedback"
      :aria-label="feedbackAriaLabel"
      @click="$emit('copy-code')"
    >
      <Copy16 :class="`${carbonPrefix}--snippet__icon`" />
    </cv-feedback-button>
  </div>
</template>

<script>
import { carbonPrefixMixin } from '../../mixins';
import CvFeedbackButton from '../cv-feedback-button/_cv-feedback-button';
import Copy16 from '@carbon/icons-vue/es/copy/16';
import ResizeObserver from 'vue-resize/src/components/ResizeObserver.vue';

export default {
  name: 'CvCodeSnippetOneline',
  mixins: [carbonPrefixMixin],
  components: {
    CvFeedbackButton,
    Copy16,
    ResizeObserver,
  },
  props: {
    copyFeedback: String,
    feedbackAriaLabel: String,
    hideCopyButton: Boolean,
  },
  data() {
    return {
      hasLeftOverflow: false,
      hasRightOverflow: false,
    };
  },
  mounted() {
    this.measure();
  },
  created() {
    window.addEventListener('resize', this.measure);
  },
  destroyed() {
    window.removeEventListener('resize', this.measure);
  },
  methods: {
    handleResize() {
      this.measure();
    },
    measure() {
      const el = this.$refs.container;

      this.hasLeftOverflow = el.scrollLeft > 0;
      this.hasRightOverflow = el.scrollWidth - el.clientWidth - el.scrollLeft > 0;
    },
  },
};
</script>
