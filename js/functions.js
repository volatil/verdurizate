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

const agregarProdPorID = function ( elid ) {
	fetch( BD ).then((value) => value.json() ).then((value) => {
		const prod = {
			id: value.values[elid][0],
			nombre: value.values[elid][1],
			precio: {
				ahora: Number(value.values[elid][2]).toLocaleString("es-CL"),
				dcto: value.values[elid][7] ? `${value.values[elid][7]}%` : "",
				antes: () => {
					let finalantes = "";
					if ( prod.precio.dcto ) {
						const elantes = Number( prod.precio.dcto.replaceAll("%", "") );
						const elahora = Number( prod.precio.ahora.replaceAll(".", "") );
						let total = (elantes * elahora);
						total /= 100;
						finalantes = `$ ${ parseInt( total, 10 ) }`;
					}
					return finalantes;
				},
			},
			imagen: value.values[elid][3],
			cantidad: value.values[elid][4],
			categoria: value.values[elid][5],
		};
		if ( prod.id === elid ) {
			$(".conproductos .productos").append(`
				<div class="producto" data-id="${prod.id}" data-categoria="${prod.categoria}">
					<div class="imagen">
						<span class="dcto">${prod.precio.dcto}</span>
						<img src="${prod.imagen}" alt="${prod.nombre}" />
					</div>
					<p class="nombre">${prod.nombre}</p>
					<p class="cantidad">${prod.cantidad}</p>
					<div class="precio">
						<p class="ahora">$ ${prod.precio.ahora}</p>
						<p class="antes">${prod.precio.antes()}</p>
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
export { trae, agregarProdPorID };
