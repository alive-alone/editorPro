<script setup lang="ts">
defineProps({
  details: {
    type: Object,
    default: {},
  },
});
/*
      fontFamily: '',
      fontSize: 47.7,
      fontStyle: '',
      fontWeight: 600,
      color: '#000000',
      lineHeight: 57.48,
      text: '双击编辑标题',
      textAlign: 'center',
*/
</script>

<template>
  <template v-if="details.key == 'text'">
    <div
      class="box"
      :style="{
        ...details.textInnerStyle,
        fontSize: `${details.textInnerStyle.fontSize}px`,
        lineHeight: `${details.textInnerStyle.lineHeight}px`,
      }"
    >
      {{ details.textInnerStyle.text }}
    </div>
  </template>
</template>

<style scoped lang="scss">
.box {
  position: absolute;
  width: 100%;
  height: 100%;
  user-select: none;
}
</style>
