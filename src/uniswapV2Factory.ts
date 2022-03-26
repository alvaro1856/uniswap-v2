import { UniswapV2Pair } from "../generated/templates"
import {
    PairCreated
  } from "../generated/UniswapV2Factory/UniswapV2Factory"
  import {
    getOrCreateAccount,
    getOrCreateERC20Token,
    getOrCreateMarket
  } from "./common"
  import { ProtocolName, ProtocolType } from "./constants"

export function handlePairCreated(event: PairCreated): void {
      // Create a tokens and market entity
  let token0 = getOrCreateERC20Token(event, event.params.token0)
  let token1 = getOrCreateERC20Token(event, event.params.token1)
  let lpToken = getOrCreateERC20Token(event, event.params.pair)

  let market = getOrCreateMarket(
    event,
    event.params.pair,
    ProtocolName.SUSHISWAP,
    ProtocolType.EXCHANGE,
    [token0, token1],
    lpToken,
    []
  )

  lpToken.mintedByMarket = market.id
  lpToken.save()

  UniswapV2Pair.create(event.params.pair)
}