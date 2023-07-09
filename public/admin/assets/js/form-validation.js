/*=========================================================================================
  File Name: form-validation.js
  Description: jquery bootstrap validation js
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
    //"use strict";
    var horizontalWizard = document.querySelector(".evaluation-form");
    if (typeof horizontalWizard !== undefined && horizontalWizard !== null) {
        var numberedStepper = new Stepper(horizontalWizard);
        $(".eval_form").validate();

        var isValid = $(".eval_form").valid();

        $(".valid_btn").on("click", function (e) {

            $(".eval_form").validate();

            // var isValid = $(".eval_form").valid();
            console.log(isValid);
            if (isValid) {
                numberedStepper.next();
            } else {

                e.preventDefault();
            }
        });
        // $(horizontalWizard)
        //     .find(".btn-next")
        //     .each(function () {
        //         $(this).on("click", function (e) {
        //             var isValid = $(".eval_form").valid();
        //             console.log(isValid);
        //             if (isValid) {
        //                 numberedStepper.next();
        //             } else {
        //                 e.preventDefault();
        //             }
        //         });
        //     });

        // $(horizontalWizard)
        //     .find(".btn-prev")
        //     .on("click", function () {
        //         numberedStepper.previous();
        //     });

        // $(horizontalWizard)
        //     .find(".btn-submit")
        //     .on("click", function () {
        //         var isValid = $(this).parent().siblings("form").valid();
        //         if (isValid) {
        //             alert("Submitted..!!");
        //         }
        //     });
    }
});
