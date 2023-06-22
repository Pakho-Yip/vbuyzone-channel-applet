module.exports = {
  config: {
    local: {
      env: '本地环境',
      apiHost: 'http://192.168.12.10:100/vbuyzone-app-facade',
    },
    test: {
      env: "测试环境",
      apiHost: "http://test-tnyc.litehehui.cn:7001/vbuyzone-app-facade",
    },
    prod: {
      env: "生产环境",
      apiHost: "https://www.tnidea.cn:6100/vbuyzone-app-facade",
      // apiHost: "https://xz-app-api.tcsczy.com/tcsc-aitms-facade-app",
    }
  }
}