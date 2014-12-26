$("#search_field").keyup(
	function(){
				$.post(
						'php/search.php',
						{search:$("#search_field").val()},
						function(result){ $("#result").html(result);})
						.fail(function(){alert('erreur');}
					);
				});