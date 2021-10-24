//设备列表详情
<template>
  <div class="device_detail">
    <div class="header">
      <breadcrumb :breadcrumbItems="breadList"/>
    </div>
    <div class="title">
      <titleHeader titleName="设备信息" :showImg="false" :showBorder="false"></titleHeader>
      <div class="edit" @click="goEdit">
        <!-- <img class="edit_img" src="" alt=""> -->
        编辑
      </div>
    </div>
    <div class="info_table">
      <div class="table_box" v-for="(item,index) in tableData" :key="index">
        <div class="box_label">{{item.label}}</div>
        <div class="box_value">{{item.value}}</div>
      </div>
    </div>
    <titleHeader titleName="设备最新位置" :showImg="false" :showBorder="false"></titleHeader>
    <div class="detail_map">
      <div class="map_header">
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
        <el-select v-model="form.pinlv">
          <el-option v-for="(item,index) in optionData" :key="index" :label="item" :value="index"></el-option>
        </el-select>
      </div>
      <div id='traMap'></div>
    </div>
    <editPop v-if="editShow" @closePop="closeEdit"/>
  </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb.vue'
import titleHeader from '@/components/titleHeader.vue'
import editPop from '../deviceBox/editPop.vue'
export default {
  components: {
    titleHeader,breadcrumb,editPop
  },
  data() {
    return {
      editShow: false,
      breadList: [
        {
          name: "首页",
          router: "/homePage"
        },
        {
          name: "设备列表",
          router: "/deviceManagement/deviceList"
        },
        {
          name: "1267831293",
        },
      ],
      formInline: {
        date: [],
      },
      form: {
        pinlv: "报点频率",
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
      optionData: ['报点频率','1次/天','2次/天','3次/天','4次/天','5次/天','6次/天','7次/天','8次/天','9次/天','10次/天',],
      // tableData: ['ID','SN','ICCID','名称','客户名称','运单号','是否启用','开始时间','过期时间','设备总报点数','当前运单报点数','禁用时间',],
      tableData: [
        {
          label: 'ID',
          value: '1042'
        },
        {
          label: 'SN',
          value: '1267831293'
        },
        {
          label: 'ICCID',
          value: '89852240500007306663'
        },
        {
          label: '名称',
          value: 'KH210702 皖AG0018 鄂A1B99挂'
        },
        {
          label: '客户名称',
          value: '途骏'
        },
        {
          label: '运单号',
          value: 'X513OE750-EK032650'
        },
        {
          label: '是否启用',
          value: '已启用'
        },
        {
          label: '开始时间',
          value: '2022-01-21 10:09:37'
        },
        {
          label: '过期时间',
          value: '2022-01-23 10:09:37'
        },
        {
          label: '设备总报点数',
          value: '1042'
        },
        {
          label: '当前运单报点数',
          value: '10'
        },
        {
          label: '禁用时间',
          value: '-'
        },
      ],
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
    closeEdit() {
      this.editShow = false;
    },
    goEdit() {
      this.editShow = true;
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
.device_detail{
  .header{
    margin-bottom: 30px;
  }
  .title{
    display: flex;
    justify-content: space-between;
    .edit{
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #12C6C5;
      cursor: pointer;
    }
    .edit_img{
      width: 18px;
      height: 20px;
      margin-right: 10px;
      border: 1px solid red;
    }
  }
  .info_table{
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 30px;
    .table_box{
      width: 25%;
      display: flex;
      font-size: 16px;
      background: #FFFFFF;
      box-shadow: 0px 2px 4px 3px rgba(27, 32, 77, 0.07);
      > div{
        padding: 20px 0 0 20px;
        border-right: 1px solid rgba(151,151,151,.1);
        border-bottom: 1px solid rgba(151,151,151,.1);
      }
    }
    .box_label{
      width: 141px;
      height: 64px;
      background: #F6FBFF;
      color: #666666;
    }
    .box_value{
      flex: 1;
      color: #1A1E32;
    }
  }
  .map_header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-form{
    margin-top: 20px;
  }
  #traMap{
    width: 100%;
    height: 782px;
  }
  /deep/ .el-select{
    width: 206px;
    .el-input__inner{
      font-size: 16px;
      color: #1A1E32;
    }
  }
  //选择框
  .el-select-dropdown{
    .el-select-dropdown__item{
      font-size: 16px;
      color: #151F2E;
    }
    .el-select-dropdown__item.selected{
      font-size: 16px;
      background: #12C6C5;
      border-radius: 4px;
      color: #FFFFFF;
    }
  }
}
</style>