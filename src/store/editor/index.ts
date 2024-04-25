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
        '2024422172122966354': {
          id: '2024422172122966354',
          key: 'img',
          dragging: false,
          focus: false,
          outerStyle: {
            left: 20,
            width: 260,
            height: 113.32,
            borderRadius: 0,
            top: 200,
            zIndex: 1,
            rotate: 0,
            opacity: 1,
            backgroundColor: '',
          },
          imgInnerStyle: {
            alt: '',
            src: 'https://gd-filems.dancf.com/saas/xi19e5/0/5c6e2c57-17cb-4adb-9a25-e00231774dff470.png',
          },
        },
      },
      focusList: [],
      focusBox: {
        isShow: false,
        isRotating: false,
        rotate: 0,
        type: 'text',
        pos: [] as Array<number>, //[left, top, width, height]
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
    moveDomNode(left: number, top: number) {
      for (let id of this.focusList) {
        this.domNodesObj[id].outerStyle.left += left;
        this.domNodesObj[id].outerStyle.top += top;
      }
      this.updateFocusBox();
    },
    // 通过 focus-box 进行缩放
    zoomDomNode(type: string, movementX: number, movementY: number) {
      // 东 east  西 west  南 south  北 north
      const zoomScale = movementX / this.focusBox.pos[2];
      const scaleVal =
        movementX / (this.focusBox.pos[2] / this.focusBox.pos[3]);
      // [left, top, width, height]
      if (type === 'sw') {
        this.focusBox.pos[2] -= movementX;
        this.focusBox.pos[3] -= scaleVal;
        this.focusBox.pos[0] += movementX;
      } else if (type === 'nw') {
        this.focusBox.pos[2] -= movementX;
        this.focusBox.pos[3] -= scaleVal;
        this.focusBox.pos[1] += scaleVal;
        this.focusBox.pos[0] += movementX;
      } else if (type === 'ne') {
        this.focusBox.pos[2] += movementX;
        this.focusBox.pos[3] += scaleVal;
        this.focusBox.pos[1] -= scaleVal;
      } else if (type === 'se') {
        this.focusBox.pos[2] += movementX;
        this.focusBox.pos[3] += scaleVal;
      } else if (type === 'e') {
        this.focusBox.pos[2] += movementX;
      } else if (type === 'w') {
        this.focusBox.pos[2] -= movementX;
        this.focusBox.pos[0] += movementX;
      } else if (type === 'n') {
        this.focusBox.pos[3] -= movementY;
        this.focusBox.pos[1] += movementY;
      } else if (type === 's') {
        this.focusBox.pos[3] += movementY;
      }

      /*       const changeSize = (type: string, target: object, key = 'box') => {
        const block = target.outerStyle;
        let scaleVal = movementX / (block.width / block.height);
        if (type === 'sw') {
          block.width -= movementX;
          block.height -= scaleVal;
          block.left += movementX;
        } else if (type === 'nw') {
          block.width -= movementX;
          block.height -= scaleVal;
          block.top += scaleVal;
          block.left += movementX;
        } else if (type === 'ne') {
          block.width += movementX;
          block.height += scaleVal;
          block.top -= scaleVal;
        } else if (type === 'se') {
          block.width += movementX;
          block.height += scaleVal;
        } else if (type === 'e') {
          block.width += movementX;
        } else if (type === 'w') {
          block.width -= movementX;
          block.left += movementX;
        } else if (type === 'n') {
          block.height -= movementY;
          block.top += movementY;
        } else if (type === 's') {
          block.height += movementY;
        }
        if (target.key === 'text') {
          const styles = target.textInnerStyle;
          styles.lineHeight = block.height;
          styles.fontSize = (0.8 * block.height).toFixed(1);
        }
      };*/
      const changeSize = (type: string, target: object, key = 'box') => {
        const block = target.outerStyle;
        const left = block.width * zoomScale;
        let scaleVal = left / (block.width / block.height);
        if (type === 'sw') {
          block.width -= left;
          block.height -= scaleVal;
          block.left += left;
        } else if (type === 'nw') {
          block.width -= left;
          block.height -= scaleVal;
          block.top += scaleVal;
          block.left += left;
        } else if (type === 'ne') {
          block.width += left;
          block.height += scaleVal;
          block.top -= scaleVal;
        } else if (type === 'se') {
          block.width += left;
          block.height += scaleVal;
        } else if (type === 'e') {
          block.width += left;
        } else if (type === 'w') {
          block.width -= left;
          block.left += left;
        } else if (type === 'n') {
          block.height -= movementY;
          block.top += movementY;
        } else if (type === 's') {
          block.height += movementY;
        }
        if (target.key === 'text') {
          const styles = target.textInnerStyle;
          styles.lineHeight = block.height;
          styles.fontSize = (0.8 * block.height).toFixed(1);
        }
      };
      for (let id of this.focusList) {
        changeSize(type, this.domNodesObj[id]);
      }
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
          this.focusBox.type = target.key == 'img' ? 'box' : 'text';
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
