import { Shield, Lock, TrendingUp, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Q2 Token Platform</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enterprise-grade secure trading platform with advanced security features, biometric authentication, and
            comprehensive compliance monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Shield className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">Multi-Layer Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Biometric auth, WebAuthn, OTP, and advanced encryption
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Lock className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-white">End-to-End Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Asymmetric encryption with secure key management
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Secure Trading</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Futures trading bot with compliance monitoring
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <Eye className="w-8 h-8 text-red-400 mb-2" />
              <CardTitle className="text-white">SIEM Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">
                Real-time threat detection and incident response
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-semibold">
            <Shield className="w-5 h-5 mr-2" />
            Security First Architecture
          </div>
        </div>
      </div>
    </div>
  )
}
