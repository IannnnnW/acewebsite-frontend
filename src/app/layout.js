import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ACE Uganda - African Center of Excellence in Bioinformatics and Data Intensive Sciences',
  description: 'ACE-Uganda is dedicated to advancing health outcomes through innovative High-Performance Computing (HPC), Bioinformatics, Visualization, and Data Science.',
  keywords: ['bioinformatics', 'HPC', 'data science', 'Uganda', 'research', 'genomics', 'cancer research', 'AMR'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}