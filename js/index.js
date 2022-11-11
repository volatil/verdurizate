import {
	getMusic,
	getArtist,
	buscar,
	loading,
} from "./functions.js";

$("header .buscador button").on("click", function () {
	const lobuscado = $(this).parent().find("input").val();
	buscar(lobuscado);
});

// Al presionar ENTER busca
$("header .buscador").keypress(function (e) {
	const code = (e.keyCode ? e.keyCode : e.which);
	if ( code === 13 ) {
		const lobuscado = $(this).parent().find("input").val();
		buscar(lobuscado);
	}
});

const trae = function () {
	const token = "1QcfPS6G-guXEBaZjLzUoCijieQ9Bl4hGKRHea-8UpQA";
	const bd = `https://sheets.googleapis.com/v4/spreadsheets/${token}/values/inventario?key=AIzaSyAOWV0qar-gsYcyp5yWS99GQlPVovkuxcU`;
	fetch( bd ).then((value) => value.json() ).then((value) => {
		for ( let count = 1; count <= value.values.length - 1; count++ ) {
			const producto = {
				nombre: value.values[count][0],
				precio: value.values[count][1],
				imagen: value.values[count][2],
				cantidad: value.values[count][3],
			};
			$(".productos").append(`
				<div class="producto">
					<img src="${producto.imagen}" alt="${producto.nombre}" />
					<h3>${producto.nombre}</h3>
					<h4>$ ${producto.precio}</h4>
				</div>
			`);
		}
	});
};
trae();

// https://dribbble.com/shots/16856425-SazheSound-Music-Player
