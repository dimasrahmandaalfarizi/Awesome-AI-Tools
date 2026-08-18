import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getAllDocs, getDocBySlug } from "@/data/docs"
import { DocsLayout } from "@/components/docs/DocsLayout"
import { routing } from "@/i18n/routing"

export function generateStaticParams() {
  const docs = getAllDocs()
  const params: { locale: string; slug: string[] }[] = []

  for (const locale of routing.locales) {
    for (const doc of docs) {
      params.push({
        locale,
        slug: [doc.slug],
      })
    }
  }

  return params
}

export default async function DynamicDocPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const docSlug = Array.isArray(slug) ? slug[0] : slug
  const doc = getDocBySlug(docSlug)

  if (!doc) {
    notFound()
  }

  return <DocsLayout doc={doc} />
}
