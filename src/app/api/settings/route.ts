import { prisma } from "@/lib/prisma";
import build from "next/dist/build";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ownerId, businessName, supportEmail, knowledge } = await req.json();
    if (!ownerId) {
      return NextResponse.json({
        message: "Owner is required",
        status: 400,
      });
    }
    const settings = await prisma.settings.upsert({
      where: {
        ownerId: ownerId,
      },
      update: {
        businessName: businessName,
        supportEmail: supportEmail,
        knowledge: knowledge,
      },
      create: {
        ownerId: ownerId,
        businessName: businessName,
        supportEmail: supportEmail,
        knowledge: knowledge,
      },
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({
      message: `Settings error ${error}`,
      status: 400,
    });
  }
}
