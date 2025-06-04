import * as XLSX from "xlsx";
import dayjs from "dayjs";

export const useXlsx = (
  data: any[],
  columns: [],
  t?: (key: string) => string // ✅ t est optionnel
): void => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    alert("Aucune donnée à exporter");
    return;
  }

  const formattedData = data.map((item: any, index: number) => {
    const row: Record<string, any> = {
      id: index + 1,
    };
    columns.forEach(({ key, label }) => {
      const columnLabel = t ? t(label) : label;
      let value = item[key];

      if (value && typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2} /)) {
        value = dayjs(value).format("DD/MM/YYYY HH:mm");
      }

      row[columnLabel] = value;
    });
    return row;
  });

  // Génération du fichier Excel
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Feuille1");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
