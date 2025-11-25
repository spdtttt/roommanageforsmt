'use client'
import Link from "next/link";
import { useEffect, useState } from "react"
import Select from "react-select";

interface Camp {
    id: number;
    title: string;
    class: number;
    date: string;
    max: number;
}

type Option = {
    value: string;
    label: string;
}

const options: Option[] = [
    { value: '409', label: '4/9' },
    { value: '509', label: '5/9' },
    { value: '609', label: '6/9' }
]

const CampList = ({ camps }: { camps: Camp[] }) => {
    const [availableCamps, setAvailableCamps] = useState<Camp[]>([]);
    const [notAvailableCamps, setNotAvailableCamps] = useState<Camp[]>([]);
    const [filterClass, setFilterClass] = useState<string>('all');

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log('Today:', today);
    function filterCamp() {
        const upComing: Camp[] = [];
        const past: Camp[] = [];
        camps.forEach((camp) => {
            const campDate = new Date(camp.date);
            campDate.setHours(0, 0, 0, 0);
            if (campDate.getTime() > today.getTime()) {
                upComing.push(camp);
            } else {
                past.push(camp);
            }
        })
        setAvailableCamps(upComing);
        setNotAvailableCamps(past);
    }

    useEffect(() => {
        console.log('Camps updated: ', camps);
        filterCamp();
    }, [camps]);

    useEffect(() => {
        console.log("availableCamps updated:", availableCamps);
    }, [availableCamps]);
    
    const filteredCamps = filterClass === 'all' 
    ? availableCamps 
    : availableCamps.filter(camp => camp.class === Number(filterClass));

    return (
        <>
            <Select
                options={options} 
                value={options.find(o => o.value === filterClass) || null}
                onChange={(selected) => {
                    setFilterClass(selected?.value || 'all');
                }} 
                isClearable
                placeholder='เลือกระดับชั้น'
                className="mb-5"
                styles={{
                    control: (provided) => ({
                        ...provided,
                        minHeight: 50,      // ความสูงทั้งหมดของ Select
                        height: 50,
                    }),
                    valueContainer: (provided) => ({
                        ...provided,
                        height: 50,         // ความสูงภายใน (text + padding)
                        padding: '0 15px',   // ปรับ padding ถ้าต้องการ
                    }),
                    input: (provided) => ({
                        ...provided,
                        margin: 0,          // ลบ margin ของ input
                        padding: 0,
                    }),
                }}
                />
            {filteredCamps.length === 0 ? (
                <div className="text-gray-500 text-lg flex justify-center">ไม่พบข้อมูลค่าย</div>
            ) : (
                // Grid responsive: 1 col (mobile), 2 cols (tablet), 3 cols (desktop)
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10 place-items-center md:place-items-stretch">
                    {filteredCamps.map((item: Camp) => (
                        <div
                            key={item.id}
                            className="w-full border-2 border-gray-300 rounded-3xl px-4 py-3 sm:px-5 md:py-7 duration-300 hover:scale-105 flex flex-col max-w-md md:max-w-none"
                        >
                            {/* Font size responsive */}
                            <h1 className="text-xl sm:text-2xl mb-2" style={{
                                fontFamily: 'Mitr, sans-serif',
                                fontWeight: '500'
                            }}>{item.title}</h1>

                            <p className="text-sm sm:text-base text-gray-500">ห้อง: {item.class === 409 ? '4/9' : item.class === 509 ? '5/9' : '6/9'}</p>
                            <p className="text-sm sm:text-base text-gray-500">จำนวนคนต่อห้อง: {item.max}</p>
                            <p className="text-sm sm:text-base text-gray-500">วันที่: {new Date(item.date).toLocaleDateString("th-TH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}</p>

                            <div className="flex justify-end mt-auto pt-3">
                                <Link
                                    href={`/camp/${item.id}`}
                                    className="text-base sm:text-lg hover:underline cursor-pointer"
                                    style={{
                                        fontFamily: 'Mitr, sans-serif',
                                    }}
                                >
                                    คลิกเพื่อเพิ่ม
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-20">
                <p className="font-medium text-gray-500 text-4xl" style={{
                    fontFamily: 'Mitr, sans-serif'
                }}>ค่ายที่ผ่านมาแล้ว :</p>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10 place-items-center md:place-items-stretch">
                    {notAvailableCamps.map((camp: Camp, index: number) => (
                        <div key={camp.id}
                            className="w-full border-2 border-gray-300 rounded-3xl px-4 py-3 sm:px-5 md:py-7 duration-300 flex flex-col max-w-md md:max-w-none cursor-not-allowed"
                        >
                            {/* Font size responsive */}
                            <h1 className="text-xl sm:text-2xl mb-2 text-gray-400" style={{
                                fontFamily: 'Mitr, sans-serif',
                                fontWeight: '500'
                            }}>{camp.title}</h1>
                            <p className="text-sm sm:text-base text-gray-400">ห้อง: {camp.class === 409 ? '4/9' : camp.class === 509 ? '5/9' : '6/9'}</p>
                            <p className="text-sm sm:text-base text-gray-400">จำนวนคนต่อห้อง: {camp.max}</p>
                            <p className="text-sm sm:text-base text-gray-400">วันที่: {new Date(camp.date).toLocaleDateString("th-TH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CampList;