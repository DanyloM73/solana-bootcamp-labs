import { createMultisig } from "@solana/spl-token";
import "dotenv/config";
import {
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";

const firstKeypair = getKeypairFromEnvironment("SECRET_KEY");
const secondKeypair = getKeypairFromEnvironment("SECRET_KEY2");

console.log(
    `✅ Finished! We've loaded our keypairs securely, using an env file! Our public keys is: ${firstKeypair.publicKey.toBase58()} and ${secondKeypair.publicKey.toBase58()}`
);

const connection = new Connection(clusterApiUrl("devnet"));

const multisigKey = await createMultisig(
    connection,
    firstKeypair,
    [
        firstKeypair.publicKey,
        secondKeypair.publicKey,
    ],
    2
);
  
console.log(`✅ Successfully created multisig: ${multisigKey.toBase58()}`);