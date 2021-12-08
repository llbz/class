import QS from "qs";
import axios from "axios";
//import store from '../store/index'

// 设置请求超时
//设置超时时间为10s```
axios.defaults.timeout = 10000;
 //设置post请求方式请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//axios.defaults.baseURL = 'http://121.40.243.16:3001';
axios.defaults.baseURL = 'http://114.214.164.86:3001';

axios.interceptors.request.use(config => {
   // console.log(config);
    if(config.url !== "/class/login"){
        const token = JSON.parse(localStorage.getItem('token'));
        token && (config.headers.xAccessToken = token);
    }
    //console.log(config);
    return config;
}, err => {
    console.log("err")
    return Promise.error(err);
});


axios.interceptors.response.use(response => {
       // console.log(response);
        if (response.status === 200) {
           // console.log("200")
            return Promise.resolve(response);
        }
        else {
            if(response.status){
                console.log(response.status);
                switch (response.status){
                    case 403:
                        this.$toast.show({
                            isShow: true,
                            isShow2: true,
                            message2: '登录过期，请重新登录',
                            duration: 2000
                        })
                        localStorage.clear();
                        break;
                }
            }

            return Promise.reject(response);
        }
    },
)
    /*error => {
        if (error.response.status) {
            switch (error.response.status) {
                //请求返回的错误妈需要与后台开发人员协商好，以便更快的定位错误。
                case 401:    //用户未登录
                    break;
                case 403: //token过期
                   /!* Toast({
                        message: '登录已过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });*!/
                    localStorage.removeItem('token');
                    this.$store.commit('loginSuccess', null);
                    break;
                case 404:   //请求错误
                    /!*Toast({
                        message: '该请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });*!/
                    break;
                default:  // 其它错误，直接抛出错误提示
                   /!* Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });*!/
            }
            console.log("error.response")
            return Promise.reject(error.response);
        }
});*/
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                console.log(res);
                resolve(res.data);
            })
            .catch(err =>{
                console.log(err)
                reject(err.data)
            })
    });
}


