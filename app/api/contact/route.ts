import { NextResponse } from "next/server";

import { saveContactMessage } from "@/lib/workshops";

export async function POST(request: Request) {
  const body = await request.json();

  const payload = {
    name: String(body.name ?? "").trim(),
    email: String(body.email ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    organization: String(body.organization ?? "").trim(),
    message: String(body.message ?? "").trim(),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      { message: "Lütfen ad, e-posta ve mesaj alanlarını doldurun." },
      { status: 400 },
    );
  }

  if (!payload.email.includes("@")) {
    return NextResponse.json(
      { message: "Geçerli bir e-posta adresi girin." },
      { status: 400 },
    );
  }

  const result = await saveContactMessage(payload);

  return NextResponse.json({
    message: result.stored
      ? "Mesajınız kaydedildi. En kısa sürede dönüş yapılacak."
      : "Mesajınız alındı. En kısa sürede sizinle iletişime geçilecektir.",
  });
}