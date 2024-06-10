import { clusterApiUrl, Connection, PublicKey} from '@solana/web3.js';
import { transfer, mintTo } from '@solana/spl-token';
import { getKeypairFromEnvironment, getExplorerLink } from "@solana-developers/helpers";
import "dotenv/config";

(async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const fromWallet = getKeypairFromEnvironment("SECRET_KEY");
    const toWallet = getKeypairFromEnvironment("SECRET_KEY2");
    const tokenMintAccount = new PublicKey("6dpChm1gp3zuwBX8sosLhac1QFDtMPuBRyumztZjQxrj");
    const fromTokenAccount = new PublicKey("HCDP9AetHwTKXGsaTaeBiGneyEtSX8zRnsVAZWyauoa6");
    const toTokenAccount = new PublicKey("7LnWaLna3WY2sYN4j4rqAYnRUzeq8yM7t2YqKBUUL3A3"); 
    const multisigKey = new PublicKey("9kC6WBWwSWYypTEDjTM6VViGm6oo28YT1bqgSHPFo2XU"); 

    let signature = await mintTo(
        connection,
        fromWallet,
        tokenMintAccount,
        fromTokenAccount,
        multisigKey,
        0,
        [
            fromWallet,
            toWallet
        ]
    );
    console.log('mint tx:', signature);


    signature = await transfer(
        connection,
        toWallet,
        fromTokenAccount,
        toTokenAccount,
        fromWallet.publicKey,
        1000000000,
        [fromWallet, toWallet]
    );

    const link = getExplorerLink("transaction", signature, "devnet");
  
    console.log(`✅ Success! Mint Token Transaction: ${link}`);
})();