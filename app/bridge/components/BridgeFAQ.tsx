"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: "پل بین زنجیره‌ای چیست؟",
    answer:
      "پل بین زنجیره‌ای یک راهکار فنی است که به کاربران امکان می‌دهد دارایی‌های دیجیتال خود را بین بلاک‌چین‌های مختلف منتقل کنند. این فناوری ا��کان تعامل بین اکوسیستم‌های مختلف بلاک‌چین را فراهم می‌کند و محدودیت‌های ذاتی هر زنجیره را برطرف می‌سازد.",
  },
  {
    question: "چگونه می‌توانم از پل بین زنجیره‌ای Q2 استفاده کنم؟",
    answer:
      "استفاده از پل بین زنجیره‌ای Q2 بسیار ساده است. ابتدا زنجیره مبدأ و مقصد را انتخاب کنید، سپس توکن و مقدار مورد نظر را مشخص کنید و آدرس گیرنده را وارد نمایید. پس از تأیید تراکنش، دارایی شما در زنجیره مقصد دریافت خواهد شد.",
  },
  {
    question: "کارمزد انتقال بین زنجیره‌ای چقدر است؟",
    answer:
      "کارمزد انتقال بین زنجیره‌ای Q2 بسیار رقابتی و معمولاً حدود ۰.۱٪ از مقدار انتقال است. این کارمزد بسته به زنجیره‌های مبدأ و مقصد، نوع توکن و شرایط شبکه ممکن است متفاوت باشد. کارمزد دقیق قبل از تأیید تراکنش به شما نمایش داده می‌شود.",
  },
  {
    question: "چه مدت طول می‌کشد تا انتقال بین زنجیره‌ای تکمیل شود؟",
    answer:
      "زمان تکمیل انتقال بین زنجیره‌ای معمولاً بین ۲ تا ۵ دقیقه است. این زمان بسته به شرایط شبکه‌های مبدأ و مقصد، تراکم شبکه و تعداد تأییدیه‌های مورد نیاز ممکن است متفاوت باشد. در برخی موارد نادر، ممکن است تا ۳۰ دقیقه طول بکشد.",
  },
  {
    question: "آیا حداقل و حداکثر مقدار برای انتقال وجود دارد؟",
    answer:
      "بله، برای هر توکن حداقل و حداکثر مقدار انتقال تعیین شده است. این محدودیت‌ها برای اطمینان از امنیت و کارایی سیستم اعمال می‌شوند. حداقل مقدار معمولاً برای پوشش هزینه‌های انتقال و حداکثر مقدار برای مدیریت ریسک و نقدینگی تعیین می‌شود.",
  },
  {
    question: "اگر انتقال من با مشکل مواجه شود، چه کاری باید انجام دهم؟",
    answer:
      "اگر انتقال شما با مشکل مواجه شود، نگران نباشید. ابتدا می‌توانید وضعیت تراکنش را در بخش تاریخچه تراکنش‌ها بررسی کنید. اگر وضعیت تراکنش «ناموفق» باشد، سیستم به طور خودکار وجوه را به آدرس مبدأ برمی‌گرداند. اگر وضعیت «در حال انجام» باقی ماند، می‌توانید با پشتیبانی ۲۴/۷ ما تماس بگیرید.",
  },
  {
    question: "آیا پل بین زنجیره‌ای Q2 امن است؟",
    answer:
      "بله، امنیت اولویت اصلی پل بین زنجیره‌ای Q2 است. ما از سیستم امنیتی چندلایه، رمزگذاری پیشرفته و مکانیزم‌های تأیید چندمرحله‌ای استفاده می‌کنیم. علاوه بر این، قراردادهای هوشمند ما توسط شرکت‌های معتبر امنیتی حسابرسی شده‌اند و به طور مداوم مانیتور می‌شوند.",
  },
  {
    question: "آیا می‌توانم انتقال خود را لغو کنم؟",
    answer:
      "پس از تأیید تراکنش و ارسال آن به شبکه بلاک‌چین، امکان لغو آن وجود ندارد. به همین دلیل، توصیه می‌کنیم قبل از تأیید نهایی، تمام جزئیات انتقال را با دقت بررسی کنید. اگر اشتباهی در آدرس گیرنده وجود داشته باشد، بازیابی وجوه ممکن است غیرممکن باشد.",
  },
  {
    question: "کدام توکن‌ها پشتیبانی می‌شوند؟",
    answer:
      "پل بین زنجیره‌ای Q2 از طیف گسترده‌ای از توکن‌ها پشتیبانی می‌کند، از جمله توکن‌های اصلی زنجیره‌ها (مانند ETH، BNB، MATIC)، استیبل کوین‌ها (مانند USDT، USDC، DAI) و توکن Q2 اختصاصی ما. لیست کامل توکن‌های پشتیبانی شده برای هر زنجیره در بخش «زنجیره‌های پشتیبانی شده» قابل مشاهده است.",
  },
  {
    question: "آیا نیاز به احراز هویت برای استفاده از پل بین زنجیره‌ای وجود دارد؟",
    answer:
      "برای انتقال‌های با مقادیر کم، نیازی به احراز هویت نیست. اما برای انتقال‌های با مقادیر بالا (بیش از معادل ۱۰,۰۰۰ دلار)، به منظور رعایت قوانین مبارزه با پولشویی و شناخت مشتری (AML/KYC)، ممکن است نیاز به تکمیل فرآیند احراز هویت داشته باشید.",
  },
]

export function BridgeFAQ() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleItem = (value: string) => {
    setExpandedItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <section className="section-padding bg-background-paper" role="region" aria-labelledby="faq-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="faq-title" className="text-h2 text-primary-main mb-4">
            سؤالات متداول
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">پاسخ به سؤالات رایج درباره پل بین زنجیره‌ای Q2</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="multiple" value={expandedItems} className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-neutral-light rounded-medium overflow-hidden"
              >
                <AccordionTrigger
                  onClick={() => toggleItem(`item-${index}`)}
                  className="px-6 py-4 hover:bg-background-default/50 transition-colors duration-200"
                >
                  <span className="text-right font-semibold text-primary-main">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-text-secondary leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Support */}
        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-4">هنوز سؤال دیگری دارید؟</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>تماس با پشتیبانی</Button>
            <Button variant="outline">مشاهده مستندات</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
