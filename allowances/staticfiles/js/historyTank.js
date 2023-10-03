$(function () {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const pageNumber = urlSearchParams.get('page');
    $.ajax({
        url: "/tank/tank/history/table/data/api/"+pageNumber+"/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            // console.log(t);
            filters = {
                'sitenumber': '',
                'tanknames': '',
                'capacity': '',
                'product': '',
                'sitename': ''
            }
            filteredData = [];
            document.getElementById("sitenumber").addEventListener("change", function () {
                // console.log(this.value);
                filters.sitenumber = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            document.getElementById("tanknames").addEventListener("change", function () {
                // console.log(this.value);
                filters.tanknames = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            document.getElementById("capacity").addEventListener("change", function () {
                // console.log(this.value);
                filters.capacity = this.value;
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
            });
            document.getElementById("product").addEventListener("change", function () {
                // console.log(this.value);
                filters.product = this.value;
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
            // document.getElementById("sbmtBTN").addEventListener("click", function () {
            //     filteredData = filterData(filters, filteredData, t);
            //     var e = $("#currentAlarmsTbl");
            //     e.bootstrapTable("showLoading");
            //     e.bootstrapTable("load", []);
            //     e.bootstrapTable("load", filteredData);
            //     e.bootstrapTable("refresh");
            //     e.bootstrapTable("hideLoading");
            // });
            document.getElementById("snBTN").addEventListener("click", function () {
                filters.sitenumber = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                $('.selectpicker').selectpicker('val', "");
            });
            document.getElementById("tnBTN").addEventListener("click", function () {
                filters.tanknames = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                document.getElementById("tanknames").value = "";
            });
            document.getElementById("capBTN").addEventListener("click", function () {
                filters.capacity = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                document.getElementById("capacity").value = "";
            });
            document.getElementById("prodBTN").addEventListener("click", function () {
                filters.product = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                document.getElementById("product").value = "";
            });
            document.getElementById("snameBTN").addEventListener("click", function () {
                filters.sitename = '';
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                document.getElementById("sitename").value = "";
            });
            document.getElementById("rstBTN").addEventListener("click", function () {
                filters = {
                    'sitenumber': '',
                    'tanknames': '',
                    'capacity': '',
                    'product': '',
                    'sitename': ''
                }
                filteredData = filterData(filters, filteredData, t);
                updateTableData(filteredData);
                filteredData = [];
                $('.selectpicker').selectpicker('val', "");
                document.getElementById("tanknames").value = "";
                document.getElementById("capacity").value = "";
                document.getElementById("product").value = "";
                document.getElementById("sitename").value = "";
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
    if(filters.tanknames !== ""){
        originalData = originalData.filter((obj) => obj.Tank == filters.tanknames)
        console.log(originalData);
    }
    if(filters.capacity !== ""){
        originalData = originalData.filter((obj) => obj.capacity == filters.capacity)
        console.log(originalData);
    }
    if(filters.product !== ""){
        originalData = originalData.filter((obj) => obj.product == filters.product)
        console.log(originalData);
    }
    if(filters.sitename !== ""){
        originalData = originalData.filter((obj) => obj.sitename == filters.sitename)
        console.log(originalData);
    }
    return originalData;
}

function updateTableData(filteredData){
    var e = $("#historyTanksTbl");
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


var o = $("#historyTanksTbl");
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
                { field: "Tank", title: "Tank" },
                { field: "product", title: "Product" },
                { field: "capacity", title: "Capacity" },
                { field: "productvolume", title: "Product Volume" },
                { field: "watervolume", title: "Water Volume" },
                { field: "sitename", title: "Site Name" },
                { field: "timestamp", title: "Timestamp" },
                { field: "state", checkbox: !0, visible: "selected" === $(this).val() },
            ],
        });
    })

document.getElementById("print_selected").addEventListener("click", function () {
    var selectedRows = [];
    selectedRows = $("#historyTanksTbl").bootstrapTable("getSelections");
    console.log(selectedRows);
    var printWindow = window.open("", "_blank");
    var currentDate = new Date();
    printWindow.document.open();
    printWindow.document.write(
        "<html><head><title>Historical Tanks Table</title>" +
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
    $("#historyTanksTbl thead th").each(function () {
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