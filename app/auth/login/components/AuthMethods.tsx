"use client"
import { Button } from "@/components/ui/button"
import { Wallet, Smartphone, Fingerprint } from "lucide-react"

const authMethods = [
  {
    id: "wallet",
    name: "ورود با کیف پول",
    description: "MetaMask, WalletConnect",
    icon: <Wallet className="w-5 h-5" />,
    color: "bg-orange-500",
  },
  {
    id: "biometric",
    name: "احراز هویت بیومتریک",
    description: "اثر انگشت، تشخیص چهره",
    icon: <Fingerprint className="w-5 h-5" />,
    color: "bg-green-500",
  },
  {
    id: "sms",
    name: "کد تایید پیامکی",
    description: "ارسال کد به شماره موبایل",
    icon: <Smartphone className="w-5 h-5" />,
    color: "bg-blue-500",
  },
]

export function AuthMethods() {
  const handleAuthMethod = (method: string) => {
    console.log(`Auth method: ${method}`)
    // Handle different authentication methods
  }

  return (
    <div className="space-y-3">
      {authMethods.map((method) => (
        <Button
          key={method.id}
          variant="outline"
          className="w-full justify-start h-auto p-4 hover:bg-primary-main/5 transition-colors duration-200"
          onClick={() => handleAuthMethod(method.id)}
        >
          <div className={`p-2 rounded-medium ${method.color} text-white ml-4`}>{method.icon}</div>
          <div className="text-right flex-1">
            <div className="font-medium text-text-primary">{method.name}</div>
            <div className="text-sm text-text-secondary">{method.description}</div>
          </div>
        </Button>
      ))}
    </div>
  )
}
