import { createMint } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `✅ Finished! We've loaded our keypair securely, using an env file! Our public key is: ${keypair.publicKey.toBase58()}`
);

const connection = new Connection(clusterApiUrl("devnet"));

// Get our multisig key from create-multisig.ts
const multisigKey = new PublicKey ("9kC6WBWwSWYypTEDjTM6VViGm6oo28YT1bqgSHPFo2XU");

const mint = await createMint(
    connection,
    keypair,
    multisigKey,
    multisigKey,
    9
);
  
const link = getExplorerLink("address", mint.toString(), "devnet");
    
console.log(`✅ Token Mint: ${link}`);