/*!
Autocomplete a input Ajax wrapper for jQuery 
by Côme BURGUBURU

Version 1.20.0
Full source at https://github.com/ComeBurguburu/autocomplete
Copyright (c) 2015-2042

*/
/*global $, jQuery, console */

(function ($) {
	"use strict";

	var DOWN = 40,
		UP = 38,
		ENTER = 13,
		TAB = 9,
		ESCAPE = 27;
	
	function destroy(elem) {
		$(elem).next().remove();
		$(elem).next().remove();
		$(elem).unwrap("div");
		$(elem).off();
	}

	
	
	function folder(val) {
	
		var m, regex = /^([a-zA-Z0-9._\-]*)(\/|\\)([a-zA-Z0-9._\-]*)$/g;

		if ((m = regex.exec(val)) !== null) {
			return m[0];
		}
		return null;
	}
	
	function item_selected(target) {
		
		var val = $(target.result).find(" ." + target.settings.className).first().text(), is_folder = ($.inArray(val.slice(-2, 2), ['/', '\\']) !== -1);

		if (val !== "") {
			target.search_field.val(val);

			if (target.settings.callback !== null) {
				target.settings.callback(val, target.search_field.parent(), is_folder, folder());
			}
			
			if (!(target.settings.folder && is_folder === true)) {
				console.log($(target.result));
				$(target.result).empty().hide();
			} else {
				target.search_field.trigger("keyup");
			}
		}
	}
		
	
	function Autocomplete(form_field, options) {

		if (form_field.prop("tagName").toLowerCase() !== "input" || form_field.prop("type") !== "text") {
			console.error("autocomplete : target need to be an input text");
			return;
		}

		if (options === 'destroy') {
			destroy(form_field);
			return;
		}

		this.search_field = form_field;
		this.settings = $.extend($.fn.autocomplete.defaults, options);
		
		if (this.settings.className !== $.fn.autocomplete.defaults.className) {
			this.settings.className = $.fn.autocomplete.defaults + " " + this.settings.className;
		}
		 
		
		this.result = $(document.createElement("div"));
		this.index = 0;
		this.clear = $(document.createElement("span")).text("x").css({cursor: "pointer", position: "relative", top: 0, right: "15px"});
		this.data = {};
		var index_param;
		this.data.show_all = this.settings.show_all;
		this.data.max_values = this.settings.max_values;
		this.data.folder = this.settings.folder ? "" : undefined;


		if (this.settings.key !==  null && this.settings.value !== null) {
			if (!(this.settings.key instanceof Object && this.settings.value instanceof Object && this.settings.key.length > 0)) {
				console.error("Autocomplete: key and value need to be array");
			}
				
			for (index_param = 0; index_param < Math.min(this.settings.key.length, this.settings.value.length); index_param = index_param + 1) {
				this.data[this.settings.key[index_param]] = this.settings.value[index_param];
			}
		}
		this.search_field.width("90%");
		this.search_field.height("30px");
		$(this.result).css({width: $(this.search_field).width() - 3}).addClass("result-autocomplete");

		if (this.search_field.parent().prop("class") !== "autocomplete-wrapper") {
			form_field.wrap("<div></div>").css("position", "relative");
			form_field.parent().addClass("autocomplete-wrapper");
			this.search_field.after(this.result).after(this.clear);
		}
		
		var result = $.extend({}, this.result), settings = $.extend({}, this.settings), data = $.extend({}, this.data), obj = this, input = $.extend({}, this.search_field);


		$(this.result).hide();

		if (form_field.prop("autofocus")) {
			this.search_field.trigger("keyup");
		}
		
		
		$(this.search_field).on("keydown", {className: settings.className, settings: settings, result: result, t: this}, function (event) {
			
			if (event.which === UP) {
				obj.index -= 1;
				event.preventDefault();
			}
			if (event.which === DOWN) {
				obj.index += 1;
				event.preventDefault();
			}

			if (obj.index < 0) {
				obj.index = 0;
			}
			
			$(event.data.result).off("mouseover");
			$(event.data.result).find("div").removeClass(event.data.settings.className);
			var all = $(event.data.result).find("div").length;
			$(event.data.result).find("div").eq(obj.index % all).addClass(event.data.settings.className);
		});
		
		
		$(this.search_field).on("keyup", {result: result, settings: settings, data: this.data, target: obj},

			function (event) {
				if (event.which === UP || event.which === DOWN) {
					return;
				}
				if (event.which === ESCAPE) {
					$(result).hide();
					event.preventDefault();
					return false;
				}
				
				if (event.which === ENTER || event.which === TAB) {
					item_selected(event.data.target);
					return false;
				}
			
				if ($(this).val() === "") {
					$(event.data.result).hide();
					return;
				}

				event.data.data[event.data.settings.param_name] = $(this).val();
				var input = this;

				$.post(
					event.data.settings.url,
					event.data.data,
					function (response) {
						if (response === "" && $(input).val() !== "") {
							$(event.data.result).html("<i>" + event.data.settings.no_result + "</i>").show();
							return;
						}

						

						$(event.data.result).html(response).show();
						$("img").error(function () {
							$(this).css("visibility", "hidden");
							return false;
						});
						event.data.target.index = 0;
						var all = $(event.data.result).find("div").length;

						$(event.data.result).find("div").eq(event.data.target.index).addClass(event.data.settings.className);
						$(event.data.result).find("div").on("click", {target: event.data.target},
												 function (event) {
								item_selected(event.data.target);
								return false;
							});
						
						var className = event.data.settings.className;
						$(event.data.result).find("div").on("mouseout", null,
												 function () {
								$(this).removeClass(className);
							});

						$(event.data.result).find("div").on("mouseover",
											function () {
								$("." + className).removeClass(className);
								$(this).addClass(className);
								event.data.target.index = $(this).index();
							});
					}
				);
			});

		$(this.search_field).on("blur", {settings: settings, result: result}, function (event) {
			if ($(event.data.result).find("." + event.data.settings.className).length === 0) {
				$(event.data.result).hide();
			}
		});

		$(this.search_field).on("focus", {settings: this.settings, result: result}, function (event) {
			$(event.data.result).hide();

			if (event.data.settings.show_all === true && this.val() === "") {
				this.trigger("keyup");
			}
		});
		
		/*$(this.search_field).on("focus",{settings: this.settings, test:this.settings.url,test2: this.settings.url },function(events){
		alert(events.data.settings.param_name+" "+events.data.test+" "+events.data.test2);});*/
		
		
		$(this.clear).on("click", {search_field: input, result: result, settings: settings}, function (event) {
			event.data.search_field.val(null);

			$(event.data.result).empty().hide();

			if (event.data.settings.onclear !== null) {
				event.data.settings.onclear($(event.data.input).parent());
			}

		});

		$(this.clear).hover(function (event) {
			$(this).css("color", event.type === "mouseenter" ? "blue" : "black");
		});

		
		return $(this);
	}
	
	$.fn.autocomplete = function (options) {
		
		return $(this).each(function () {
			$.data(this, 'plugin_autocomplete', new Autocomplete($(this), options));
		});
	};
	
	$.fn.autocomplete.defaults = {
		url: "php/search.php",
		callback: null,
		onclear: null,
		className: "select-autocomplete",
		show_all: false,
		max_values: 10,
		folder: false,
		param_name: "search",
		no_result: "no result",
		key: null,
		value: null
	};
 
}(jQuery));
