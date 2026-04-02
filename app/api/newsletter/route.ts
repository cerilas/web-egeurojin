import { NextResponse } from "next/server";

import { saveNewsletterSubscriber } from "@/lib/workshops";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();

  if (!email) {
    return NextResponse.json(
      { message: "E-posta adresi gereklidir." },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Geçerli bir e-posta adresi girin." },
      { status: 400 },
    );
  }

  const result = await saveNewsletterSubscriber(email);

  if (result.duplicate) {
    return NextResponse.json({ message: "Bu e-posta adresi zaten kayıtlı." });
  }

  return NextResponse.json({
    message: "Kaydınız alındı. Yeni workshoplardan haberdar edileceksiniz.",
  });
}
