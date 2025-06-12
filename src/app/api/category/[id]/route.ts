import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const { name } = await req.json()
  if (typeof name !== 'string' || !name.trim()) return NextResponse.json({ error: 'Invalid' }, { status: 400 })
  const cat = await prisma.category.update({ where: { id }, data: { name } })
  return NextResponse.json(cat)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  await prisma.category.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
