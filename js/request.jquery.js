"use strict";
var DOWN = 40;
var UP = 38;
var ENTER = 13;
var index = 0;
var oldValue = "";
var all = 0;

$(document).keydown(function (event) {
    
    if (event.which === UP) {
        index -= 1;
    }
    if (event.which === DOWN) {
        index += 1;
    }
    
    if (index < 0) {
        index = 0;
    }
    
    if (event.which === ENTER) {
        if ($(".select:first").html() !== "") {
            $("#search_field").val($(".select:first").html());
        }
        
        $("#result").html("");
        oldValue = $("#search_field").val();
    }
    
   
    $("#result div").removeClass("select");
    $("#result div").eq(index % all).addClass("select");
    
});

$("#search_field").keyup(
    function () {
        
        if ($("#search_field").val() === oldValue) {
            return;
        }
        
        oldValue = $("#search_field").val();
                   
        $.post(
            'php/search.php',
            {search: $("#search_field").val()},
            function (result) {
                $("#result").html(result);
                all = $("#result div").length;
                $("#result div").eq(0).addClass("select");
                $("#result div").bind("click", null, function () {$("#search_field").val($(this).html()); });
                $("#result div").bind("mouseout", null, function () {$(this).removeClass("select"); });
                                        
            }
        )
						.fail(function () {window.alert('erreur'); }
                             );
    }
);