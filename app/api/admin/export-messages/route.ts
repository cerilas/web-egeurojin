import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { prisma } from "@/lib/db";

const statusLabel: Record<string, string> = {
  NEW: "Yeni",
  READ: "Okundu",
  REPLIED: "Yanıtlandı",
  ARCHIVED: "Arşivlendi",
};

export async function GET() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("İletişim Mesajları");

  sheet.columns = [
    { header: "#", key: "index", width: 6 },
    { header: "İsim", key: "name", width: 20 },
    { header: "E-posta", key: "email", width: 30 },
    { header: "Telefon", key: "phone", width: 18 },
    { header: "Kurum", key: "organization", width: 25 },
    { header: "Mesaj", key: "message", width: 50 },
    { header: "Tarih", key: "createdAt", width: 18 },
    { header: "Durum", key: "status", width: 14 },
  ];

  sheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF5F5F4" } };
  });

  messages.forEach((msg, i) => {
    sheet.addRow({
      index: i + 1,
      name: msg.name,
      email: msg.email,
      phone: msg.phone ?? "",
      organization: msg.organization ?? "",
      message: msg.message,
      createdAt: msg.createdAt.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      status: statusLabel[msg.status] ?? msg.status,
    });
  });

  // Wrap text in message column
  sheet.getColumn("message").alignment = { wrapText: true, vertical: "top" };

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="iletisim-mesajlari-${new Date().toISOString().slice(0, 10)}.xlsx"`,
    },
  });
}
