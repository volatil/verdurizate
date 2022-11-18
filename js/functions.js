import {
	BD,
} from "./constants.js";

const productosVisibles = function () {
	const cantidadProductosVisibles = $(".productos .producto:visible").length;
	if ( cantidadProductosVisibles === 1 ) {
		$(".cantidadResultadosVisibles > p").html(`Mostrando <strong>${cantidadProductosVisibles}</strong> producto.`);
	} else {
		$(".cantidadResultadosVisibles > p").html(`Mostrando <strong>${cantidadProductosVisibles}</strong> productos.`);
	}
};

const calculaCantidadProdCarro = function () {
	const cantidadEnCarro = $("section.productosCarrito_contenido .conproductos .productos .producto").length;
	if ( cantidadEnCarro === 1 ) {
		$("section.productosCarrito_contenido .conproductos .cantidadproductos strong").html("1 producto");
	} else {
		$("section.productosCarrito_contenido .conproductos .cantidadproductos strong").html(`${cantidadEnCarro} productos`);
	}
};

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
	$.each($(".contenedor .productos .producto"), function () {
		cantidadproducto += Number( $(this).find(".estado input").val() );
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

const agregaVisibleAlCarro = function () {
	$(".conproductos .productos").html("");
	$.each( $(".contenedor .productos .producto"), function () {
		const data = {
			id: $(this).attr("data-id"),
			nombre: $(this).find(".nombre").html(),
			imagen: $(this).find(".imagen img").attr("src"),
			precio: $(this).find(".precio").html(),
			cantidad: $(this).find(".estado div input.cantidad").val(),
		};
		if ( data.cantidad >= 1 ) {
			$(".conproductos .productos").append(`
				<div class="producto" data-id="${data.id}">
					<div class="imagen">
						<img src="${data.imagen}" alt="${data.nombre}" />
					</div>
					<p class="nombre">${data.nombre}</p>
					<p class="cantidad">${data.cantidad}</p>
					<div class="precio">
						<p class="ahora">${data.precio}</p>
					</div>
					<p class="eliminar">Eliminar</p>
				</div>
			`);
		}
	});
};

const trae = function () {
	fetch( BD ).then((value) => value.json() ).then((value) => {
		for ( let count = 1; count <= value.values.length - 1; count++ ) {
			const producto = {
				id: value.values[count][0],
				nombre: value.values[count][1],
				precio: {
					ahora: Number(value.values[count][2]).toLocaleString("es-CL"),
					dcto: value.values[count][7] ? `${value.values[count][7]}%` : "",
					antes: () => {
						let finalantes = "";
						if ( producto.precio.dcto ) {
							const elantes = Number( producto.precio.dcto.replaceAll("%", "") );
							const elahora = Number( producto.precio.ahora.replaceAll(".", "") );
							let total = (elantes * elahora);
							total /= 100;
							finalantes = `$ ${ parseInt( total, 10 ) }`;
						}
						return finalantes;
					},
				},
				imagen: value.values[count][3],
				cantidad: value.values[count][4],
				categoria: value.values[count][5],
				detalle: () => {
					const detalle = value.values[count][6];
					let todo = "";
					if ( String(detalle).length >= 10 ) {
						for ( let cuenta = 0; cuenta <= String(detalle).split("\n").length - 1; cuenta++ ) {
							todo += `<li>${String(detalle).split("\n")[cuenta]}</li>`;
						}
					}
					return todo;
				},
			};
			$(".contenedor .productos").append(`
				<div class="producto" data-id="${producto.id}" data-categoria="${producto.categoria}">
					<div class="imagen">
						<span class="dcto">${producto.precio.dcto}</span>
						<img src="${producto.imagen}" alt="${producto.nombre}" />
					</div>
					<p class="nombre">${producto.nombre}</p>
					<p class="cantidad">${producto.cantidad}</p>
					<div class="precio">
						<p class="ahora">$ ${producto.precio.ahora}</p>
						<p class="antes">${producto.precio.antes()}</p>
					</div>
					${ String(producto.detalle()).length >= 10 ? `<p class='vermas'>¿que incluye?</p><div class='modaldetalle'><ul>${producto.detalle()}</ul></div>` : "" }
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
		productosVisibles();
	});
};

// export { trae };
export {
	trae,
	productosVisibles,
	visualizacantidadproductos,
	calculaCantidadProdCarro,
	agregaVisibleAlCarro,
};
