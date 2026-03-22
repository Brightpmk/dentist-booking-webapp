import "./globals.css"
import Providers from "../providers/Providers"
import TopMenu from "../components/TopMenu"
import { Playfair_Display } from "next/font/google"


const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={serif.variable}>
      <body>
        <Providers>
          <TopMenu />
          {children}
        </Providers>
      </body>
    </html>
  )
}