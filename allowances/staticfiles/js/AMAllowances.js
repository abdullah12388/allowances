function AllowancesViewApi(start, end, check) {
    $.ajax({
        url: "/system/Allowances/api/" + start + '/' + end + '/' + check + '/',
        method: "GET",
        dataType: "json",
        success: function (t) {
            // console.log(t);
            t.summary.forEach((element) => {
                console.log(element);
                element.actions = `<button class="btn btn-secondary m-auto" onclick="loadDetails('${element.eng_name__id}')">Details</button>`;
            });
            var e = $("#allowancesTbl");
            e.bootstrapTable("showLoading");
            e.bootstrapTable("load", []);
            e.bootstrapTable("load", t.summary);
            e.bootstrapTable("refresh");
            e.bootstrapTable("hideLoading");
            document.getElementById('total_sheets').innerHTML = t.total_sheets;
            document.getElementById('total_allowances').innerHTML = t.total_allowances;
        },
    });
}


function loadDetails(eng_id){
    $.ajax({
        url: "/system/Allowances/details/api/" + eng_id + '/',
        method: "GET",
        dataType: "json",
        success: function (t) {
            console.log(t);
            var e = $("#allowancesDetailsTbl");
            e.bootstrapTable("showLoading");
            e.bootstrapTable("load", []);
            e.bootstrapTable("load", t);
            e.bootstrapTable("refresh");
            e.bootstrapTable("hideLoading");
            $('#view_details').modal({
                backdrop: true,
                keyboard: true,
                focus: true,
                show: true
            });
        },
    });
}


function loadAllDetails(){
    $.ajax({
        url: "/system/Allowances/all/details/api/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            console.log(t);
            var e = $("#allowancesAllDetailsTbl");
            e.bootstrapTable("showLoading");
            e.bootstrapTable("load", []);
            e.bootstrapTable("load", t);
            e.bootstrapTable("refresh");
            e.bootstrapTable("hideLoading");
            $('#view_all_details').modal({
                backdrop: true,
                keyboard: true,
                focus: true,
                show: true
            });
        },
    });
}

$(function(){
    document.getElementById('submitBtn').addEventListener('click', function(){
        var interval_start = document.getElementById('interval_start');
        var interval_end = document.getElementById('interval_end');
        if(interval_start.value && interval_end.value){
            AllowancesViewApi(interval_start.value, interval_end.value, 'both');
        }else if(interval_start.value){
            AllowancesViewApi(interval_start.value, 'none', 'start');
        }else if(interval_end.value){
            AllowancesViewApi('none', interval_end, 'end');
        }else{
            console.log('error');
        }
    });
    document.getElementById('view_all').addEventListener('click', function(){
        loadAllDetails();
    });
    document.getElementById('resetBtn').addEventListener('click', function(){
        document.getElementById('interval_start').value = '';
        document.getElementById('interval_end').value = '';
        var e = $("#allowancesTbl");
        e.bootstrapTable("showLoading");
        e.bootstrapTable("load", []);
        e.bootstrapTable("refresh");
        e.bootstrapTable("hideLoading");
        document.getElementById('total_sheets').innerHTML = '00';
        document.getElementById('total_allowances').innerHTML = '00';
        var x = $("#allowancesDetailsTbl");
        x.bootstrapTable("showLoading");
        x.bootstrapTable("load", []);
        x.bootstrapTable("refresh");
        x.bootstrapTable("hideLoading");
    });
})


// var o = $("#allowancesTbl");
// $("#toolbar")
//     .find("select")
//     .change(function () {
//         var filename = document.getElementById('exportFileName').value;
//         var currentDate = new Date();
//         o.bootstrapTable("destroy").bootstrapTable({
//             exportDataType: $(this).val(),
//             exportOptions: {
//                 fileName: (filename ? filename + '_' : 'GTS_') + currentDate.toLocaleString(),
//             },
//             exportTypes: ["json", "xml", "csv", "txt", "sql", "excel", "pdf"],
//             columns: [
//                 { field: "eng_name__id", title: "ID" },
//                 { field: "eng_name__first_name", title: "Eng. First Name" },
//                 { field: "eng_name__last_name", title: "Eng. Last Name" },
//                 { field: "sheets", title: "Sheets" },
//                 { field: "allowances", title: "Allowances" },
//                 { field: "actions", title: "Actions" },
//                 { field: "state", checkbox: !0, visible: "selected" === $(this).val() },
//             ],
//         });
//     })

// document.getElementById("print_selected").addEventListener("click", function () {
//     var selectedRows = [];
//     selectedRows = $("#allowancesTbl").bootstrapTable("getSelections");
//     console.log(selectedRows);
//     var printWindow = window.open("", "_blank");
//     var currentDate = new Date();
//     printWindow.document.open();
//     printWindow.document.write(
//         "<html><head><title>Allowances Table</title>" +
//         "<style>" +
//         "table { border-collapse: collapse;width: 100%; }" +
//         "th, td { border: 1px solid black;text-align: center; }" +
//         "</style>" +
//         "</head><body>"
//     );
//     //        printWindow.document.write("<html><head><title>Alarms Table</title></head><body>");
//     printWindow.document.write("<h2>Printed on: " + currentDate.toString() + "</h2>");
//     printWindow.document.write("<table>");
//     // Get the column names from the table header
//     var columnNames = [];
//     $("#allowancesTbl thead th").each(function () {
//         columnNames.push($(this).data("field"));
//     });

//     // Print the table header with column names
//     printWindow.document.write("<tr>");
//     for (var j = 0; j < columnNames.length-2; j++) {
//         printWindow.document.write("<th>" + columnNames[j] + "</th>");
//     }
//     printWindow.document.write("</tr>");

//     // Iterate over selected rows
//     for (var i = 0; i < selectedRows.length; i++) {
//         var row = selectedRows[i];
//         printWindow.document.write("<tr>");
//         for (var j = 0; j < columnNames.length-2; j++) {
//             var columnName = columnNames[j];
//             printWindow.document.write("<td>" + row[columnName] + "</td>");
//         }
//         printWindow.document.write("</tr>");
//     }
//     printWindow.document.write("</table></body></html>");
//     printWindow.document.close();
//     printWindow.print();
// })


// var x = $("#allowancesDetailsTbl");
// $("#details_toolbar")
// .find("select")
// .change(function () {
//     var filename = document.getElementById('details_exportFileName').value;
//     var currentDate = new Date();
//     x.bootstrapTable("destroy").bootstrapTable({
//         exportDataType: $(this).val(),
//         exportOptions: {
//             fileName: (filename ? filename + '_' : 'GTS_') + currentDate.toLocaleString(),
//         },
//         exportTypes: ["json", "xml", "csv", "txt", "sql", "excel", "pdf"],
//         columns: [
//             { field: "id", title: "ID" },
//             { field: "tech_name", title: "Technicion" },
//             { field: "station_id", title: "Station" },
//             { field: "ticket_id", title: "Ticket" },
//             { field: "task_name", title: "Task" },
//             { field: "task_allowances", title: "Allowances" },
//             { field: "visit_date", title: "Visit" },
//             { field: "actions", title: "Actions" },
//             { field: "state", checkbox: !0, visible: "selected" === $(this).val() },
//         ],
//     });
// })

// document.getElementById("details_print_selected").addEventListener("click", function () {
//     var selectedRows = [];
//     selectedRows = $("#allowancesDetailsTbl").bootstrapTable("getSelections");
//     console.log(selectedRows);
//     var printWindow = window.open("", "_blank");
//     var currentDate = new Date();
//     printWindow.document.open();
//     printWindow.document.write(
//         "<html><head><title>Allowances Details Table</title>" +
//         "<style>" +
//         "table { border-collapse: collapse;width: 100%; }" +
//         "th, td { border: 1px solid black;text-align: center; }" +
//         "</style>" +
//         "</head><body>"
//     );
//     //        printWindow.document.write("<html><head><title>Alarms Table</title></head><body>");
//     printWindow.document.write("<h2>Printed on: " + currentDate.toString() + "</h2>");
//     printWindow.document.write("<table>");
//     // Get the column names from the table header
//     var columnNames = [];
//     $("#allowancesDetailsTbl thead th").each(function () {
//         columnNames.push($(this).data("field"));
//     });

//     // Print the table header with column names
//     printWindow.document.write("<tr>");
//     for (var j = 0; j < columnNames.length-2; j++) {
//         printWindow.document.write("<th>" + columnNames[j] + "</th>");
//     }
//     printWindow.document.write("</tr>");

//     // Iterate over selected rows
//     for (var i = 0; i < selectedRows.length; i++) {
//         var row = selectedRows[i];
//         printWindow.document.write("<tr>");
//         for (var j = 0; j < columnNames.length-2; j++) {
//             var columnName = columnNames[j];
//             printWindow.document.write("<td>" + row[columnName] + "</td>");
//         }
//         printWindow.document.write("</tr>");
//     }
//     printWindow.document.write("</table></body></html>");
//     printWindow.document.close();
//     printWindow.print();
// })