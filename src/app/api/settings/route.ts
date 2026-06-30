import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ownerId, businessName, supportEmail, knowledge } = await req.json();
    if (!ownerId || !businessName || !supportEmail || !knowledge) {
      return NextResponse.json({
        message: "Owner, Business Name, Support Email and Knowledge all are required",
        status: 500,
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
    console.error("Settings Error:", error);
  
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
