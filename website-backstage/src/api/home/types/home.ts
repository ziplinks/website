export interface CreateBannerRequestData {
  mainTitle: string
  subTitle: string
  banner: string
}

export interface UpdateBannerRequestData extends CreateBannerRequestData{
  _id: string
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
  cardList: object
}

export interface UpdateCardRequestData extends CreateCardRequestData{
  _id: string
}

export interface CreateFooterRequestData {
  tel: string
  email: string
  cardList: object
}

export interface UpdateFooterRequestData extends CreateFooterRequestData{
  _id: string
}
