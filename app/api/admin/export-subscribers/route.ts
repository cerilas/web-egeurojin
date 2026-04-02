import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { prisma } from "@/lib/db";

export async function GET() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Bülten Aboneleri");

  sheet.columns = [
    { header: "#", key: "index", width: 6 },
    { header: "E-posta", key: "email", width: 35 },
    { header: "Kayıt Tarihi", key: "createdAt", width: 20 },
  ];

  // Header style
  sheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF5F5F4" } };
  });

  subscribers.forEach((sub, i) => {
    sheet.addRow({
      index: i + 1,
      email: sub.email,
      createdAt: sub.createdAt.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="bulten-aboneleri-${new Date().toISOString().slice(0, 10)}.xlsx"`,
    },
  });
}
