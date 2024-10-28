async function getAllProductos() {
    try {
        const response = await fetch('http://localhost:4000/productos/all');
        if (!response.ok) {
            alert('Error al obtener los productos');
            return;
        }
        const datos = await response.json();
        console.log(datos);
        cargarProductos(datos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        alert('Error al obtener los productos');
    }
}

async function getAllProductosRubros(idrubro) {
    try {
        const response = await fetch(`http://localhost:4000/productos/rubros/${idrubro}`);
        if (!response.ok) {
            alert('Error al obtener los productos por rubro');
            return;
        }
        const datos = await response.json();
        console.log(datos);
        cargarProductos(datos);
    } catch (error) {
        console.error('Error al obtener los productos por rubro:', error);
        alert('Error al obtener los productos por rubro');
    }
}

async function getAllProductosDescripcion(busqDescripcion) {
    const data = { descripcion: busqDescripcion }; 
    console.log(data); 

    try {
        const response = await fetch(`http://localhost:4000/productos/descripcion`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data), 
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const productos = await response.json(); 
        console.log(productos); 

        cargarProductos(productos);
    } catch (error) {
        console.error('Error al obtener los productos por descripción:', error);
        alert('Error al obtener los productos por descripción');
    }
}

function cargarProductos(datos) {
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

function listenerSelectRubro(){
    const rubroSelect = document.getElementById('rubros');
    rubroSelect.addEventListener('change', (event) => {
        const idrubro = event.target.value;
        if (idrubro === 'todos'){
            getAllProductos()
        }
        else{
            getAllProductosRubros(idrubro);
        }
    });
}

function listenerBusquedaDescripcion(){
    const botonBuscar = document.getElementById('buscarBtn');
    const btnLimpiar = document.getElementById('limpiarBtn');
    const descripcion = document.getElementById('descripcionInput');
    botonBuscar.addEventListener('click', () => {
        getAllProductosDescripcion(descripcion.value);
    });
    
    btnLimpiar.addEventListener('click', () => {
        getAllProductos();
        getAllRubros();
        descripcion.value = '';
        descripcion.placeholder = 'Ingresar descripción acá';
    });

}

listenerBusquedaDescripcion();
listenerSelectRubro();
getAllProductos();
getAllRubros();