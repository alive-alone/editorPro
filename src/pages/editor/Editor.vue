<script setup lang="ts">
import Workspace from './components/Workspace.vue';
import { useEditorStore } from '@/store/editor';

const editorStore = useEditorStore();

const clearFocusList = () => {
  console.log('clearFocusList');
  if (!editorStore.isMoving) {
    editorStore.clearFocusList();
  }
};
const str =
  '[{"id":"202442295421492569","left":117.69230769230771,"top":266.0439560439561,"zIndex":1,"fontSize":18,"display":"","userSelect":"none","cursor":"move","width":260,"height":113.31666666666666,"color":"#000000","padding":"0","background":"","borderWidth":0,"borderColor":"#fff","borderType":"","borderRadius":0,"textAlign":"","lineHeight":40,"boxShadow":"","opacity":1,"fontFamily":"","fontWeight":400,"fontStyle":"","rotate":0,"className":"","text":"","title":"","placeholder":"","type":"","src":"https://gd-filems.dancf.com/saas/xi19e5/0/5c6e2c57-17cb-4adb-9a25-e00231774dff470.png","alt":"","key":"img","focus":false,"dragging":false}]';
console.log(JSON.parse(str));
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
