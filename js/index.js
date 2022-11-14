// import {
// 	trae,
// } from "./functions.js";
import trae from "./functions.js";

// NAV CATEGORIAS
$("nav.categorias ul.categorias li").on("click", function () {
	$("nav.categorias ul.categorias li").removeClass("activo");
	$(this).addClass("activo");
});
$("nav.categorias > ul > li").on("click", function () {
	const categoria = $(this).html();
	if ( categoria === "todos los productos" ) {
		$(".productos .producto").show();
	} else {
		$(".productos .producto").hide();
		$(`.productos .producto[data-categoria="${categoria}"]`).show();
	}
});

// X del carro de compras
$("section.productosCarrito_contenido header img.cerrar, section.productosCarrito_fondo").on("click", () => {
	$(".productosCarrito_fondo").hide();
	$(".productosCarrito_contenido").removeClass("desplegar");
});
$("header.principal .menu ul li.carro").on("click", () => {
	$(".productosCarrito_fondo").show();
	$(".productosCarrito_contenido").addClass("desplegar");

	if ( $("header.principal .menu ul li a span.cantidad").html() === "0" ) {
		$("section.productosCarrito_contenido.desplegar .sinproductos").show();
	} else {
		$("section.productosCarrito_contenido.desplegar .conproductos").show();
	}
});

// MOBILE
// NAV CATEGORIAS
$("nav.categorias p.mobile").on("click", () => {
	$("nav.categorias ul.categorias").fadeToggle();
	$("nav.categorias p.mobile").toggle();
});

trae();

// https://dribbble.com/shots/16856425-SazheSound-Music-Player
