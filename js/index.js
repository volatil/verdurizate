import {
	// autocomplete,
	loading,
	trae,
} from "./functions.js";

// NAV CATEGORIAS
$("nav.categorias ul.categorias li").on("click", function () {
	$("nav.categorias ul.categorias li").removeClass("activo");
	$(this).addClass("activo");
});

trae();

// https://dribbble.com/shots/16856425-SazheSound-Music-Player
