<template>
  <div class="trajectory">
    <div class="trajectory_center">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="日期选择" prop="date">
          <el-date-picker
            v-model="formInline.date"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>导出</el-button>
        </el-form-item>
      </el-form>
      <div id='traMap'></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      traMap: '',
      formInline: {
        date: [],
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  mounted() {
    let timer = setInterval(() => {
      if(Microsoft){
        this.loadMapScenario();
        clearInterval(timer)
      }
    },1000)
  },
  methods: {
    loadMapScenario() {
      this.traMap = new Microsoft.Maps.Map(document.getElementById('traMap'), {
      center: new Microsoft.Maps.Location(39.918794, 116.398568)
      });
      var center = this.traMap.getCenter();
      var polyline = new Microsoft.Maps.Polyline([new Microsoft.Maps.Location(center.latitude + 0.02, center.longitude - 0.08),
        new Microsoft.Maps.Location(center.latitude, center.longitude-1.08),
        new Microsoft.Maps.Location(center.latitude-0.05, center.longitude-2.08),
        new Microsoft.Maps.Location(center.latitude+1.02, center.longitude-3.08),
        new Microsoft.Maps.Location(center.latitude+0.08, center.longitude-4.18)], {
          strokeColor: '#00B6A2',
          strokeThickness: 3
        });
      this.traMap.entities.push(polyline);
      //Load the Spatial Math module.
      Microsoft.Maps.loadModule("Microsoft.Maps.SpatialMath", function () {
        var locs = polyline.getLocations();

        //Calculate the midpoint of the polyline.
        var length = Microsoft.Maps.SpatialMath.getLengthOfPath(locs);
        var midPoint = Microsoft.Maps.SpatialMath.getLocationAlongPath(locs, length / 2);

        //Add a pushpin at the midpoint of the polyline that has our label and hide the icon.
        var pin = new Microsoft.Maps.Pushpin(midPoint, {
            title: '折线',
            icon: '' //Make the pushpin transparent
        });
        this.traMap.entities.push(pin);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.trajectory{
  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 54px 197px;
  background: rgba(0,0,0,.4);
  overflow-y: auto;
  .trajectory_center{
    width: 100%;
    min-height: 100%;
    padding: 30px;
    background: #FFFFFF;
    box-shadow: 0px 5px 12px 3px rgba(23, 68, 146, 0.15);
    border-radius: 4px;
    #traMap{
      width: 100%;
      height: 782px;
    }
  }
}
</style>