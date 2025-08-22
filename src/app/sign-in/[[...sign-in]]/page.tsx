import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-gray-900/50 backdrop-blur-xl border border-white/10 shadow-2xl",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              formButtonPrimary: "bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] hover:from-[#0284c7] hover:to-[#0891b2] text-black font-semibold",
              formFieldInput: "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#0ea5e9] focus:ring-[#0ea5e9]",
              formFieldLabel: "text-gray-300",
              footerActionLink: "text-[#0ea5e9] hover:text-[#06b6d4]",
              dividerLine: "bg-gray-700",
              dividerText: "text-gray-400",
              socialButtonsBlockButton: "bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50",
              formFieldAction: "text-[#0ea5e9] hover:text-[#06b6d4]",
            },
          }}
        />
      </div>
    </div>
  );
}
