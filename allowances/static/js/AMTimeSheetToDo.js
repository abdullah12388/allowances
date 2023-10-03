function ApprovedTimeSheet(time_sheet_id) {
    $.ajax({
        url: "/system/TimeSheet/ToDo/approved/api/" + time_sheet_id,
        method: "GET",
        dataType: "json",
        success: function (t) {
            console.log(t);
            t.forEach((element) => {
                console.log(element);
                element['actions'] = `<button type="button" class="btn btn-success m-auto" data-toggle="modal" data-target="#approve_action_modal_${element.id}"><i class="fa-solid fa-check"></i></button>
                <button type="button" class="btn btn-danger m-auto" data-toggle="modal" data-target="#reject_action_modal_${element.id}"><i class="fa-solid fa-xmark"></i></button>`;
            });
            var e = $("#pendingTimeSheetTbl");
            e.bootstrapTable("showLoading");
            e.bootstrapTable("load", []);
            e.bootstrapTable("load", t);
            e.bootstrapTable("refresh");
            e.bootstrapTable("hideLoading");
            $('#approve_action_modal_'+time_sheet_id).modal('hide');
        },
    });
}

function NotApprovedTimeSheet(time_sheet_id) {
    $.ajax({
        url: "/system/TimeSheet/ToDo/rejected/api/" + time_sheet_id,
        method: "GET",
        dataType: "json",
        success: function (t) {
            console.log(t);
            t.forEach((element) => {
                console.log(element);
                element['actions'] = `<button type="button" class="btn btn-success m-auto" data-toggle="modal" data-target="#approve_action_modal_${element.id}"><i class="fa-solid fa-check"></i></button>
                <button type="button" class="btn btn-danger m-auto" data-toggle="modal" data-target="#reject_action_modal_${element.id}"><i class="fa-solid fa-xmark"></i></button>`;
            });
            var e = $("#pendingTimeSheetTbl");
            e.bootstrapTable("showLoading");
            e.bootstrapTable("load", []);
            e.bootstrapTable("load", t);
            e.bootstrapTable("refresh");
            e.bootstrapTable("hideLoading");
            $('#reject_action_modal_'+time_sheet_id).modal('hide');
        },
    });
}


var o = $("#pendingTimeSheetTbl");
$("#toolbar")
    .find("select")
    .change(function () {
        var filename = document.getElementById('exportFileName').value;
        var currentDate = new Date();
        o.bootstrapTable("destroy").bootstrapTable({
            exportDataType: $(this).val(),
            exportOptions: {
                fileName: (filename ? filename + '_' : 'GTS_') + currentDate.toLocaleString(),
            },
            exportTypes: ["json", "xml", "csv", "txt", "sql", "excel", "pdf"],
            columns: [
                { field: "id", title: "ID" },
                { field: "eng_name", title: "Engineer" },
                { field: "tech_name", title: "Technicion" },
                { field: "station_code", title: "Station" },
                { field: "ticket_id", title: "Ticket" },
                { field: "task_id", title: "Task" },
                { field: "visit_date", title: "Visit" },
                { field: "notes", title: "Notes" },
                { field: "record_date", title: "Record" },
                { field: "actions", title: "Actions" },
                // { field: "area_manager_status", title: "Status" },
                { field: "state", checkbox: !0, visible: "selected" === $(this).val() },
            ],
        });
    })

document.getElementById("print_selected").addEventListener("click", function () {
    var selectedRows = [];
    selectedRows = $("#pendingTimeSheetTbl").bootstrapTable("getSelections");
    console.log(selectedRows);
    var printWindow = window.open("", "_blank");
    var currentDate = new Date();
    printWindow.document.open();
    printWindow.document.write(
        "<html><head><title>Pending Time Sheet Table</title>" +
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
    $("#pendingTimeSheetTbl thead th").each(function () {
        columnNames.push($(this).data("field"));
    });

    // Print the table header with column names
    printWindow.document.write("<tr>");
    for (var j = 0; j < columnNames.length-2; j++) {
        printWindow.document.write("<th>" + columnNames[j] + "</th>");
    }
    printWindow.document.write("</tr>");

    // Iterate over selected rows
    for (var i = 0; i < selectedRows.length; i++) {
        var row = selectedRows[i];
        printWindow.document.write("<tr>");
        for (var j = 0; j < columnNames.length-2; j++) {
            var columnName = columnNames[j];
            printWindow.document.write("<td>" + row[columnName] + "</td>");
        }
        printWindow.document.write("</tr>");
    }
    printWindow.document.write("</table></body></html>");
    printWindow.document.close();
    printWindow.print();
})