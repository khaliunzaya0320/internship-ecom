import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT() {
  
  return
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  await prisma.product.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
