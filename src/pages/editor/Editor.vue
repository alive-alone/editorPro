<script setup lang="ts">
import Workspace from './components/Workspace.vue';
import { useEditorStore } from '@/store/editor';

const editorStore = useEditorStore();

const clearFocusList = () => {
  if (!editorStore.isMoving) {
    editorStore.clearFocusList();
  }
};
</script>

<template>
  <div class="body" @click="clearFocusList">
    <Workspace :data="editorStore.domNodesObj"></Workspace>
  </div>
</template>

<style scoped lang="scss">
.body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
