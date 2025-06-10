import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle } from "lucide-react"

interface Solution {
  id: string
  title: string
  description: string
  features: string[]
  pricing: string
  href: string
}

interface SolutionCardProps {
  solution: Solution
}

export function SolutionCard({ solution }: SolutionCardProps) {
  return (
    <div className="card group hover:shadow-high transition-all duration-300 hover:-translate-y-1">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-primary-main mb-3">{solution.title}</h3>
        <p className="text-text-secondary leading-relaxed">{solution.description}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-text-primary mb-3">ویژگی‌های کلیدی:</h4>
        <ul className="space-y-2">
          {solution.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 space-x-reverse">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-neutral-light">
        <div>
          <span className="text-sm text-text-secondary">قیمت شروع از:</span>
          <div className="text-lg font-bold text-primary-main">{solution.pricing}</div>
        </div>

        <Link href={solution.href}>
          <Button className="group-hover:bg-primary-main group-hover:text-text-inverted transition-all duration-300">
            اطلاعات بیشتر
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
