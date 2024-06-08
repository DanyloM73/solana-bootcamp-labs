import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const sender = getKeypairFromEnvironment("SECRET_KEY");

// Substitute in your token mint account from create-token-mint.ts
const tokenMintAccount = new PublicKey(
  "DV5Agm5nB2QMuR493jeK3hS19Cnzj1VUWaY2e9f3sER6"
);

// Subtitute in a recipient token account you just made
const recipientAssociatedTokenAccount = new PublicKey(
    "GtFitipeVu18wU159fePqyXuPKLRSMu3CDKHdqY4VYvW"
);
  
const transactionSignature = await mintTo(
  connection,
  sender,
  tokenMintAccount,
  recipientAssociatedTokenAccount,
  sender,
  10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);