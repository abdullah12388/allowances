var companyId = parseInt($("#companyId").val());
var companyName = $("#companyName").val();
var duration = $("#duration").val();

function siteLineChart() {
    $.ajax({
        url: "/tank/api/sites/line/charts/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Site Number"),
                e.addColumn("number", "Status"),
                t.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.LineChart(document.getElementById("siteLineChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row,
                    o = e.getValue(a, 0);
                    window.location.href = "/tank/sites/" + o.split(" ")[1] + "/";
                    // console.log(o.split(" ")[1]);
                }
            }),
                a.draw(e, {
                    title: "Status Per Site",
                    hAxis: { title: "Sites", titleTextStyle: { fontSize: 18, color: "#053061", bold: !0, italic: !1 } },
                    vAxis: { title: "Status", titleTextStyle: { fontSize: 18, color: "#035061", bold: !0, italic: !1 } },
                    legend: { position: "none" },
                    lineWidth: 15,
                    curveType: 'function'
                });
        },
    });
}

function sitePieChart() {
    $.ajax({
        url: "/tank/api/sites/pie/charts/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            var e = new google.visualization.DataTable();
            e.addColumn("string", "status Types"),
                e.addColumn("number", "Sites"),
                t.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.PieChart(document.getElementById("sitePieChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row;
                    // companyTablePie(e.getValue(a, 0).split(" ")[0]);
                    // console.log(e.getValue(a, 0).split(" ")[0]);
                    window.location.href = "/tank/sites/" + e.getValue(a, 0).split(" ")[0] + "/";
                }
            }),
                a.draw(e, { title: "Status per Site" });
        },
    });
}

function OpAlarmColumnChart() {
    $.ajax({
        url: "/tank/api/alarms/operational/column/charts/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Alarm Type"),
                e.addColumn("number", "Alarms"),
                e.addColumn({ type: "number", role: "annotation" }),
                t.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.ColumnChart(document.getElementById("OpAlarmColumnChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row,
                        o = e.getValue(a, 0);
                    // window.location.href = "/tank/sites/" + o.split(" ")[1] + "/";
                    // console.log(o.split(" ")[1]);
                }
            }),
                a.draw(e, {
                    title: "Alarms Per Type",
                    // hAxis: { title: "Sites", titleTextStyle: { fontSize: 18, color: "#053061", bold: !0, italic: !1 } },
                    vAxis: { title: "Alarm Count", titleTextStyle: { fontSize: 18, color: "#035061", bold: !0, italic: !1 } },
                    legend: { position: "none" },
                });
        },
    });
}

function OpAlarmPieChart() {
    $.ajax({
        url: "/tank/api/alarms/operational/pie/charts/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Alarm Type"),
                e.addColumn("number", "Alarms"),
                t.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.PieChart(document.getElementById("OpAlarmPieChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row;
                    // companyTablePie(e.getValue(a, 0).split(" ")[0]);
                }
            }),
                a.draw(e, { title: "Alarms per Type" });
        },
    });
}

function alarmColumnChart() {
    $.ajax({
        url: "/tank/api/alarms/column/charts/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Alarm Type"),
                e.addColumn("number", "Alarms"),
                e.addColumn({ type: "number", role: "annotation" }),
                t.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.ColumnChart(document.getElementById("AlarmColumnChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row,
                        o = e.getValue(a, 0);
                    // window.location.href = "/tank/sites/" + o.split(" ")[1] + "/";
                    // console.log(o.split(" ")[1]);
                }
            }),
                a.draw(e, {
                    title: "Alarms Per Type",
                    // hAxis: { title: "Sites", titleTextStyle: { fontSize: 18, color: "#053061", bold: !0, italic: !1 } },
                    vAxis: { title: "Alarm Count", titleTextStyle: { fontSize: 18, color: "#035061", bold: !0, italic: !1 } },
                    legend: { position: "none" },
                });
        },
    });
}

function alarmPieChart() {
    $.ajax({
        url: "/tank/api/alarms/pie/charts/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Alarm Type"),
                e.addColumn("number", "Alarms"),
                t.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.PieChart(document.getElementById("AlarmPieChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row;
                    // companyTablePie(e.getValue(a, 0).split(" ")[0]);
                }
            }),
                a.draw(e, { title: "Alarms per Type" });
        },
    });
}

function tankColumnChart() {
    var siteid = document.getElementById('siteid').value;
    document.getElementById('T_'+siteid).classList.add('active');
    $.ajax({
        url: "/tank/api/tanks/column/charts/" + siteid + "/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Tanks"),
                e.addColumn("number", "Product"),
                e.addColumn({ type: "string", role: "annotation" }),
                t.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.ColumnChart(document.getElementById("TankColumnChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row,
                        o = e.getValue(a, 0);
                    // window.location.href = "/tank/sites/" + o.split(" ")[1] + "/";
                    // console.log(o.split(" ")[1]);
                }
            }),
                a.draw(e, {
                    title: "Product Volume Per Tank",
                    // hAxis: { title: "Sites", titleTextStyle: { fontSize: 18, color: "#053061", bold: !0, italic: !1 } },
                    vAxis: { title: "Prod. Vol.", titleTextStyle: { fontSize: 18, color: "#035061", bold: !0, italic: !1 } },
                    legend: { position: "none" },
                });
        },
    });
}

function tankPieChart() {
    $.ajax({
        url: "/tank/api/tanks/pie/charts/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Precentage"),
                e.addColumn("number", "Tanks"),
                t.list.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.PieChart(document.getElementById("TankPieChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row;
                    console.log("/tank/product/" + e.getValue(a, 0).split(" ")[0] + "/");
                    window.location.href = "/tank/current/product/" + e.getValue(a, 0).split(" ")[0] + "/";
                }
            }),
                a.draw(e, { title: "Tanks Product above & below "+t.precent+"%" });
        },
    });
}

function drawTanksColumnChart(siteid){
    const buttons = document.querySelectorAll('.tank-toggle-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById('T_'+siteid).classList.add('active');
    $.ajax({
        url: "/tank/api/tanks/column/charts/" + siteid + "/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Tanks"),
                e.addColumn("number", "Product"),
                e.addColumn({ type: "string", role: "annotation" }),
                t.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.ColumnChart(document.getElementById("TankColumnChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row,
                        o = e.getValue(a, 0);
                    // window.location.href = "/tank/sites/" + o.split(" ")[1] + "/";
                    // console.log(o.split(" ")[1]);
                }
            }),
                a.draw(e, {
                    title: "Product Volume Per Tank",
                    // hAxis: { title: "Sites", titleTextStyle: { fontSize: 18, color: "#053061", bold: !0, italic: !1 } },
                    vAxis: { title: "Prod. Vol.", titleTextStyle: { fontSize: 18, color: "#035061", bold: !0, italic: !1 } },
                    legend: { position: "none" },
                });
        },
    });
}


// function deliveryCountColumnChart() {
//     var siteid = document.getElementById('siteid').value;
//     document.getElementById('D_'+siteid).classList.add('active');
//     $.ajax({
//         url: "/tank/api/delivery/count/column/charts/" + siteid + "/",
//         method: "GET",
//         dataType: "json",
//         success: function (t) {
//             var e = new google.visualization.DataTable();
//             e.addColumn("string", "Tanks"),
//             e.addColumn("number", "Delivery Count"),
//             e.addColumn({ type: "string", role: "annotation" }),
//             t.forEach((t) => {
//                 e.addRow(t);
//             });
//             var a = new google.visualization.ColumnChart(document.getElementById("DeliveryCountColumnChart"));
//             google.visualization.events.addListener(a, "select", function () {
//                 const t = a.getSelection();
//                 if (t && t.length > 0) {
//                     const a = t[0].row,
//                         o = e.getValue(a, 0);
//                     // window.location.href = "/tank/sites/" + o.split(" ")[1] + "/";
//                     // console.log(o.split(" ")[1]);
//                 }
//             }),
//                 a.draw(e, {
//                     title: "Delivery Count per Tank",
//                     // hAxis: { title: "Sites", titleTextStyle: { fontSize: 18, color: "#053061", bold: !0, italic: !1 } },
//                     vAxis: { title: "Delivery Count", titleTextStyle: { fontSize: 18, color: "#035061", bold: !0, italic: !1 } },
//                     legend: { position: "none" },
//                 });
//         },
//     });
// }


function deliveryAmountColumnChart() {
    var siteid = document.getElementById('siteid').value;
    document.getElementById('D_'+siteid).classList.add('active');
    $.ajax({
        url: "/tank/api/delivery/amount/column/charts/" + siteid + "/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Tanks"),
                e.addColumn("number", "Product"),
                e.addColumn({ type: "number", role: "annotation" }),
                t.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.ColumnChart(document.getElementById("DeliveryAmountColumnChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row,
                        o = e.getValue(a, 0);
                    // window.location.href = "/tank/sites/" + o.split(" ")[1] + "/";
                    // console.log(o.split(" ")[1]);
                }
            }),
                a.draw(e, {
                    title: "Delivery Amount per Tank",
                    // hAxis: { title: "Sites", titleTextStyle: { fontSize: 18, color: "#053061", bold: !0, italic: !1 } },
                    vAxis: { title: "Prod. Vol.", titleTextStyle: { fontSize: 18, color: "#035061", bold: !0, italic: !1 } },
                    legend: { position: "none" },
                });
        },
    });
}


// function deliveryPieChart() {
//     var siteid = document.getElementById('siteid').value;
//     document.getElementById('D_'+siteid).classList.add('active');
//     $.ajax({
//         url: "/tank/api/delivery/pie/charts/" + siteid + "/",
//         method: "GET",
//         dataType: "json",
//         success: function (t) {
//             var e = new google.visualization.DataTable();
//             e.addColumn("string", "Delivery"),
//                 e.addColumn("number", "Count"),
//                 t.forEach((t) => {
//                     e.addRow(t);
//                 });
//             var a = new google.visualization.PieChart(document.getElementById("DeliveryPieChart"));
//             google.visualization.events.addListener(a, "select", function () {
//                 const t = a.getSelection();
//                 if (t && t.length > 0) {
//                     const a = t[0].row;
//                     // companyTablePie(e.getValue(a, 0).split(" ")[0]);
//                 }
//             }),
//                 a.draw(e, { title: "Delivery per Tank" });
//         },
//     });
// }


function drawDeliveryColumnChart(siteid){
    const buttons = document.querySelectorAll('.delivery-toggle-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById('D_'+siteid).classList.add('active');
    // $.ajax({
    //     url: "/tank/api/delivery/count/column/charts/" + siteid + "/",
    //     method: "GET",
    //     dataType: "json",
    //     success: function (t) {
    //         var e = new google.visualization.DataTable();
    //         e.addColumn("string", "Tanks"),
    //         e.addColumn("number", "Delivery Count"),
    //         e.addColumn({ type: "string", role: "annotation" }),
    //         t.forEach((t) => {
    //             e.addRow(t);
    //         });
    //         var a = new google.visualization.ColumnChart(document.getElementById("DeliveryCountColumnChart"));
    //         google.visualization.events.addListener(a, "select", function () {
    //             const t = a.getSelection();
    //             if (t && t.length > 0) {
    //                 const a = t[0].row,
    //                     o = e.getValue(a, 0);
    //                 // window.location.href = "/tank/sites/" + o.split(" ")[1] + "/";
    //                 // console.log(o.split(" ")[1]);
    //             }
    //         }),
    //             a.draw(e, {
    //                 title: "Delivery Count per Tank",
    //                 // hAxis: { title: "Sites", titleTextStyle: { fontSize: 18, color: "#053061", bold: !0, italic: !1 } },
    //                 vAxis: { title: "Delivery Count", titleTextStyle: { fontSize: 18, color: "#035061", bold: !0, italic: !1 } },
    //                 legend: { position: "none" },
    //             });
    //     },
    // });
    $.ajax({
        url: "/tank/api/delivery/amount/column/charts/" + siteid + "/",
        method: "GET",
        dataType: "json",
        success: function (t) {
            var e = new google.visualization.DataTable();
            e.addColumn("string", "Tanks"),
                e.addColumn("number", "Product"),
                e.addColumn({ type: "number", role: "annotation" }),
                t.forEach((t) => {
                    e.addRow(t);
                });
            var a = new google.visualization.ColumnChart(document.getElementById("DeliveryAmountColumnChart"));
            google.visualization.events.addListener(a, "select", function () {
                const t = a.getSelection();
                if (t && t.length > 0) {
                    const a = t[0].row,
                        o = e.getValue(a, 0);
                    // window.location.href = "/tank/sites/" + o.split(" ")[1] + "/";
                    // console.log(o.split(" ")[1]);
                }
            }),
                a.draw(e, {
                    title: "Delivery Amount per Tank",
                    // hAxis: { title: "Sites", titleTextStyle: { fontSize: 18, color: "#053061", bold: !0, italic: !1 } },
                    vAxis: { title: "Prod. Vol.", titleTextStyle: { fontSize: 18, color: "#035061", bold: !0, italic: !1 } },
                    legend: { position: "none" },
                });
        },
    });
    // $.ajax({
    //     url: "/tank/api/delivery/pie/charts/" + siteid + "/",
    //     method: "GET",
    //     dataType: "json",
    //     success: function (t) {
    //         var e = new google.visualization.DataTable();
    //         e.addColumn("string", "Delivery"),
    //             e.addColumn("number", "Count"),
    //             t.forEach((t) => {
    //                 e.addRow(t);
    //             });
    //         var a = new google.visualization.PieChart(document.getElementById("DeliveryPieChart"));
    //         google.visualization.events.addListener(a, "select", function () {
    //             const t = a.getSelection();
    //             if (t && t.length > 0) {
    //                 const a = t[0].row;
    //                 // companyTablePie(e.getValue(a, 0).split(" ")[0]);
    //             }
    //         }),
    //             a.draw(e, { title: "Delivery per Tank" });
    //     },
    // });
}


$(function () {
    $("#siteTankSearch").on("keyup", function () {
        var searchTerm = $(this).val().toLowerCase();
        $("#siteTankResultContainer > button").filter(function () {
            var divText = $(this).text().toLowerCase();
            var isMatch = divText.indexOf(searchTerm) > -1;
            $(this).toggle(isMatch);
            return isMatch;
        });
    });
    $("#siteDelSearch").on("keyup", function () {
        var searchTerm = $(this).val().toLowerCase();
        $("#siteDelResultContainer > button").filter(function () {
            var divText = $(this).text().toLowerCase();
            var isMatch = divText.indexOf(searchTerm) > -1;
            $(this).toggle(isMatch);
            return isMatch;
        });
    });
    google.charts.load("current", { packages: ["corechart", "bar"] });
    google.charts.setOnLoadCallback(siteLineChart);
    google.charts.setOnLoadCallback(sitePieChart);
    google.charts.setOnLoadCallback(OpAlarmColumnChart);
    google.charts.setOnLoadCallback(OpAlarmPieChart);
    google.charts.setOnLoadCallback(alarmColumnChart);
    google.charts.setOnLoadCallback(alarmPieChart);
    google.charts.setOnLoadCallback(tankColumnChart);
    google.charts.setOnLoadCallback(tankPieChart);
    // google.charts.setOnLoadCallback(deliveryCountColumnChart);
    google.charts.setOnLoadCallback(deliveryAmountColumnChart);
    // google.charts.setOnLoadCallback(deliveryPieChart);
    setTimeout(function(){
        window.location.reload();
    },1000*parseInt(duration));
});


function downloadCharts(chart_id, select_id) {
    var chartElement = document.getElementById(chart_id);
    var selectElement = document.getElementById(select_id);
    if (selectElement.value === 'png') {
        html2canvas(chartElement).then(function (canvas) {
            var chartImage = canvas.toDataURL('image/png');
            var downloadLink = document.createElement('a');
            downloadLink.href = chartImage;
            downloadLink.download = companyName + '_chart_' + (new Date).toLocaleString() + '.png';
            downloadLink.click();
            selectElement.value = "";
        });
    }
    if (selectElement.value === 'pdf') {
        html2canvas(chartElement).then(function (canvas) {
            var chartImage = canvas.toDataURL('image/png');
            var pdf = new jsPDF('landscape');
            pdf.addImage(chartImage, 'PNG', 10, 20, 300, 120);
            pdf.save(companyName + '_chart_' + (new Date).toLocaleString() + '.pdf');
            selectElement.value = "";
        });
    }
}