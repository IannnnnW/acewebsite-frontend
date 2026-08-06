import Header from '@/Components/layout/Header'
import Footer from '@/Components/layout/Footer'

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}
