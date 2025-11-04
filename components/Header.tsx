import Image from "next/image"
import Logo from "../public/smt_logo.jpg"
import Link from "next/link"

const Header = () => {
  return (
    <>
      <nav className="flex flex-col md:flex-row justify-between items-center p-4 md:p-4.5 bg-blue-950 w-full md:h-25">
        <div className="flex gap-7 ml-0 md:ml-4 mb-3 md:mb-0">
          <a href="https://www.facebook.com/SMTedication" target="_blank">
            <Image
              src={Logo}
              width={65}
              height={65}
              alt="Logo"
              priority
              className="rounded-full md:w-[65px] md:h-[65px]"
            />
          </a>
          <p className="self-center hover:scale-105 md:hover:scale-110 duration-500 text-center md:text-left ease-in-out" style={{
            fontFamily: 'Mitr, sans-serif',
            fontWeight: '500',
            fontSize: '30px',
            color: 'white'
          }}>
            <span className="hidden md:inline">ระบบจัดการห้องพักนักเรียน</span>
            <span className="md:hidden">ระบบจัดการห้องพัก</span>
          </p>
        </div>

        <div className="flex gap-8 md:gap-15 mr-0 md:mr-20 relative">
          <Link href={'/'} style={{
            fontFamily: 'Mitr, sans-serif',
            fontWeight: '400',
            fontSize: '18px',
            color: 'white',
            position: 'relative',
            display: 'inline-block',
            textDecoration: 'none',
          }} className="group md:text-xl">
            หน้าแรก
            <span
              className="absolute w-full h-[2px] bg-white left-0 -bottom-[5px] scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"
            />
          </Link>
          <Link href={'/about'} style={{
            fontFamily: 'Mitr, sans-serif',
            fontWeight: '400',
            fontSize: '18px',
            color: 'white',
            position: 'relative',
            display: 'inline-block',
            textDecoration: 'none',
          }} className="group md:text-xl">
            ติดต่อ
            <span
              className="absolute w-full h-[2px] bg-white left-0 -bottom-[5px] scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"
            />
          </Link>
        </div>
      </nav>
    </>
  )
}
export default Header