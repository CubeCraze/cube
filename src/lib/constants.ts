export const dolphinAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

export const seconds = { hour: 3_600, day: 86_400, week: 604_800, month: 2_628_000, year: 31_536_000 }

export enum localStorageKeys {
  lastConnectedProviderId = 'lastConnectedProviderId',
  transferEvents = 'transferEvents',
  flashEvents = 'flashEvents',
  claimedPrizeEvents = 'claimedPrizeEvents',
  lastCheckedBlockNumber = 'lastCheckedBlockNumber',
  blockTimestamps = 'blockTimestamps'
}

export const PRIZE_POOL_ACCEPTS_WETH = '0x45b2010d8A4f08b53c9fa7544C51dFd9733732cb';
export const LIQUIDATION_ROUTER = '0xa9C937A0D1D22ad79099aeA10efA62A270DFc22c';

export const MOONWELL_USDC = {
  vault: '0x7f5C2b379b88499aC2B997Db583f8079503f25b9',
  liquidationPair: '0xEBa6Aa26ea2C51874a467cc310181617B3a4A266'
};

export const AAVE_WETH = {
  vault: '0x4e42f783db2d0c5bdff40fdc66fcae8b1cda4a43',
  liquidationPair: '0xC8598b5fdEEe42A129D515b3f3a67E9D74481fFa'
};

export const MOONWELL_AERO = {
  vault: '0x8d1322CaBe5Ef2949f6bf4941Cc7765187C1091A',
  liquidationPair: '0xa0297868d4e7c886BdeB8C258767c0a6fC80dc6d'
};

export const MOONWELL_WSTETH = {
  vault: '0x75D700F4C21528A2bb603b6Ed899ACFdE5c4B086',
  liquidationPair: '0xF94F69EeDDDF0A088f0A16D9aC569C1729F6444F'
};

export const MOONWELL_CBETH = {
  vault: '0x5b623C127254C6fec04b492ecDF4b11c45FBB9D5',
  liquidationPair: '0xeBD0A1161e833c090F88D57159c91eEC371E7e67'
};

export const BEEFY_WETH_WELL = {
  vault: '0x6428DDB6EF1818FA99552E10882D34c1db57BBcA',
  liquidationPair: '0x62D9c8B97Caa68Cd58ba8996FDbDbF9Ba39d2c44'
};

export const ANGLE_USDA = {
  vault: '0x6Bb041d7E70b7040611ef688b5e707a799ADe60A',
  liquidationPair: '0xDC56760ee30Ff160546B18430d89ed99e19005b6'
};

export const BASE_CHAIN_ID = 8453;
export const ALCHEMY_API_URL = import.meta.env.VITE_ALCHEMY_API_URL_BASE;


