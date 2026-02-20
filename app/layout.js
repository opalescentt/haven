import Providers from "./providers"
import Navbar from "@/components/Navbar"
import "./globals.css"

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    )
}