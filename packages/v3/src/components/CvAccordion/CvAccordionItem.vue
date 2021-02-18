<template>
  <div>Item</div>
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue';
export default {
  name: 'CvAccordionItem'
  setup(props) {
    onMounted(() => {
      getCurrentInstance().parent.reg();
    })
    return {};
  }
};
</script>

<style lang="scss"></style>
