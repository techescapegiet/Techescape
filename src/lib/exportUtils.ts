import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface ExportPlayer {
    id: string;
    pc_id: string;
    name: string;
    level: string | number;
    status: string;
    timeRemaining: string;
}

export interface ExportAccessKey {
    pc_id: string;
    pin: string;
    hint: string;
    is_assigned: boolean;
    assigned_to?: string;
}

/**
 * Downloads the player data as a CSV file.
 */
export function exportToCSV(data: ExportPlayer[], filename = "techescape-export.csv") {
    if (!data || !data.length) {
        alert("No data to export");
        return;
    }

    const headers = ["ID", "PC ID", "Operative Name", "Level", "Status", "Time Remaining"];

    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const row of data) {
        const values = [
            `"${row.id}"`,
            `"${row.pc_id}"`,
            `"${row.name}"`,
            `"${row.level}"`,
            `"${row.status}"`,
            `"${row.timeRemaining}"`
        ];
        csvRows.push(values.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

/**
 * Downloads the player data as a formatted PDF file.
 */
export function exportToPDF(data: ExportPlayer[], filename = "techescape-export.pdf") {
    if (!data || !data.length) {
        alert("No data to export");
        return;
    }

    const doc = new jsPDF();

    // Custom styling for PDF
    doc.setFontSize(18);
    doc.setTextColor(255, 0, 60); // Techescape Red
    doc.text("Techescape Operative Report", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Total Operatives: ${data.length}`, 14, 36);

    const tableColumn = ["PC", "Operative Name", "Level", "Status", "Time Left"];
    const tableRows = data.map(p => [
        p.pc_id,
        p.name,
        p.level.toString(),
        p.status,
        p.timeRemaining
    ]);

    autoTable(doc, {
        startY: 45,
        head: [tableColumn],
        body: tableRows,
        theme: "grid",
        styles: {
            fontSize: 10,
            cellPadding: 3,
        },
        headStyles: {
            fillColor: [0, 0, 0],
            textColor: [0, 255, 255], // Techescape Cyan
            fontStyle: "bold",
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240],
        },
    });

    doc.save(filename);
}

/**
 * Downloads the access key (PIN) list as a CSV file.
 */
export function exportAccessKeys(data: ExportAccessKey[], filename = "techescape-pins.csv") {
    if (!data || !data.length) {
        alert("No data to export");
        return;
    }

    const headers = ["Terminal ID", "Secure PIN", "Location Hint", "Status", "Assigned To"];
    const csvRows = [headers.join(",")];

    for (const row of data) {
        const values = [
            `"${row.pc_id}"`,
            `"${row.pin}"`,
            `"${row.hint}"`,
            `"${row.is_assigned ? 'ASSIGNED' : 'AVAILABLE'}"`,
            `"${row.assigned_to || 'N/A'}"`
        ];
        csvRows.push(values.join(","));
    }

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.click();
}
