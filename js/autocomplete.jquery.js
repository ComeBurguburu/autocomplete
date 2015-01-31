/*!
Autocomplete a input Ajax wrapper for jQuery 
by Côme BURGUBURU

Version 1.8.0
Full source at https://github.com/ComeBurguburu/autocomplete
Copyright (c) 2015-2042

*/
/*global $, jQuery, console */

(function ($) {
	"use strict";

	var DOWN = 40,
		UP = 38,
		ENTER = 13;
		

	$.fn.autocomplete = function (options) {
		
		return this.each(function () {

	
			if ($(this)[0].tagName.toLowerCase() !== "input" || $(this)[0].type !== "text") {
				console.error("autocomplete : target need to be an input text");
				return;
			}

			// This is the easiest way to have default options.
			var settings = $.extend({
				link: "php/search.php",
				autohide: false,
				callback: null,
				className: "select-autocomplete",
				dataSelector: "span",
				show_all: false,
				max_values: 10,
				param_name: "search",
				no_result: "no result"
			}, options),
				search_field = $(this),
				index = 0,
				oldValue = "",
				all = 0,
				result = document.createElement("div"),
				clear = $(document.createElement("span")).text("x").css({cursor: "pointer", position: "relative", top: 0, right: "15px"}),
				data = {};
			data.show_all = settings.show_all;
			data.max_values = settings.max_values;

			$(result).css({border: "1px solid black", width: "90.5%" });
			search_field.width("90%");
			search_field.height("30px");
			
			$(this).wrap("<div></div>");
			$(this).parent().addClass("autocomplete-wrapper");
			
			if (search_field.next().length === 0 || search_field.next()[0].tagName.toLowerCase() !== "span" || search_field.next().eq(0).html() !== "x") {
				search_field.after(result).after(clear);
			}
			if (settings.autohide) {$(result).hide(); }
			
			if ($(this).prop("autofocus")) {
				oldValue = null;
				search_field.trigger("keyup");
			}
			
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
						search_field.val($("." + settings.className).first().find(settings.dataSelector).text());
						if (settings.callback !== null) {
							settings.callback($("." + settings.className).first().find(settings.dataSelector).text(), $(this).parent());
						}
					}

					$(result).empty();

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
					
					data[settings.param_name] = search_field.val();
					oldValue = search_field.val();
					
					$.post(
						settings.link,
						data,
						function (response) {
							if (response === "" && search_field.val() !== "") {
								$(result).html("<i>" + settings.no_result + "</li>").show();
								return;
							}
							$(result).html(response).show();
							all = $(result).find("div").length;
							$("." + settings.className).removeClass(settings.className);

							$(result).find("div").eq(index).addClass(settings.className);
							$(result).find("div").on("click",
													 function () {
									search_field.val($(this).find(settings.dataSelector).text());

									if (settings.callback !== null) {
										settings.callback($(this).find(settings.dataSelector).text(), search_field.parent());
									}
									if (settings.autohide) {$(result).hide(); }
									$(result).empty();
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

			$(this).blur(function () {
				if ($(result).find("." + settings.className).length === 0) {
					$(result).hide();
				}
			});
			
			$(this).focus(function () {
				if (settings.show_all === true && search_field.val() === "") {
					oldValue = null;
					search_field.trigger("keyup");
				}
			});

			$(clear).click(function () {
				search_field.val(null).focus();
				$(result).empty();
				if (settings.autohide) {
					$(result).hide();
				}
			});

			$(clear).hover(function (event) {
				$(this).css("color", event.type === "mouseenter" ? "blue" : "black");
			});

		});
	};
	$.fn.autocomplete.destroy = function () {
		$($(this).result).remove();
		$($(this).clear).remove();
		
	};
 
}(jQuery));
