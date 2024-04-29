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
        '2024425172122966970': {
          id: '2024425172122966970',
          key: 'text',
          dragging: false,
          focus: false,
          outerStyle: {
            left: 50,
            width: 297,
            height: 57.48,
            borderRadius: 0,
            top: 100,
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
      const preFocusBox = [...this.focusBox.pos];
      const scaleVal =
        movementX / (this.focusBox.pos[2] / this.focusBox.pos[3]);
      // [left, top, width, height]
      // 东 east  西 west  南 south  北 north
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
      /**
       *
       * @param target dom 节点
       * @param key
       * 传入 dom 节点根据比例修改节点
       */
      const changeSize = (target: object, key = 'box') => {
        const block = target.outerStyle;
        const prePos = { ...target.outerStyle };
        // 以 focusBox 为基准等比算出 left top width height 的变化
        const newLeft =
          ((prePos.left - preFocusBox[0]) / preFocusBox[2]) *
            this.focusBox.pos[2] +
          this.focusBox.pos[0];
        const newTop =
          ((prePos.top - preFocusBox[1]) / preFocusBox[3]) *
            this.focusBox.pos[3] +
          this.focusBox.pos[1];
        const newWidth = (prePos.width / preFocusBox[2]) * this.focusBox.pos[2];
        const newHeight =
          (prePos.height / preFocusBox[3]) * this.focusBox.pos[3];
        block.width = newWidth;
        block.height = newHeight;
        block.left = newLeft;
        block.top = newTop;
        if (target.key === 'text') {
          const styles = target.textInnerStyle;
          styles.lineHeight = block.height;
          styles.fontSize = (0.8 * block.height).toFixed(1);
        }
      };
      for (let id of this.focusList) {
        changeSize(this.domNodesObj[id]);
      }
    },
    //
    mouseRotate(
      startPoint: { x: number; y: number },
      movingPoint: { x: number; y: number }
    ) {
      const boxCenter = {
        x: this.focusBox.pos[0] + this.focusBox.pos[2] / 2,
        y: this.focusBox.pos[1] + this.focusBox.pos[3] / 2,
      };
      // startPoint = {
      //   x: boxCenter.x,
      //   y: boxCenter.y + 30,
      // };
      let aSquare =
        (startPoint.x - movingPoint.x) ** 2 +
        (startPoint.y - movingPoint.y) ** 2;
      if (aSquare > 0) {
        let bSquare =
          (boxCenter.x - movingPoint.x) ** 2 +
          (boxCenter.y - movingPoint.y) ** 2;
        let cSquare =
          (boxCenter.x - startPoint.x) ** 2 + (boxCenter.y - startPoint.y) ** 2;
        let cosA =
          (bSquare + cSquare - aSquare) /
          (2 * Math.sqrt(bSquare) * Math.sqrt(cSquare));
        let arccosA = (Math.acos(cosA) * 180) / Math.PI;
        let direct =
          (movingPoint.x - boxCenter.x) * (startPoint.y - boxCenter.y) -
          (movingPoint.y - boxCenter.y) * (startPoint.x - boxCenter.x);
        let rotate = arccosA;
        if (direct > 0) {
          rotate = -arccosA;
        }
        let difRotate = rotate - this.focusBox.rotate;
        this.focusBox.rotate = rotate;
        const computeDomMovePro = (block: object, difRotate: number) => {
          const blockCenter = {
            x: block.outerStyle.left + block.outerStyle.width / 2,
            y: block.outerStyle.top + block.outerStyle.height / 2,
          };
          const rotatePoint = (
            x: number,
            y: number,
            Ox: number,
            Oy: number,
            theta: number
          ) => {
            var cos = Math.cos(theta);
            var sin = Math.sin(theta);
            var dx = x - Ox;
            var dy = y - Oy;
            var nx = cos * dx - sin * dy;
            var ny = sin * dx + cos * dy;
            nx += Ox;
            ny += Oy;
            return [nx, ny];
          };
          const [left, top] = rotatePoint(
            blockCenter.x,
            blockCenter.y,
            boxCenter.x,
            boxCenter.y,
            (difRotate / 180) * Math.PI
          );
          block.outerStyle.left = left - block.outerStyle.width / 2;
          block.outerStyle.top = top - block.outerStyle.height / 2;
        };
        for (let id of this.focusList) {
          this.domNodesObj[id].outerStyle.rotate = rotate;
          computeDomMovePro(this.domNodesObj[id], difRotate);
        }
      }
    },
    mouseRotatepro() {},
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
