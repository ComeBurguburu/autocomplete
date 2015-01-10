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
        } else {
			if ($(".hover:first").html() !== "") {
				$("#search_field").val($(".hover:first").html());
			}
		}
        
        $("#result").html("");
        oldValue = $("#search_field").val();
    }
    
    $("#result").off("mouseover");
	$(".hover").removeClass("hover");

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
				$(".hover").removeClass("hover");

				$("#result div").eq(index).addClass("select");
				$("#result div").on("click", null, function () {$("#search_field").val($(this).html()); $("#result").html(""); });
				$("#result div").on("mouseout", null, function () {$(this).removeClass("select hover"); });
				$("#result div").on("mouseover", function () {
					$(".select").removeClass("select");
					$(".hover").removeClass("hover");
					$(this).addClass("hover");
					index = $(this).index();
				});
                                        
            }
        ).fail(function () {window.alert('erreur'); });
    }
);