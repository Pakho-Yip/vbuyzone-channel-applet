	import Crypto from './crypto.js';
	import './sha1.js';
	import Base64 from './base64.js';
	const app = getApp();
	const uploadFileSize = 1024 * 1024 * 20; // 上传文件的大小限制20m
	// 获取本地存储的oss信息

	//let _ossConfValue = app.globalData.ossConfValue;
	//console.log(typeof (_ossConfValue))
	//console.log(app.globalData)
	let accesskey; // 自己去申请
	let OSSAccessKeyId; // 自己去申请
	export default {
		// 设置文件上传大小以及失效时间
		_getPolicy() {
			let policyText = {
				"expiration": "2029-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
				"conditions": [
					["content-length-range", 0, uploadFileSize] // 设置上传文件的大小限制
				]
			};
			return Base64.encode(JSON.stringify(policyText))
		},
		// 设置Signature
		_getSignature(message, accesskey) {
			let bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, {
				asBytes: true
			});
			return Crypto.util.bytesToBase64(bytes);
		},
		// 获取文件后缀名
		_getSuffix(filename) {
			let suffix = ''
			let pos = filename.indexOf('.')
			if (pos != -1) {
				suffix = filename.substring(pos)
			}
			return suffix;
		},
		// 设置上传的图片地址
		getImgName() {
			return `${_ossConfValue.filePath}${this.guid()}${new Date().getTime()}.png`;
		},
		// 设置上传的文件地址
		getFileName(fileType) {
			return `${_ossConfValue.filePath}${new Date().getTime()}@${fileType}`;
		},
		// 获取STS签名
		get_STS(fValue) {
			console.log("fValue", fValue);
			return new Promise((resolve, reject) => {
				accesskey = fValue.accessKeySecret || ""; // 自己去申请
				OSSAccessKeyId = fValue.accessKeyId || ""; // 自己去申请
				// 设置文件上传大小以及失效时间 
				let policy = this._getPolicy();
				let res = {
					filePath: fValue.filePath,
					OSSAccessKeyId,
					url: fValue.domainName, // 远程aliyun地址
					policy, // policy信息
					signature: this._getSignature(policy, accesskey) // signature信息
				};
				resolve(res)
			})
		},
		guid() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}

	};