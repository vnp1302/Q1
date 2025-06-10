"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, MessageCircle, Users, Zap, Shield, Code, ExternalLink, Download, GitBranch } from "lucide-react"

const resources = [
  {
    title: "مستندات کامل",
    description: "راهنمای جامع API ها، SDK ها و بهترین practices",
    icon: <BookOpen className="w-8 h-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    links: [
      { label: "شروع سریع", href: "/docs/quickstart" },
      { label: "مرجع API", href: "/docs/api" },
      { label: "راهنمای SDK", href: "/docs/sdk" },
    ],
  },
  {
    title: "انجمن توسعه‌دهندگان",
    description: "بحث، سوال و پاسخ با جامعه توسعه‌دهندگان",
    icon: <Users className="w-8 h-8" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
    links: [
      { label: "Discord", href: "https://discord.gg/q2platform" },
      { label: "Telegram", href: "https://t.me/q2developers" },
      { label: "فروم", href: "/forum" },
    ],
  },
  {
    title: "پشتیبانی فنی",
    description: "دریافت کمک از تیم فنی Q2 برای مسائل پیچیده",
    icon: <MessageCircle className="w-8 h-8" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    links: [
      { label: "تیکت پشتیبانی", href: "/support/ticket" },
      { label: "چت زنده", href: "/support/chat" },
      { label: "ایمیل", href: "mailto:dev-support@q2platform.com" },
    ],
  },
]

const tools = [
  {
    name: "Q2 CLI",
    description: "ابزار خط فرمان برای مدیریت پروژه‌ها",
    icon: <Code className="w-6 h-6" />,
    installation: "npm install -g @q2-platform/cli",
    features: ["پروژه scaffolding", "Deploy automation", "Testing tools"],
  },
  {
    name: "Testnet Faucet",
    description: "دریافت توکن تست برای توسعه",
    icon: <Zap className="w-6 h-6" />,
    installation: "درخواست از طریق پنل توسعه‌دهنده",
    features: ["توکن‌های تست رایگان", "محدودیت روزانه", "چندین شبکه"],
  },
  {
    name: "Security Scanner",
    description: "بررسی امنیت قراردادهای هوشمند",
    icon: <Shield className="w-6 h-6" />,
    installation: "q2 security scan <contract-address>",
    features: ["تحلیل خودکار", "گزارش تفصیلی", "پیشنهادات بهبود"],
  },
]

export function DeveloperResources() {
  return (
    <section className="section-padding bg-background-default" role="region" aria-labelledby="resources-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="resources-title" className="text-h2 text-primary-main mb-4">
            منابع توسعه‌دهندگان
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            همه چیزی که برای شروع توسعه روی پلتفرم Q2 نیاز دارید
          </p>
        </div>

        {/* Main Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {resources.map((resource, index) => (
            <Card key={index} className="text-center hover:shadow-high transition-all duration-300">
              <CardHeader>
                <div
                  className={`w-16 h-16 ${resource.bgColor} rounded-large flex items-center justify-center mx-auto mb-4`}
                >
                  <div className={resource.color}>{resource.icon}</div>
                </div>
                <CardTitle className="text-primary-main">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {resource.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      className="block text-primary-main hover:text-primary-dark transition-colors duration-200 focus-visible"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Developer Tools */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary-main text-center mb-8">ابزارهای توسعه</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="p-2 bg-primary-main/10 rounded-medium text-primary-main">{tool.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">نصب:</h4>
                      <code className="text-sm bg-gray-100 p-2 rounded block">{tool.installation}</code>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary mb-2">ویژگی‌ها:</h4>
                      <ul className="space-y-1">
                        {tool.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-text-secondary flex items-center">
                            <div className="w-1.5 h-1.5 bg-secondary-main rounded-full ml-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* GitHub Repository */}
        <div className="text-center">
          <Card className="bg-gray-900 text-white max-w-4xl mx-auto">
            <CardContent className="p-8">
              <GitBranch className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <h3 className="text-2xl font-bold mb-4">مخزن GitHub</h3>
              <p className="text-gray-300 mb-6">کد منبع، نمونه پروژه‌ها و مشارکت در توسعه پلتفرم</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  <ExternalLink className="w-4 h-4 ml-2" />
                  مشاهده در GitHub
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                  <Download className="w-4 h-4 ml-2" />
                  دانلود نمونه پروژه‌ها
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
