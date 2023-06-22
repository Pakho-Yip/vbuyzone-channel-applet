const app = getApp();
import {
  config
} from "./config";
let apiHost = config[app.globalData.env].apiHost;
// let apiHost = 'http://tprogram.dev.moredian.com:8000'
export default {
  // 登录相关接口
  login: {


    // login: apiHost + "/app/login/driver/applets/login", // 登录
    // register: apiHost + "/app/login/driver/applets/register", // 注册
    // out: apiHost + "/app/login/loginOut", // 登出@登出

    login: apiHost + "/applet/wechat/login", // 微信授权登录
    out: apiHost + "/applet/wechat/signOut", // 登出
    
    changePhone: apiHost + "/driverApplets/waybill/changeDriverAppletMobile",//更换手机号绑定
    creCheck:apiHost + "/app/login/credentialsCheck",//账户证件信息检查
  },
  common: {
    conf: apiHost + "/app/common/conf/wx_checking_version", // 获取车小智版本配置信息 
    oss: apiHost + "/app/common/conf/oss", // 获取配置信息 
    driverAuth: apiHost + "/app/driver/auth/state",//司机认证状态
    refreshData: apiHost + "/app/login/refreshData",//账户数据刷新
    ocrIdcard: apiHost + "/app/common/ocr/idCard", // OCR识别_身份证 
    ocrDlicense: apiHost + "/app/common/ocr/getDrivingLicense", // OCR识别_驾驶证 
    ocrVlicense: apiHost + "/app/common/ocr/getVehicleLicenseDto", // OCR识别_行驶证 
    queryByGroups: apiHost + "/app/common/dict/queryByGroups", // 获取代码表信息 
  }

};