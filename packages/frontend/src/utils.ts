export const convertIpfs = (url: string) => {
  return `https://ipfs.io/ipfs/${url.replace('ipfs://', '')}`
}

export const estimateGas = async (
  method: any,
  def: number | null = null,
  sendArgs: Record<string, any> = {}
) => {
  try {
    sendArgs = { maxPriorityFeePerGas: null, maxFeePerGas: null, ...sendArgs }
    const res = await method.estimateGas(sendArgs)
    return res + Math.round(res * 0.1)
  } catch (e) {
    return def
  }
}
