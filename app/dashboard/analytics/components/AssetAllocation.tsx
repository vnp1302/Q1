"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const allocations = [
  { name: "Q2 Token", percentage: 45, value: "$56,443.84", color: "bg-blue-500" },
  { name: "Ethereum", percentage: 25, value: "$31,357.69", color: "bg-purple-500" },
  { name: "Tether USD", percentage: 15, value: "$18,814.61", color: "bg-green-500" },
  { name: "BNB", percentage: 10, value: "$12,543.08", color: "bg-yellow-500" },
  { name: "سایر", percentage: 5, value: "$6,271.54", color: "bg-gray-500" },
]

export function AssetAllocation() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main">تخصیص دارایی</CardTitle>
          <CardDescription>توزیع درصدی دارایی‌های پورتفولیو</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allocations.map((asset, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className={`w-3 h-3 rounded-full ${asset.color}`}></div>
                    <span className="text-sm font-medium">{asset.name}</span>
                  </div>
                  <div className="text-sm text-text-secondary">
                    {asset.percentage}% • {asset.value}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${asset.color}`}
                    style={{ width: `${asset.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary-main">نمودار دایره‌ای</CardTitle>
          <CardDescription>نمایش بصری تخصیص دارایی</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-medium">
            <div className="text-center text-text-secondary">
              <div className="text-4xl mb-4">🥧</div>
              <p>نمودار دایره‌ای تخصیص دارایی</p>
              <p className="text-xs mt-1">
                (در پیاده‌سازی واقعی، از کتابخانه نمودار استفاده می‌شود)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
