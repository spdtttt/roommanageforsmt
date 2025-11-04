import Image from "next/image"

const igURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
const emailURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1024px-Gmail_icon_%282020%29.svg.png"
const fbURL = "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"

const AboutPage = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  return (
    <div className="px-4 sm:px-8 md:px-15 mt-8">
      <div className="text-4xl mb-3 md:text-5xl" style={{
        fontFamily: 'Mitr, sans-serif',
        fontWeight: '500',
      }}>แจ้งปัญหาได้ที่</div>

      <div style={{
        width: '85%',
        height: '1.5px',
        backgroundColor: '#c7c7c7',
      }}></div>

      <div id="igmos" className="mx-5 mt-5 flex items-center gap-10">
        <Image
          src={igURL}
          width={50}
          height={50}
          alt="instagram"
          className="md:w-20"
          priority
        />
        <h1 className="text-3xl break-all md:text-4xl" style={{
          fontFamily: 'Mitr, sans-serif',
          fontWeight: '400'
        }}>@mxsbabixz</h1>
      </div>

      <div id="emailmos" className="mx-5 mt-7 flex items-center gap-10">
        <Image
          src={emailURL}
          width={50}
          height={50}
          alt="email"
          className="md:w-20"
          priority
        />
        <h1 className="text-3xl break-all md:text-4xl" style={{
          fontFamily: 'Mitr, sans-serif',
          fontWeight: '400'
        }}>suppapondangprateep@gmail.com</h1>
      </div>
      
      <div id="fbmos" className="mx-5 mt-7 flex items-center gap-10">
        <Image
          src={fbURL}
          width={50}
          height={50}
          alt="facebook"
          className="md:w-20"
          priority
        />
        <h1 className="text-3xl break-all md:text-4xl" style={{
          fontFamily: 'Mitr, sans-serif',
          fontWeight: '400'
        }}>Suppapon Dangprateep</h1>
      </div>

      <h1 className="text-3xl font-bold mx-5 my-10">หรือ</h1>

      <div id="fbkrukai" className="mx-5 flex items-center gap-10">
        <Image
          src={fbURL}
          width={50}
          height={50}
          alt="facebook"
          className="md:w-20"
          priority
        />
        <h1 className="text-3xl break-all md:text-4xl" style={{
          fontFamily: 'Mitr, sans-serif',
          fontWeight: '400'
        }}>วรัญญา พันธุวงศ์</h1>
      </div>
    </div>
  )
}
export default AboutPage