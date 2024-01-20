"use client"
import Hero from "@/components/HeroClient";
import Image from "next/image";
import WalletProviderWrapper from "@/components/WalletProvider";
import Header from "@/components/Header";

export default function Home() {


  return (
    <>
      <WalletProviderWrapper>
      <Header />
        <Hero />
      </WalletProviderWrapper>
    </>
  );
}
