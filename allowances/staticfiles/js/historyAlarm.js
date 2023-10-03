$(function () {
    $.ajax({
        url: "/tank/alarm/history/table/data/api/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            // console.log(t);
            // var e = $("#historicalAlarmsTbl");
            // e.bootstrapTable("showLoading");
            // e.bootstrapTable("load", []);
            // e.bootstrapTable("load", t);
            // e.bootstrapTable("refresh");
            // e.bootstrapTable("hideLoading");
            filters = {
                'sitenumber': '',
                'alarmtype': '',
                'source': '',
                'isactive': '',
                'severity': '',
                'device': '',
                'sitename': '',
                'datefrom': '',
                'dateto': '',
            }
            filteredData = []
            document.getElementById("sitenumber").addEventListener("change", function () {
                // console.log(this.value);
                filters.sitenumber = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            document.getElementById("alarmtype").addEventListener("change", function () {
                // console.log(this.value);
                filters.alarmtype = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            document.getElementById("source").addEventListener("change", function () {
                // console.log(this.value);
                filters.source = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            document.getElementById("isactive").addEventListener("change", function () {
                // console.log(this.value);
                filters.isactive = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            document.getElementById("severity").addEventListener("change", function () {
                // console.log(this.value);
                filters.severity = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            document.getElementById("device").addEventListener("change", function () {
                // console.log(this.value);
                filters.device = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            document.getElementById("sitename").addEventListener("change", function () {
                // console.log(this.value);
                filters.sitename = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            document.getElementById("df").addEventListener("change", function () {
                // console.log(this.value);
                filters.datefrom = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            document.getElementById("dt").addEventListener("change", function () {
                // console.log(this.value);
                filters.dateto = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            // document.getElementById("sbmtBTN").addEventListener("click", function () {
            //     filteredData = filterData(filters, filteredData, t);
                // var e = $("#historicalAlarmsTbl");
                // e.bootstrapTable("showLoading");
                // e.bootstrapTable("load", []);
                // e.bootstrapTable("load", filteredData);
                // e.bootstrapTable("refresh");
                // e.bootstrapTable("hideLoading");
            // });

            document.getElementById("snBTN").addEventListener("click", function () {
                filters.sitenumber = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                $('.selectpicker').selectpicker('val', "");
            });
            document.getElementById("atBTN").addEventListener("click", function () {
                filters.alarmtype = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                document.getElementById("alarmtype").value = "";
            });
            document.getElementById("sorBTN").addEventListener("click", function () {
                filters.source = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                document.getElementById("source").value = "";
            });
            document.getElementById("iaBTN").addEventListener("click", function () {
                filters.isactive = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                document.getElementById("isactive").value = "";
            });
            document.getElementById("sevBTN").addEventListener("click", function () {
                filters.severity = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                document.getElementById("severity").value = "";
            });
            document.getElementById("devBTN").addEventListener("click", function () {
                filters.device = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                document.getElementById("device").value = "";
            });
            document.getElementById("snameBTN").addEventListener("click", function () {
                filters.sitename = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                document.getElementById("sitename").value = "";
            });
            document.getElementById("dtBTN").addEventListener("click", function () {
                filters.datefrom = '';
                filters.dateto = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                document.getElementById("df").value = "";
                document.getElementById("dt").value = "";
            });
            document.getElementById("rstBTN").addEventListener("click", function () {
                filters = {
                    'sitenumber': '',
                    'alarmtype': '',
                    'source': '',
                    'isactive': '',
                    'severity': '',
                    'device': '',
                    'sitename': '',
                    'datefrom': '',
                    'dateto': '',
                }
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                $('.selectpicker').selectpicker('val', "");
                document.getElementById("alarmtype").value = "";
                document.getElementById("source").value = "";
                document.getElementById("isactive").value = "";
                document.getElementById("severity").value = "";
                document.getElementById("device").value = "";
                document.getElementById("sitename").value = "";
                document.getElementById("df").value = "";
                document.getElementById("dt").value = "";
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
    if(filters.sitenumber !== ""){
        originalData = originalData.filter((obj) => obj.sitenumber == filters.sitenumber)
        console.log(originalData);
    }
    if(filters.alarmtype !== ""){
        originalData = originalData.filter((obj) => obj.type == filters.alarmtype)
        console.log(originalData);
    }
    if(filters.source !== ""){
        originalData = originalData.filter((obj) => obj.source == filters.source)
        console.log(originalData);
    }
    if(filters.isactive !== ""){
        originalData = originalData.filter((obj) => obj.isactive == filters.isactive)
        console.log(originalData);
    }
    if(filters.severity !== ""){
        originalData = originalData.filter((obj) => obj.severity == filters.severity)
        console.log(originalData);
    }
    if(filters.device !== ""){
        originalData = originalData.filter((obj) => obj.device == filters.device)
        console.log(originalData);
    }
    if(filters.sitename !== ""){
        originalData = originalData.filter((obj) => obj.sitename == filters.sitename)
        console.log(originalData);
    }
    if(filters.datefrom !== ""){
        originalData = originalData.filter((obj) => obj.time >= filters.datefrom)
        console.log(originalData);
    }
    if(filters.dateto !== ""){
        originalData = originalData.filter((obj) => obj.time <= filters.dateto)
        console.log(originalData);
    }
    return originalData;
}

function updateTableData(filteredData){
    var e = $("#historicalAlarmsTbl");
    e.bootstrapTable("showLoading");
    e.bootstrapTable("load", []);
    e.bootstrapTable("load", filteredData);
    e.bootstrapTable("refresh");
    e.bootstrapTable("hideLoading");
}

// function displayData(sitenumber) {
//     console.log(sitenumber);
//     $.ajax({
//         url: "/tank/api/site/table/update/" + sitenumber + "/",
//         method: "GET",
//         dataType: "json",
//         success: function (data) {
            // var e = $("#sitesTbl");
            // e.bootstrapTable("showLoading");
            // e.bootstrapTable("load", []);
            // e.bootstrapTable("load", data);
            // e.bootstrapTable("refresh");
            // e.bootstrapTable("hideLoading");
//         },
//     });
// }


var o = $("#historicalAlarmsTbl");
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
                { field: "sitenumber", title: "Site Number" },
                { field: "type", title: "Type" },
                { field: "source", title: "Source" },
                { field: "isactive", title: "Is Active" },
                { field: "time", title: "Time" },
                { field: "severity", title: "Severity" },
                { field: "device", title: "Device" },
                { field: "siteid", title: "Site" },
                { field: "state", checkbox: !0, visible: "selected" === $(this).val() },
            ],
        });
    })

document.getElementById("print_selected").addEventListener("click", function () {
    var selectedRows = [];
    selectedRows = $("#historicalAlarmsTbl").bootstrapTable("getSelections");
    console.log(selectedRows);
    var printWindow = window.open("", "_blank");
    var currentDate = new Date();
    printWindow.document.open();
    printWindow.document.write(
        "<html><head><title>Historical Alarms Table</title>" +
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
    $("#historicalAlarmsTbl thead th").each(function () {
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
    //        printWindow.document.write("<tr><th>Site Number</th><th>Alarm Type</th><th>Source</th><th>Active</th><th>Time</th><th>Severity</th><th>Device</th><th>Site Name</th></tr>");
    //        for (var i = 0; i < selectedRows.length; i++) {
    //            var row = selectedRows[i];
    //            printWindow.document.write("<tr><td>" + row.SiteNumber + "</td><td>" + row.AlarmType + "</td><td>" + row.Source + "</td><td>" + row.Active + "</td><td>" + row.Time + "</td><td>" + row.Severity + "</td><td>" + row.Device + "</td><td>" + row.SiteName + "</td></tr>");
    //        }

    printWindow.document.write("</table></body></html>");
    printWindow.document.close();
    printWindow.print();
})