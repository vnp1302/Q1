import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/src/components/ui/breadcrumbs"
import { Search, MessageCircle, Mail, Phone, FileText, Video, BookOpen, HelpCircle, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "مرکز راهنمایی | Q2 Token Platform",
  description: "راهنمایی، پشتیبانی و پاسخ به سوالات متداول",
}

const faqData = [
  {
    question: "چگونه می‌توانم حساب کاربری ایجاد کنم؟",
    answer:
      'برای ایجاد حساب کاربری، روی دکمه "ثبت‌نام" کلیک کنید و اطلاعات مورد نیاز را وارد کنید. سپس ایمیل تأیید را چک کنید.',
  },
  {
    question: "آیا پلتفرم امن است؟",
    answer: "بله، ما از بالاترین استانداردهای امنیتی استفاده می‌کنیم شامل رمزنگاری، احراز هویت دو مرحله‌ای و نظارت 24/7.",
  },
  {
    question: "چگونه می‌توانم توکن خریداری کنم؟",
    answer: 'پس از ورود به حساب، به بخش "کیف پول" بروید و روی "خرید" کلیک کنید. روش‌های پرداخت مختلفی در دسترس است.',
  },
  {
    question: "کارمزد تراکنش‌ها چقدر است؟",
    answer: 'کارمزدها بر اساس نوع تراکنش متفاوت است. برای اطلاعات دقیق به بخش "کارمزدها" مراجعه کنید.',
  },
]

const supportChannels = [
  {
    title: "چت آنلاین",
    description: "پاسخ فوری به سوالات شما",
    icon: MessageCircle,
    available: true,
    action: "شروع چت",
  },
  {
    title: "ایمیل",
    description: "support@q2token.com",
    icon: Mail,
    available: true,
    action: "ارسال ایمیل",
  },
  {
    title: "تلفن",
    description: "+98 21 1234 5678",
    icon: Phone,
    available: false,
    action: "تماس",
  },
]

const resources = [
  {
    title: "راهنمای شروع",
    description: "آموزش گام به گام استفاده از پلتفرم",
    icon: BookOpen,
    type: "guide",
  },
  {
    title: "ویدیوهای آموزشی",
    description: "آموزش‌های تصویری کامل",
    icon: Video,
    type: "video",
  },
  {
    title: "مستندات API",
    description: "راهنمای توسعه‌دهندگان",
    icon: FileText,
    type: "docs",
  },
]

export default function HelpPage() {
  const breadcrumbItems = [
    { label: "داشبورد", href: "/dashboard" },
    { label: "راهنمایی", href: "/dashboard/help" },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div>
          <h1 className="text-3xl font-bold">مرکز راهنمایی</h1>
          <p className="text-muted-foreground">راهنمایی، پشتیبانی و پاسخ به سوالات شما</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="جستجو در راهنمایی..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">سوالات متداول</TabsTrigger>
          <TabsTrigger value="support">پشتیبانی</TabsTrigger>
          <TabsTrigger value="resources">منابع</TabsTrigger>
          <TabsTrigger value="contact">تماس</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                سوالات متداول
              </CardTitle>
              <CardDescription>پاسخ سوالات رایج کاربران</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-right">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support">
          <div className="grid gap-4 md:grid-cols-3">
            {supportChannels.map((channel, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <channel.icon className="h-5 w-5" />
                    {channel.title}
                    {channel.available && (
                      <Badge variant="secondary" className="text-xs">
                        آنلاین
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    disabled={!channel.available}
                    variant={channel.available ? "default" : "outline"}
                  >
                    {channel.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources">
          <div className="grid gap-4 md:grid-cols-3">
            {resources.map((resource, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <resource.icon className="h-5 w-5" />
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    مشاهده
                    <ExternalLink className="h-4 w-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>تماس با ما</CardTitle>
              <CardDescription>برای سوالات خاص یا مشکلات فنی با ما در تماس باشید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">نام</label>
                  <Input placeholder="نام خود را وارد کنید" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">ایمیل</label>
                  <Input type="email" placeholder="ایمیل خود را وارد کنید" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">موضوع</label>
                <Input placeholder="موضوع پیام خود را وارد کنید" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">پیام</label>
                <textarea
                  className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="پیام خود را اینجا بنویسید..."
                />
              </div>
              <Button className="w-full">ارسال پیام</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
