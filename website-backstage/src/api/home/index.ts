import { request } from "@/utils/service"
import type * as Home from "./types/home"
import {CreateFooterRequestData, UpdateFooterRequestData, UpdateHorizontalCardRequestData} from "./types/home";

/** 增 */
export function createBannerDataApi(data: Home.CreateBannerRequestData) {
  return request({
    url: "banner/add",
    method: "post",
    data
  })
}

/** 删 */
export function deleteBannerDataApi(id: string) {
  return request({
    url: `banner/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateBannerDataApi(data: Home.UpdateBannerRequestData) {
  return request({
    url: "banner/edit",
    method: "put",
    data
  })
}

/** 查 */
export function getBannerDataApi(params: Home.GetBannerRequestData) {
  return request({
    url: "banner/list",
    method: "get",
    params
  })
}

/** 水平card新增 */
export function createHorizontalCard(data: Home.CreateCardRequestData) {
  return request({
    url: "card/horizontal/add",
    method: "post",
    data
  })
}
/** 获取card信息 */
export function getCardHorizontalList() {
  return request({
    url: "card/horizontal/list",
    method: "get"
  })
}

/** 修改card信息 */
export function updateCardHorizontalDataApi(data: Home.UpdateCardRequestData) {
  return request({
    url: "card/horizontal/edit",
    method: "put",
    data
  })
}

/** 垂直card新增 */
export function createVerticalCard(data: Home.CreateCardRequestData) {
  return request({
    url: "card/vertical/add",
    method: "post",
    data
  })
}
/** 获取card信息 */
export function getCardVerticalList() {
  return request({
    url: "card/vertical/list",
    method: "get"
  })
}

/** 修改card信息 */
export function updateCardVerticalDataApi(data: Home.UpdateCardRequestData) {
  return request({
    url: "card/vertical/edit",
    method: "put",
    data
  })
}

/** 滚动card新增 */
export function createScrollCard(data: Home.CreateCardRequestData) {
  return request({
    url: "card/scroll/add",
    method: "post",
    data
  })
}
/** 获取card信息 */
export function getCardScrollList() {
  return request({
    url: "card/scroll/list",
    method: "get"
  })
}

/** 修改card信息 */
export function updateCardScrollDataApi(data: Home.UpdateCardRequestData) {
  return request({
    url: "card/scroll/edit",
    method: "put",
    data
  })
}

/** footer数据新增 */
export function createFooter(data: Home.CreateFooterRequestData) {
  return request({
    url: "footer/add",
    method: "post",
    data
  })
}

/** 获取footer信息 */
export function getFooterInfo() {
  return request({
    url: "footer/list",
    method: "get"
  })
}

/** 修改footer信息 */
export function updateFooterDataApi(data: Home.UpdateFooterRequestData) {
  return request({
    url: "footer/edit",
    method: "put",
    data
  })
}

