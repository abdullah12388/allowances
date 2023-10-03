function StatusComboChart() {
    $.ajax({
        url: "/system/AM/status/combo/chart/api/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            // console.log(t);
            var data = new google.visualization.DataTable();
            data.addColumn("string", "Task");
            t.status.forEach((element) => {
                data.addColumn("number", element);
            });
            t.result.forEach((element) => {
                data.addRow(element);
            });
            var options = {
                title : 'Status Count by Task',
                vAxis: {title: 'Status Count'},
                // hAxis: {title: 'Companies'},
                seriesType: 'bars',
                series: {5: {type: 'line'}},
                // isStacked: true,
            };
            var chart = new google.visualization.ComboChart(document.getElementById('StatusComboChart'));
            chart.draw(data, options);
        },
    });
}


function StatusPieChart() {
    $.ajax({
        url: "/system/AM/status/pie/chart/api/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            // console.log(t);
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Task"),
            e.addColumn("number", "Number"),
            t.forEach((t) => {
                e.addRow(t);
            });
            var a = new google.visualization.PieChart(document.getElementById("StatusPieChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row;
                    // companyTablePie(e.getValue(a, 0).split(" ")[0]);
                    // console.log(e.getValue(a, 0).split(" ")[0]);
                    // window.location.href = "/tank/sites/" + e.getValue(a, 0).split(" ")[0] + "/";
                }
            }),
            a.draw(e, { title: "Status By Number" });
        },
    });
}

// function TasksColumnChart() {
//     $.ajax({
//         url: "/system/AM/tasks/column/chart/api/",
//         method: "GET",
//         dataType: "json",
//         success: function (t) {
//             // console.log(t);
//             // var e = new google.visualization.DataTable();
//             // e.addColumn("string", "Task"),
//             //     e.addColumn("number", "Allowance"),
//             //     e.addColumn({ type: "string", role: "annotation" }),
//             //     t.forEach((t) => {
//             //         e.addRow(t);
//             //     });
//             // var a = new google.visualization.ColumnChart(document.getElementById("TasksColumnChart"));
//             // google.visualization.events.addListener(a, "select", function () {
//             //     const t = a.getSelection();
//             //     if (t && t.length > 0) {
//             //         const a = t[0].row,
//             //             o = e.getValue(a, 0);
//             //         // window.location.href = "/tank/sites/" + o.split(" ")[1] + "/";
//             //         // console.log(o.split(" ")[1]);
//             //     }
//             // }),
//             //     a.draw(e, {
//             //         title: "Tasks per Allowances",
//             //         // hAxis: { title: "Tasks", titleTextStyle: { fontSize: 18, color: "#053061", bold: !0, italic: !1 } },
//             //         vAxis: { title: "Amount", titleTextStyle: { fontSize: 18, color: "#035061", bold: !0, italic: !1 } },
//             //         legend: { position: "none" },
//             //     });
//         },
//     });
// }

function TasksPieChart() {
    $.ajax({
        url: "/system/AM/tasks/pie/chart/api/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            // console.log(t);
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Man Power Type"),
            e.addColumn("number", "Number"),
            t.forEach((t) => {
                e.addRow(t);
            });
            var a = new google.visualization.PieChart(document.getElementById("TasksPieChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row;
                    // companyTablePie(e.getValue(a, 0).split(" ")[0]);
                    // console.log(e.getValue(a, 0).split(" ")[0]);
                    // window.location.href = "/tank/sites/" + e.getValue(a, 0).split(" ")[0] + "/";
                }
            }),
            a.draw(e, { title: "Task Man Power Type per Number" });
        },
    });
}


$(function () {
    // $.ajax({
    //     url: "/system/AM/table/data/api/",
    //     method: "GET",
    //     dataType: "json",
    //     success: function (t) {
    //         console.log(t);
    //         var e = $("#timeSheetTbl");
    //         e.bootstrapTable("showLoading");
    //         e.bootstrapTable("load", []);
    //         e.bootstrapTable("load", t);
    //         e.bootstrapTable("refresh");
    //         e.bootstrapTable("hideLoading");
    //         // var e = new google.visualization.DataTable();
    //         // e.addColumn("string", "status Types"),
    //         //     e.addColumn("number", "Sites"),
    //         //     t.forEach((t) => {
    //         //         e.addRow(t);
    //         //     });
    //         // var a = new google.visualization.PieChart(document.getElementById("ApprovedPieChart"));
    //         // google.visualization.events.addListener(a, "select", function () {
    //         //     const t = a.getSelection();
    //         //     if (t && t.length > 0) {
    //         //         const a = t[0].row;
    //         //         // companyTablePie(e.getValue(a, 0).split(" ")[0]);
    //         //         // console.log(e.getValue(a, 0).split(" ")[0]);
    //         //         window.location.href = "/tank/sites/" + e.getValue(a, 0).split(" ")[0] + "/";
    //         //     }
    //         // }),
    //         //     a.draw(e, { title: "Status per Site" });
    //     },
    // });
    google.charts.load("current", { packages: ["corechart", "bar"] });
    google.charts.setOnLoadCallback(StatusComboChart);
    google.charts.setOnLoadCallback(StatusPieChart);
    // google.charts.setOnLoadCallback(TasksColumnChart);
    google.charts.setOnLoadCallback(TasksPieChart);
});


function downloadCharts(chart_id, select_id) {
    var chartElement = document.getElementById(chart_id);
    var selectElement = document.getElementById(select_id);
    if (selectElement.value === 'png') {
        html2canvas(chartElement).then(function (canvas) {
            var chartImage = canvas.toDataURL('image/png');
            var downloadLink = document.createElement('a');
            downloadLink.href = chartImage;
            downloadLink.download = 'GTS_chart_' + (new Date).toLocaleString() + '.png';
            downloadLink.click();
            selectElement.value = "";
        });
    }
    if (selectElement.value === 'pdf') {
        html2canvas(chartElement, { logging: true, allowTaint: true }).then(function (canvas) {
            var chartImage = canvas.toDataURL('image/png');
            var pdf = new jsPDF('landscape', 'mm', 'a4');
            var imgAspectRatio = canvas.width / canvas.height;
            var imgWidth, imgHeight;
            if (imgAspectRatio > 1) {
                imgWidth = pdf.internal.pageSize.getWidth();
                imgHeight = imgWidth / imgAspectRatio;
            } else {
                imgHeight = pdf.internal.pageSize.getHeight();
                imgWidth = imgHeight * imgAspectRatio;
            }
            var xPos = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
            var yPos = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;
            pdf.addImage(chartImage, 'PNG', xPos, yPos, imgWidth, imgHeight);
            pdf.save('GTS_chart_' + (new Date()).toLocaleString() + '.pdf');
            selectElement.value = "";
        });
    }
}


var o = $("#timeSheetTbl");
$("#toolbar")
    .find("select")
    .change(function () {
        var filename = document.getElementById('exportFileName').value;
        var currentDate = new Date();
        o.bootstrapTable("destroy").bootstrapTable({
            exportDataType: $(this).val(),
            exportOptions: {
                fileName: (filename ? filename + '_' :'Sites_') + currentDate.toLocaleString(),
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
                { field: "area_manager_status", title: "Status" },
                { field: "state", checkbox: !0, visible: "selected" === $(this).val() },
            ],
        });
    })

document.getElementById("print_selected").addEventListener("click", function () {
    var selectedRows = [];
    selectedRows = $("#timeSheetTbl").bootstrapTable("getSelections");
    console.log(selectedRows);
    var printWindow = window.open("", "_blank");
    var currentDate = new Date();
    printWindow.document.open();
    printWindow.document.write(
        "<html><head><title>Time Sheet Table</title>" +
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
    $("#timeSheetTbl thead th").each(function () {
        columnNames.push($(this).data("field"));
    });

    // Print the table header with column names
    printWindow.document.write("<tr>");
    for (var j = 0; j < columnNames.length; j++) {
        printWindow.document.write("<th>" + columnNames[j] + "</th>");
    }
    printWindow.document.write("</tr>");

    // Iterate over selected rows
    for (var i = 0; i < selectedRows.length; i++) {
        var row = selectedRows[i];
        printWindow.document.write("<tr>");
        for (var j = 0; j < columnNames.length; j++) {
            var columnName = columnNames[j];
            printWindow.document.write("<td>" + row[columnName] + "</td>");
        }
        printWindow.document.write("</tr>");
    }
    printWindow.document.write("</table></body></html>");
    printWindow.document.close();
    printWindow.print();
})