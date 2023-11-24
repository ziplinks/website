import router from "@/router"
import { useUserStoreHook } from "@/store/modules/user"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { ElMessage } from "element-plus"
import { getToken } from "@/utils/cache/cookies"
import asyncRouteSettings from "@/config/async-route"
import isWhiteList from "@/config/white-list"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const userStore = useUserStoreHook()
  const permissionStore = usePermissionStoreHook()

    // 如果没有 Token
    if (isWhiteList(to)) {
      // 如果在免登录的白名单中，则直接进入
      next()
    } else {
      // 没有开启动态路由功能，则启用默认角色
      userStore.setRoles(asyncRouteSettings.defaultRoles)
      permissionStore.setRoutes(asyncRouteSettings.defaultRoles)
      permissionStore.dynamicRoutes.forEach((route) => {
        router.addRoute(route)
      })
      // 其他没有访问权限的页面将被重定向到登录页面
      next()
      NProgress.done()
    }
})

router.afterEach(() => {
  NProgress.done()
})
