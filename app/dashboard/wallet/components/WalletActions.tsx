"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  Send,
  Download,
  RefreshCw,
  QrCode,
  Copy,
  Plus,
  ArrowUpDown,
  BracketsIcon as Bridge,
  MoreHorizontal,
} from "lucide-react"
import { SendTokenDialog } from "./SendTokenDialog"
import { ReceiveTokenDialog } from "./ReceiveTokenDialog"
import { BuyTokenDialog } from "./BuyTokenDialog"

export function WalletActions() {
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false)
  const [buyDialogOpen, setBuyDialogOpen] = useState(false)

  const handleStake = () => {
    // Navigate to staking page
    window.location.href = "/staking"
  }

  const handleBridge = () => {
    // Navigate to bridge page
    window.location.href = "/bridge"
  }

  const handleSwap = () => {
    // Navigate to swap page or open swap dialog
    console.log("Opening swap...")
  }

  return (
    <div className="flex items-center gap-2">
      {/* Primary Actions */}
      <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Send className="h-4 w-4 ml-2" />
            ارسال
          </Button>
        </DialogTrigger>
        <SendTokenDialog onClose={() => setSendDialogOpen(false)} />
      </Dialog>

      <Dialog open={receiveDialogOpen} onOpenChange={setReceiveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-2" />
            دریافت
          </Button>
        </DialogTrigger>
        <ReceiveTokenDialog onClose={() => setReceiveDialogOpen(false)} />
      </Dialog>

      <Dialog open={buyDialogOpen} onOpenChange={setBuyDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 ml-2" />
            خرید
          </Button>
        </DialogTrigger>
        <BuyTokenDialog onClose={() => setBuyDialogOpen(false)} />
      </Dialog>

      {/* More Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleSwap}>
            <ArrowUpDown className="h-4 w-4 ml-2" />
            تبدیل توکن
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleStake}>
            <RefreshCw className="h-4 w-4 ml-2" />
            استیک کردن
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleBridge}>
            <Bridge className="h-4 w-4 ml-2" />
            پل بین زنجیره‌ها
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <QrCode className="h-4 w-4 ml-2" />
            کد QR آدرس
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy className="h-4 w-4 ml-2" />
            کپی آدرس
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
