import { defineStore } from 'pinia';

// defineStore 第一个参数是id，必需且值唯一
export const useEditorStore = defineStore('editor', {
  //state返回一个函数，防止作用域污染
  state: () => {
    return {
      isMoving: false,
      domNodes: [
        {
          id: '2024417172122966970',
          key: 'text',
          dragging: false,
          focus: false,
          outerStyle: {
            left: 10,
            width: 297,
            height: 57.48,
            borderRadius: 0,
            top: 10,
            zIndex: 1,
            rotate: 0,
            opacity: 1,
            backgroundColor: '',
          },
          textInnerStyle: {
            fontFamily: '',
            fontSize: 47.7,
            fontStyle: '',
            fontWeight: 600,
            color: '#000000',
            lineHeight: 57.48,
            text: '双击编辑标题',
            textAlign: 'center',
          },
          ingInnerStyle: {
            alt: '',
            src: '',
          },
        },
      ],
      domNodesObj: {
        '2024417172122966970': {
          id: '2024417172122966970',
          key: 'text',
          dragging: false,
          focus: false,
          outerStyle: {
            left: 10,
            width: 297,
            height: 57.48,
            borderRadius: 0,
            top: 10,
            zIndex: 1,
            rotate: 0,
            opacity: 1,
            backgroundColor: '',
          },
          textInnerStyle: {
            fontFamily: '',
            fontSize: 47.7,
            fontStyle: '',
            fontWeight: 600,
            color: '#000000',
            lineHeight: 57.48,
            text: '双击编辑标题',
            textAlign: 'center',
          },
          ingInnerStyle: {
            alt: '',
            src: '',
          },
        },
        '2024417172122966354': {
          id: '2024417172122966354',
          key: 'text',
          dragging: false,
          focus: false,
          outerStyle: {
            left: 20,
            width: 297,
            height: 57.48,
            borderRadius: 0,
            top: 200,
            zIndex: 1,
            rotate: 0,
            opacity: 1,
            backgroundColor: '',
          },
          textInnerStyle: {
            fontFamily: '',
            fontSize: 47.7,
            fontStyle: '',
            fontWeight: 600,
            color: '#000000',
            lineHeight: 57.48,
            text: '双击编辑标题',
            textAlign: 'center',
          },
          ingInnerStyle: {
            alt: '',
            src: '',
          },
        },
      },
      focusList: [],
      focusBox: {
        isShow: false,
        type: 'text',
        pos: [], //[left, top, width, height]
      },
    };
  },
  getters: {
    getDomNodes: (state) => state.domNodes,
  },
  actions: {
    changeMoveStatue(value: boolean) {
      this.isMoving = value;
    },
    changeDomNodeById(
      id: string,
      key: string,
      value: string | object | boolean
    ) {
      if (id in this.domNodesObj) {
        this.domNodesObj[id][key] = value;
        this.focusList.push(id);
      }
    },
    // 移动 focusBox 节点
    moveDomNode(left: Number, top: Number) {
      for (let id of this.focusList) {
        this.domNodesObj[id].outerStyle.left += left;
        this.domNodesObj[id].outerStyle.top += top;
      }
      this.updateFocusBox();
    },
    // 对 focusList 的操作
    changeFocusStatus(id: string, type: string) {
      if (type == 'add') {
        this.domNodesObj[id].focus = true;
        this.focusList.push(id);
      } else if (type == 'replace') {
        this.focusList.forEach((id) => {
          this.domNodesObj[id].focus = false;
        });
        this.domNodesObj[id].focus = true;
        this.focusList = [id];
      } else if (type == 'remove') {
        this.domNodesObj[id].focus = false;
        this.focusList = this.focusList.filter((itemId) => itemId != id);
      }
      this.updateFocusBox();
    },
    clearFocusList() {
      if (this.focusList.length) {
        this.focusList.forEach((id) => {
          this.domNodesObj[id].focus = false;
        });
        this.focusList.length = 0;
      }
      this.updateFocusBox();
    },

    // 对 focusBox 的操作
    updateFocusBox() {
      if (this.focusList.length < 1) {
        this.focusBox.isShow = false;
      } else {
        if (this.focusList.length == 1) {
          // [left, top, width, height, 'text' : 'box']
          let target = this.domNodesObj[this.focusList[0]];
          this.focusBox.pos = [
            target.outerStyle.left,
            target.outerStyle.top,
            target.outerStyle.width,
            target.outerStyle.height,
          ];
        } else {
          this.focusBox.type = 'box';
          let maxMin = [Infinity, Infinity, 0, 0]; //[minLeft, minTop, maxRight, maxBottom]
          for (let id of this.focusList) {
            let target = this.domNodesObj[id].outerStyle;
            if (this.domNodesObj[id].key == 'text') {
              this.focusBox.type = 'text';
            }
            let points = [
              target.left,
              target.top,
              target.left + target.width,
              target.top + target.height,
            ];
            maxMin[0] = Math.min(maxMin[0], points[0]);
            maxMin[1] = Math.min(maxMin[1], points[1]);
            maxMin[2] = Math.max(maxMin[2], points[2]);
            maxMin[3] = Math.max(maxMin[3], points[3]);
          }
          this.focusBox.pos = [
            maxMin[0],
            maxMin[1],
            maxMin[2] - maxMin[0],
            maxMin[3] - maxMin[1],
          ];
        }
        this.focusBox.isShow = true;
      }
    },
  },
});
