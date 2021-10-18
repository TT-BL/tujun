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
      children: []
    },
    {
      name: '账号管理',
      icon: 'zhanghao@2x.png',
      icon_active: 'zhanghao_active@2x.png',
      router: '/accountManagement',
      children: [
        {
          name: '账号列表',
          icon: '',
          router: '/accountManagement/accountList',
          children: []
        },
        {
          name: '添加列表',
          icon: '',
          router: '/accountManagement/addAcount',
          children: []
        }
      ]
    },
    {
      name: '微信管理',
      icon: 'wx@2x.png',
      icon_active: 'wx_active@2x.png',
      router: '/wxManagement',
      children: []
    },
    {
      name: '系统设置',
      icon: 'setting@2x.png',
      icon_active: 'setting_active@2x.png',
      router: '/setting',
      children: []
    },
  ]
}