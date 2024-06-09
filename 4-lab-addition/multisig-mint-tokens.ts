import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 9);

const firstKeypair = getKeypairFromEnvironment("SECRET_KEY");
const secondKeypair = getKeypairFromEnvironment("SECRET_KEY2");

const tokenMintAccount = new PublicKey(
    "6dpChm1gp3zuwBX8sosLhac1QFDtMPuBRyumztZjQxrj"
);

// Subtitute in a recipient token account you just made
const recipientAssociatedTokenAccount = new PublicKey(
    "HCDP9AetHwTKXGsaTaeBiGneyEtSX8zRnsVAZWyauoa6"
);
  
const multisigKey = new PublicKey("9kC6WBWwSWYypTEDjTM6VViGm6oo28YT1bqgSHPFo2XU");

const transactionSignature = await mintTo(
    connection,
    firstKeypair,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    multisigKey,
    10 * MINOR_UNITS_PER_MAJOR_UNITS,
    [
        firstKeypair,
        secondKeypair
    ]
);
  
const link = getExplorerLink("transaction", transactionSignature, "devnet");  
  
console.log(`✅ Success! Mint Token Transaction: ${link}`);
