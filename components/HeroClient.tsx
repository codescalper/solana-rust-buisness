"use client";
// @ts-ignore
import {
  guestIdentity,
  Metaplex,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

import { CANDY_MACHINE_ID } from "@/lib/constants";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

interface CandyStateType {
  address: string;
  collectionMintAddress: string;
  candyGuard: any; // Replace with the correct type
  authorityAddress: string;
  items: any[]; // Replace with the correct type
  itemsAvailable: any; // Replace with the correct type
  itemsMinted: any; // Replace with the correct type
  itemsRemaining: any; // Replace with the correct type
}

const Hero = () => {
  const [metaplex, setMetaplex] = useState<any | null>(null);
  const [candyState, setCandyState] = useState<CandyStateType | null>(null);
  const [candyStateError, setCandyStateError] = useState<string | null>(null);
  const [candyStateLoading, setCandyStateLoading] = useState<boolean>(true);
  const [txError, setTxError] = useState<string | null>(null);
  const [txLoading, setTxLoading] = useState<boolean>(false);

  const [nfts, setNfts] = useState([]);

  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  useEffect(() => {
    setMetaplex(
      Metaplex.make(connection).use(
        wallet ? walletAdapterIdentity(wallet) : guestIdentity()
      )
    );
  }, [connection, wallet]);

  useEffect(() => {
    if (!metaplex) return;

    const updateState = async () => {
      try {
        const state = await metaplex
          .candyMachines()
          .findByAddress({ address: CANDY_MACHINE_ID });
        setCandyState(state);
        setNfts(state.items);
        setCandyStateError(null);
      } catch (e: any) {
        console.log(e);
        toast.error("Error has occured!");
        setCandyStateError(e.message);
      } finally {
        setCandyStateLoading(false);
        toast.success("Updated state!");
      }
    };

    updateState();

    // Refresh the state every 30s
    const intervalId = setInterval(() => updateState(), 30_000);

    return () => clearInterval(intervalId);
  }, [metaplex]);

  const mint = async () => {
    if (!metaplex || !candyState) return;

    setTxLoading(true);
    setTxError(null);

    try {
      const mintResult = await metaplex.candyMachines().mint({
        candyMachine: {
          address: candyState.address,
          collectionMintAddress: candyState.collectionMintAddress,
          candyGuard: candyState.candyGuard,
        },
        collectionUpdateAuthority: candyState.authorityAddress,
        group: null,
      });

      console.log({ mintResult });
    } catch (e: any) {
      console.log(e);
      toast.error("Failed to mint NFT");
      setTxError(e.message);
    } finally {
      setTxLoading(false);
      toast.success("Minted NFT");
    }
  };

  const soldOut = candyState?.itemsRemaining.eqn(0);
  const solAmount = candyState?.candyGuard?.guards?.solPayment
    ? candyState.candyGuard.guards.solPayment.lamports.toNumber() /
      LAMPORTS_PER_SOL
    : null;

  return (
    <main className="flex flex-col items-center justify-center px-4 lg:px-8 py-16 lg:py-20">
      <div className="space-y-8 text-center lg:text-left lg:pr-40">
        <h1 className="text-4xl lg:text-6xl font-bold">
          Solana <span className="text-gradient">Rust</span> Business
        </h1>
        <p className="text-base lg:text-lg underline underline-offset-4">
          *This is just made for learning purpose*
        </p>
        <p className="text-base lg:text-lg">
          SRB Gen2 offers 5000 unique 24x24 Rust Crab NFTs on Solana, inspired
          by the Rust programming language. Each item, with Rust-themed
          aesthetics, serves as an exclusive asset granting NFT ownership and
          community wallet access.
        </p>
        <p className="text-base lg:text-lg">
          Built on Solana, SRB Gen2 ensures secure transactions. Connect your
          wallet, mint your Rust Crab NFT, and embrace the Rust philosophy to
          unlock the full potential of blockchain.
        </p>
        <p className="text-base lg:text-lg">
          Future plans include on-chain voting systems, evolving SRB Gen2 into a
          dynamic ecosystem. Metadata is stored on solana, providing permanent
          and decentralized data storage.
        </p>
        <div>
          {candyStateLoading ? (
            <div>Loading...</div>
          ) : candyStateError ? (
            <div>{candyStateError}</div>
          ) : (
            candyState && (
              <div>
                <div>Total items: {candyState.itemsAvailable.toString()}</div>
                <div>Minted items: {candyState.itemsMinted.toString()}</div>
                <div>
                  Remaining items: {candyState.itemsRemaining.toString()}
                </div>
                {solAmount && <div>Cost: ◎ {solAmount}</div>}
                {txError && <div>{txError}</div>}
                <div className="flex flex-col lg:flex-row flex-1 pt-5  space-y-10">
                  <button
                    className="flex flex-col lg:flex-row flex-1 pt-5  space-y-10"
                    onClick={mint}
                    disabled={!wallet || txLoading || soldOut}
                  >
                    {soldOut ? "SOLD OUT" : txLoading ? "LOADING..." : "MINT"}
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default Hero;
