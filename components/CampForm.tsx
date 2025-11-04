'use client'
import { useState } from 'react'

const CampForm = ({
    campInfo,
    availableStudents,
    campID
}: {
    campInfo: any,
    availableStudents: any[],
    campID: number
}) => {
    //  เก็บข้อมูลสมาชิกในห้องที่เลือก
    const [selectedMembers, setSelectedMembers] = useState<string[]>(
        Array(campInfo.max).fill('')
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [showAlert, setShowAlert] = useState(false);

    const handleSelectChange = (index: number, value: string) => {
        const newMembers = [...selectedMembers];
        newMembers[index] = value;
        setSelectedMembers(newMembers);
    };

    //  ฟังก์ชันบันทึกฟอร์ม
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            //  กรอง Array ให้ไม่มีค่า ''
            const members = selectedMembers.filter(member => member !== '');
            const hasDuplicate = new Set(members).size !== members.length
            console.log(hasDuplicate);

            if (members.length === 0) {
                alert('กรุณาเลือกสมาชิกให้ครบ');
                setIsSubmitting(false);
                return
            }

            if (hasDuplicate) {
                alert('เลือกคนซ้ำกันไม่ได้');
                setIsSubmitting(false);
                return
            }

            //  ดึงข้อมูลนักเรียนที่ถูกเลือกทั้งหมด
            const selectedStudents = availableStudents.filter(student =>
                members.includes(String(student.id))
            );

            //  ดึงมาเฉพาะค่า Gender ของ selectedStudents
            const genders = selectedStudents.map(s => s.gender);

            //  Set คือการจัดเรียงกลุ่มข้อมูลโดยสมาชิกไม่ซ้ำกัน ถ้าเจอมากกว่า 1 แสดงว่าเพศต่างกัน (male, female)
            const uniqueGenders = new Set(genders);
            if (uniqueGenders.size > 1) {
                alert('เพศต่างกัน ไม่สามารถพักร่วมกันได้');
                setIsSubmitting(false);
                return
            }

            const response = await fetch('http://localhost:3000/api/room/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    camp_id: campID,
                    member_ids: members
                })
            });

            if (response.ok) {
                setSelectedMembers(Array(campInfo.max).fill(''));
                window.location.reload();
            } else {
                alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="px-4 sm:px-8 md:px-15">
            {/* Header */}
            <div className="flex justify-center mt-8 mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-center" style={{
                    fontFamily: 'Mitr, sans-serif',
                    fontWeight: '500'
                }}>{campInfo.title}</h1>
            </div>

            {/* Content Container */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 xl:gap-100 max-w-7xl mx-auto">
                {/* ข้อมูลค่าย */}
                <div className="bg-gray-50 h-full p-5 pb-10 rounded-lg border border-gray-200">
                    <h2 className="text-lg sm:text-xl font-medium mb-3" style={{
                        fontFamily: 'Mitr, sans-serif',
                    }}>รายละเอียดค่าย</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-2">ชั้นเรียน : {campInfo.class === 409 ? '4/9' : campInfo.class === 509 ? '5/9' : '6/9'}</p>
                    <p className="text-sm sm:text-base text-gray-600 mb-2">วันที่จัดกิจกรรม : {new Date(campInfo.date).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}</p>
                    <p className="text-sm sm:text-base text-gray-600">จำนวนคนต่อห้อง : {campInfo.max} คน</p>
                </div>

                {/* ฟอร์มเลือกสมาชิก */}
                <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-medium mb-4" style={{
                        fontFamily: 'Mitr, sans-serif',
                    }}>เลือกสมาชิกในห้อง</h2>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        {Array.from({ length: campInfo.max }, (_, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <label className="text-sm sm:text-base font-medium min-w-fit" style={{
                                    fontFamily: 'Mitr, sans-serif',
                                }}>
                                    สมาชิกคนที่ {i + 1}:
                                </label>
                                <select
                                    name={`member-${i}`}
                                    value={selectedMembers[i]}
                                    onChange={(e) => handleSelectChange(i, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                                    style={{
                                        fontFamily: 'Mitr, sans-serif',
                                    }}
                                >
                                    <option value="">-- เลือกสมาชิกห้อง --</option>
                                    {availableStudents.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto mt-6 px-8 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 text-sm sm:text-base cursor-pointer"
                            style={{
                                fontFamily: 'Mitr, sans-serif',
                                fontWeight: '500'
                            }}
                        >
                            {isSubmitting ? 'กำลังบันทึก...' : 'บันทึก'}
                        </button>
                        {/* {showAlert && (
                            <Alert variant="outlined" severity="success">
                                บันทึกสำเร็จ
                            </Alert>
                        )} */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CampForm;