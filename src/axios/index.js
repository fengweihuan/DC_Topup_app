import axios from 'axios'
import Vue from 'vue'
import storge from '../utils/storge'
import router from '../router'

//  创建axios实例
const service = axios.create({
	baseURL: process.env.BASE_API,
	timeout: 20000
})
//  request拦截器
service.interceptors.request.use(config => {
	//  在发送请求之前做某件事
	let token = storge.getItem('token')
	console.log(token)
	if (token) {
		config.headers['authorization'] = token
	}
		Vue.$vux.loading.show({
			text: '加载中'
		})
	return config
}, error => {
	Vue.$vux.loading.hide()
	Vue.$vux.alert.show({
		title: '提示',
		content: '网络异常，请稍候再试'
	})
	return Promise.reject(error)
})
service.interceptors.response.use(data => {
	Vue.$vux.loading.hide();
	let res = data.data
	if (res.errno === 1200) {
		Vue.$vux.confirm.show({
			title: '提示',
			content: `账号信息失效，是否重新登录？`,
			confirmText: '登录',
			onConfirm() {
				window.localStorage.removeItem('token')
				router.replace('/auth')
			}
		})
	}else if (res.errno !== 0) {
		Vue.$vux.alert.show({
			title: '提示',
			content:  res.data ? res.data : res.errmsg
		})
	}
	return data
}, error => {
	Vue.$vux.alert.show({
		title: '提示',
		content: '网络异常，请稍候再试'
	})
	Vue.$vux.loading.hide();
	return Promise.reject(error)
})

export default service
