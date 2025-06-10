"use client"
import { CheckCircle, X } from "lucide-react"

interface Feature {
  name: string
  basic: boolean
  pro: boolean
  enterprise: boolean
}

const features: Feature[] = [
  { name: "کیف پول چند زنجیره‌ای", basic: true, pro: true, enterprise: true },
  { name: "استیکینگ خودکار", basic: false, pro: true, enterprise: true },
  { name: "توکن‌سازی دارایی‌ها", basic: false, pro: true, enterprise: true },
  { name: "پل بین زنجیره‌ها", basic: false, pro: false, enterprise: true },
  { name: "API دسترسی", basic: false, pro: true, enterprise: true },
  { name: "پشتیبانی ۲۴/۷", basic: false, pro: false, enterprise: true },
  { name: "گزارش‌های تحلیلی", basic: false, pro: true, enterprise: true },
  { name: "امنیت پیشرفته", basic: true, pro: true, enterprise: true },
]

const plans = [
  {
    name: "پایه",
    price: "رایگان",
    description: "برای شروع کار",
    key: "basic" as const,
  },
  {
    name: "حرفه‌ای",
    price: "۵۰ دلار/ماه",
    description: "برای کسب‌وکارها",
    key: "pro" as const,
    popular: true,
  },
  {
    name: "سازمانی",
    price: "تماس بگیرید",
    description: "برای سازمان‌های بزرگ",
    key: "enterprise" as const,
  },
]

export function ComparisonTable() {
  return (
    <section className="bg-background-paper rounded-large p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary-main mb-4">مقایسه پلان‌ها</h2>
        <p className="text-lg text-text-secondary">پلان مناسب خود را انتخاب کنید</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-right py-4 px-6 font-semibold text-text-primary">ویژگی‌ها</th>
              {plans.map((plan) => (
                <th key={plan.key} className="text-center py-4 px-6 relative">
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-secondary-main text-text-inverted px-3 py-1 rounded-full text-xs font-medium">
                        محبوب
                      </span>
                    </div>
                  )}
                  <div className="font-bold text-primary-main text-lg">{plan.name}</div>
                  <div className="text-2xl font-bold text-text-primary mt-2">{plan.price}</div>
                  <div className="text-sm text-text-secondary mt-1">{plan.description}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-background-default" : ""}>
                <td className="py-4 px-6 font-medium text-text-primary">{feature.name}</td>
                {plans.map((plan) => (
                  <td key={plan.key} className="py-4 px-6 text-center">
                    {feature[plan.key] ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
        {plans.map((plan) => (
          <button
            key={plan.key}
            className={`px-8 py-3 rounded-medium font-medium transition-all duration-200 ${
              plan.popular
                ? "bg-primary-main text-text-inverted hover:bg-primary-dark"
                : "border-2 border-primary-main text-primary-main hover:bg-primary-main hover:text-text-inverted"
            }`}
          >
            انتخاب پلان {plan.name}
          </button>
        ))}
      </div>
    </section>
  )
}
