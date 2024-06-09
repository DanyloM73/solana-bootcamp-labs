import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `🔑 Loaded our keypair securely, using an env file! Our public key is: ${keypair.publicKey.toBase58()}`
);

const tokenMintAccount = new PublicKey(
    "6dpChm1gp3zuwBX8sosLhac1QFDtMPuBRyumztZjQxrj"
);
  
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    tokenMintAccount,
    keypair.publicKey
);
  
console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
  
const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
);
  
console.log(`✅ Created token Account: ${link}`);
