import Providers from "../providers/Providers"
import TopMenu from "../components/TopMenu"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Providers>
          <TopMenu />
          {children}
        </Providers>
      </body>
    </html>
  )
}