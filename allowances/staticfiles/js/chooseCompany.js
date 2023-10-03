function handleKeyPress(o) {
    "Enter" === o.key && openCompany();
}
function openCompany() {
    var o = $("#companyId").val();
    o
        ? (window.location.href = "/company/" + o)
        : ($("#companyId").css("background-color", "#dc3545"),
          setTimeout(() => {
              $("#companyId").css("background-color", "#ffffff");
          }, 350));
}
