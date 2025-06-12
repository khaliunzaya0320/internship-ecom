export const runtime = 'nodejs'; 
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const user = await prisma.user.findMany();
  return NextResponse.json(user);
}

export async function POST(){
  
}