$(function () {
    $.ajax({
        url: "/system/TimeSheet/Done/api/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            console.log(t);
            filters = {
                'vdatefrom': '',
                'vdateto': '',
                'rdatefrom': '',
                'rdateto': '',
            }
            filteredData = []
            document.getElementById("vdf").addEventListener("change", function () {
                filters.vdatefrom = this.value;
                // filteredData = filterData(filters, filteredData, t);
                // updateTableData(filteredData);
                // filteredData = [];
                // console.log(this.value, filters);
            });
            document.getElementById("vdt").addEventListener("change", function () {
                filters.vdateto = this.value;
                // filteredData = filterData(filters, filteredData, t);
                // updateTableData(filteredData);
                // filteredData = [];
                // console.log(this.value, filters);
            });
            document.getElementById("rdf").addEventListener("change", function () {
                filters.rdatefrom = this.value;
                // filteredData = filterData(filters, filteredData, t);
                // updateTableData(filteredData);
                // filteredData = [];
                // console.log(this.value, filters);
            });
            document.getElementById("rdt").addEventListener("change", function () {
                filters.rdateto = this.value;
                // filteredData = filterData(filters, filteredData, t);
                // updateTableData(filteredData);
                // filteredData = [];
                // console.log(this.value, filters);
            });

            document.getElementById("sbmtBTN").addEventListener("click", function () {
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });

            document.getElementById("vdtBTN").addEventListener("click", function () {
                filters.vdatefrom = '';
                filters.vdateto = '';
                // filteredData = filterData(filters, filteredData, t);
                // updateTableData(filteredData);
                // filteredData = [];
                document.getElementById("vdf").value = "";
                document.getElementById("vdt").value = "";
            });
            document.getElementById("rdtBTN").addEventListener("click", function () {
                filters.rdatefrom = '';
                filters.rdateto = '';
                // filteredData = filterData(filters, filteredData, t);
                // updateTableData(filteredData);
                // filteredData = [];
                document.getElementById("rdf").value = "";
                document.getElementById("rdt").value = "";
            });
            document.getElementById("rstBTN").addEventListener("click", function () {
                filters = {
                    'vdatefrom': '',
                    'vdateto': '',
                    'rdatefrom': '',
                    'rdateto': '',
                }
                t.forEach((element) => {
                    element.vis_d = parsed_date(element.visit_date);
                    element.rec_d = parsed_date(element.record_date);
                    if( element.area_manager_status == 'a' ){
                        element.status = `<span style="color: #28a745;font-weight: bold;">Approved</span>`;
                    }else{
                        element.status = `<span style="color: #dc3545;font-weight: bold;">Rejected</span>`;
                    }
                });
                var e = $("#doneTimeSheetTbl");
                e.bootstrapTable("showLoading");
                e.bootstrapTable("load", []);
                e.bootstrapTable("load", t);
                e.bootstrapTable("refresh");
                e.bootstrapTable("hideLoading");
                filteredData = [];
                document.getElementById("vdf").value = "";
                document.getElementById("vdt").value = "";
                document.getElementById("rdf").value = "";
                document.getElementById("rdt").value = "";
            });
        },
    });
});


function filterData(filters, filtered, data){
    if(filtered.length == 0){
        originalData = data;
    }
    else{
        originalData = filtered;
    }
    if(filters.vdatefrom !== ""){
        originalData = originalData.filter((obj) => obj.visit_date >= filters.vdatefrom)
        // console.log(originalData);
    }
    if(filters.vdateto !== ""){
        originalData = originalData.filter((obj) => obj.visit_date <= filters.vdateto)
        // console.log(originalData);
    }
    if(filters.rdatefrom !== ""){
        originalData = originalData.filter((obj) => obj.record_date >= filters.rdatefrom)
        // console.log(originalData);
    }
    if(filters.rdateto !== ""){
        originalData = originalData.filter((obj) => obj.record_date <= filters.rdateto)
        // console.log(originalData);
    }
    return originalData;
}


function updateTableData(filteredData){
    // console.log(filteredData);
    table_data = filteredData;
    table_data.forEach((element) => {
        element.vis_d = parsed_date(element.visit_date);
        element.rec_d = parsed_date(element.record_date);
        if( element.area_manager_status == 'a' ){
            element.status = `<span style="color: #28a745;font-weight: bold;">Approved</span>`;
        }else{
            element.status = `<span style="color: #dc3545;font-weight: bold;">Rejected</span>`;
        }
        console.log(element);
    });
    var e = $("#doneTimeSheetTbl");
    e.bootstrapTable("showLoading");
    e.bootstrapTable("load", []);
    e.bootstrapTable("load", table_data);
    e.bootstrapTable("refresh");
    e.bootstrapTable("hideLoading");
}

var o = $("#doneTimeSheetTbl");
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
                { field: "eng_name", title: "Engineer" },
                { field: "tech_name", title: "Technicion" },
                { field: "station_code", title: "Station" },
                { field: "ticket_id", title: "Ticket" },
                { field: "task_id", title: "Task" },
                { field: "vis_d", title: "Visit" },
                { field: "notes", title: "Notes" },
                { field: "rec_d", title: "Record" },
                { field: "area_manager_status", title: "Status" },
                { field: "state", checkbox: !0, visible: "selected" === $(this).val() },
            ],
        });
    })

document.getElementById("print_selected").addEventListener("click", function () {
    var selectedRows = [];
    selectedRows = $("#doneTimeSheetTbl").bootstrapTable("getSelections");
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
    $("#doneTimeSheetTbl thead th").each(function () {
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


function parsed_date(inputDate) {
    const months = [
        'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.',
        'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'
    ];

    const dateObj = new Date(inputDate);
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    const minutes = dateObj.getMinutes();

    const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    return formattedDate;
}