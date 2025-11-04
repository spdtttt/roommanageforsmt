import {prisma} from "@/prisma"
import { NextResponse } from "next/server";

export async function GET() {
    const camps = await prisma.camp.findMany();
    return NextResponse.json(camps);
}