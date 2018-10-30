$(document).ready(function () {
    
    $('.button--open').on('click', function() {
        $('.booking-form-wrapper').slideToggle();
    });

    $("#inputPhone").mask("(999) 999-9999");

   

});