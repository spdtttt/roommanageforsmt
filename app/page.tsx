import CampList from "@/components/CampList"
import { Suspense } from "react";
import { BeatLoader } from "react-spinners";

async function CampData() {
  const response = await fetch('/api/camps', {
    cache: 'no-store'
  });
  const camps = await response.json();
  console.log('Fetch Camp: ', camps);

  return <CampList camps={camps} />
}

const page = () => {
  return (
    <div className="px-4 sm:px-8 md:px-15 mt-8">
      <div className="mb-3" style={{
        fontFamily: 'Mitr, sans-serif',
        fontWeight: '500',
        fontSize: '40px'
      }}>ค่ายทั้งหมด</div>

      <div style={{
        width: '85%',
        height: '1.5px',
        backgroundColor: '#c7c7c7',
        marginBottom: '50px'
      }}></div>

      <Suspense fallback={
        <div className="flex justify-center mt-30">
          <BeatLoader color="#5a5c7e" size={18} />
        </div>
      }>
        <CampData />
      </Suspense>
    </div>
  )
}

export default page