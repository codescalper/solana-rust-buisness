import { PublicKey } from "@solana/web3.js";

export const RPC_ENDPOINT =
  process.env.RPC_URL || "https://api.devnet.solana.com";

export const CANDY_MACHINE_ID = new PublicKey(process.env.CANDY_MACHINE || "");
