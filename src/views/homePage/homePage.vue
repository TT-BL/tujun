// 首页
<template>
  <div class="homePage">
    <div class="header_statistics">
      <div class="statistics_box">
        <img class="left_img" src="@/assets/img/home/shebei.png" alt="">
        <div class="box_right">
          <div class="right_value">0</div>
          <div class="right_text">{{$t('home.shebei')}}</div>
        </div>
      </div>
      <div class="statistics_box statistics_box1">
        <img class="left_img" src="@/assets/img/home/yichang.png" alt="">
        <div class="box_right">
          <div class="right_value">0</div>
          <div class="right_text">{{$t('home.warning')}}</div>
        </div>
      </div>
      <div class="statistics_box statistics_box2">
        <img class="left_img" src="@/assets/img/home/zaitu.png" alt="">
        <div class="box_right">
          <div class="right_value">0</div>
          <div class="right_text">{{$t('home.zaitu')}}</div>
        </div>
      </div>
      <div class="statistics_box statistics_box3">
        <img class="left_img" src="@/assets/img/home/jinyong.png" alt="">
        <div class="box_right">
          <div class="right_value">0</div>
          <div class="right_text">{{$t('home.jinyong')}}</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <div class="title_left"></div>
        <div class="title_text">{{$t('home.secondTitle')}}</div>
      </div>
      <div id='myMap'></div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      title: 1111,
      map: '',
      infobox: '',
      locations: [
        {
          log: 116.398568,
          lat: 39.918794,
          title: 'NO·5673177318568',
        },
        {
          log: 116.397228,
          lat: 39.909604,
          title: 'NO·5673177318561',
        },
      ],
      tooltip: '',
      closeImg: require('../../assets/img/home/close.png'),
      shebeiImg: require('../../assets/img/home/shebei@2x.png'),
      dianliangImg: require('../../assets/img/home/dianliang@2x.png'),
    }
  },
  // created() {
  //   this.carouselData = this.$t('login.carouselData');
  //   this.loadAccountInfo();
  // },
  mounted() {
    let timer = setInterval(() => {
      // if(Microsoft){
        this.loadMapScenario();
        clearInterval(timer)
      // }
    },1000)
  },
  methods: {
    loadMapScenario() {
      this.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        /* No need to set credentials if already passed in URL */
        center: new Microsoft.Maps.Location(39.918794, 116.398568),
        // zoom: 3
      });
      this.tooltip = new Microsoft.Maps.Infobox(this.map.getCenter(), {
        visible: false,
        showPointer: false,
        showCloseButton: true,
        offset: new Microsoft.Maps.Point(-75, 10)
      });
      this.tooltip.setMap(this.map);
      // this.infobox = new Microsoft.Maps.Infobox(this.map.getCenter(), { visible: false });
      // this.infobox.setMap(this.map);
      let pushpins = this.createdMarker();
      let clusterLayer = '';
      Microsoft.Maps.loadModule('Microsoft.Maps.Clustering', () => {
        clusterLayer = new Microsoft.Maps.ClusterLayer(pushpins, {
          clusteredPinCallback: this.createCustomClusteredPin,
          gridSize: 50
        });
        this.map.layers.insert(clusterLayer);
        Microsoft.Maps.Events.addHandler(clusterLayer, 'mouseover', this.clusterHover);
        Microsoft.Maps.Events.addHandler(clusterLayer, 'mouseout', this.clusterOut);
      });
    },
    //鼠标hover
    clusterHover(e){
      if(e.target.containedPushpins && e.target.containedPushpins.length >=2){
        let tooltipTemplate = `<div class='tooltip_container'>`
        for(let i = 0;i<e.target.containedPushpins.length;i++){
          tooltipTemplate += `<div class='tooltip_box'>${e.target.containedPushpins[i].entity.title}</div>`;
        }
        tooltipTemplate += `</div>`;
        this.tooltip.setOptions({
          location: new Microsoft.Maps.Location(e.location.latitude, e.location.longitude),
          htmlContent: tooltipTemplate,
          visible: true
        });
        this.$nextTick(() => {
          let tooltioBoxDom = document.querySelectorAll('.tooltip_box');
          for(let i = 0;i<tooltioBoxDom.length;i++){
            tooltioBoxDom[i].addEventListener('click',()=>{
              this.pushpinClicked(e.target.containedPushpins[i],1)
            })
          }
        })
      }
    },
    // 鼠标离开
    clusterOut() {
      this.tooltip.setOptions({
        visible: false
      });
    },
    //聚到图标
    createCustomClusteredPin(cluster){
      cluster.setOptions({
        icon: require('../../assets/img/home/location@2x.png'),
        // anchor: new Microsoft.Maps.Point(radius, radius),
        textOffset: new Microsoft.Maps.Point(0, 8) //Subtract 8 to compensate for height of text.
      });
    },
    //点击点
    pushpinClicked(e,type) {
      //Show an infobox when a pushpin is clicked.
      if(type == 1){
        this.showInfobox(e);
      }else{
        this.showInfobox(e.target);
      }
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
        <div class="infobox_bottom">\
          <div class="edit_btn">{editBtn}</div>\
          <div class="trajectory_btn edit_btn">{guijiBtn}</div>\
        </div>\
      </div>';
      let shebeImg = '<img class="shebei_img" src="https://i.loli.net/2021/10/17/Nfb1dg8H7ZOosCi.png" alt="">'
      let dianliang = `<img class="dianliang_img" src="${this.dianliangImg}" alt="">`
      let closeImg = `<img class="close_img" src="https://i.loli.net/2021/10/17/sGVk38N9eLgQacf.png">`
      // let closeImg = `<a class="close_img" href="javascript:${that.closeInfobox(11)}" class="customInfoboxCloseButton">X</a>`
      let infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(pin.geometry.y, pin.geometry.x), {
        htmlContent: infoboxTemplate.replace('{firstLabel}',this.$t('home.firstLable')).replace('{secondLabel}',this.$t('home.secondLabel')).replace('{threeLabel}',this.$t('home.threeLabel'))
        .replace('{address}',this.$t('home.address')).replace('{sudu}',this.$t('home.sudu')).replace('{shidu}',this.$t('home.shidu'))
        .replace('{qiya}',this.$t('home.qiya')).replace('{dianliang}',this.$t('home.dianliang')).replace('{jia}',this.$t('home.jiasudu'))
        .replace('{wendu}',this.$t('home.wendu')).replace('{guangzhao}',this.$t('home.guangzhao')).replace('{dingwei}',this.$t('home.dingwei'))
        .replace('{editBtn}',this.$t('home.editBtn')).replace('{guijiBtn}',this.$t('home.guijiBtn'))
        .replace(/{title}/g,pin.entity.title).replace(/{shebei}/g,shebeImg).replace(/{closeImg}/g,closeImg).replace(/{dianliang}/g,dianliang)
      });
      infobox.setMap(this.map);
      infobox.setOptions({
        showCloseButton: true,
        visible: true,
        offset: new Microsoft.Maps.Point(-259, 50)
      });
      this.$nextTick(() => {
        //关闭事件
        let closeImgDom = document.querySelectorAll('.close_img')
        console.log(closeImgDom);
        for(let i = 0;i<closeImgDom.length;i++){
          closeImgDom[i].addEventListener('click',(e)=>{
            console.log(e)
            infobox.setOptions({
              visible: false,
            });
          })
        }
      })
    },
    //获取点
    createdMarker() {
      let pushpins = [];
      for(let i = 0;i< this.locations.length;i++){
        let location = new Microsoft.Maps.Location(this.locations[i].lat, this.locations[i].log);
        var pin = new Microsoft.Maps.Pushpin(location, {
          title: this.locations[i].title, // 图钉的标题
          icon: require('../../assets/img/home/location1@2x.png'),
          enableHoverStyle: true
        });
        Microsoft.Maps.Events.addHandler(pin, 'click', this.pushpinClicked);
        pushpins.push(pin);
      }
      return pushpins;
    }
  },
}
</script>
// 地图样式
<style>
  .infoboxText{
    width: 518px;
    height: 394px;
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
  .infobox_bottom{
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(151,151,151,.2);
  }
  .edit_btn{
    width: 116px;
    height: 40px;
    background: #12C6C5;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
  .trajectory_btn{
    margin-left: 96px;
  }
  .dianliang_img{
    width: 20px;
    height: 13px;
    margin-right: 6px;
  }
  /* 鼠标hover样式 */
  .tooltip_container{
    /* width: 150px; */
    padding: 8px 10px;
    background: #FFEDC4;
    border-radius: 4px;
  }
  .tooltip_box{
    /* width: 130px; */
    /* height: 20px; */
    padding: 9px 0 10px;
    border-bottom: 1px solid rgba(151,151,151,.4);
    font-size: 12px;
    color: #1A1E32;
    line-height: 20px;
  }
  .tooltip_box:last-child{
    padding-bottom: 0;
    border-bottom: none;
  }
</style>
<style lang="scss" scoped>
  .header_statistics{
    display: flex;
    justify-content: space-between;
  }
  .statistics_box{
    width: 380px;
    height: 126px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    // margin: 0 63px 30px 0;
    padding-left: 60px;
    background: url('../../assets/img/home/shebei_bg.png') no-repeat;
    background-size: 100% 100%;
    &:last-child{
      margin-right: 0;
    }
    .left_img{
      width: 60px;
      height: 60px;
      margin-right: 40px;
    }
    .box_right{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .right_value{
      margin-bottom: 8px;
      font-size: 28px;
      color: #1A1E32;
      line-height: 36px;
    }
    .right_text{
      font-size: 16px;
      color: #666666;
      line-height: 22px;
    }
  }
  .statistics_box1{
    background: url('../../assets/img/home/yichang_bg.png') no-repeat;
    background-size: 100% 100%;
  }
  .statistics_box2{
    background: url('../../assets/img/home/zaitu_bg.png') no-repeat;
    background-size: 100% 100%;
  }
  .statistics_box3{
    background: url('../../assets/img/home/jinyong_bg.png') no-repeat;
    background-size: 100% 100%;
  }
  .title{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 18px;
    color: #1A1E32;
    line-height: 25px;
    font-weight: 600;
    .title_left{
      width: 6px;
      height: 20px;
      margin-right: 10px;
      background: #22C7E0;
    }
  }
  #myMap{
    width: 100%;
    height: 769px;
  }
  
  
</style>