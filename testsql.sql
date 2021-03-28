select a.minutos, a.vehiculoId, b.placa, t.nombre as tarifa, t.precioPorMinuto
	from events a 
    join vehicles b on a.tipo = 'salida' and MONTH(a.fecha) = MONTH(NOW()) and a.vehiculoId = b.id
    join tarifa t on b.tarifaId = t.id;
