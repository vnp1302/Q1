"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, MessageCircle, Book, Video, Search, ExternalLink, ChevronRight, Mail, Phone } from 'lucide-react'
import { useState } from "react"

const faqItems = [
  {
    question: "چگونه می‌توانم توکن Q2 خریداری کنم؟",
    answer: "شما می‌توانید از طریق صرافی‌های پشتیبانی شده یا مستقیماً از پلتفرم ما توکن Q2 خریداری کنید.",
    category: "خرید"
  },
  {
    question: "استیکینگ چگونه کار می‌کند؟",
    answer: "استیکینگ فرآیندی است که در آن توکن‌های خود را قفل می‌کنید تا به امنیت شبکه کمک کنید و در ازای آن پاداش دریافت کنید.",
    category: "استیکینگ"
  },
  {
    question: "آیا پلتفرم امن است؟",
    answer: "بله، ما از بالاترین استانداردهای امنیتی شامل رمزگذاری end-to-end و احراز هویت دو مرحله‌ای استفاده می‌کنیم.",
    category: "امنیت"
  }
]

const tutorials = [
  {
    title: "راه‌اندازی کیف پول",
    description: "آموزش گام به گام ایجاد و تنظیم کیف پول",
    duration: "5 دقیقه",
    type: "video"
  },
  {
    title: "شروع استیکینگ",
    description: "نحوه انتخاب validator و شروع استیکینگ",
    duration: "8 دقیقه",
    type: "article"
  },
  {
    title: "استفاده از پل بین زنجیره‌ها",
    description: "انتقال دارایی بین شبکه‌های مختلف",
    duration: "6 دقیقه",
    type: "video"
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFAQ = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-main">مرکز راهنما</h1>
        <p className="text-text-secondary">پاسخ سوالات شما و راهنمای استفاده از پلتفرم</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-main w-5 h-5" />
            <Input
              placeholder="جستجو در راهنما..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">سوالات متداول</TabsTrigger>
          <TabsTrigger value="tutorials">آموزش‌ها</TabsTrigger>
          <TabsTrigger value="contact">تماس با ما</TabsTrigger>
          <TabsTrigger value="resources">منابع</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
                <HelpCircle className="w-5 h-5" />
                <span>سوالات متداول</span>
              </CardTitle>
              <CardDescription>پاسخ سوالات رایج کاربران</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <div key={index} className="border border-neutral-light rounded-medium p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          <h3 className="font-semibold text-text-primary">{item.question}</h3>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-text-secondary">{item.answer}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-neutral-main" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
                <Book className="w-5 h-5" />
                <span>آموزش‌ها و راهنماها</span>
              </CardTitle>
              <CardDescription>آموزش‌های گام به گام استفاده از پلتفرم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="border border-neutral-light rounded-medium p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="w-10 h-10 bg-primary-main/10 rounded-medium flex items-center justify-center">
                        {tutorial.type === 'video' ? (
                          <Video className="w-5 h-5 text-primary-main" />
                        ) : (
                          <Book className="w-5 h-5 text-primary-main" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary mb-1">{tutorial.title}</h3>
                        <p className="text-sm text-text-secondary mb-2">{tutorial.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {tutorial.duration}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary-main flex items-center space-x-2 space-x-reverse">
                  <MessageCircle className="w-5 h-5" />
                  <span>پشتیبانی آنلاین</span>
                </CardTitle>
                <CardDescription>چت مستقیم با تیم پشتیبانی</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-medium">
                    <div className="flex items-center space-x-2 space-x-reverse text-green-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">آنلاین - پاسخگویی فوری</span>
                    </div>
                  </div>
                  <Button className="w-full btn-primary">
                    <MessageCircle className="w-4 h-4 ml-2" />
                    شروع چت
                  </Button>
                  <p className="text-xs text-text-secondary text-center">
                    زمان پاسخگویی: ۲۴/۷
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-primary-main">راه‌های تماس</CardTitle>
                <CardDescription>سایر روش‌های ارتباط با ما</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Mail className="w-5 h-5 text-primary-main" />
                    <div>
                      <div className="font-medium">ایمیل</div>
                      <div className="text-sm text-text-secondary">support@q2platform.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Phone className="w-5 h-5 text-primary-main" />
                    <div>
                      <div className="font-medium">تلفن</div>
                      <div className="text-sm text-text-secondary">۰۲۱-۱۲۳۴۵۶۷۸</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-medium">
                    <p className="text-sm text-blue-800">
                      برای پشتیبانی فوری از چت آنلاین استفاده کنید
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary-main">منابع مفید</CardTitle>
              <CardDescription>اسناد فنی و منابع اضافی</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Book className="w-5 h-5" />
                    <div className="text-right">
                      <div className="font-medium">مستندات API</div>
                      <div className="text-sm text-text-secondary">راهنمای توسعه‌دهندگان</div>
                    </div>
                  </div>
                </Button>

                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <ExternalLink className="w-5 h-5" />
                    <div className="text-right">
                      <div className="font-medium">وایت پیپر</div>
                      <div className="text-sm text-text-secondary">سند فنی پروژه</div>
                    </div>
                  </div>
                </Button>

                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <MessageCircle className="w-5 h-5" />
                    <div className="text-right">
                      <div className="font-medium">انجمن کاربران</div>
                      <div className="text-sm text-text-secondary">بحث و تبادل نظر</div>
                    </div>
                  </div>
                </Button>

                <Button variant="outline" className="h-auto p-4 justify-start">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Video className="w-5 h-5" />
                    <div className="text-right">
                      <div className="font-medium">کانال یوتیوب</div>
                      <div className="text-sm text-text-secondary">ویدیوهای آموزشی</div>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
