// WalletProvider.tsx
import React, { useMemo, useEffect, useState, ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { RPC_ENDPOINT } from "@/lib/constants";

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProviderWrapper: React.FC<WalletProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  useEffect(() => setMounted(true), []);

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {mounted && children}                
                    </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  );
};

export default WalletProviderWrapper;
