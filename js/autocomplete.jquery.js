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
			callback: null,
			className: "select-autocomplete"
		}, options),
			search_field = $(this),
			index = 0,
			oldValue = "",
			all = 0,
			result = document.createElement("div"),
			clear = $(document.createElement("span")).text("x").css({cursor: "pointer", position: "relative", top: 0, right: "15px"});

		$(result).css({border: "1px solid black", width: "90%" });
		search_field.css("width", "90%");
		
		if (search_field.next().length === 0 || search_field.next()[0].tagName.toLowerCase() !== "span" || search_field.next().eq(0).html() !== "x") {
			search_field.after(result).after(clear);
		}
		if (settings.autohide) {$(result).hide(); }

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
				
				if ($("." + settings.className).first().html() !== "") {
					search_field.val($("." + settings.className).first().html());
					if (settings.callback !== null) {
						settings.callback($("." + settings.className).first().html());
					}
				} else {
				
					if ($("." + settings.className).first().html() !== "") {
						search_field.val($("." + settings.className).first().html());
						
						if (settings.callback !== null) {
							settings.callback($("." + settings.className).first().html());
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
			$("." + settings.className).removeClass(settings.className);
			
			$(result).find("div").removeClass(settings.className);
			$(result).find("div").eq(index % all).addClass(settings.className);
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
						$("." + settings.className).removeClass(settings.className);
						
						$(result).find("div").eq(index).addClass(settings.className);
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
								$(this).removeClass(settings.className);
							});
						
						$(result).find("div").on("mouseover",
											function () {
								$("." + settings.className).removeClass(settings.className);
								$(this).addClass(settings.className);
								index = $(this).index();
							});
					}
				);
			}
		);
		
		$(this).blur(function () {$(result).hide(); });
		
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
	$.fn.autocomplete.destroy = function () {
		$($(this).result).remove();
		$($(this).clear).remove();
		
	};
 
}(jQuery));
