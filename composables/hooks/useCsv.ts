
import Papa from "papaparse";
import { useI18n } from 'vue-i18n'

type CsvColumn = {
  key: string         // Clé dans l'objet d'origine
  label: string       // Nom de la colonne dans le CSV
}

export const useCsv = (
  data: any[],
  columns: CsvColumn[],
  t?: (key: string) => string // ✅ t est optionnel
): any => {

    if (!data || !Array.isArray(data) || data.length === 0) {
        alert("Aucune donnée à exporter");
        return;
        
    }
  const formattedData = data.map((item: any, index: number) => {
    const row: Record<string, any> = {
      id: index + 1,
    }   
    columns.forEach(({ key, label }) => {
        const columnLabel = t ? t(label) : label // ✅ si t existe, on l'utilise
        row[columnLabel] = item[key]
  
    })
    
    return row
  })

  const csv = Papa.unparse(formattedData, {
    delimiter: ';',
    quotes: true,
    header: true,
    skipEmptyLines: true,
  })

  const csvWithBom = '\uFEFF' + csv

  console.log(csvWithBom);
  
  const blob = new Blob([csvWithBom], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
