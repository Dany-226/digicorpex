import './interior.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <div className="interior-site"><Header /><main id="main-content" className="flex-1 pt-16">{children}</main><Footer /></div>
}
