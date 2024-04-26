<script setup lang="ts">
import { computed, onMounted, reactive, onUnmounted, ref } from 'vue';
import RenderBlock from './RenderBlock.vue';
import { useEditorStore } from '@/store/editor';

const props = defineProps({
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 772.268,
  },
  data: {
    type: Object,
    default: [],
  },
});

const state = reactive({
  isClickCtrl: false,
});
const focusBoxRef = ref();

const editorStore = useEditorStore();
// 将 object 形式数据转化为 array 形式
const list = computed(() => {
  let arr = [];
  Object.keys(props.data).forEach((key) => {
    arr.push(props.data[key]);
  });
  return arr;
});
// 改变当前节点 focus 状态，更新 fouseList
const changeFocus = (item: object) => {
  // console.log('changeFocus');
  if (editorStore.isMoving) return;
  if (state.isClickCtrl) {
    editorStore.changeFocusStatus(item.id, item.focus ? 'remove' : 'add');
  } else {
    editorStore.changeFocusStatus(item.id, 'replace');
  }
};

// 当节点被直接拖拽时，需要手动触发 focusBox mousemove事件
const blockMousedown = (event: MouseEvent, item: Object) => {
  if (!item.focus) {
    const target = document;
    const blockMove = () => {
      if (!item.focus) {
        editorStore.changeFocusStatus(item.id, 'replace');
        mousedown(event);
      }
      target?.removeEventListener('mousemove', blockMove);
    };
    const mouseup = () => {
      console.log('mouseup');
      target?.removeEventListener('mousemove', blockMove);
      target?.removeEventListener('mouseup', mouseup);
    };
    target?.addEventListener('mousemove', blockMove);
    target?.addEventListener('mouseup', mouseup);
  }
};

// 当 focusBox 被按下时，开始监听拖拽事件
const mousedown = (event: MouseEvent) => {
  // console.log('focusBox mousedown');
  const preMoveDis = {
    left: 0,
    top: 0,
  };
  const x1 = event.clientX;
  const y1 = event.clientY;
  const mousemove = (e: MouseEvent) => {
    editorStore.changeMoveStatue(true);
    const x2 = e.clientX;
    const y2 = e.clientY;
    const computedLeft = x2 - x1 - preMoveDis.left;
    const computedTop = y2 - y1 - preMoveDis.top;
    preMoveDis.left = x2 - x1;
    preMoveDis.top = y2 - y1;
    editorStore.moveDomNode(computedLeft, computedTop);
  };
  const mouseup = () => {
    // console.log('mouseup');
    setTimeout(() => {
      editorStore.changeMoveStatue(false);
    });
    // 及时取消监听事件
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
  };
  document?.addEventListener('mousemove', mousemove);
  document?.addEventListener('mouseup', mouseup);
};

const blockMouseMove = (event: MouseEvent, item: Object) => {
  if (!item.focus) {
    editorStore.changeFocusStatus(item.id, 'replace');
    mousedown(event);
  }
};

const focusBoxClick = (e: MouseEvent) => {
  // console.log(e);
};

const mouseZoom = (event: MouseEvent, type: string) => {
  const preMoveDis = {
    left: 0,
    top: 0,
  };
  const x1 = event.clientX;
  const y1 = event.clientY;
  document.onmousemove = (e: MouseEvent) => {
    const x2 = e.clientX;
    const y2 = e.clientY;
    const computedLeft = x2 - x1 - preMoveDis.left;
    const computedTop = y2 - y1 - preMoveDis.top;
    preMoveDis.left = x2 - x1;
    preMoveDis.top = y2 - y1;
    editorStore.changeMoveStatue(true);
    editorStore.zoomDomNode(type, computedLeft, computedTop);
  };
  document.onmouseup = function () {
    setTimeout(() => {
      editorStore.changeMoveStatue(false);
    });
    document.onmousemove = document.onmouseup = null;
  };
};

const mouseRotate = (event: MouseEvent) => {
  let prePoint = {
    x: event.clientX,
    y: event.clientY,
  };
  let preRotate = editorStore.focusBox.rotate;
  document.onmousemove = (e: MouseEvent) => {
    editorStore.changeMoveStatue(true);
    editorStore.mouseRotate(preRotate, prePoint, {
      x: e.clientX,
      y: e.clientY,
    });
  };
  document.onmouseup = function () {
    setTimeout(() => {
      editorStore.changeMoveStatue(false);
    });
    document.onmousemove = document.onmouseup = null;
  };
};

// 监听当前键盘 ctrl 状态
const watchKeydown = (event: KeyboardEvent) => {
  if (state.isClickCtrl !== event.ctrlKey) {
    state.isClickCtrl = event.ctrlKey;
  }
};
// 监听当前键盘 ctrl 状态
const watchKeyup = (event: KeyboardEvent) => {
  if (state.isClickCtrl !== event.ctrlKey) {
    state.isClickCtrl = event.ctrlKey;
  }
};

onMounted(() => {
  // 开启键盘监听事件
  document.addEventListener('keydown', watchKeydown);
  document.addEventListener('keyup', watchKeyup);
});

onUnmounted(() => {
  // 取消键盘监听事件
  document.removeEventListener('keydown', watchKeydown);
  document.removeEventListener('keyup', watchKeyup);
});
</script>

<template>
  <div
    class="workspace"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <div
      draggable="true"
      :class="{ block: true, block__hover: !item.focus }"
      v-for="item in list"
      :key="item.id"
      :style="{
        ...item.outerStyle,
        width: `${item.outerStyle.width}px`,
        height: `${item.outerStyle.height}px`,
        left: `${item.outerStyle.left}px`,
        top: `${item.outerStyle.top}px`,
        rotate: `${item.outerStyle.rotate}deg`,
      }"
      @click="changeFocus(item)"
      @mousedown="blockMousedown($event, item)"
      @click.stop
    >
      <!--        @click="changeFocus(item)"      @mousedown="blockMousedown($event, item)" -->
      <RenderBlock :details="item"></RenderBlock>
      <div
        :class="{ 'box-border': true, 'box-border__focus': item.focus }"
        :style="{ opacity: editorStore.isMoving ? 0 : 1 }"
      ></div>
    </div>
    <template
      v-if="editorStore.focusBox.isShow && editorStore.focusBox.pos.length"
    >
      <div
        ref="focusBoxRef"
        :style="{
          left: `${editorStore.focusBox.pos[0]}px`,
          top: `${editorStore.focusBox.pos[1]}px`,
          width: `${editorStore.focusBox.pos[2]}px`,
          height: `${editorStore.focusBox.pos[3]}px`,
          rotate: `${editorStore.focusBox.rotate}deg`,
        }"
        :class="{ 'focus-box': true, 'focus-box-drag': editorStore.isMoving }"
        @mousedown.prevent="mousedown"
        @click="focusBoxClick"
      >
        <!-- 左下角拉伸 -->
        <i
          class="editor-grip editor-grip-sw"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, 'sw')"
          @mousedown.stop
        >
          <b class="spot"></b>
        </i>
        <!-- 左拉伸 -->
        <i
          class="editor-grip editor-grip-w"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, 'w')"
          @mousedown.stop
        >
          <b class="strip"></b>
        </i>
        <!-- 左上角拉伸 -->
        <i
          class="editor-grip editor-grip-nw"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, 'nw')"
          @mousedown.stop
        >
          <b class="spot"></b>
        </i>
        <!-- 右上角拉伸 -->
        <i
          class="editor-grip editor-grip-ne"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, 'ne')"
          @mousedown.stop
        >
          <b class="spot"></b>
        </i>
        <!-- 右拉伸 -->
        <i
          class="editor-grip editor-grip-e"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, 'e')"
          @mousedown.stop
        >
          <b class="strip"></b>
        </i>
        <!-- 右下角拉伸 -->
        <i
          class="editor-grip editor-grip-se"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, 'se')"
          @mousedown.stop
        >
          <b class="spot"></b>
        </i>
        <!-- 上拉伸 -->
        <i
          v-if="editorStore.focusBox.type === 'box'"
          class="editor-grip editor-grip-n"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, 'n')"
          @mousedown.stop
        >
          <b class="horiz"></b>
        </i>
        <!-- 下拉伸 -->
        <i
          v-if="editorStore.focusBox.type === 'box'"
          class="editor-grip editor-grip-s"
          style="padding: 0px"
          @mousedown.prevent="mouseZoom($event, 's')"
          @mousedown.stop
        >
          <b class="horiz"></b>
        </i>
        <!-- 旋转 -->
        <i
          class="editor-rotator editor-transition"
          @mousedown.prevent="mouseRotate($event)"
          @mousedown.stop
          :style="{ transform: `rotate(${-editorStore.focusBox.rotate}deg)` }"
        >
          <!-- <b style="transform: matrix(1, 0, 0, 1, 0, 0)">
            <span style="display: none">0°</span>
          </b> -->
          <img src="@/assets/icon/editor/rotate.svg" class="rotate" />
          <span
            class="rotate-value"
            :style="{ display: editorStore.focusBox.isRotating ? '' : 'none' }"
          >
            {{ editorStore.focusBox.rotate }}°
          </span>
        </i>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.workspace {
  width: 400px;
  height: 772.268px;
  // background-color: rgb(233, 237, 239);
  background-color: rgb(242, 244, 245);
  position: relative;
  .block {
    box-sizing: content-box;
    position: absolute;
    cursor: move;
    pointer-events: auto;
  }
  .block__hover:hover::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: #6ccfff;
    margin: -0.5px 0 0 -0.5px;
  }

  .box-border {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    border-width: 2px;
    border-style: solid;
    border-color: #6ccfff;
    z-index: 3;
    // transform: translate(-0.5px, -0.5px);
    // margin: -1.5px 0 0 -1.5px;
    margin: -1px 0 0 -1px;
  }
  .box-border__focus {
    display: block;
    border-width: 2px;
  }
}

.focus-box {
  // transform: translate(-1px, -1px);
  margin: -1px 0 0 -1px;
  // margin: -1.5px 0 0 -1.5px;
  // transform: translate(-1px, -1px);
  transform: matrix(1, 0, 0, 1, 0, 0);
  opacity: 1;
  // transition: opacity 100ms;
  position: absolute;
  z-index: 5;
  cursor: move;
  border-width: 2px;
  border-style: dotted;
  border-color: #6ccfff;
  .editor-grip {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  .editor-grip-sw {
    top: 100%;
    margin-top: 1px;
    margin-left: -1px;
    cursor: nesw-resize;
  }
  .editor-grip-w {
    cursor: ew-resize;
    top: 50%;
    left: 0;
    margin-left: -1px;
  }
  .editor-grip-nw {
    top: 0;
    left: 0;
    cursor: nwse-resize;
  }
  .editor-grip-n {
    left: 50%;
    margin-top: -1px;
    cursor: ns-resize;
  }
  .editor-grip-ne {
    left: 100%;
    margin-top: -1px;
    margin-left: 1px;
    cursor: nesw-resize;
  }
  .editor-grip-e {
    top: 50%;
    left: 100%;
    margin-left: 1px;
    cursor: ew-resize;
  }
  .editor-grip-se {
    top: 100%;
    left: 100%;
    margin-top: 1px;
    margin-left: 1px;
    cursor: nwse-resize;
  }
  .editor-grip-s {
    left: 50%;
    top: 100%;
    cursor: ns-resize;
  }
  .editor-rotator {
    cursor: url('https://cdn.dancf.com/odyssey-editor/img/ic_mouse_rotation_0.1c6c9df0.svg')
        11 9,
      pointer;
  }
  .editor-transition {
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 4;
    margin: 14px 0 0 -11px;
    // cursor: pointer;
    opacity: 1;
    .rotate {
      width: 20px;
      height: 20px;
      position: relative;
      z-index: 2;
      padding: 4px;
      border-radius: 50%;
      background-color: #ffffff;
      opacity: 1;
    }
    .rotate-value {
      position: absolute;
      top: 40px;
      left: 50%;
      height: 28px;
      padding: 0 8px;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
      color: #fff;
      background: #0e1217;
      border-radius: 4px;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }
  .spot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .strip {
    width: 7px;
    height: 11px;
    border-radius: 30%;
  }
  .horiz {
    width: 14px;
    height: 7px;
    border-radius: 30%;
  }
  b {
    opacity: 1;
    display: block;
    box-sizing: border-box;
    box-shadow: 0 0 2px 0 rgba(86, 90, 98, 0.8);
    background-color: rgb(255, 255, 255);
    // transition: opacity 300ms;
  }
}
.focus-box-drag {
  border-width: 2px;
  border-style: dotted;
  border-color: #6ccfff;
  border: 1px solid rgba(108, 207, 255, 0.3);
  b {
    opacity: 0;
  }
}
</style>
