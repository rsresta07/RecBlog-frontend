import Link from "next/link"
import footerData from "@/utils/mock/footerData.json"

export default function CommonFooter() {
  return (
    <main className="flex gap-12 text-lg text-darkFontColor container mx-auto px-5">
      <h3>{footerData?.copyright}</h3>
      <ul className="flex gap-12">
        {footerData?.socialLinks?.map((link) => (
          <li key={link?.id}>
            <Link href={link?.link}>{link?.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}