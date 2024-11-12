// async function getAllProductos() {
//     try {
//         const response = await fetch('http://localhost:4000/productos');
//         if (!response.ok) {
//             alert('Error al obtener los productos');
//             return;
//         }
//         const datos = await response.json();
//         console.log(datos);
//         cargarProductos(datos);
//     } catch (error) {
//         console.error('Error al obtener los productos:', error);
//         alert('Error al obtener los productos');
//     }
// }

// async function getAllProductosRubros(idrubro) {
//     try {
//         const response = await fetch(`http://localhost:4000/productos/${idrubro}`);
//         if (!response.ok) {
//             alert('Error al obtener los productos por rubro');
//             return;
//         }
//         const datos = await response.json();
//         console.log(datos);
//         cargarProductos(datos);
//     } catch (error) {
//         console.error('Error al obtener los productos por rubro:', error);
//         alert('Error al obtener los productos por rubro');
//     }
// }
// async function getAllProductosDescripcion(busqDescripcion) {
//     try {
//         const response = await fetch(`http://localhost:4000/productos?descripcion=${busqDescripcion}`);
//         if (!response.ok) {
//             alert('No existen productos con esa descripción');
//             return;
//         }

//         const productos = await response.json(); 
//         console.log(productos); 

//         cargarProductos(productos);
//     } catch (error) {
//         console.error('Error al obtener los productos por descripción:', error);
//         alert('Error al obtener los productos por descripción');
//     }
// }

async function getBusquedaRubroDescripcion(idrubro, descripcion) {
    try {
        let url = "";
        if (idrubro !== null && idrubro !== undefined) {
            url += `?idrubro=${idrubro}`;
        }
        if (descripcion) {
            url += (url ? '&' : '?') + `descripcion=${descripcion}`;
        }
        const response = await fetch(`http://localhost:4000/productos/${url}`);
        if (!response.ok) {
            alert('Error al obtener los productos por rubro');
            return;
        }
        const datos = await response.json();
        cargarProductos(datos);        
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        alert('Error al obtener los productos');
    }
}

function cargarProductos2(datos) {
    const itemsInsertados = document.getElementById('itemsInsertados');
    itemsInsertados.innerHTML = ''; 

    datos.forEach(data => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-4'); // 3 tarjetas por fila pantlla med

        col.innerHTML = `
            <div class="card h-100">
                <img src="${data.urlimagen}" class="card-img-top" alt="${data.descripcion}">
                <div class="card-body">
                    <h5 class="card-title">${data.descripcion}</h5>
                    <p class="card-text">
                        <strong>Código:</strong> ${data.codigo}<br>
                        <strong>Precio:</strong> $${data.precio}<br>
                        <strong>Rubro:</strong> ${data.descripcionrubro}
                    </p>
                </div>
            </div>
        `;
        itemsInsertados.appendChild(col);
    });
}

async function getAllRubros(){
    try{
        const response = await fetch('http://localhost:4000/productos/rubros');
        if (!response.ok) {
            alert('Error al obtener los rubros');
            return; 
        }
        const datos = await response.json();
        cargarCombo(datos);
    }
    catch (error){
        console.error('Error al obtener los rubros:', error);
        alert('Error al obtener los rubros');
    }


}

function cargarCombo(data) {
    const comboSelect = document.getElementById('rubros');
    comboSelect.innerHTML = '';
    
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Selecciona rubro";
    defaultOption.disabled = true;
    defaultOption.selected = true;

    const todosOption = document.createElement('option');
    todosOption.value = "todos";
    todosOption.textContent = "Todos";

    comboSelect.appendChild(defaultOption);
    comboSelect.appendChild(todosOption);

    data.forEach(item => {
        const newOption = document.createElement('option');
        newOption.value = item.IdRubro;
        newOption.textContent = item.Descripcion;
        comboSelect.appendChild(newOption);
    });
}

let rubroPrueba = null;
function listenerSelectRubro(){
    const rubroSelect = document.getElementById('rubros');
    rubroSelect.addEventListener('change', (event) => {
        const idrubro = event.target.value;
        rubroPrueba = event.target.value
        if (idrubro === 'todos'){
            getBusquedaRubroDescripcion(null, null);
            rubroPrueba = '';
            limpiarDescripcion();
        }
        else{
            getBusquedaRubroDescripcion(idrubro, null);
            limpiarDescripcion();
        }
    });
}

function listenerBusquedaDescripcion(){
    const botonBuscar = document.getElementById('buscarBtn');
    const btnLimpiar = document.getElementById('limpiarBtn');
    const descripcion = document.getElementById('descripcionInput');
    botonBuscar.addEventListener('click', () => {
        getBusquedaRubroDescripcion(rubroPrueba, descripcion.value);
    });
    
    btnLimpiar.addEventListener('click', () => {
        getBusquedaRubroDescripcion(null, null);
        getAllRubros();
        limpiarDescripcion();
        rubroPrueba = '';
    });

}

const toggleViewBtn = document.getElementById('toggleViewBtn');
let isTableView = false; 

toggleViewBtn.addEventListener('click', () => {
    isTableView = !isTableView;
    getBusquedaRubroDescripcion(null, null);
    toggleViewBtn.textContent = isTableView ? 'Cambiar a vista de cards' : 'Cambiar a vista de tabla';
});

function cargarProductos(datos) {
    const itemsInsertados = document.getElementById('itemsInsertados');
    itemsInsertados.innerHTML = '';

    if (isTableView) {
        // vistatabla
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Rubro</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;

        const tbody = table.querySelector('tbody');
        datos.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.codigo}</td>
                <td>${data.descripcion}</td>
                <td>$${data.precio}</td>
                <td>${data.descripcionrubro}</td>
                <td><img src="${data.urlimagen}" alt="${data.descripcion}" style="width: 50px; height: auto;"></td>
            `;
            tbody.appendChild(row);
        });

        itemsInsertados.appendChild(table);
    } else {
        // vista tarjeta
        datos.forEach(data => {
            const col = document.createElement('div');
            col.classList.add('col-md-4', 'mb-4');

            col.innerHTML = `
                <div class="card h-100">
                    <img src="${data.urlimagen}" class="card-img-top" alt="${data.descripcion}">
                    <div class="card-body">
                        <h5 class="card-title">${data.descripcion}</h5>
                        <p class="card-text">
                            <strong>Código:</strong> ${data.codigo}<br>
                            <strong>Precio:</strong> $${data.precio}<br>
                            <strong>Rubro:</strong> ${data.descripcionrubro}
                        </p>
                    </div>
                </div>
            `;
            itemsInsertados.appendChild(col);
        });
    }
}

function limpiarDescripcion(){
    const descripcion = document.getElementById('descripcionInput');
    descripcion.value = '';
    descripcion.placeholder = 'Ingresar descripción acá';
}


listenerBusquedaDescripcion();
listenerSelectRubro();
getBusquedaRubroDescripcion(null, null);
getAllRubros();