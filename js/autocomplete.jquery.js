/*global $, jQuery, console */

(function ($) {
	"use strict";

	var DOWN = 40,
		UP = 38,
		ENTER = 13;
		

	$.fn.autocomplete = function (options) {
		
		if ($(this)[0].tagName.toLowerCase() !== "input" || $(this)[0].type !== "text") {
			console.error("autocomplete : target need to be an input text");
			return;
		}
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			link: "php/search.php",
			autohide: false,
			callback: null
		}, options),
			search_field = $(this),
			index = 0,
			oldValue = "",
			all = 0,
			result = document.createElement("div"),
			clear = $(document.createElement("span")).text("x").css({cursor: "pointer", position: "relative", top: 0, right: "15px"});

		$(result).css({border: "1px solid black", width: "90%" });
		search_field.css("width", "90%");
		search_field.after(clear);
		$(clear).after(result);

		$(this).keydown(function (event) {
			
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
				
				if ($(".select-autocomplete:first").html() !== "") {
					search_field.val($(".select-autocomplete:first").html());
					if (settings.callback !== null) {
						settings.callback($(".select-autocomplete:first").html());
					}
				} else {
				
					if ($(".hover-autocomplete:first").html() !== "") {
						search_field.val($(".hover-autocomplete:first").html());
						
						if (settings.callback !== null) {
							settings.callback($(".select-autocomplete:first").html());
						}
						
					}
				}
				
				$(result).html("");
				
				if (settings.autohide) {
					$(result).hide();
				}
				
				oldValue = search_field.val();
			}
			
			$(result).off("mouseover");
			$(".hover-autocomplete").removeClass("hover-autocomplete");
			
			$(result).find("div").removeClass("select-autocomplete");
			$(result).find("div").eq(index % all).addClass("select-autocomplete");
		});

		$(this).keyup(
			function () {
				
				if (search_field.val() === oldValue) {
					return;
				}
				
				oldValue = search_field.val();
				
				$.post(
					settings.link,
					{search: search_field.val()},
					function (response) {
						$(result).html(response).show();
						all = $(result).find("div").length;
						$(".hover-autocomplete").removeClass("hover-autocomplete");
						
						$(result).find("div").eq(index).addClass("select-autocomplete");
						$(result).find("div").on("click", null,
												 function () {
								search_field.val($(this).html());
																
								if (settings.callback !== null) {
									settings.callback($(this).html());
								}
								if (settings.autohide) {$(result).hide(); }
								$(result).html("");
							});
						
						$(result).find("div").on("mouseout", null,
												 function () {
								$(this).removeClass("select-autocomplete hover-autocomplete");
							});
						
						$(result).find("div").on("mouseover",
											function () {
								$(".select-autocomplete").removeClass("select-autocomplete");
								$(".hover-autocomplete").removeClass("hover-autocomplete");
								$(this).addClass("hover-autocomplete");
								index = $(this).index();
							});
					}
				).fail(function () {window.alert('erreur'); });
			}
		);
		
		
		
		$(clear).click(function () {
			search_field.val(null);
			$(result).html("");
			if (settings.autohide) {
				$(result).hide();
			}
		});
		
		$(clear).hover(function (event) {
			$(this).css("color", event.type === "mouseenter" ? "blue" : "black");
		});
	     
		return this;
 
    };
 
}(jQuery));