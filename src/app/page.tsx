"use client";
import { ConnectButton } from "@/components/Wallet";
import { useReadContract, useWriteContract } from "wagmi";
import { deployedContract } from "@/constants/deployedContract";
import { useState } from "react";

export default function Home() {
  const [newGreeting, setNewGreeting] = useState("");
  const { data: greeting } = useReadContract({
    address: deployedContract.address as `0x${string}`,
    abi: deployedContract.abi,
    functionName: "greeting",
  });

  const { writeContractAsync } = useWriteContract();
  return (
    <div className="">
      <ConnectButton />

      <div className="mt-20 flex text-center flex-col max-w-[500px] mx-auto">
        <p>Simple Greeter Dapp</p>
        <>{greeting && <p>{greeting as string}</p>}</>
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
              abi: deployedContract.abi,
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
