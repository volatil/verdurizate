import {
	BD,
} from "./constants.js";

const guardarStorage = function ( data ) {
	let todo = []; /* eslint-disable-line */
	$.each($(".productos .producto"), function () {
		const prod = {
			id: $(this).attr("data-id"),
			nombre: $(this).find("p.nombre").html(),
			cantidad: $(this).find(".estado div input").val(),
		};
		todo.push({
			id: prod.id,
			nombre: prod.nombre,
			cantidad: prod.cantidad,
		});
	});
	localStorage.setItem("verdurizate", JSON.stringify(todo));
};

const visualizacantidadproductos = function () {
	let cantidadproducto = 0;
	$.each($(".productos .producto"), function () {
		cantidadproducto += Number( $(this).find(".estado div input").val() );
		$("header .menu ul li a span.cantidad").html( cantidadproducto );
	});
};

const agregaquitaAlCarro = function () {
	$(".productos .producto .estado button.agregar").on("click", function () {
		$(this).hide();
		$(this).parent().find("> div > input").val("1");
		$(this).parent().find("> div").show();
		visualizacantidadproductos();
		guardarStorage();
	});

	$(".productos .producto .estado div button").on("click", function () {
		const producto = $(this).parent().parent().parent()
			.find(".nombre")
			.html();

		const accion = $(this).attr("class");
		let cantidad = Number( $(this).parent().find(".cantidad").val() );
		// $(".productos .producto .estado button.agregar").show();
		if ( accion === "mas" ) {
			cantidad += 1;
			$(this).parent().find(".cantidad").val( cantidad );
		} else {
			cantidad -= 1;
			$(this).parent().find(".cantidad").val( cantidad );
		}

		if ( cantidad === 0 ) {
			$(this).parent().hide();
			$(this).parent().parent().find(".agregar")
				.show();
		}

		visualizacantidadproductos();
		guardarStorage();
	});
};

const trae = function () {
	fetch( BD ).then((value) => value.json() ).then((value) => {
		for ( let count = 1; count <= value.values.length - 1; count++ ) {
			const producto = {
				id: value.values[count][0],
				nombre: value.values[count][1],
				precio: Number(value.values[count][2]).toLocaleString("es-CL"),
				imagen: value.values[count][3],
				cantidad: value.values[count][4],
				categoria: value.values[count][5],
			};
			$(".contenedor .productos").append(`
				<div class="producto" data-id="${producto.id}" data-categoria="${producto.categoria}">
					<img src="${producto.imagen}" alt="${producto.nombre}" />
					<p class="nombre">${producto.nombre}</p>
					<p class="cantidad">${producto.cantidad}</p>
					<p class="precio">$ ${producto.precio}</p>
					<div class="estado">
						<button class="agregar">Agregar</button>
						<div style="display:none">
							<button class="mas">+</button>
							<input class="cantidad" value="0">
							<button class="menos">-</button>
						</div>
					</div>
				</div>
			`);
		}
		agregaquitaAlCarro();
	});
};

// export { trae };
export default trae;
