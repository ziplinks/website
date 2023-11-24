export interface CreateBannerRequestData {
  mainTitle: string
  subTitle: string
  banner: string
}

export interface UpdateBannerRequestData {
  _id: string
  mainTitle: string
  subTitle: string
  banner: string
}

export interface GetBannerRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
}

export interface GetTableData {
  _id: string
  mainTitle: string
  subTitle: string
  banner: string
  createTime: string
}

export type GetTableResponseData = ApiResponseData<{
  data: GetTableData[]
  total: number
}>

export interface CreateCardRequestData {
  mainTitle?: string
  subTitle?: string
  cardList: array
}

export interface UpdateCardRequestData {
  _id: string
  mainTitle?: string
  subTitle?: string
  cardList: array
}

export interface CreateFooterRequestData {
  tel: string
  email: string
  cardList: array
}

export interface UpdateFooterRequestData {
  _id: string
  tel: string
  email: string
  cardList: array
}
