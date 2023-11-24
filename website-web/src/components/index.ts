//注册挂载全局组件

import SvgIcon from "./SvgIcon/index.vue"

import Notify from "./Notify/index.vue"

import "virtual:svg-icons-register"

const allGlobalComponents = {SvgIcon, Notify}
export default {

  install(app) {

    Object.keys(allGlobalComponents).forEach(key => {

      app.component(key, allGlobalComponents[key])
      //  console.log(key,allGlobalComponents[key])
    })
  }
}
