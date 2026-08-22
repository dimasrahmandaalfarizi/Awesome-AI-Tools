import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { SecurityClient } from "./SecurityClient"
import { routing } from "@/i18n/routing"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[var(--background)] min-h-[calc(100vh-16rem)]">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <SecurityClient locale={locale} />
        </div>
      </main>
      <Footer />
    </>
  )
}
