import React from "react";
import { LoaderThree } from "@/components/ui/loader";

export function LoaderThreeDemo() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        <LoaderThree />
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Promptly
          </h2>
          <p className="text-gray-400 text-sm">Loading your AI experience...</p>
        </div>
      </div>
    </div>
  );
}