const isNull = exp => {
  if (
    exp === undefined ||
    exp === null ||
    exp === "null" ||
    exp === "" ||
    exp === "undefined"
  ) {
    return true;
  }
  return false;
};
const checkIdCard = value => {
  if(!value){
    return false
  }
  console.log(value);
  value = value.replace(/(\()|(\))|(\-)/g, "");
  // 权值
  var powers = new Array(
    "7",
    "9",
    "10",
    "5",
    "8",
    "4",
    "2",
    "1",
    "6",
    "3",
    "7",
    "9",
    "10",
    "5",
    "8",
    "4",
    "2"
  );
  // 验证码
  var parityBit = new Array(
    "1",
    "0",
    "X",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2"
  );

  var valid = false;
  if (value.length == 15) {
    valid = validId15(value);
  } else if (value.length == 18) {
    valid = validId18(value);
  }

  return valid;

  // 校验18位的身份证号码
  function validId18(_id) {
    _id = _id + "";

    var _num = _id.substr(0, 17);
    var _parityBit = _id.substr(17);
    var _power = 0;
    for (var i = 0; i < 17; i++) {
      // 校验每一位的合法性
      if (_num.charAt(i) < "0" || _num.charAt(i) > "9") {
        return false;
        break;
      } else {
        // 加权
        _power += parseInt(_num.charAt(i)) * parseInt(powers[i]);
      }
    }
    // 取模
    var mod = parseInt(_power) % 11;
    if (parityBit[mod] == _parityBit) {
      return true;
    }
    return false;
  }

  // 校验15位的身份证号码
  function validId15(_id) {
    _id = _id + "";
    for (var i = 0; i < _id.length; i++) {
      // 校验每一位的合法性
      if (_id.charAt(i) < "0" || _id.charAt(i) > "9") {
        return false;
        break;
      }
    }
    var year = _id.substr(6, 2);
    var month = _id.substr(8, 2);
    var day = _id.substr(10, 2);
    // 校验年份位
    if (year < "01" || year > "90") {
      return false;
    }
    // 校验月份
    if (month < "01" || month > "12") {
      return false;
    }
    // 校验日
    if (day < "01" || day > "31") {
      return false;
    }
    return true;
  }
  validId(value);
};
const getDistance = (value1,value2) => {
    var radLat1 = value1.latitude*Math.PI / 180.0;
    var radLat2 = value2.latitude*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = value1.longitude*Math.PI / 180.0 - value2.longitude*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;    
}
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var aGpsCode = 6378245.0;
var eeGpsCode = 0.00669342162296594323;

function out_of_china(lng, lat) {
  return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
}
function transformlat(lng, lat) {
  var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret
}

function transformlng(lng, lat) {
  var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret
}
const wgs84togcj02 = (lng, lat) => {
  if (out_of_china(lng, lat)) {
    return [lng, lat]
}
else {
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - eeGpsCode * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / ((aGpsCode * (1 - eeGpsCode)) / (magic * sqrtmagic) * PI);
    dlng = (dlng * 180.0) / (aGpsCode / sqrtmagic * Math.cos(radlat) * PI);
    var mglat = lat + dlat;
    var mglng = lng + dlng;
    return [mglng, mglat]
}
}
export default {
  isNull,
  checkIdCard,
  getDistance,
  wgs84togcj02
}