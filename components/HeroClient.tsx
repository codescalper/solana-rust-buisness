const Hero = () => {
    return (
      <main className="flex flex-col items-center justify-center px-4 lg:px-8 py-16 lg:py-20">
        <div className="space-y-8 text-center lg:text-left lg:pr-40">
          <h1 className="text-4xl lg:text-6xl font-bold">Solana <span className="text-gradient">Rust</span> Business</h1>
          <p className="text-base lg:text-lg underline underline-offset-4">
            *This is just made for learning purpose*
          </p>
          <p className="text-base lg:text-lg">
          SRB Gen2 offers 5000 unique 24x24 Rust Crab NFTs on Solana, inspired by the Rust programming language. Each item, with Rust-themed aesthetics, serves as an exclusive asset granting NFT ownership and community wallet access.
        </p>
        <p className="text-base lg:text-lg">
          Built on Solana, SRB Gen2 ensures secure transactions. Connect your wallet, mint your Rust Crab NFT, and embrace the Rust philosophy to unlock the full potential of blockchain.
        </p>
        <p className="text-base lg:text-lg">
          Future plans include on-chain voting systems, evolving SRB Gen2 into a dynamic ecosystem. Metadata is stored on solana, providing permanent and decentralized data storage.
        </p>
        
        </div>
      </main>
    );
  };
  
  export default Hero;
  