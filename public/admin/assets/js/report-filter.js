getCheckedAllClients("checked");
getCheckedAllEvaluators("checked");
getCheckedAllSurveyors("checked");
getCheckedAllTeams("checked");
changeType();
$("#filter_select .filter_by").on("change", function (e) {
    console.log('ddd');
    $(this)
        .parent()
        .parent()
        .siblings()
        .find("input:checkbox")
        .prop("checked", false);
    let len = $("#filter_select .filter_by:checked").length;
    if (len == 0) {
        $("#clients").addClass("d-none");
        $("#evaluators").addClass("d-none");
        $("#surveyors").addClass("d-none");
        $("#services").addClass("d-none");
        $("#teams").addClass("d-none");
    } else {
        var selected = e.target.value;

        if (selected != "" && selected == "clients") {
            $("#clients").removeClass("d-none");
            $("#evaluators").addClass("d-none");
            $("#surveyors").addClass("d-none");
            $("#services").addClass("d-none");
            $("#teams").addClass("d-none");
            $(".surveyor-item").prop("checked", false);
            $(".service-item").prop("checked", false);
            $(".evaluator-item").prop("checked", false);
            $(".team-item").prop("checked", false);
        } else if (selected != "" && selected == "evaluators") {
            $("#evaluators").removeClass("d-none");
            $("#clients").addClass("d-none");
            $("#surveyors").addClass("d-none");
            $("#services").addClass("d-none");
            $("#teams").addClass("d-none");
            $(".client-item").prop("checked", false);
            $(".surveyor-item").prop("checked", false);
            $(".service-item").prop("checked", false);
            $(".team-item").prop("checked", false);
            getCheckedAllClients("unChecked");
        } else if (selected != "" && selected == "surveyors") {
            $("#surveyors").removeClass("d-none");
            $("#evaluators").addClass("d-none");
            $("#clients").addClass("d-none");
            $("#services").addClass("d-none");
            $("#teams").addClass("d-none");
            $(".client-item").prop("checked", false);
            $(".service-item").prop("checked", false);
            $(".evaluator-item").prop("checked", false);
            $(".team-item").prop("checked", false);
        } else if (selected != "" && selected == "services") {
            $("#services").removeClass("d-none");
            $("#clients").addClass("d-none");
            $("#evaluators").addClass("d-none");
            $("#surveyors").addClass("d-none");
            $("#teams").addClass("d-none");
            $(".surveyor-item").prop("checked", false);
            $(".client-item").prop("checked", false);
            $(".evaluator-item").prop("checked", false);
            $(".team-item").prop("checked", false);
        } else if (selected != "" && selected == "teams") {
            $("#teams").removeClass("d-none");
            $("#services").addClass("d-none");
            $("#clients").addClass("d-none");
            $("#evaluators").addClass("d-none");
            $("#surveyors").addClass("d-none");
            $(".surveyor-item").prop("checked", false);
            $(".client-item").prop("checked", false);
            $(".evaluator-item").prop("checked", false);
        }
    }
    changeType();
});
function changeType() {
    let len = $("#filter_select .filter_by:checked").length;
    $("#filterDropdown span").html("");
    if (len != 0) {
        $("#filter_select .filter_by:checked").each(function (key, element) {
            $("#filterDropdown span").html(element.value);
        });
    } else {
        $("#filterDropdown span").html("Filter BY");
    }
}

/**
 * clients dropdown
 */
var clientTxt = [];
// check all services
$("#all-clients-report").on("click", function () {
    if ($(this).is(":checked")) {
        $(".client-item").prop("checked", true);
        getCheckedAllClients("checked");
    } else {
        $(".client-item").prop("checked", false);
        getCheckedAllClients("unChecked");
    }
});
$("#clients-report .client-item").on("click", function () {
    if ($(".client-item:checked").length == $(".client-item").length) {
        $("#all-clients-report").prop("checked", true);
    } else {
        $("#all-clients-report").prop("checked", false);
    }
    var $this = $(this);
    var labelTxt = $this.next("label").text();
    clientTxt.includes(labelTxt)
        ? clientTxt.splice(clientTxt.indexOf(labelTxt), 1)
        : clientTxt.push(labelTxt);
    if (clientTxt.length > 0) {
        $("#clientReportDropdown span").html("");
        var serTitle =
            clientTxt.length == 1
                ? "1 client Selected"
                : `${clientTxt.length} clients Selected`;
        $("#clientReportDropdown span").append(serTitle);
        $("#clientReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            clientTxt.join(" ,")
        );
    } else {
        $("#clientReportDropdown span").html("Select clients");
        $("#clientReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            "Select clients"
        );
    }
    var clients = [];
    $("#clients-report input[type=checkbox]:checked").each(function (
        key,
        element
    ) {
        clients.push(parseInt(element.value));
    });
});

function getCheckedAllClients(type) {
    clientTxt = [];
    if (type == "checked") {
        $("#clients-report .client-item:checked").each((index, element) => {
            var labelTxt = $(element)
                .next("label")
                .attr("for", element.id)
                .text()
                .trim();
            clientTxt.includes(labelTxt)
                ? clientTxt.splice(clientTxt.indexOf(labelTxt), 1)
                : clientTxt.push(labelTxt);
        });
        $("#clientReportDropdown span").html("");
        var clientTitle =
            clientTxt.length == 1
                ? "1 client Selected"
                : `${clientTxt.length} clients Selected`;
        clientTitle =
            $("#all-clients-report").is(":checked") || clientTxt.length == 0
                ? "All clients"
                : clientTitle;
        if (clientTxt.length == 0 && !$("#all-clients-report").is(":checked")) {
            clientTitle = "Select clients";
        }

        $("#clientReportDropdown span").append(clientTitle);
        $("#clientReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            clientTxt.join(" ,")
        );
    } else if ("unChecked") {
        $("#clientReportDropdown span").html("Select clients");
        $("#clientReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            "Select clients"
        );
        clientTxt = [];
    }
}
/**
 * clients dropdown
 */
var teamTxt = [];
// check all services
$("#all-teams-report").on("click", function () {
    if ($(this).is(":checked")) {
        $(".team-item").prop("checked", true);
        getCheckedAllTeams("checked");
    } else {
        $(".team-item").prop("checked", false);
        getCheckedAllTeams("unChecked");
    }
});
$("#teams-report .team-item").on("click", function () {

    if ($(".team-item:checked").length == $(".team-item").length) {
        $("#all-teams-report").prop("checked", true);
    } else {
        $("#all-teams-report").prop("checked", false);
    }
    var $this = $(this);
    var labelTxt = $this.next("label").text();
    teamTxt.includes(labelTxt)
        ? teamTxt.splice(teamTxt.indexOf(labelTxt), 1)
        : teamTxt.push(labelTxt);
    if (teamTxt.length > 0) {
        $("#teamReportDropdown span").html("");
        var serTitle =
            teamTxt.length == 1
                ? "1 team Selected"
                : `${teamTxt.length} teams Selected`;
        $("#teamReportDropdown span").append(serTitle);
        $("#teamReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            teamTxt.join(" ,")
        );
    } else {
        $("#teamReportDropdown span").html("Select teams");
        $("#teamReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            "Select teams"
        );
    }
    var teams = [];
    $("#teams-report input[type=checkbox]:checked").each(function (
        key,
        element
    ) {
        teams.push(parseInt(element.value));
    });
});

function getCheckedAllTeams(type) {
    teamTxt = [];
    if (type == "checked") {
        $("#teams-report .team-item:checked").each((index, element) => {
            var labelTxt = $(element)
                .next("label")
                .attr("for", element.id)
                .text()
                .trim();
            teamTxt.includes(labelTxt)
                ? teamTxt.splice(teamTxt.indexOf(labelTxt), 1)
                : teamTxt.push(labelTxt);
        });
        $("#teamReportDropdown span").html("");
        var teamTitle =
            teamTxt.length == 1
                ? "1 team Selected"
                : `${teamTxt.length} teams Selected`;
        teamTitle =
            $("#all-teams-report").is(":checked") || teamTxt.length == 0
                ? "All teams"
                : teamTitle;
        if (teamTxt.length == 0 && !$("#all-teams-report").is(":checked")) {
            teamTitle = "Select teams";
        }

        $("#teamReportDropdown span").append(teamTitle);
        $("#teamReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            teamTxt.join(" ,")
        );
    } else if ("unChecked") {
        $("#teamReportDropdown span").html("Select teams");
        $("#teamReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            "Select teams"
        );
        teamTxt = [];
    }
}
/**
 * service dropdown
 */
var serviceTxt = [];
// check all services
$(document).on("click", "#all-services-report", function () {
    if ($(this).is(":checked")) {
        $(".service-item").prop("checked", true);
        getCheckedAllService("checked");
    } else {
        $(".service-item").prop("checked", false);
        getCheckedAllService("unChecked");
    }
});
$(document).on("click", "#services-report .service-item", function () {
    if ($(".service-item:checked").length == $(".service-item").length) {
        $("#all-services-report").prop("checked", true);
    } else {
        $("#all-services-report").prop("checked", false);
    }
    var $this = $(this);
    var labelTxt = $this.next("label").text();
    serviceTxt.includes(labelTxt)
        ? serviceTxt.splice(serviceTxt.indexOf(labelTxt), 1)
        : serviceTxt.push(labelTxt);
    if (serviceTxt.length > 0) {
        $("#serviceReportDropdown span").html("");
        var serTitle =
            serviceTxt.length == 1
                ? "1 Service Selected"
                : `${serviceTxt.length} Services Selected`;
        $("#serviceReportDropdown span").append(serTitle);
        $("#serviceReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            serviceTxt.join(" ,")
        );
    } else {
        $("#serviceReportDropdown span").html("Select Services");
        $("#serviceReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            "Select Services"
        );
    }
    var services = [];
    $("#services-report input[type=checkbox]:checked").each(function (
        key,
        element
    ) {
        services.push(element.value);
    });
});

function getCheckedAllService(type) {
    serviceTxt = [];
    if (type == "checked") {
        $("#services-report .service-item:checked").each((index, element) => {
            var labelTxt = $(element)
                .next("label")
                .attr("for", element.id)
                .text()
                .trim();
            serviceTxt.includes(labelTxt)
                ? serviceTxt.splice(serviceTxt.indexOf(labelTxt), 1)
                : serviceTxt.push(labelTxt);
        });
        $("#serviceReportDropdown span").html("");
        var serTitle =
            serviceTxt.length == 1
                ? "1 Service Selected"
                : `${serviceTxt.length} Services Selected`;
        serTitle =
            $("#all-services-report").is(":checked") || serviceTxt.length == 0
                ? "All Services"
                : serTitle;

        if (serviceTxt.length == 0) {
            serTitle = "Select Services";
        }
        $("#serviceReportDropdown span").append(serTitle);
        $("#serviceReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            serviceTxt.join(" ,")
        );
    } else if ("unChecked") {
        $("#serviceReportDropdown span").html("Select Services");
        $("#serviceReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            "Select Services"
        );
        serviceTxt = [];
    }
}

/**
 * evaluator dropdown
 */
var evaluatorTxt = [];
// check all services
$("#all-evaluators-report").on("click", function () {
    if ($(this).is(":checked")) {
        $(".evaluator-item").prop("checked", true);
        getCheckedAllEvaluators("checked");
    } else {
        $(".evaluator-item").prop("checked", false);
        $(".team-item").prop("checked", false);
        getCheckedAllEvaluators("unChecked");
    }
});
$("#evaluators-report .evaluator-item").on("click", function () {
    if ($(".evaluator-item:checked").length == $(".evaluator-item").length) {
        $("#all-evaluators-report").prop("checked", true);
    } else {
        $("#all-evaluators-report").prop("checked", false);
    }
    var $this = $(this);
    var labelTxt = $this.next("label").text();
    evaluatorTxt.includes(labelTxt)
        ? evaluatorTxt.splice(evaluatorTxt.indexOf(labelTxt), 1)
        : evaluatorTxt.push(labelTxt);
    if (evaluatorTxt.length > 0) {
        $("#evaluatorReportDropdown span").html("");
        var serTitle =
            evaluatorTxt.length == 1
                ? "1 evaluator Selected"
                : `${evaluatorTxt.length} evaluators Selected`;
        $("#evaluatorReportDropdown span").append(serTitle);
        $("#evaluatorReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            evaluatorTxt.join(" ,")
        );
    } else {
        $("#evaluatorReportDropdown span").html("Select evaluators");
        $("#evaluatorReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            "Select evaluators"
        );
    }
    var evaluators = [];
    $("#evaluators-report input[type=checkbox]:checked").each(function (
        key,
        element
    ) {
        evaluators.push(element.value);
    });
});

function getCheckedAllEvaluators(type) {
    evaluatorTxt = [];
    if (type == "checked") {
        $("#evaluators-report .evaluator-item:checked").each(
            (index, element) => {
                var labelTxt = $(element)
                    .next("label")
                    .attr("for", element.id)
                    .text()
                    .trim();
                evaluatorTxt.includes(labelTxt)
                    ? evaluatorTxt.splice(evaluatorTxt.indexOf(labelTxt), 1)
                    : evaluatorTxt.push(labelTxt);
            }
        );
        $("#evaluatorReportDropdown span").html("");
        var evaluatorTitle =
            evaluatorTxt.length == 1
                ? "1 evaluator Selected"
                : `${evaluatorTxt.length} evaluators Selected`;
        evaluatorTitle =
            $("#all-evaluators-report").is(":checked") ||
            evaluatorTxt.length == 0
                ? "All evaluators"
                : evaluatorTitle;

        if (evaluatorTxt.length == 0) {
            evaluatorTitle = "Select evaluators";
        }
        $("#evaluatorReportDropdown span").append(evaluatorTitle);
        $("#evaluatorReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            evaluatorTxt.join(" ,")
        );
    } else if ("unChecked") {
        $("#evaluatorReportDropdown span").html("Select evaluators");
        $("#evaluatorReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            "Select evaluators"
        );
        evaluatorTxt = [];
    }
}

/**
 * surveyor
 */
var surveyorTxt = [];
// check all surveyors
$("#all-surveyors-report").on("click", function () {
    if ($(this).is(":checked")) {
        $(".surveyor-item").prop("checked", true);
        getCheckedAllSurveyors("checked");
    } else {
        $(".surveyor-item").prop("checked", false);
        getCheckedAllSurveyors("unChecked");
    }
});
$("#surveyors-report .surveyor-item").on("click", function () {
    if ($(".surveyor-item:checked").length == $(".surveyor-item").length) {
        $("#all-surveyors-report").prop("checked", true);
    } else {
        $("#all-surveyors-report").prop("checked", false);
    }
    var $this = $(this);
    var labelTxt = $this.next("label").text();
    surveyorTxt.includes(labelTxt)
        ? surveyorTxt.splice(surveyorTxt.indexOf(labelTxt), 1)
        : surveyorTxt.push(labelTxt);
    if (surveyorTxt.length > 0) {
        $("#surveyorReportDropdown span").html("");
        var serTitle =
            surveyorTxt.length == 1
                ? "1 surveyor Selected"
                : `${surveyorTxt.length} surveyors Selected`;
        $("#surveyorReportDropdown span").append(serTitle);
        $("#surveyorReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            surveyorTxt.join(" ,")
        );
    } else {
        $("#surveyorReportDropdown span").html("Select surveyors");
        $("#surveyorReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            "Select surveyors"
        );
    }
    var surveyors = [];
    $("#surveyors-report input[type=checkbox]:checked").each(function (
        key,
        element
    ) {
        surveyors.push(element.value);
    });
});

function getCheckedAllSurveyors(type) {
    surveyorTxt = [];
    if (type == "checked") {
        $("#surveyors-report .surveyor-item:checked").each((index, element) => {
            var labelTxt = $(element)
                .next("label")
                .attr("for", element.id)
                .text()
                .trim();
            surveyorTxt.includes(labelTxt)
                ? surveyorTxt.splice(surveyorTxt.indexOf(labelTxt), 1)
                : surveyorTxt.push(labelTxt);
        });
        $("#surveyorReportDropdown span").html("");
        var surveyorTitle =
            surveyorTxt.length == 1
                ? "1 surveyor Selected"
                : `${surveyorTxt.length} surveyors Selected`;
        surveyorTitle =
            $("#all-surveyors-report").is(":checked") || surveyorTxt.length == 0
                ? "All surveyors"
                : surveyorTitle;

        if (surveyorTxt.length == 0) {
            surveyorTitle = "Select surveyors";
        }
        $("#surveyorReportDropdown span").append(surveyorTitle);
        $("#surveyorReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            surveyorTxt.join(" ,")
        );
    } else if ("unChecked") {
        $("#surveyorReportDropdown span").html("Select surveyors");
        $("#surveyorReportDropdown  [data-toggle=tooltip]").attr(
            "title",
            "Select surveyors"
        );
        surveyorTxt = [];
    }
}
// search in dropdown list
$(document).on("keyup", "#serviceInput", function () {
    filterFunction("serviceInput", "services-report");
});
$(document).on("keyup", "#clientInput", function () {
    filterFunction("clientInput", "clients-report");
});
$(document).on("keyup", "#evaluatorInput", function () {
    filterFunction("evaluatorInput", "evaluators-report");
});

function filterFunction(inputId, dropId) {
    var input, filter, ul, li, a, i;
    input = document.getElementById(`${inputId}`);
    filter = input.value.toUpperCase();
    div = document.getElementById(`${dropId}`);
    li = div.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
