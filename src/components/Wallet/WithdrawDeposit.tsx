import React, { useState } from 'react';
import {
  Box, Button, IconCirclePlus, IconCircleMinus, IconLock
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {
  BalanceBlock, MaxButton,
} from '../common/index';
import {approve, deposit, withdraw} from '../../utils/web3';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {ESD, ESDS} from "../../configs";
import {MAX_UINT256} from "../../configs/values";
import BigNumberInput from "../common/BigNumberInput";
import { CURRENCY } from '../../configs'

type WithdrawDepositProps = {
  user: string
  balance: BigNumber,
  allowance: BigNumber,
  stagedBalance: BigNumber,
  status: number
};

function WithdrawDeposit({
  user, balance, allowance, stagedBalance, status
}: WithdrawDepositProps) {
  const [depositAmount, setDepositAmount] = useState(new BigNumber(0));
  const [withdrawAmount, setWithdrawAmount] = useState(new BigNumber(0));

  return (
    <Box heading="Stage">
      {allowance.comparedTo(MAX_UINT256) === 0 ?
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total Issued */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Staged" balance={stagedBalance} suffix={CURRENCY}/>
          </div>
          {/* Deposit Døllar into DAO */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '60%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                    adornment={CURRENCY}
                    value={depositAmount}
                    setter={setDepositAmount}
                    disabled={status !== 0}
                  />
                  <MaxButton
                    onClick={() => {
                      setDepositAmount(balance);
                    }}
                  />
                </>
              </div>
              <div style={{width: '40%', minWidth: '6em'}}>
                <Button
                  wide
                  icon={status === 0 ? <IconCirclePlus/> : <IconLock/>}
                  label="Deposit"
                  onClick={() => {
                    deposit(
                      ESDS.addr,
                      toBaseUnitBN(depositAmount, ESD.decimals),
                    );
                  }}
                  disabled={status === 1 || !isPos(depositAmount) || depositAmount.isGreaterThan(balance)}
                />
              </div>
            </div>
          </div>
          <div style={{flexBasis: '2%'}}/>
          {/* Withdraw Døllar from DAO */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '60%', minWidth: '7em'}}>
                <>
                  <BigNumberInput
                    adornment={CURRENCY}
                    value={withdrawAmount}
                    setter={setWithdrawAmount}
                    disabled={status !== 0}
                  />
                  <MaxButton
                    onClick={() => {
                      setWithdrawAmount(stagedBalance);
                    }}
                  />
                </>
              </div>
              <div style={{width: '40%', minWidth: '7em'}}>
                <Button
                  wide
                  icon={status === 0 ? <IconCircleMinus/> : <IconLock/>}
                  label="Withdraw"
                  onClick={() => {
                    withdraw(
                      ESDS.addr,
                      toBaseUnitBN(withdrawAmount, ESD.decimals),
                    );
                  }}
                  disabled={status === 1 || !isPos(withdrawAmount) || withdrawAmount.isGreaterThan(stagedBalance)}
                />
              </div>
            </div>
          </div>
        </div>
        :
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total Issued */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Staged" balance={stagedBalance} suffix={CURRENCY}/>
          </div>
          <div style={{flexBasis: '35%'}}/>
          {/* Approve DAO to spend Døllar */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <Button
              wide
              icon={<IconCirclePlus />}
              label="Approve"
              onClick={() => {
                approve(ESD.addr, ESDS.addr);
              }}
              disabled={user === ''}
            />
          </div>
        </div>
      }
    </Box>
  );
}

export default WithdrawDeposit;
