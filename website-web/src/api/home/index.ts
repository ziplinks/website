import { request } from "@/utils/service"
import type * as Home from "./types/home"
/** 查 */
export function getBannerDataApi(params: Home.GetBannerRequestData) {
  return request<Table.GetBannerRequestData>({
    url: "banner/list",
    method: "get",
    params
  })
}

export function getCardHorizontalList() {
  return request({
    url: "card/horizontal/list",
    method: "get"
  })
}

export function getCardVerticalList() {
  return request({
    url: "card/vertical/list",
    method: "get"
  })
}

export function getCardScrollList() {
  return request({
    url: "card/scroll/list",
    method: "get"
  })
}
export function getFooterList() {
  return request({
    url: "footer/list",
    method: "get"
  })
}

