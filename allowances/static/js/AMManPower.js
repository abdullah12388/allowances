function ManPowerPositionPieChart() {
    $.ajax({
        url: "/system/ManPower/position/pie/chart/api/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            // console.log(t);
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Position"),
                e.addColumn("number", "Number"),
                t.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.PieChart(document.getElementById("PositionPieChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row;
                    // companyTablePie(e.getValue(a, 0).split(" ")[0]);
                    // console.log(e.getValue(a, 0).split(" ")[0]);
                    // window.location.href = "/tank/sites/" + e.getValue(a, 0).split(" ")[0] + "/";
                }
            }),
                a.draw(e, { title: "Man Power Position per Number" });
        },
    });
}


$(function () {
    var fn = document.getElementById('first_name');
    var ln = document.getElementById('last_name');
    var nid = document.getElementById('national_id');
    fn.addEventListener('keyup', function () {
        let pattern = /[A-Za-z]+/;
        if (!pattern.test(this.value)) {
            this.value = '';
        }
    });
    ln.addEventListener('keyup', function () {
        let pattern = /[A-Za-z]+/;
        if (!pattern.test(this.value)) {
            this.value = '';
        }
    });
    nid.addEventListener('keyup', function () {
        let pattern = /[0-9]+/;
        if (!pattern.test(this.value)) {
            this.value = '';
        }else{
            if((this.value).length > 14 ){
                this.value = this.value.slice(0,14);
            }
        }
    });
    google.charts.load("current", { packages: ["corechart", "bar"] });
    google.charts.setOnLoadCallback(ManPowerPositionPieChart);
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
        html2canvas(chartElement).then(function (canvas) {
            var chartImage = canvas.toDataURL('image/png');
            var pdf = new jsPDF('landscape');
            pdf.addImage(chartImage, 'PNG', 10, 20, 300, 120);
            pdf.save('GTS_chart_' + (new Date).toLocaleString() + '.pdf');
            selectElement.value = "";
        });
    }
}


var o = $("#manPowerTbl");
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
                { field: "first_name", title: "Full Name" },
                { field: "national_id", title: "ID Number" },
                { field: "username", title: "Login" },
                { field: "position", title: "Position" },
                { field: "email", title: "E-mail" },
                { field: "add_date", title: "Add Date" },
                { field: "state", checkbox: !0, visible: "selected" === $(this).val() },
            ],
        });
    })

document.getElementById("print_selected").addEventListener("click", function () {
    var selectedRows = [];
    selectedRows = $("#manPowerTbl").bootstrapTable("getSelections");
    console.log(selectedRows);
    var printWindow = window.open("", "_blank");
    var currentDate = new Date();
    printWindow.document.open();
    printWindow.document.write(
        "<html><head><title>Man Power Table</title>" +
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
    $("#manPowerTbl thead th").each(function () {
        columnNames.push($(this).data("field"));
    });

    // Print the table header with column names
    printWindow.document.write("<tr>");
    for (var j = 0; j < columnNames.length-1; j++) {
        printWindow.document.write("<th>" + columnNames[j] + "</th>");
    }
    printWindow.document.write("</tr>");

    // Iterate over selected rows
    for (var i = 0; i < selectedRows.length-1; i++) {
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