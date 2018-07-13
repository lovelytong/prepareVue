<template>
  <div>
    <table border="1" class="table" cellpadding="10" cellspacing="0" ref="thisTable">
      <tr v-for="(item,fatherindex) in items">
        <td v-for="(num,index) in item"
            v-on:mousedown="downButton($event,index,fatherindex)"
            ref="thisCell"
            v-on:mouseup="upButton()"
            :data-fatherIndex="fatherindex"
            :data-index="index"
        >
          {{fatherindex}}- {{index}}-{{num}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          [12, 3, 4, 55, 6, 32, 45, 5, 5, 5,],
          [12, 3, 4, 55, 6, 32, 45, 5, 5, 5,],
          [12, 3, 4, 55, 6, 32, 45, 5, 5, 5,],
          [12, 3, 4, 55, 6, 32, 45, 5, 5, 5,],
          [12, 3, 4, 55, 6, 32, 45, 5, 5, 5,],
          [12, 3, 4, 55, 6, 32, 45, 5, 5, 5,],
        ],
        startPoint: {
          x: null,
          y: null
        },
        endPoint: {
          x: null,
          y: null
        },
      }
    },
    mounted() {
      //点击非表格区域时，选中表格的背景色清空
      let _this = this;
      document.addEventListener("mousedown", function (e) {
        if (e.target.nodeName !== 'TD') {
          for (let cell of _this.$refs.thisCell) {
            cell.className = '';
          }
        }
      })
    }
    ,
    methods: {
      //按下表格单元格时
      downButton(e, index, fatherindex) {
        this.startPoint.x = index;
        this.startPoint.y = fatherindex;
        let thiscell = e.target;
        let flag = thiscell.className === 'blue'
        for (let cell of this.$refs.thisCell) {
          if (e.button == 0 || e.button == 1) {
            cell.className = '';
          } else if(!flag){
            cell.className = '';
          }
          cell.addEventListener("mouseover", this.method)
        }
        thiscell.className = 'blue';
      },

      //鼠标按键抬起时，所有单元格监听mouseover事件消失
      upButton() {
        for (let cell of this.$refs.thisCell) {
          cell.removeEventListener("mouseover", this.method)
          // cell.classList.remove("cell");
        }
      },

      //给选中区域添加背景色
      method(e) {
        let startx, starty, endx, endy;
        this.endPoint.x = Number(e.target.getAttribute('data-index'));
        this.endPoint.y = Number(e.target.getAttribute('data-fatherIndex'));
        startx = this.findMin(this.endPoint.x, this.startPoint.x)
        starty = this.findMin(this.endPoint.y, this.startPoint.y)
        endx = this.findMax(this.endPoint.x, this.startPoint.x)
        endy = this.findMax(this.endPoint.y, this.startPoint.y)

        for (let i = startx; i <= endx; i++) {
          for (let j = starty; j <= endy; j++) {
            let num = j * this.items[0].length + i
            this.$refs.thisCell[num].className = 'blue';
          }
        }
      },

      // 取最大最小值
      findMin(x, y) {
        return x < y ? x : y;
      },
      findMax(x, y) {
        return x > y ? x : y;
      }

    }

  }
</script>

<style scoped>
  .table {
    margin: 0 auto;
    user-select: none;
  }

  .blue {
    background-color: #8cc5ff;
  }

  .cell:hover {
    background-color: #8cc5ff;
  }


</style>
