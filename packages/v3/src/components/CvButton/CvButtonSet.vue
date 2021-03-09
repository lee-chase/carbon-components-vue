<template>
  <div
    :class="[`${blockClass}-set`, { [`${blockClass}-set--stacked`]: stacked }]"
  >
    <!-- @slot Default content of button set, expects buttons -->
    <slot />
  </div>
</template>

<script>
import { getBlockClass } from '../../global/settings';
const blockClass = getBlockClass('btn');

export default {
  name: 'CvButtonSet',
  props: {
    /**
     * Button set stacked vertically
     */
    stacked: Boolean,
  },
  setup() {
    return {
      blockClass,
    };
  },
};
</script>
