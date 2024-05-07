import { defineStore } from 'pinia';
import { RotateMatrix } from '@/utils/math';
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
            width: 127,
            height: 24.579,
            borderRadius: 0,
            top: 10,
            zIndex: 1,
            rotate: 0,
            opacity: 1,
            backgroundColor: '',
          },
          textInnerStyle: {
            fontFamily: '',
            fontSize: 19.7,
            lineHeight: 24.579,
            fontStyle: '',
            fontWeight: 600,
            color: '#000000',
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
            width: 127,
            height: 24.579,
            borderRadius: 0,
            top: 10,
            zIndex: 1,
            rotate: 0,
            opacity: 1,
            backgroundColor: '',
            transform: [0, 0],
          },
          textInnerStyle: {
            fontFamily: '',
            fontSize: 19.7,
            lineHeight: 24.579,
            fontStyle: '',
            fontWeight: 600,
            color: '#000000',
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
            width: 127,
            height: 24.579,
            borderRadius: 0,
            top: 200,
            zIndex: 1,
            rotate: 0,
            opacity: 1,
            backgroundColor: '',
            transform: [0, 0],
          },
          textInnerStyle: {
            fontFamily: '',
            fontSize: 19.7,
            lineHeight: 24.579,
            fontStyle: '',
            fontWeight: 600,
            color: '#000000',
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
            transform: [0, 0],
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
            transform: [0, 0],
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
      snaplines: [],
    };
  },
  getters: {
    getDomNodes: (state) => state.domNodes,
  },
  actions: {
    changeMoveState(value: boolean) {
      if (this.isMoving === value) return;
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
      const [difLeft, difTop] = this.getSnaplines();
      console.log(difLeft, difTop);
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
    changeRotateState(value: boolean) {
      this.focusBox.isRotating = value;
    },
    // dom 节点跟随鼠标旋转
    mouseRotate(
      startPoint: { x: number; y: number },
      movingPoint: { x: number; y: number },
      preRotate: number
    ) {
      const boxCenter = {
        x: this.focusBox.pos[0] + this.focusBox.pos[2] / 2,
        y: this.focusBox.pos[1] + this.focusBox.pos[3] / 2,
      };
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
        let arccosA = Math.round((Math.acos(cosA) * 180) / Math.PI);
        let direct =
          (movingPoint.x - boxCenter.x) * (startPoint.y - boxCenter.y) -
          (movingPoint.y - boxCenter.y) * (startPoint.x - boxCenter.x);

        let rotate = arccosA;
        if (direct > 0) {
          rotate = -arccosA;
        }
        preRotate += rotate;
        let difRotate = preRotate - this.focusBox.rotate;
        this.focusBox.rotate = preRotate;
        const computeDomMovePro = (block: object, difRotate: number) => {
          const blockCenter = {
            x: block.outerStyle.left + block.outerStyle.width / 2,
            y: block.outerStyle.top + block.outerStyle.height / 2,
          };

          const [left, top] = RotateMatrix(
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
          this.domNodesObj[id].outerStyle.rotate += difRotate;
          computeDomMovePro(this.domNodesObj[id], difRotate);
        }
      }
    },
    // 鼠标滑动框选
    rangeSelect(
      box: { left: number; top: number; width: number; height: number },
      offect: { x: number; y: number }
    ) {
      // [left, right, top, bottom]
      this.clearFocusList();
      const boxSize = [
        box.left,
        box.left + box.width,
        box.top,
        box.top + box.height,
      ];
      Object.keys(this.domNodesObj).forEach((id) => {
        const target = this.domNodesObj[id].outerStyle;
        // [x, y]
        const blockCenter = [
          offect.x + target.left + target.width / 2,
          offect.y + target.top + target.height / 2,
        ];
        if (
          boxSize[0] <= blockCenter[0] &&
          boxSize[1] >= blockCenter[0] &&
          boxSize[2] <= blockCenter[1] &&
          boxSize[3] >= blockCenter[1]
        ) {
          this.changeFocusStatus(id, 'add', false);
        }
      });
    },
    // 对 focusList 的操作
    changeFocusStatus(id: string, type: string, isUpdateFocusBox = true) {
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
      if (isUpdateFocusBox) {
        this.updateFocusBox();
      }
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
        this.focusBox.rotate = 0;
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
          this.focusBox.rotate = target.outerStyle.rotate;
          this.focusBox.type = target.key == 'img' ? 'box' : 'text';
        } else {
          this.focusBox.type = 'box';
          this.focusBox.rotate = 0;
          let maxMin = [Infinity, Infinity, 0, 0]; //[minLeft, minTop, maxRight, maxBottom]
          for (let id of this.focusList) {
            let target = this.domNodesObj[id].outerStyle;
            if (this.domNodesObj[id].key == 'text') {
              this.focusBox.type = 'text';
            }
            const blockCenter = {
              x: target.left + target.width / 2,
              y: target.top + target.height / 2,
            };
            let points = [
              target.left,
              target.top,
              target.left + target.width,
              target.top + target.height,
            ];
            if (target.rotate !== 0) {
              const Rotate = (target.rotate / 180) * Math.PI;
              const [x1, y1] = RotateMatrix(
                target.left,
                target.top,
                blockCenter.x,
                blockCenter.y,
                Rotate
              );
              const [x2, y2] = RotateMatrix(
                target.left,
                target.top + target.height,
                blockCenter.x,
                blockCenter.y,
                (target.rotate / 180) * Math.PI
              );
              const [x3, y3] = RotateMatrix(
                target.left + target.width,
                target.top + target.height,
                blockCenter.x,
                blockCenter.y,
                (target.rotate / 180) * Math.PI
              );
              const [x4, y4] = RotateMatrix(
                target.left + target.width,
                target.top,
                blockCenter.x,
                blockCenter.y,
                (target.rotate / 180) * Math.PI
              );
              if (0 > target.rotate && target.rotate >= -90) {
                points = [x1, y4, x3, y2];
              } else if (-90 > target.rotate && target.rotate >= -180) {
                points = [x4, y3, x2, y1];
              } else if (0 < target.rotate && target.rotate <= 90) {
                points = [x2, y1, x4, y3];
              } else {
                points = [x3, y2, x1, y4];
              }
            }
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
    // 获取渐进辅助线
    getSnaplines() {
      const snaplines = {
        left: {
          min: Infinity,
          dif: 0,
          values: [] as Array<Array<number | string>>,
        },
        top: {
          min: Infinity,
          dif: 0,
          values: [] as Array<Array<number | string>>,
        },
      };
      const focusPos = this.focusBox.pos;
      const boxPos = [
        focusPos[0],
        focusPos[0] + focusPos[2] / 2,
        focusPos[0] + focusPos[2],
        focusPos[1],
        focusPos[1] + focusPos[3] / 2,
        focusPos[1] + focusPos[3],
      ];
      Object.keys(this.domNodesObj).forEach((id) => {
        if (!this.focusList.includes(id)) {
          const target = this.domNodesObj[id].outerStyle;
          const pos = [
            target.left,
            target.left + target.width / 2,
            target.left + target.width,
            target.top,
            target.top + target.height / 2,
            target.top + target.height,
          ];
          const compare = (
            target: number,
            pos: [number, number, number],
            threshold = 5
          ) => {
            let min = Infinity;
            let result = [false, 0, 0] as [boolean, number, number];
            for (let i of pos) {
              let dif = Math.abs(i - target);
              if (dif < threshold && dif <= min) {
                result[0] = true;
                if (dif < min) {
                  min = dif;
                  result[1] = i - target;
                  result[2] = dif;
                }
              }
            }
            return result;
          };

          for (let i = 0; i < 3; i++) {
            const res = compare(boxPos[i], [pos[0], pos[1], pos[2]]);
            if (res[0] && res[2] <= snaplines.left.min) {
              let line = [
                pos[0],
                Math.min(pos[3], boxPos[3]),
                Math.max(
                  pos[3] < boxPos[3] ? boxPos[5] - pos[3] : pos[5] - boxPos[3],
                  boxPos[5] - boxPos[3],
                  pos[5] - pos[3]
                ),
                'y',
              ]; // [left, top, length, type]
              if (res[2] < snaplines.left.min) {
                snaplines.left.min = res[2];
                snaplines.left.dif = res[1];
                snaplines.left.values = [line];
              } else {
                snaplines.left.values.push(line);
              }
            }
          }
          for (let i = 3; i < 6; i++) {
            const res = compare(boxPos[i], [pos[3], pos[4], pos[5]]);
            if (res[0] && res[2] <= snaplines.top.min) {
              let line = [
                pos[0],
                Math.min(pos[3], boxPos[3]),
                Math.max(
                  pos[0] < boxPos[0] ? boxPos[2] - pos[0] : pos[2] - boxPos[0],
                  boxPos[2] - boxPos[0],
                  pos[2] - pos[0]
                ),
                'x',
              ]; // [left, top, length, type]
              if (res[2] < snaplines.top.min) {
                snaplines.top.min = res[2];
                snaplines.top.dif = res[1];
                snaplines.top.values = [line];
              } else {
                snaplines.top.values.push(line);
              }
            }
          }
        }
      });
      let list = [];
      if (snaplines.left.values.length > 0) {
        for (let val of snaplines.left.values) {
          val[1] = Math.min(val[1] as number, boxPos[3] + snaplines.top.dif);
          val[2] += snaplines.top.dif;
          list.push(val);
        }
      }
      if (snaplines.top.values.length > 0) {
        for (let val of snaplines.top.values) {
          val[0] = Math.min(val[0] as number, boxPos[0] + snaplines.left.dif);
          val[2] += snaplines.left.dif;
          list.push(val);
        }
      }
      this.snaplines = [...list];
      return [snaplines.left.dif, snaplines.top.dif];
    },
  },
});
