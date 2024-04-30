<script setup lang="ts">
import { reactive } from 'vue';
import Workspace from './components/Workspace.vue';
import { useEditorStore } from '@/store/editor';

const selectBox = reactive({
  isShow: false,
  pos: [0, 0, 0, 0],
});
const editorStore = useEditorStore();

const clearFocusList = () => {
  // console.log('clearFocusList', editorStore.isMoving);
  if (!editorStore.isMoving) {
    editorStore.clearFocusList();
  }
};
const boxSelect = (event: MouseEvent) => {
  // console.log('mousedown');
  if (editorStore.isMoving) {
    selectBox.isShow = false;
    return;
  }
  selectBox.pos = [0, 0, 0, 0];
  selectBox.isShow = true;
  const x1 = event.clientX;
  const y1 = event.clientY;
  selectBox.pos[0] = x1;
  selectBox.pos[1] = y1;
  let timer = setTimeout(() => {
    // console.log('setTimeout');
    clearFocusList();
  }, 150);
  let isFirst = true;
  const mouseMove = (e: MouseEvent) => {
    // console.log('mouseMove');
    if (isFirst) {
      clearTimeout(timer);
      isFirst = false;
    }
    if (editorStore.isMoving) {
      selectBox.isShow = false;
      document.onmousemove = null;
      return;
    }
    const x2 = e.clientX;
    const y2 = e.clientY;
    const width = x2 - x1;
    const height = y2 - y1;
    selectBox.pos[3] = Math.abs(height);
    selectBox.pos[2] = Math.abs(width);
    if (width < 0) {
      selectBox.pos[0] = x2;
    }
    if (height < 0) {
      selectBox.pos[1] = y2;
    }
  };
  // document.addEventListener('mousemove', mouseMove);
  document.onmousemove = mouseMove;
  document.onmouseup = function () {
    // console.log('onmouseup');
    selectBox.isShow = false;
    document.onmousemove = null;
    document.onmouseup = null;
  };
};
</script>

<template>
  <div class="body" @mousedown="boxSelect" @mouseenter.capture>
    <Workspace :data="editorStore.domNodesObj"></Workspace>
    <template v-if="selectBox.isShow">
      <div
        class="box-select"
        :style="{
          left: `${selectBox.pos[0]}px`,
          top: `${selectBox.pos[1]}px`,
          width: `${selectBox.pos[2]}px`,
          height: `${selectBox.pos[3]}px`,
        }"
      ></div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .box-select {
    position: absolute;
    background-color: rgba(177, 238, 190, 0.3);
    border: 1px solid #45bf74;
    z-index: 5;
  }
}
</style>
