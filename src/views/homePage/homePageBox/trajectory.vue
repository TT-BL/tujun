<template>
  <div class="trajectory">
    <div class="trajectory_center">
			<titleHeader titleName="轨迹" @close="closePop"></titleHeader>
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
import titleHeader from '@/components/titleHeader.vue'
export default {
  components: {
    titleHeader,
  },
  data() {
    return {
      traMap: '',
      formInline: {
        date: [],
      },
      locations: [
        {
          log: 116.398568,
          lat: 39.918794,
          title: 'DATE:2021-01-12',
        },
        {
          log: 115.317228,
          lat: 39.909604,
          title: 'DATE:2021-01-13',
        },
        {
          log: 114.317228,
          lat: 39.859604,
          title: 'DATE:2021-01-14',
        },
        {
          log: 113.090228,
          lat: 40.909604,
          title: 'DATE:2021-01-15',
          type: 1,
        },
        {
          log: 112.000000,
          lat: 43.998794,
          title: 'DATE:2021-01-16',
        },
      ],
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
        this.init();
        clearInterval(timer)
      }
    },1000)
  },
  methods: {
    closePop() {
      this.$emit('closePop')
    },
    init(){
      this.traMap = new Microsoft.Maps.Map(document.getElementById('traMap'), {
        center: new Microsoft.Maps.Location(39.918794, 116.398568)
      });
      this.loadMapScenario();
      this.createdMarker();
    },
    //线路
    loadMapScenario() {
      let locations = [];
      let index = this.locations.findIndex(value => value.type == 1);
      if(index == -1) {
        index = this.locations.length - 1;
      }else{
        let grey_locations = [];
        for(let i = index;i< this.locations.length;i++){
          grey_locations.push(new Microsoft.Maps.Location(this.locations[i].lat,this.locations[i].log))
        }
        let polyline = new Microsoft.Maps.Polyline(grey_locations, {
          strokeColor: '#999',
          strokeThickness: 3,
          strokeDashArray: [1, 2]
        });
        this.traMap.entities.push(polyline);
      }
      for(let i = 0;i<= index;i++){
        locations.push(new Microsoft.Maps.Location(this.locations[i].lat,this.locations[i].log))
      }
      let polyline = new Microsoft.Maps.Polyline(locations, {
        strokeColor: '#00B6A2',
        strokeThickness: 3
      });
      this.traMap.entities.push(polyline);
    },
    //点标记
    createdMarker() {
      for(let i = 0;i< this.locations.length;i++){
        let location = new Microsoft.Maps.Location(this.locations[i].lat, this.locations[i].log);
        let pin = '';
        if(i == 0){
          pin = new Microsoft.Maps.Pushpin(location, {
            title: this.locations[i].title, // 图钉的标题
            icon: require('@/assets/img/home/start_location.png'),
            enableHoverStyle: true
          });
        }else if(i == this.locations.length - 1){
          pin = new Microsoft.Maps.Pushpin(location, {
            title: this.locations[i].title, // 图钉的标题
            icon: require('@/assets/img/home/end_location.png'),
            enableHoverStyle: true
          });
        }else if(this.locations[i].type == 1){
          pin = new Microsoft.Maps.Pushpin(location, {
            anchor: new Microsoft.Maps.Point(5,7),
            title: this.locations[i].title, // 图钉的标题
            icon: require('@/assets/img/home/now_location.png'),
            enableHoverStyle: true
          });
        }else{
          pin = new Microsoft.Maps.Pushpin(location, {
            anchor: new Microsoft.Maps.Point(0,7),
            title: this.locations[i].title, // 图钉的标题
            icon: require('@/assets/img/home/location.png'),
            enableHoverStyle: true
          });
        }
        Microsoft.Maps.Events.addHandler(pin, 'click', this.pushpinClicked);
        this.traMap.entities.push(pin);
      }
    },
    //点击点
    pushpinClicked(e) {
      console.log(e)
      this.showInfobox(e.target);
    },
    showInfobox(pin) {
      let infoboxTemplate = 
      '<div class="infoboxText">\
        <div class="infobox_header">\
          <div class="header_left">\
            {shebei}{title}\
          </div>\
          {closeImg}\
        </div>\
        <div class="infobox_center">\
          <div class="center_item">\
            <div class="item_label">{firstLabel}</div>\
            <div class="item_value">{title}</div>\
          </div>\
          <div class="center_item">\
            <div class="item_label">{secondLabel}</div>\
            <div class="item_value">KH210609"AE7063湘A037挂</div>\
          </div>\
          <div class="center_item">\
            <div class="item_label">{threeLabel}</div>\
            <div class="item_value">2021-07-2621:31:32</div>\
          </div>\
          <div class="center_item">\
            <div class="item_label">{address}</div>\
            <div class="item_value">俄罗斯莫斯科州</div>\
          </div>\
          <div class="center_box">\
            <div class="center_left">\
              <div class="center_item">\
                <div class="item_label">{sudu}</div>\
                <div class="item_value">0.00</div>\
              </div>\
              <div class="center_item">\
                <div class="item_label">{shidu}</div>\
                <div class="item_value">0</div>\
              </div>\
              <div class="center_item">\
                <div class="item_label">{qiya}</div>\
                <div class="item_value">951</div>\
              </div>\
              <div class="center_item">\
                <div class="item_label">{dianliang}</div>\
                <div class="item_value">{dianliang}48%</div>\
              </div>\
            </div>\
            <div class="center_right">\
              <div class="center_item">\
                <div class="item_label">{jia}</div>\
                <div class="item_value">0.30</div>\
              </div>\
              <div class="center_item">\
                <div class="item_label">{wendu}</div>\
                <div class="item_value">0</div>\
              </div>\
              <div class="center_item">\
                <div class="item_label">{guangzhao}</div>\
                <div class="item_value">0</div>\
              </div>\
              <div class="center_item">\
                <div class="item_label">{dingwei}</div>\
                <div class="item_value">基站定位</div>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>';
      let shebeImg = '<img class="shebei_img" src="https://i.loli.net/2021/10/17/Nfb1dg8H7ZOosCi.png" alt="">'
      let dianliang = `<img class="dianliang_img" src="${this.dianliangImg}" alt="">`
      let closeImg = `<img class="close_img" src="https://i.loli.net/2021/10/17/sGVk38N9eLgQacf.png">`
      let infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(pin.geometry.y, pin.geometry.x), {
        htmlContent: infoboxTemplate.replace('{firstLabel}',this.$t('home.firstLable')).replace('{secondLabel}',this.$t('home.secondLabel')).replace('{threeLabel}',this.$t('home.threeLabel'))
        .replace('{address}',this.$t('home.address')).replace('{sudu}',this.$t('home.sudu')).replace('{shidu}',this.$t('home.shidu'))
        .replace('{qiya}',this.$t('home.qiya')).replace('{dianliang}',this.$t('home.dianliang')).replace('{jia}',this.$t('home.jiasudu'))
        .replace('{wendu}',this.$t('home.wendu')).replace('{guangzhao}',this.$t('home.guangzhao')).replace('{dingwei}',this.$t('home.dingwei'))
        .replace(/{title}/g,123).replace(/{shebei}/g,shebeImg).replace(/{closeImg}/g,closeImg).replace(/{dianliang}/g,dianliang)
      });
      infobox.setMap(this.traMap);
      infobox.setOptions({
        showCloseButton: true,
        visible: true,
        offset: new Microsoft.Maps.Point(-259, 50)
      });
      this.$nextTick(() => {
        //关闭事件
        let closeImgDom = document.querySelectorAll('.close_img');
        console.log(closeImgDom);
        for(let i = 0;i<closeImgDom.length;i++){
          closeImgDom[i].addEventListener('click',(e)=>{
            infobox.setOptions({
              visible: false,
            });
          })
        }
      })
    },
  }
}
</script>
// 地图样式
<style>
  .infoboxText{
    width: 518px;
    height: 317px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    /* border: 1px solid #F2F2F2; */
  }
  .infobox_header{
    width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: rgba(18,198,197,.6);
    border-radius: 4px 4px 0px 0px;
    font-size: 18px;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 46px;
  }
  .header_left{
    display: flex;
    align-items: center;
  }
  .shebei_img{
    width: 21px;
    height: 21px;
    margin-right: 10px;
  }
  .close_img{
    width: 10px;
    height: 10px;
    cursor: pointer;
  }
  .infobox_center{
    padding: 20px;
    padding-bottom: 10px;
  }
  .center_box{
    display: flex;
  }
  .center_left{
    width: 48%;
  }
  .center_right{
    width: 53%;
  }
  .center_item{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #1A1E32;
  }
  .infobox_center .center_item{
    width: 100%;
  }
  .infobox_center .center_item .item_label{
    width: 48%;
    color: #666666;
  }
  .infobox_center .center_left .item_label{
    margin-right: 20px;
  }
  .infobox_center .center_right .item_label{
    margin-right: 20px;
  }
  .infobox_center .item_value{
    font-weight: 600;
  }
  .dianliang_img{
    width: 20px;
    height: 13px;
    margin-right: 6px;
  }
</style>
<style lang="scss" scoped>
@import '@/assets/css/form_inline.scss';
.trajectory{
  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 54px 197px;
  background: rgba(0,0,0,.4);
  overflow-y: auto;
  z-index: 999;
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
    .el-form{
      margin-top: 30px;
    }
  }
}
</style>