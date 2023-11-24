export interface GetTableRequestData {
  mainTitle: string
  subTitle: string
  banner: string
}
export interface GetCardRequestData {
  "cardList": array,
  "_id": string,
  "mainTitle"?: string
  "subTitle"?: string
  "createdUser": string
  "createdTime": string
}

export interface GetFooterRequestData {
  "cardList": array,
  "_id": string,
  "tel": string
  "email": string
  "createdUser": string
  "createdTime": string
}
