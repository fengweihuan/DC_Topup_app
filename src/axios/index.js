import axios from 'axios'
import Vue from 'vue'
import router from '../router'

// 创建axios实例
const service = axios.create({
	baseURL: '54.222.241.129', // api的base_url
	timeout: 20000 // 请求超时时间
})

let timer = null

// request拦截器
service.interceptors.request.use(config => {

	// 在发送请求之前做某件事
	if (localStorage.token) {
		config.headers['X-Token'] = localStorage.token
	}

	// 全局请求的 loading，当请求 300 ms 后还没返回，才会出现 loading
	clearTimeout(timer)
	timer = setTimeout(() => {
		Vue.$vux.loading.show({
			text: '加载中'
		})
	}, 300)
	return config
}, error => {
	// Do something with request error
	Vue.$vux.loading.hide()
	Vue.$vux.alert.show({
		title: '提示',
		content: '网络异常，请稍候再试'
	})
	return Promise.reject(error)
})

service.interceptors.response.use(data => {
	clearTimeout(timer)
	Vue.$vux.loading.hide();
	let res = data.data
	if (res.status === 1200) {
		Vue.$vux.confirm.show({
			title: '提示',
			content: `账号信息失效，是否重新登录？`,
			confirmText: '登录',
			onConfirm() {
				window.localStorage.removeItem('token')
				router.replace('/auth')
			}
		})
	} else if (res.status !== 0) {
		Vue.$vux.alert.show({
			title: '提示',
			content: res.msg
		})
	}

	return data
}, error => {
	Vue.$vux.loading.hide();
	Vue.$vux.alert.show({
		title: '提示',
		content: '网络异常，请稍候再试'
	})
	return Promise.reject(error)
})

export default service