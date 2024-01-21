"use client"
import Hero from "@/components/HeroClient";
import Image from "next/image";
import WalletProviderWrapper from "@/components/WalletProvider";
import Header from "@/components/Header";
import DisplayNft from "@/components/DisplayNft";

export default function Home() {


  return (
    <>
      <WalletProviderWrapper>
      <Header />
      <Hero />
      {/* <DisplayNft /> */}
      </WalletProviderWrapper>
    </>
  );
}
