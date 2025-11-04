import { getAvailableStudents } from "@/function/getAvailableStudent"
import CampForm from "@/components/CampForm";
import { Suspense } from "react";
import { BeatLoader } from "react-spinners";

async function CampData({ id }: { id: number }) {
  const response = await fetch(`/api/camps/${id}`, {
    cache: 'no-store',
  });
  const campInfo = await response.json();
  const availableStudents = await getAvailableStudents(id);
  
  return (
    <CampForm
      campInfo={campInfo}
      availableStudents={availableStudents}
      campID={id}
    />
  )
}

const AboutCamp = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const idNum = parseInt(id, 10)

  return (
    <Suspense fallback={
      <div className="flex justify-center mt-30 h-screen">
        <BeatLoader color="#5a5c7e" size={18} />
      </div>
    }>
      <CampData id={idNum} />
    </Suspense>
  )
}

export default AboutCamp