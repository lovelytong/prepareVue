<template>
  <div>
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    <el-color-picker v-model="color1"></el-color-picker>
    <el-color-picker v-model="color2"></el-color-picker>
    <el-button @click="show=!show" >toggle</el-button>
    <chart :options="polar" v-if="show"></chart>
    <transition name="fade">
      <div v-if="show">hello</div>
    </transition>

  </div>

</template>

<script>
  import {mapActions} from 'vuex'
  // import * as echarts from 'echarts'
  import 'echarts/lib/component/polar'
  import 'echarts/lib/chart/line'
  export default {
    data() {
      let data = []

      for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }
      return {
        show:true,
        radio: '1',
        color1: '#409EFF',
        color2: null,
        polar: {
          title: {
            text: '极坐标双数值轴'
          }
          ,
          legend: {
            data: ['line']
          }
          ,
          polar: {
            center: ['50%', '54%']
          }
          ,
          tooltip: {
            trigger: 'axis',
            axisPointer:
              {
                type: 'cross'
              }
          }
          ,
          angleAxis: {
            type: 'value',
            startAngle:
              0
          }
          ,
          radiusAxis: {
            min: 0
          }
          ,
          series: [
            {
              coordinateSystem: 'polar',
              name: 'line',
              type: 'line',
              showSymbol: false,
              data: data
            }
          ],
          animationDuration:
            2000
        }
      };
    },
    methods:{
      ...mapActions(['login'])
    },
    created() {
      this.login()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
