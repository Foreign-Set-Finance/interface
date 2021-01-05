import { getPool } from "./infura";
import { ESDS, DollarPool } from "../configs";

export async function getPoolAddress(): Promise<string> {
  const pool = await getPool(ESDS.addr);

  if (pool.toLowerCase() === DollarPool.toLowerCase()) {
    return DollarPool;
  }

  throw new Error("Unrecognized Pool Address");
}

// Legacy code
export function getLegacyPoolAddress(poolAddress): string {
  if (poolAddress === DollarPool) {
    return '';
  }

  throw new Error("Unrecognized Pool Address");
}
