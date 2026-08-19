"use client";

import { useCallback, useState } from "react";
import { Download, FileDown, FileSpreadsheet, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Types — serialisable props passed from the server component        */
/* ------------------------------------------------------------------ */

export interface KPIStat {
  label: string;
  value: string;
  trendValue: number;
  trendDirection: "up" | "down";
  trendComparison: string;
}

export interface SignupRow {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: string;
  status: string;
  joined: string;
  revenue: number;
}

export interface RevenueRow {
  month: string;
  revenue: number;
  target: number | undefined;
}

export interface UserGrowthRow {
  month: string;
  users: number;
}

interface ReportExportProps {
  kpiStats: KPIStat[];
  signups: SignupRow[];
  revenueData: RevenueRow[];
  userGrowthData: UserGrowthRow[];
}

type ExportFormat = "csv" | "excel" | "pdf";

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

function hasReportData(
  kpiStats: KPIStat[],
  signups: SignupRow[],
  revenueData: RevenueRow[],
  userGrowthData: UserGrowthRow[],
): boolean {
  return (
    kpiStats.length > 0 ||
    signups.length > 0 ||
    revenueData.length > 0 ||
    userGrowthData.length > 0
  );
}

/** Trigger a browser file download from a Blob. */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* ------------------------------------------------------------------ */
/*  CSV generation                                                     */
/* ------------------------------------------------------------------ */

/** Escape a single CSV cell value (RFC 4180). */
function escapeCsvCell(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/** Join cells into a CSV row. */
function csvRow(cells: (string | number | undefined | null)[]): string {
  return cells.map(escapeCsvCell).join(",");
}

function generateReportCsv(
  kpiStats: KPIStat[],
  signups: SignupRow[],
  revenueData: RevenueRow[],
  userGrowthData: UserGrowthRow[],
): Blob {
  const lines: string[] = [];

  // ── Section 1: KPI Summary ──
  lines.push(csvRow(["=== KPI SUMMARY ==="]));
  lines.push(csvRow(["Metric", "Current Value", "Trend (%)", "Direction", "Comparison"]));
  for (const kpi of kpiStats) {
    lines.push(csvRow([kpi.label, kpi.value, kpi.trendValue, kpi.trendDirection, kpi.trendComparison]));
  }

  lines.push(""); // blank separator

  // ── Section 2: Recent Signups ──
  lines.push(csvRow(["=== RECENT SIGNUPS ==="]));
  lines.push(csvRow(["ID", "Name", "Email", "Company", "Plan", "Status", "Joined", "Revenue (USD)"]));
  for (const signup of signups) {
    lines.push(csvRow([signup.id, signup.name, signup.email, signup.company, signup.plan, signup.status, signup.joined, signup.revenue]));
  }

  lines.push(""); // blank separator

  // ── Section 3: Monthly Revenue ──
  lines.push(csvRow(["=== MONTHLY REVENUE ==="]));
  lines.push(csvRow(["Month", "Revenue (USD)", "Target (USD)"]));
  for (const point of revenueData) {
    lines.push(csvRow([point.month, point.revenue, point.target]));
  }

  lines.push(""); // blank separator

  // ── Section 4: User Growth ──
  lines.push(csvRow(["=== USER GROWTH ==="]));
  lines.push(csvRow(["Month", "Registered Users"]));
  for (const point of userGrowthData) {
    lines.push(csvRow([point.month, point.users]));
  }

  // UTF-8 BOM for Excel compatibility
  const BOM = "\uFEFF";
  return new Blob([BOM + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
}

/* ------------------------------------------------------------------ */
/*  Excel generation                                                   */
/* ------------------------------------------------------------------ */

async function generateReportExcel(
  kpiStats: KPIStat[],
  signups: SignupRow[],
  revenueData: RevenueRow[],
  userGrowthData: UserGrowthRow[],
): Promise<Blob> {
  const XLSX = await import("xlsx");

  const wb = XLSX.utils.book_new();

  // ── Sheet 1: KPI Summary ──
  const kpiRows = kpiStats.map((k) => ({
    Metric: k.label,
    "Current Value": k.value,
    "Trend (%)": k.trendValue,
    Direction: k.trendDirection,
    Comparison: k.trendComparison,
  }));
  const kpiSheet = XLSX.utils.json_to_sheet(kpiRows);
  kpiSheet["!cols"] = [{ wch: 18 }, { wch: 16 }, { wch: 12 }, { wch: 10 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, kpiSheet, "KPI Summary");

  // ── Sheet 2: Recent Signups ──
  const signupRows = signups.map((s) => ({
    ID: s.id,
    Name: s.name,
    Email: s.email,
    Company: s.company,
    Plan: s.plan,
    Status: s.status,
    Joined: s.joined,
    "Revenue (USD)": s.revenue,
  }));
  const signupSheet = XLSX.utils.json_to_sheet(signupRows);
  signupSheet["!cols"] = [
    { wch: 12 }, { wch: 20 }, { wch: 28 }, { wch: 16 },
    { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 14 },
  ];
  XLSX.utils.book_append_sheet(wb, signupSheet, "Recent Signups");

  // ── Sheet 3: Monthly Revenue ──
  const revenueRows = revenueData.map((r) => ({
    Month: r.month,
    "Revenue (USD)": r.revenue,
    "Target (USD)": r.target ?? "",
  }));
  const revenueSheet = XLSX.utils.json_to_sheet(revenueRows);
  revenueSheet["!cols"] = [{ wch: 14 }, { wch: 16 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, revenueSheet, "Monthly Revenue");

  // ── Sheet 4: User Growth ──
  const growthRows = userGrowthData.map((u) => ({
    Month: u.month,
    "Registered Users": u.users,
  }));
  const growthSheet = XLSX.utils.json_to_sheet(growthRows);
  growthSheet["!cols"] = [{ wch: 14 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, growthSheet, "User Growth");

  // Write workbook to array buffer
  const wbOut = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return new Blob([wbOut], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

/* ------------------------------------------------------------------ */
/*  PDF generation                                                     */
/* ------------------------------------------------------------------ */

async function generateReportPdf(
  kpiStats: KPIStat[],
  signups: SignupRow[],
  revenueData: RevenueRow[],
  userGrowthData: UserGrowthRow[],
): Promise<Blob> {
  const { jsPDF } = await import("jspdf");
  const autoTableModule = await import("jspdf-autotable");
  const autoTable = autoTableModule.default;

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // ── Title ──
  doc.setFontSize(20);
  doc.text("Pulse Report", 14, 18);

  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(`Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}`, 14, 25);

  doc.setDrawColor(220, 220, 220);
  doc.line(14, 28, pageWidth - 14, 28);

  let startY = 34;

  // ── Section 1: KPI Summary ──
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(13);
  doc.text("KPI Summary", 14, startY);
  startY += 3;

  autoTable(doc, {
    startY,
    head: [["Metric", "Current Value", "Trend (%)", "Direction", "Comparison"]],
    body: kpiStats.map((k) => [k.label, k.value, k.trendValue, k.trendDirection, k.trendComparison]),
    theme: "striped",
    headStyles: { fillColor: [41, 37, 36], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    margin: { left: 14, right: 14 },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  startY = (doc as any).lastAutoTable.finalY + 10;

  // ── Section 2: Recent Signups ──
  doc.setFontSize(13);
  doc.text("Recent Signups", 14, startY);
  startY += 3;

  autoTable(doc, {
    startY,
    head: [["ID", "Name", "Email", "Company", "Plan", "Status", "Joined", "Revenue (USD)"]],
    body: signups.map((s) => [s.id, s.name, s.email, s.company, s.plan, s.status, s.joined, `$${s.revenue.toLocaleString()}`]),
    theme: "striped",
    headStyles: { fillColor: [41, 37, 36], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9 },
    bodyStyles: { fontSize: 8 },
    margin: { left: 14, right: 14 },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  startY = (doc as any).lastAutoTable.finalY + 10;

  // ── Section 3: Monthly Revenue ──
  doc.setFontSize(13);
  doc.text("Monthly Revenue", 14, startY);
  startY += 3;

  autoTable(doc, {
    startY,
    head: [["Month", "Revenue (USD)", "Target (USD)"]],
    body: revenueData.map((r) => [r.month, `$${r.revenue.toLocaleString()}`, r.target !== undefined ? `$${r.target.toLocaleString()}` : ""]),
    theme: "striped",
    headStyles: { fillColor: [41, 37, 36], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    margin: { left: 14, right: 14 },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  startY = (doc as any).lastAutoTable.finalY + 10;

  // ── Section 4: User Growth ──
  // Check if we need a new page
  if (startY > doc.internal.pageSize.getHeight() - 40) {
    doc.addPage();
    startY = 18;
  }

  doc.setFontSize(13);
  doc.text("User Growth", 14, startY);
  startY += 3;

  autoTable(doc, {
    startY,
    head: [["Month", "Registered Users"]],
    body: userGrowthData.map((u) => [u.month, u.users.toLocaleString()]),
    theme: "striped",
    headStyles: { fillColor: [41, 37, 36], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    margin: { left: 14, right: 14 },
  });

  return doc.output("blob");
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ReportExport({ kpiStats, signups, revenueData, userGrowthData }: ReportExportProps) {
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null);

  const handleExport = useCallback(async (format: ExportFormat) => {
    setExportingFormat(format);

    try {
      if (!hasReportData(kpiStats, signups, revenueData, userGrowthData)) {
        toast.info("No report data available to export.");
        return;
      }

      let blob: Blob;
      let filename: string;

      switch (format) {
        case "csv":
          blob = generateReportCsv(kpiStats, signups, revenueData, userGrowthData);
          filename = "pulse-report.csv";
          break;
        case "excel":
          blob = await generateReportExcel(kpiStats, signups, revenueData, userGrowthData);
          filename = "pulse-report.xlsx";
          break;
        case "pdf":
          blob = await generateReportPdf(kpiStats, signups, revenueData, userGrowthData);
          filename = "pulse-report.pdf";
          break;
      }

      downloadBlob(blob, filename);
      toast.success(`Report exported as ${format.toUpperCase()} successfully.`);
    } catch {
      toast.error(`Failed to export ${format.toUpperCase()} report. Please try again.`);
    } finally {
      setTimeout(() => setExportingFormat(null), 400);
    }
  }, [kpiStats, signups, revenueData, userGrowthData]);

  return (
    <div
      role="toolbar"
      aria-label="Report export options"
      aria-busy={exportingFormat !== null}
      className="flex flex-wrap items-center gap-2"
    >
      <Button
        variant="outline"
        size="sm"
        disabled={exportingFormat !== null}
        onClick={() => handleExport("csv")}
        aria-label="Export report as CSV"
        className="h-9 gap-2 rounded-lg border-border/80 px-3.5 text-xs font-medium shadow-xs transition-all hover:bg-muted/80 hover:text-foreground active:scale-[0.98]"
      >
        {exportingFormat === "csv" ? (
          <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" aria-hidden="true" />
        ) : (
          <Download className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        )}
        <span>{exportingFormat === "csv" ? "Exporting CSV…" : "Export CSV"}</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={exportingFormat !== null}
        onClick={() => handleExport("excel")}
        aria-label="Export report as Excel"
        className="h-9 gap-2 rounded-lg border-border/80 px-3.5 text-xs font-medium shadow-xs transition-all hover:bg-muted/80 hover:text-foreground active:scale-[0.98]"
      >
        {exportingFormat === "excel" ? (
          <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" aria-hidden="true" />
        ) : (
          <FileSpreadsheet className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        )}
        <span>{exportingFormat === "excel" ? "Exporting Excel…" : "Export Excel"}</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={exportingFormat !== null}
        onClick={() => handleExport("pdf")}
        aria-label="Export report as PDF"
        className="h-9 gap-2 rounded-lg border-border/80 px-3.5 text-xs font-medium shadow-xs transition-all hover:bg-muted/80 hover:text-foreground active:scale-[0.98]"
      >
        {exportingFormat === "pdf" ? (
          <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" aria-hidden="true" />
        ) : (
          <FileDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        )}
        <span>{exportingFormat === "pdf" ? "Exporting PDF…" : "Export PDF"}</span>
      </Button>
    </div>
  );
}
