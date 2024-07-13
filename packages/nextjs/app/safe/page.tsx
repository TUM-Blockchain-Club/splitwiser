"use client";

/* eslint-disable */
import { useEffect, useState } from "react";
import { ExternalLinkIcon, getNetwork, useDynamicContext, useSwitchNetwork } from "@dynamic-labs/sdk-react-core";
import { createWalletClientFromWallet } from "@dynamic-labs/viem-utils";
import { formatUnits } from "viem";
import { baseSepolia } from "viem/chains";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { ERC20_ABI } from "~~/lib/ABI";
import {
  TransactionDetails,
  getTokenTransfersOnBaseSepolia,
  getTransactionOnBaseSepoliaByHash,
  getTransactionsOnBaseSepolia,
} from "~~/lib/blockscout";
import {
  BASE_SEPOLIA_BLOCKSCOUT_TX_BASE_URL,
  CROSSCHAIN_TRANSFER_CONTRACT_BASE_SEPOLIA,
  USDC_ADDRESS,
} from "~~/lib/constants";
import { toMinsAgo } from "~~/lib/date-utils";
import {
  approveERC20,
  crossChainTransferERC20,
  getPimlicoSmartAccountClient,
  transferERC20,
} from "~~/lib/permissionless";
import { notification } from "~~/utils/scaffold-eth";

const SafePage = () => {
  const { address, chain, isConnected } = useAccount();
  const { primaryWallet, isAuthenticated } = useDynamicContext();
  const switchNetwork = useSwitchNetwork();

  const [safeDeployed, setSafeDeployed] = useState(false);
  const [safeAddress, setSafeAddress] = useState<string | null>("");

  const [transactions, setTransactions] = useState<string[]>([]);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails[]>([]);
  const [transferDetails, setTransferDetails] = useState<TransactionDetails[]>([]);
  const [refreshingTransactions, setRefreshingTransactions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [crossChainTransferAmount, setCrossChainTransferAmount] = useState<number>(0);
  const [crossChainTransferTokenAddress] = useState<string>(USDC_ADDRESS[baseSepolia.id]);
  const [crossChainRecipientAddress, setCrossChainRecipientAddress] = useState<string>("");
  const [transferTokenAddress, setTransferTokenAddress] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [network, setNetwork] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: safeBalance, refetch: refetchSafeBalance } = useBalance({
    address: (safeAddress || ("" as `0x${string}`)) as `0x${string}`,
    chainId: chain?.id,
  });

  function extractAndDecodeHexString(input: string) {
    // Regular expression to match a hexadecimal string
    const hexPattern = /0x[0-9A-Fa-f]+/;

    // Match the input string against the pattern
    const match = input.match(hexPattern);

    // Return the decoded hex string or null if no match is found
    if (match) {
      const hexString = match[0];
      // Remove the '0x' prefix
      const cleanedHexString = hexString.slice(2);
      // Decode the hex string
      let decodedString = "";
      for (let i = 0; i < cleanedHexString.length; i += 2) {
        decodedString += String.fromCharCode(parseInt(cleanedHexString.substr(i, 2), 16));
      }
      return decodedString;
    } else {
      return null;
    }
  }

  const { data: safeUSDCBalance, refetch: refetchSafeUSDCBalance } = useReadContract({
    abi: ERC20_ABI,
    address: chain ? USDC_ADDRESS[chain?.id] : ("" as `0x${string}`),
    functionName: "balanceOf",
    args: [safeAddress],
  });

  const fetchNetwork = async () => {
    if (!primaryWallet) return;
    const network = Number(await getNetwork(primaryWallet.connector));
    setNetwork(network);
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PIMLICO_API_KEY) {
      notification.error("Please set NEXT_PUBLIC_PIMLICO_API_KEY in .env file.");
    }
  }, []);

  useEffect(() => {
    fetchNetwork();
  }, [primaryWallet]);

  const handleDeploySafe = async () => {
    setLoading(true);
    setError(null);
    try {
      const userAddress = address as `0x${string}`;
      if (!primaryWallet || !chain) return;

      if (!process.env.NEXT_PUBLIC_PIMLICO_API_KEY) {
        notification.error("Please set NEXT_PUBLIC_PIMLICO_API_KEY in .env file and restart");
        return;
      }

      const walletClient = await createWalletClientFromWallet(primaryWallet);
      const { account } = await getPimlicoSmartAccountClient(userAddress, chain, walletClient);
      setSafeAddress(account.address);
      setSafeDeployed(true);
      refetchSafeBalance();
      refetchSafeUSDCBalance();
    } catch (err) {
      setError("Failed to deploy Safe account.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleERC20Transfer = async () => {
    setLoading(true);
    setError(null);
    try {
      const userAddress = address as `0x${string}`;
      if (!primaryWallet || !chain) return;
      const walletClient = await createWalletClientFromWallet(primaryWallet);
      const smartAccountClient = await getPimlicoSmartAccountClient(userAddress, chain, walletClient);
      const txHash = await transferERC20(
        smartAccountClient,
        transferTokenAddress,
        BigInt(transferAmount * 10 ** 6),
        recipientAddress,
      );

      notification.success("Crosschain transfer initiated successfully: " + txHash);
      console.log("txHash", txHash);
      setTransactions([...transactions, txHash]);
      const transactionDetail = await getTransactionOnBaseSepoliaByHash(txHash);
      setTransactionDetails([...transactionDetails, transactionDetail]);
    } catch (err) {
      setError("Failed to transfer tokens.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const refreshTransactions = async () => {
    setRefreshingTransactions(true);
    setTransactionDetails([]);
    const txDetails = [];

    setTransferDetails([]);
    const transferDetails = [];

    if (!primaryWallet) return;
    const transactions = await getTransactionsOnBaseSepolia(primaryWallet.address);
    const transfers = await getTokenTransfersOnBaseSepolia(primaryWallet.address);

    for (const txHash of transactions) {
      const transactionDetail = await getTransactionOnBaseSepoliaByHash(txHash);
      txDetails.push(transactionDetail);
      setTransactionDetails(txDetails);
    }

    for (const transfer of transfers) {
      const transactionDetail = await getTransactionOnBaseSepoliaByHash(transfer.tx_hash);
      transferDetails.push(transactionDetail);
      setTransferDetails(transferDetails);
    }

    setRefreshingTransactions(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleERC20CrossChainTransfer = async () => {
    setLoading(true);
    setError(null);
    try {
      const userAddress = address as `0x${string}`;
      if (!primaryWallet || !chain) return;
      const walletClient = await createWalletClientFromWallet(primaryWallet);
      const smartAccountClient = await getPimlicoSmartAccountClient(userAddress, chain, walletClient);
      const approveHash = await approveERC20(
        smartAccountClient,
        crossChainTransferTokenAddress,
        BigInt(crossChainTransferAmount * 10 ** 6),
        CROSSCHAIN_TRANSFER_CONTRACT_BASE_SEPOLIA,
      );
      console.log("approveHash", approveHash);

      const txHash = await crossChainTransferERC20(
        smartAccountClient,
        crossChainTransferTokenAddress,
        BigInt(crossChainTransferAmount * 10 ** 6),
        crossChainRecipientAddress,
      );

      notification.success("Crosschain transfer initiated successfully: " + txHash);
      console.log("txHash", txHash);
      setTransactions([...transactions, txHash]);
      const transactionDetail = await getTransactionOnBaseSepoliaByHash(txHash);
      setTransferDetails([...transactionDetails, transactionDetail]);
    } catch (err) {
      if (err instanceof Error) {
        const hasHexError = extractAndDecodeHexString((err as any).details);
        if (hasHexError !== null) {
          notification.error(hasHexError);
          console.error(hasHexError);
        } else {
          notification.error((error as any).details);
          console.error((error as any).details);
        }
      } else {
        setError("Failed to transfer tokens.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const canTransfer = transferAmount > 0 && transferTokenAddress && recipientAddress;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const canCrossChainTransfer =
    crossChainTransferAmount > 0 && crossChainRecipientAddress && crossChainTransferTokenAddress;

  return (
    <div className="flex flex-col space-y-4 p-4 max-w-md mx-3">
      <div className="flex flex-col ">
        <h1 className="text-4xl font-bold">Functional Wallet</h1>
        <h2 className="text-2xl">Powered by Safe</h2>
        <p className="text-lg">
          A Functional Wallet is a wallet that will be used for
          background interaction between you and our smart contract
          to alleviate the gas fees.
        </p>
      </div>

      {safeDeployed ? (<p className={"max-w-full truncate"}>Your functional wallet address: <br/>{safeAddress}</p>) : (
        <>
          {isConnected && isAuthenticated && network !== baseSepolia.id ? (
            <button
              className="btn btn-success"
              onClick={() => switchNetwork({ wallet: primaryWallet, network: baseSepolia.id })}
            >
              Switch to Base Sepolia
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={handleDeploySafe}
              disabled={loading || !isConnected || !isAuthenticated}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>Deploying...
                </>
              ) : isConnected && isAuthenticated ? (
                "Deploy Safe Account"
              ) : (
                "Connect Wallet first"
              )}
            </button>
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </>
      )}
    </div>
  );
};

export default SafePage;
