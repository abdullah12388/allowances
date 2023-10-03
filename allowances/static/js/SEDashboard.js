var o = $("#siteEngineerTbl");
$("#toolbar")
    .find("select")
    .change(function () {
        var filename = document.getElementById('exportFileName').value;
        var currentDate = new Date();
        o.bootstrapTable("destroy").bootstrapTable({
            exportDataType: $(this).val(),
            exportOptions: {
                fileName: (filename ? filename + '_' : 'Sites_') + currentDate.toLocaleString(),
            },
            exportTypes: ["json", "xml", "csv", "txt", "sql", "excel", "pdf"],
            columns: [
                { field: "id", title: "ID" },
                { field: "eng_name__username", title: "Eng. Username" },
                { field: "tech_name__first_name", title: "Technicion" },
                { field: "station_code__station_id", title: "Station ID" },
                { field: "ticket_id", title: "Ticket" },
                { field: "task_id__name", title: "Task Name" },
                { field: "visit_date", title: "Visit" },
                { field: "notes", title: "Notes" },
                { field: "area_manager_status", title: "Status" },
                { field: "state", checkbox: !0, visible: "selected" === $(this).val() },
            ],
        });
    })

document.getElementById("print_selected").addEventListener("click", function () {
    var selectedRows = [];
    selectedRows = $("#siteEngineerTbl").bootstrapTable("getSelections");
    console.log(selectedRows);
    var printWindow = window.open("", "_blank");
    var currentDate = new Date();
    printWindow.document.open();
    printWindow.document.write(
        "<html><head><title>Site Engineer Table</title>" +
        "<style>" +
        "table { border-collapse: collapse;width: 100%; }" +
        "th, td { border: 1px solid black;text-align: center; }" +
        "</style>" +
        "</head><body>"
    );
    //        printWindow.document.write("<html><head><title>Alarms Table</title></head><body>");
    printWindow.document.write("<h2>Printed on: " + currentDate.toString() + "</h2>");
    printWindow.document.write("<table>");
    // Get the column names from the table header
    var columnNames = [];
    $("#siteEngineerTbl thead th").each(function () {
        columnNames.push($(this).data("field"));
    });

    // Print the table header with column names
    printWindow.document.write("<tr>");
    for (var j = 0; j < columnNames.length-1; j++) {
        printWindow.document.write("<th>" + columnNames[j] + "</th>");
    }
    printWindow.document.write("</tr>");

    // Iterate over selected rows
    for (var i = 0; i < selectedRows.length; i++) {
        var row = selectedRows[i];
        printWindow.document.write("<tr>");
        for (var j = 0; j < columnNames.length-1; j++) {
            var columnName = columnNames[j];
            printWindow.document.write("<td>" + row[columnName] + "</td>");
        }
        printWindow.document.write("</tr>");
    }
    printWindow.document.write("</table></body></html>");
    printWindow.document.close();
    printWindow.print();
})