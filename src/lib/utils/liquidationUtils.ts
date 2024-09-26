import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { tpdaLiquidationPairABI } from '$lib/abis/tpdaLiquidationPair';
import { BASE_CHAIN_ID, ALCHEMY_API_URL } from '$lib/constants';

const client = createPublicClient({
  chain: {
    ...mainnet,
    id: BASE_CHAIN_ID,
    rpcUrls: {
      public: { http: [ALCHEMY_API_URL || 'https://fallback-rpc-url.com'] },
      default: { http: [ALCHEMY_API_URL || 'https://fallback-rpc-url.com'] },
    },
  },
  transport: http(),
});

export async function getWethInputOutput(
  liquidationPairAddress: `0x${string}`,
  amountOut: bigint
) {
  try {
    const amountIn = await client.readContract({
      address: liquidationPairAddress,
      abi: tpdaLiquidationPairABI,
      functionName: 'computeExactAmountIn',
      args: [amountOut],
    });
    return { amountIn, amountOut };
  } catch (error) {
    console.error('Error fetching liquidation data:', error);
    throw error;
  }
}
