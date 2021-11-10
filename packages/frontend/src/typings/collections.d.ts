export type DocDataWithId<T> = {
  id: string
} & T

export type GiveawayDocData = {
  address: string
  tokenId: string
}

export type WhitelistDocData = {
  address: string
  signature: string
}
