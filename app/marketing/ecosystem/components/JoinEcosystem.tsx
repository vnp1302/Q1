"use client"
import { useState } from "react"
import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Users, Handshake, Rocket, ArrowRight } from "lucide-react"
import { useApi } from "@/hooks/useApi"

const partnershipTypes = [
  {
    type: "technology",
    title: "شریک فناوری",
    description: "یکپارچگی فنی و توسعه راه‌حل‌های مشترک",
    icon: <Rocket className="w-8 h-8" />,
    benefits: ["دسترسی به API های پیشرفته", "پشتیبانی فنی اختصاصی", "همکاری در توسعه محصول", "برندینگ مشترک"],
    requirements: ["تجربه فنی مرتبط", "محصول یا سرویس فعال", "تیم توسعه مجرب", "رویکرد بلندمدت"],
  },
  {
    type: "business",
    title: "شریک تجاری",
    description: "همکاری در فروش، بازاریابی و توسعه کسب‌وکار",
    icon: <Handshake className="w-8 h-8" />,
    benefits: ["کمیسیون فروش جذاب", "مواد بازاریابی", "آموزش تیم فروش", "پشتیبانی مشتری مشترک"],
    requirements: ["شبکه مشتری مناسب", "تجربه فروش B2B", "تیم فروش آموزش‌دیده", "استراتژی بازاریابی"],
  },
  {
    type: "community",
    title: "شریک جامعه",
    description: "توسعه جامعه، آموزش و پشتیبانی کاربران",
    icon: <Users className="w-8 h-8" />,
    benefits: ["برنامه سفیری", "محتوای آموزشی", "رویدادهای ویژه", "شناسایی در جامعه"],
    requirements: ["فعالیت در جامعه", "مهارت‌های ارتباطی", "علاقه به آموزش", "تعهد بلندمدت"],
  },
]

export function JoinEcosystem() {
  const [selectedType, setSelectedType] = useState("technology")
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    website: "",
    partnershipType: "",
    description: "",
    experience: "",
  })

  const { loading, error, execute } = useApi({
    onSuccess: () => {
      alert("درخواست شما با موفقیت ارسال شد!")
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        website: "",
        partnershipType: "",
        description: "",
        experience: "",
      })
    },
    onError: (error) => {
      alert(`خطا در ارسال درخواست: ${error}`)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await execute(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return { success: true }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const selectedPartnership = partnershipTypes.find((p) => p.type === selectedType)

  return (
    <section className="section-padding bg-background-default" role="region" aria-labelledby="join-title">
      <div className="container-max px-4">
        <div className="text-center mb-16">
          <h2 id="join-title" className="text-h2 text-primary-main mb-4">
            عضویت در اکوسیستم
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            با پیوستن به اکوسیستم Q2، بخشی از آینده فناوری بلاک‌چین شوید
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Partnership Types */}
          <div>
            <h3 className="text-xl font-bold text-primary-main mb-6">انواع همکاری</h3>

            <div className="space-y-4 mb-8">
              {partnershipTypes.map((partnership) => (
                <button
                  key={partnership.type}
                  onClick={() => setSelectedType(partnership.type)}
                  className={`w-full text-right p-4 rounded-medium transition-all duration-200 ${
                    selectedType === partnership.type
                      ? "bg-primary-main text-text-inverted"
                      : "bg-background-paper text-text-secondary hover:bg-primary-main/10 hover:text-primary-main border border-neutral-light"
                  }`}
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={selectedType === partnership.type ? "text-text-inverted" : "text-primary-main"}>
                      {partnership.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{partnership.title}</div>
                      <div className="text-sm opacity-80 mt-1">{partnership.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Partnership Details */}
            {selectedPartnership && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary-main flex items-center space-x-3 space-x-reverse">
                    {selectedPartnership.icon}
                    <span>{selectedPartnership.title}</span>
                  </CardTitle>
                  <CardDescription>{selectedPartnership.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">مزایا:</h4>
                    <ul className="space-y-2">
                      {selectedPartnership.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-text-secondary">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">الزامات:</h4>
                    <ul className="space-y-2">
                      {selectedPartnership.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-center space-x-2 space-x-reverse">
                          <div className="w-2 h-2 bg-secondary-main rounded-full"></div>
                          <span className="text-sm text-text-secondary">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Application Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary-main">درخواست همکاری</CardTitle>
                <CardDescription>فرم زیر را تکمیل کنید تا تیم ما با شما تماس بگیرد</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">نام شرکت *</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="نام شرکت خود را وارد کنید"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactName">نام تماس *</Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="نام و نام خانوادگی"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">ایمیل *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@company.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">وب‌سایت</Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partnershipType">نوع همکاری *</Label>
                    <Select
                      value={formData.partnershipType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, partnershipType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="نوع همکاری را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">شریک فناوری</SelectItem>
                        <SelectItem value="business">شریک تجاری</SelectItem>
                        <SelectItem value="community">شریک جامعه</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">توضیحات پروژه *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="لطفاً درباره شرکت، محصولات و اهداف همکاری توضیح دهید..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">تجربه مرتبط</Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="تجربه قبلی در حوزه بلاک‌چین، فین‌تک یا همکاری‌های مشابه..."
                      rows={3}
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-medium text-red-800">{error}</div>
                  )}

                  <Button type="submit" className="w-full btn-primary" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-4 h-4 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></div>
                        <span>در حال ارسال...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span>ارسال درخواست</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
