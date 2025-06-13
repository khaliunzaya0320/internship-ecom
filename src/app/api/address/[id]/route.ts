import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const addressId = parseInt(params.id);
    const { title, fullName, phone, address, city, district, isDefault } = await req.json();

    if (!title || !fullName || !phone || !address || !city) {
      return NextResponse.json({ error: "Бүх шаардлагатай талбарыг бөглөнө үү" }, { status: 400 });
    }

    // Verify address belongs to current user
    const existingAddress = await prisma.address.findFirst({
      where: { 
        id: addressId,
        userId: parseInt(session.user.id) 
      },
    });

    if (!existingAddress) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    // If this address is set as default, remove default from other addresses
    if (isDefault && !existingAddress.isDefault) {
      await prisma.address.updateMany({
        where: { 
          userId: parseInt(session.user.id),
          isDefault: true 
        },
        data: { isDefault: false },
      });
    }

    const updatedAddress = await prisma.address.update({
      where: { id: addressId },
      data: {
        title,
        fullName,
        phone,
        address,
        city,
        district: district || null,
        isDefault: Boolean(isDefault),
      },
    });

    return NextResponse.json(updatedAddress);
  } catch (error) {
    console.error("Address PUT error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const addressId = parseInt(params.id);

    // Verify address belongs to current user
    const existingAddress = await prisma.address.findFirst({
      where: { 
        id: addressId,
        userId: parseInt(session.user.id) 
      },
    });

    if (!existingAddress) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    await prisma.address.delete({
      where: { id: addressId },
    });

    return NextResponse.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Address DELETE error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
