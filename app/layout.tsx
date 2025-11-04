import Header from "@/components/Header";
import './globals.css';
import Footer from "@/components/Footer";

export const metadata = {
  title: 'ระบบจัดการห้องพักสำหรับ SMT',
  description: 'ระบบจัดการห้องพักสำหรับ SMT โรงเรียนเมืองสุราษฎร์ธานี',
  keywords: ['ระบบจัดการห้องพัก', 'ห้องพักนักเรียน', 'โรงเรียนเมืองสุราษฎร์ธานี', 'SMT', 'จัดการห้องพัก', 'ค่ายห้องเรียนพิเศษ'],
}

const layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export default layout;