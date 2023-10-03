$(document).ready(function () {
    $("#searchInput").on("keyup", function () {
        var searchTerm = $(this).val().toLowerCase();
        $("#resultContainer > div").filter(function () {
            var divText = $(this).text().toLowerCase();
            var isMatch = divText.indexOf(searchTerm) > -1;
            $(this).toggle(isMatch);
            return isMatch;
        });
    });
});


function displayData(sitenumber) {
    console.log(sitenumber);
    $.ajax({
        url: "/tank/api/site/table/update/" + sitenumber + "/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            data[0].sitenumber = `<a href="${data[0].console}">${data[0].sitenumber}</a>`
            var e = $("#sitesTbl");
            e.bootstrapTable("showLoading");
            e.bootstrapTable("load", []);
            e.bootstrapTable("load", data);
            e.bootstrapTable("refresh");
            e.bootstrapTable("hideLoading");
        },
    });
}


var o = $("#sitesTbl");
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
                { field: "id", title: "Site ID" },
                { field: "sitenumber", title: "Site Number" },
                { field: "sitename", title: "Site Name" },
                { field: "lastconnection", title: "Last Connection" },
                { field: "source", title: "Source" },
                { field: "state", checkbox: !0, visible: "selected" === $(this).val() },
            ],
        });
    })

document.getElementById("print_selected").addEventListener("click", function () {
    var selectedRows = [];
    selectedRows = $("#sitesTbl").bootstrapTable("getSelections");
    console.log(selectedRows);
    var printWindow = window.open("", "_blank");
    var currentDate = new Date();
    printWindow.document.open();
    printWindow.document.write(
        "<html><head><title>Sites Table</title>" +
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
    $("#sitesTbl thead th").each(function () {
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