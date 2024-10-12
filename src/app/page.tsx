"use client";
import React, { useEffect, useMemo } from "react";
import { ConnectButton } from "@/components/Wallet";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { deployedContract } from "@/constants/deployedContract";
import { useState } from "react";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { parseAbi } from "viem";
import { wagmiConfig } from "@/config/wagmi";
import SwapComponents from "@/components/Swap";

export default function Home() {
  const [newGreeting, setNewGreeting] = useState("");
  const account = useAccount();
  useEffect(() => {}, []);
  const { data: greeting } = useReadContract({
    address: deployedContract.address as `0x${string}`,
    abi: deployedContract.abi,
    functionName: "greeting",
  });
  const { writeContractAsync } = useWriteContract();
  // const { data: availableCapabilities } = useCapabilities({
  //   account: account.address,
  // });
  // const capabilities = useMemo(() => {
  //   if (!availableCapabilities || !account.chainId) return;
  //   const capabilitiesForChain = availableCapabilities[account.chainId];
  //   if (
  //     capabilitiesForChain["paymasterService"] &&
  //     capabilitiesForChain["paymasterService"].supported
  //   ) {
  //     return {
  //       paymasterService: {
  //         url: "https://api.developer.coinbase.com/rpc/v1/base-sepolia/M38cgIFQVu6ldPK0gob81k2_LblbB3jq",
  //       },
  //     };
  //   }
  // }, [availableCapabilities, account.chainId]);
  // console.log(capabilities);
  // const { writeContractsAsync } = useWriteContracts({
  //   config: wagmiConfig,
  // });
  const abi = parseAbi(["function setGreeting(string)"]);
  return (
    <div className="">
      <ConnectButton />

      <div className="mt-20 flex text-center flex-col max-w-[500px] mx-auto">
        <p>Simple Greeter Dapp</p>
        <p>{greeting as string}</p>
        <input
          type="text"
          className="my-2 p-2 border-gray-500 border rounded-md"
          value={newGreeting}
          placeholder="new greeting"
          onChange={(e) => setNewGreeting(e.target.value)}
        />
        <button
          className="bg-gray-300  text-black rounded-md p-2"
          onClick={async () => {
            writeContractAsync({
              address: deployedContract.address as `0x${string}`,
              abi: abi,
              functionName: "setGreeting",
              args: [newGreeting],
            });
          }}
        >
          Set Greeting
        </button>
      </div>
    </div>
  );
}
