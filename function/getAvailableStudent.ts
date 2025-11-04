import {prisma} from "@/prisma";

export async function getAvailableStudents(camp_id: number) {
    { /* หารายการค่ายที่ตรงกับ Camp ID */ }
    const camp = await prisma.camp.findUnique({
        where: { id: camp_id },
    });

    if (!camp) throw new Error("Camp not found");

    { /* หารายการห้องพักที่จัดการแล้วทั้งหมดใน Camp ID นั้น */ }
    const rooms = await prisma.room.findMany({
        where: { camp_id },
        select: { member_ids: true },
    });

    { /* รวม Array */ }
    const usedStudentIds = rooms.flatMap(r => r.member_ids);

    { /* หารายชื่อนักเรียนทั้งหมดที่ไม่มี id อยู่ใน usedStudentIds */ }
    const availableStudents = await prisma.student.findMany({
        where: {
            class: camp.class,
            id: { notIn: usedStudentIds },
        },
    });

    return availableStudents;
}