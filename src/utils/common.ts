import Vue from 'vue'
import VueRouter from 'vue-router'

/*
 * @Description: 公共函数
 * @Author: fanxinling
 * @LastEditors: fanxinling
 */

// import Cookies from 'js-cookie'
// import { cookieExpires } from '@/config' // cookie保存的天数

/**
 * @Author: asheng
 * @msg: 存取token
 * @param {string} token
 */
export const TOKEN_KEY: string = 'token'
export const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)

}
export const getToken = () => {
    // const token = Cookies.get(TOKEN_KEY)
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
        return token
    } else {
        return false
    }
}
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url: string) => {
    const keyValueArr = url.split('?')[1].split('&')
    let paramObj: any = {}
    keyValueArr.forEach(item => {
        const keyValue = item.split('=')
        paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj: any, key: string | number) => {
    if (key) {
        return key in obj
    } else {
        const keysArr = Object.keys(obj)
        return keysArr.length
    }
}

/**
 * @msg: 获取系统当前时间
 * @param {string} fmt 时间格式 具体看代码
 * @return: string
 */
Date.prototype.format = function(format: string): string {
    let date: any = {
        // tslint:disable-next-line:no-invalid-this
        "M+": this.getMonth() + 1,
        // tslint:disable-next-line:no-invalid-this
        "d+": this.getDate(),
        // tslint:disable-next-line:no-invalid-this
        "h+": this.getHours(),
        // tslint:disable-next-line:no-invalid-this
        "m+": this.getMinutes(),
        // tslint:disable-next-line:no-invalid-this
        "s+": this.getSeconds(),
        // tslint:disable-next-line:no-invalid-this
        "q+": Math.floor((this.getMonth() + 3) / 3),
        // tslint:disable-next-line:no-invalid-this
        "S+": this.getMilliseconds()
    }

    let res: string = format

    if (/(y+)/i.test(res)) {
        // tslint:disable-next-line:no-invalid-this
        res = res.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in date) {
        if (new RegExp("(" + k + ")").test(res)) {
            res = res.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length))
        }
    }
    return res
}

export function getFormatTime() {
    let week = '星期' + '日一二三四五六'.charAt(new Date().getDay())
    let result = week
    return result
}

export function getSimpleDate() {
    var date = new Date().format('yyyy年MM月dd日');
    var week = "星期" + "日一二三四五六".charAt(new Date().getDay());
    var result = date + " " + week;
    console.log("result", result)
    return result;
}

// copy in the 'fx-fuli' utils
/**
 * 校验手机号是否正确
 * @param phone 手机号
 */

export const verifyPhone = (phone: string | number) => {
    const reg = /^1[34578][0-9]{9}$/
    const _phone = phone.toString().trim()
    let toastStr = _phone === '' ? '手机号不能为空~' : !reg.test(_phone) && '请输入正确手机号~'
    return {
        errMsg: toastStr,
        done: !toastStr,
        value: _phone
    }
}

export const verifyStr = (str: string | number, text: string) => {
    const _str = str.toString().trim()
    const toastStr = _str.length ? false : `请填写${text}～`
    return {
        errMsg: toastStr,
        done: !toastStr,
        value: _str
    }
}

// 截取字符串
export const sliceStr = (str: any, sliceLen: number) => {
    if (!str) {
        return ''
    }
    let realLength = 0
    const len = str.length
    let charCode = -1
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1
        } else {
            realLength += 2
        }
        if (realLength > sliceLen) {
            return `${str.slice(0, i)}...`
        }
    }

    return str
}

/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 */
export function objClone(jsonObj: any) {
    let buf: any
    if (jsonObj instanceof Array) {
        buf = []
        let i = jsonObj.length
        while (i--) {
            buf[i] = objClone(jsonObj[i])
        }
        return buf
    } else if (jsonObj instanceof Object) {
        buf = {}
        for (let k in jsonObj) {
            buf[k] = objClone(jsonObj[k])
        }
        return buf
    } else {
        return jsonObj
    }
}

export function ChangStrLength(num: string, strLength: number) {
    let str = num.toString()
    if (str.length === strLength) return

    if (str.length < strLength) {
        for (let i = 0; i < strLength - str.length; i++) {
            str = '0' + str
        }
    }
    return str
}

/**
 * 深拷贝
 * @param root 对象或数组
 */
export function deepCopy(root: any){
    if(typeof root !== 'object'){
        return
    }
    let origin: any = root.constructor.name === 'Array' ? [] : {}

    Object.keys(root).forEach((key: string) => {
        if(typeof root[key] === 'object'){
            origin[key] = deepCopy(root[key])
        }else{
            origin[key] = root[key]
        }
        
    })

    return origin
}

/**
 * @param  targetData 数组
 */

export function transformData(targetData:　Array< any >): Array< Object> {
    if( !targetData.length || !Array.isArray(targetData)){
        return []
    }

    return targetData.map((data: any) => {
        let o = < any > {}
        o.id = data.val
        o.name = data.key
        return o
    })
}

/**
 * 比较数组内容是否相等
 */

// if (Array.prototype.equals) {
//     console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// }

//  Array.prototype.equals = function(array: any[]) {
//     if (!array) return false
//     if (this.length !== array.length) return false

//     for (var i = 0, l = this.length; i < l; i++) {
//         if (this[i] instanceof Array && array[i] instanceof Array) {
//             // recurse into the nested arrays
//             if (!this[i].equals(array[i]))
//                 return false;       
//         }           
//         else if (this[i] != array[i]) { 
//             // Warning - two different object instances will never be equal: {x:20} != {x:20}
//             return false;   
//         }           
//     }
//     return true;
// }

// Object.defineProperty(Array.prototype, "equals", {enumerable: false});


