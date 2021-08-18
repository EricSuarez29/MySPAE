var d = document,
    $form = d.querySelector(`.formulario`),
    $tbody = d.querySelector(`tbody`);

var sucursales = [
    {
        id: 1,
        name: `Sucursal Lopez Mateos`,
        latitud: 1.3242523532,
        longitud: 124.235235322,
        address: `Blvd Lopez Mateos #122`,
        status: 1
    },
    {
        id: 2,
        name: `Sucursal San Juan Bosco`,
        latitud: 23.32423423,
        longitud: 324.234234,
        address: `Blvd San Juan Bosco #431`,
        status: 1
    },
    {
        id: 3,
        name: `Sucursal Cerrito de Jerez`,
        latitud: 235.2342562,
        longitud: 66.653453,
        address: `Col. Cerrito de Jerez #114`,
        status: 1
    }
]

function getContentRow(el){
    return `
    <tr class="fila">
        <td class="id">${el.id}</td>
        <td class="name">${el.name}</td>
        <td class="latitud">${el.latitud}</td>
        <td class="longitud">${el.longitud}</td>
        <td class="address">${el.address}</td>
        <td class="status">${el.status}</td>
        <td>
            <button class="update btn" onclick="setUpdateElements(${el.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete btn" onclick="deleteById(${el.id})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    </tr>
    `
}

function accion(){
    var $accion = d.getElementById(`action`);
    if($accion.value === `CREATE`){
        create();
    }
    if($accion.value === `UPDATE`){
        update();
    }
}

function create(){
    var sucursal = new Object();

    sucursal.id = parseInt(d.getElementById(`id`).value);
    sucursal.name = d.getElementById(`name`).value;
    sucursal.latitud = d.getElementById(`latitud`).value;
    sucursal.longitud = d.getElementById(`longitud`).value;
    sucursal.address = d.getElementById(`longitud`).value;
    sucursal.status = 1;

    var i = searchSucursalById(sucursal.id);

    if(i === -1){
        this.sucursales.push(sucursal);
        Swal.fire({
            title: `Sucursal Creada`,
            text: `El sucursal fue creada correctamente`,
            icon: `success`,
            padding: '2rem',
            backdrop: true,
            toast: true,
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false
        });
    }else{
        Swal.fire({
            title: `Error`,
            text: `El id del sucursal ya existe`,
            icon: `error`,
            padding: '2rem',
            backdrop: true,
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });
    }

    showModal(false);
    readAllElements();
}

function readAllElements(){
    var contenido = ``;
    for(var i = 0; i < this.sucursales.length; i++){
        contenido += getContentRow(sucursales[i]);
    }
    $tbody.innerHTML = contenido;
}

function deleteById(id){
    Swal.fire({
        title: `Eliminar`,
        text: `¿Esta seguro de eliminar este elemento con id ${id}?`,
        icon: `warning`,
        padding: '2rem',
        position: 'center',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        cancelButtonColor: 'rgb(212, 93, 93)',
        confirmButtonColor: 'rgb(72, 138, 182)'
    }).then(function(result){
        if(result.isConfirmed){
            
            this.sucursales = this.sucursales.filter(function(el){
                return el.id !== parseInt(id);
            });         
            
            Swal.fire({
                title: `Producto Eliminado`,
                text: `El producto fue eliminado correctamente`,
                icon: `success`,
                padding: '2rem',
                toast: true,
                position: 'top-end',
                timer: 1500,
                showConfirmButton: false
            });
        
            readAllElements();
        }
    });
}

function update(){
    var i = parseInt(d.getElementById(`position`).value);
    var j = searchSucursalById(parseInt(d.getElementById(`id`).value));

    if(j !== -1 && j !== i){
        Swal.fire({
            title: `Error`,
            text: `El id del sucursal ya existe`,
            icon: `error`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });
        return;
    }

    this.sucursales[i].id = parseInt(d.getElementById(`id`).value);
    this.sucursales[i].name = d.getElementById(`name`).value;
    this.sucursales[i].latitud = d.getElementById(`latitud`).value;
    this.sucursales[i].longitud = d.getElementById(`longitud`).value;
    this.sucursales[i].address = d.getElementById(`address`).value;

    showModal(false);
    readAllElements();

    Swal.fire({
        title: `Sucursal Actualizado`,
        text: `El sucursal se actualizo correctamente`,
        icon: `success`,
        padding: '2rem',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });
}

function setUpdateElements(id){
    $form.querySelector(`.title-form`).textContent = `Editar Sucursal`;
    $form.querySelector(`.create`).textContent = `Editar`;

    var sucursal = getSucursalById(2);
    $form.querySelector(`#id`).value = sucursal.id;
    $form.querySelector(`#name`).value = sucursal.name;
    $form.querySelector(`#latitud`).value = sucursal.latitud;
    $form.querySelector(`#longitud`).value = sucursal.longitud;
    $form.querySelector(`#address`).value = sucursal.address;
    var i = searchSucursalById(parseInt(sucursal.id));
    $form.querySelector(`#position`).value = i;
    $form.querySelector(`#action`).value = `UPDATE`;

    showModal(true);
}

function showModal(isActive){
    var modal = d.querySelector(`.main-modal`);
    if(isActive){
        modal.classList.add(`active`);
    } else{
        modal.classList.remove(`active`);
        clearForm();
    } 
}

function getSucursalById(id){
    for(var i = 0; i < this.sucursales.length; i++){
        if(this.sucursales[i].id === id){
            return sucursales[i];
        }
    }
    return null;
}

function searchSucursalById(id){
    for(var i = 0; i < this.sucursales.length; i++){
        if(this.sucursales[i].id === id){
            return i;
        }
    }
    return -1;
}

function clearForm(){
    $form.querySelector(`.title-form`).textContent = `Nueva Sucursal`;
    $form.querySelector(`.create`).textContent = `Crear`;

    $form.querySelector(`#id`).value = "";
    $form.querySelector(`#name`).value = "";
    $form.querySelector(`#latitud`).value = "";
    $form.querySelector(`#longitud`).value = "";
    $form.querySelector(`#address`).value = "";
    $form.querySelector(`#position`).value = "";
    $form.querySelector(`#action`).value = `CREATE`;
}

readAllElements();