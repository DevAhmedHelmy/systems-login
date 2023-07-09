$(document).ready(function () {
    // search in dropdown list
    $(document).on("keyup", "#serviceInput", function () {
        filterFunction("serviceInput", "services-nav");
    });
    $(document).on("keyup", "#regionInput", function () {
        filterFunction("regionInput", "regions-nav");
    });
    $(document).on("keyup", "#unitInput", function () {
        filterFunction("unitInput", "units-nav");
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

    $(document).on("change", ".year", function (e) {
        $("#fp-range").val("");
        durationStr();
    });

    $(document).on("change", ".half", function (e) {
        $(this)
            .parent()
            .siblings()
            .find("input:checkbox")
            .prop("checked", false);
        $("#duration_nav .quarter:checked").prop("checked", false);
        $("#duration_nav .month:checked").prop("checked", false);
        $("#fp-range").val("");
        durationStr();
    });
    $(document).on("change", ".quarter", function (e) {
        $(this)
            .parent()
            .siblings()
            .find("input:checkbox")
            .prop("checked", false);
        $("#duration_nav .half:checked").prop("checked", false);
        $("#duration_nav .month:checked").prop("checked", false);
        $("#fp-range").val("");
        durationStr();
    });
    $(document).on("change", ".month", function (e) {
        $(this)
            .parent()
            .siblings()
            .find("input:checkbox")
            .prop("checked", false);
        $("#duration_nav .quarter:checked").prop("checked", false);
        $("#duration_nav .half:checked").prop("checked", false);
        $("#fp-range").val("");
        durationStr();
    });
    $(document).on("change", "#fp-range", function (e) {
        $("#duration_nav .year:checked").prop("checked", false);
        $("#duration_nav .quarter:checked").prop("checked", false);
        $("#duration_nav .half:checked").prop("checked", false);
        $("#duration_nav .month:checked").prop("checked", false);
        durationStr();
    });
    function durationStr() {
        let months = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec",
        };
        let quarters = { 1: "Q1", 2: "Q2", 3: "Q3", 4: "Q4" };
        let halfs = { 1: "First Half", 2: "Second Half" };

        let year = "";
        $("#duration_nav .year:checked").each(function (key, element) {
            year = element.value;
        });
        let half = "";
        $("#duration_nav .half:checked").each(function (key, element) {
            half = halfs[element.value];
        });
        let quarter = "";
        $("#duration_nav .quarter:checked").each(function (key, element) {
            quarter = quarters[element.value];
        });
        let month = "";
        $("#duration_nav .month:checked").each(function (key, element) {
            month = months[element.value];
        });
        let period = $("#fp-range").val();
        let str = "";
        if (period) {
            str += period;
        } else {
            if (half) {
                str += half + ", " + year;
            } else if (quarter) {
                str += quarter + ", " + year;
            } else if (month) {
                str += month + "," + year;
            } else if (year) {
                str += year;
            }
        }

        if (str) {
            $("#durationDropdown span").html("");
            $("#durationDropdown span").append(str);
            $("#durationDropdown  [data-toggle=tooltip]").attr("title", str);
        } else {
            $("#durationDropdown span").html("Select Duration");
            $("#DurationDropdown  [data-toggle=tooltip]").attr(
                "title",
                "Select duration"
            );
            str = "";
        }
    }
    durationStr();
});
