import React from 'react';
import BigNumber from 'bignumber.js';

import { BalanceBlock, AddressBlock } from '../common/index';
import { CURRENCY } from '../../configs'

type TradePageHeaderProps = {
  pairBalanceESD: BigNumber,
  pairBalanceUSDC: BigNumber,
  uniswapPair: string,
};

const TradePageHeader = ({
  pairBalanceESD, pairBalanceUSDC, uniswapPair,
}: TradePageHeaderProps) => {
  const price = pairBalanceUSDC.dividedBy(pairBalanceESD);

  return (
    <div style={{ padding: '2%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset={`${CURRENCY} Price`} balance={price} suffix={"USDC"}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset={`${CURRENCY} Liquidity`} balance={pairBalanceESD} suffix={CURRENCY}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset="USDC Liquidity" balance={pairBalanceUSDC} suffix={"USDC"}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <>
          <AddressBlock label="Uniswap Contract" address={uniswapPair} />
        </>
      </div>
    </div>
  );
}


export default TradePageHeader;
