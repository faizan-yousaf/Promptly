import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join Promptly</h1>
          <p className="text-gray-400">Create your account to get started</p>
        </div>
        
        <SignUp 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-gray-900/50 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl",
              headerTitle: "text-white text-2xl font-bold",
              headerSubtitle: "text-gray-400",
              formButtonPrimary: "bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] hover:from-[#0284c7] hover:to-[#0891b2] text-black font-semibold rounded-lg py-3 px-6 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#0ea5e9]/25",
              formFieldInput: "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#0ea5e9] focus:ring-[#0ea5e9] rounded-lg",
              formFieldLabel: "text-gray-300 font-medium",
              footerActionLink: "text-[#0ea5e9] hover:text-[#06b6d4] font-medium",
              dividerLine: "bg-gray-700",
              dividerText: "text-gray-400",
              socialButtonsBlockButton: "bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50 rounded-lg",
              formFieldAction: "text-[#0ea5e9] hover:text-[#06b6d4] font-medium",
              formButtonSecondary: "bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50 rounded-lg",
              identityPreviewText: "text-gray-300",
              identityPreviewEditButton: "text-[#0ea5e9] hover:text-[#06b6d4]",
              formResendCodeLink: "text-[#0ea5e9] hover:text-[#06b6d4]",
              otpCodeFieldInput: "bg-gray-800/50 border-gray-700 text-white focus:border-[#0ea5e9] focus:ring-[#0ea5e9] rounded-lg",
              alert: "bg-red-900/50 border-red-700 text-red-200 rounded-lg",
              alertText: "text-red-200",
              alertIcon: "text-red-400",
            },
            variables: {
              colorPrimary: "#0ea5e9",
              colorText: "#ffffff",
              colorTextSecondary: "#9ca3af",
              colorBackground: "#000000",
              colorInputBackground: "#1f2937",
              colorInputText: "#ffffff",
            }
          }}
        />
      </div>
    </div>
  );
}
