import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getDocBySlug } from "@/data/docs"
import { DocsLayout } from "@/components/docs/DocsLayout"

export default async function DocsRootPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const doc = getDocBySlug("quickstart")
  if (!doc) {
    notFound()
  }

  return <DocsLayout doc={doc} />
}
