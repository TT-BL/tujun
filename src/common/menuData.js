export const menuData = {
  list: [
    {
      name: '首页',
      icon: 'home@2x.png',
      icon_active: 'home_active@2x.png',
      router: '/homePage',
      children: []
    },
    {
      name: '设备管理',
      icon: 'shebei@2x.png',
      icon_active: 'shebei_active@2x.png',
      router: '/deviceManagement',
      children: [
        {
          name: '设备列表',
          router: '/deviceManagement/deviceList',
        },
        {
          name: '设备上报记录',
          router: '/deviceManagement/devideRecord',
        },
      ]
    },
    {
      name: '账号管理',
      icon: 'zhanghao@2x.png',
      icon_active: 'zhanghao_active@2x.png',
      router: '/accountManagement',
      children: [],
    },
    {
      name: '微信管理',
      icon: 'wx@2x.png',
      icon_active: 'wx_active@2x.png',
      router: '/wxManagement',
      children: []
    },
    {
      name: '数据可视化',
      icon: 'keshi@2x.png',
      icon_active: 'keshi_active@2x.png',
      router: '/setting',
      children: []
    },
  ]
}