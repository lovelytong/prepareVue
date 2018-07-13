<template>
  <div>
    <table border="1" class="table" cellpadding="10" cellspacing="0" ref="thisTable">
      <tr v-for="item in items">
        <td v-for="num in item"
            v-on:mousedown="downButton($event)"
            ref="thisCell"
            v-on:mouseup="upButton()"
        >
          {{num}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data[i]=new Array(10)
        for (let j = 0; j < 10; j++){
          data[i][j] = Math.round(Math.random()*(10-1)+1);
        }
      }
      return {
        items:data,
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
        this.startPoint.x = e.target.cellIndex;
        this.startPoint.y = e.path[1].rowIndex;
        let thiscell = e.target;

        //flag作为判断当前的单元格是否被选中从而有背景色
        let flag = thiscell.className === 'blue'
        //给所有的单元格设置监听事件
        for (let cell of this.$refs.thisCell) {
          //如果点击的是左键或者滚轮,或者当前单元格没有被选中过，所有的单元格颜色都清空
          if (e.button == 0 || e.button == 1 || !flag) {
            cell.className = '';
          }
          //给所有的单元格添加监听事件，鼠标划过时，使其选中
          cell.addEventListener("mouseover", this.method)
        }
        //设置当前单元格背景色
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
        //四个变量分别为选中区域的起点坐标与终点坐标
        let startx, starty, endx, endy;

        this.endPoint.x = e.target.cellIndex;
        this.endPoint.y = e.path[1].rowIndex;

        //根据鼠标点击起点单元格坐标和划过的单元格坐标设置添加颜色的矩形框的起止
        startx = Math.min(this.endPoint.x, this.startPoint.x)
        starty = Math.min(this.endPoint.y, this.startPoint.y)
        endx = Math.max(this.endPoint.x, this.startPoint.x)
        endy = Math.max(this.endPoint.y, this.startPoint.y)

        //给矩形框内的单元格添加颜色
        for (let i = startx; i <= endx; i++) {
          for (let j = starty; j <= endy; j++) {
            //根据坐标找到对应单元格的dom
            let num = j * this.items[0].length + i;
            this.$refs.thisCell[num].className = 'blue';
          }
        }
      },


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

</style>
