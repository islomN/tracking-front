import axios from "axios";
import TokenService from "./TokenService";

window.axios = axios;

export default {
	install: function (Vue) {
        let baseURL = Vue.prototype.$_http+ '/api-admin/';

		axios.defaults.baseURL = baseURL;
		//axios.defaults.timeout =1000*60*60

		Vue.prototype.$api = {
			send(requestType, apiRoute, params = {}, data = null) {
				this.setToken();
				return new Promise((resolve, reject) => {
					axios[requestType](baseURL + apiRoute, params ? params : [], data, {timeout: 1})
						.then(res => {
							resolve(res)
						})
						.catch(err => {
							this.errorHandler(err);
							reject(err);
						})
				})
			},
			get(apiRoute, params = null) {
				return this.send('get', apiRoute, params);
			},
			post(apiRoute, data = null) {
				return this.send('post', apiRoute, data);
			},
			put(apiRoute, data = null) {
				return this.send('put', apiRoute, data);
			},
			patch(apiRoute, data = null) {
				return this.send('patch', apiRoute, data);
			},
			delete(apiRoute, params = null) {
				return this.send('delete', apiRoute, params);
			},
			errorHandler() {
			},
			setToken() {
				axios.defaults.headers.common = {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Authorization': 'Bearer ' + TokenService.getToken()
				};
			}

		};

	}
};
