var d = document,
    $tbody = d.querySelector(`tbody`),
    $form = d.querySelector(`.formulario`);

var clientes = [
        {
            id: 1,
            name: `Juan`,
            address: `Av Pase del Lomo #432`,
            last_pa: `Martinez`,
            last_ma: `Perez`,
            gender: `H`,
            rfc: `EURQO234AIKER`,
            tel: `4773243119`,
            email: `juanperez@gmai.com`,
            user: `juanito123`,
            password: `juanelmalo123`,
            status: 1
        },
        {
            id: 2,
            name: `Axel`,
            address: `Cerro de Cubilete`,
            last_pa: `Hernandez`,
            last_ma: `Mendez`,
            gender: `H`,
            rfc: `ERQEWIRH3243234`,
            tel: `477425643`,
            email: `jorgeaxelhernandez@gmail.com`,
            user: `axelh123`,
            password: `enunlugar`,
            status: 1
        },
        {
            id: 3,
            name: `Alan`,
            address: `Av Piletas`,
            last_pa: `Ortega`,
            last_ma: `Loera`,
            gender: `H`,
            rfc: `HRTUTPWPER23432`,
            tel: `4775325334`,
            email: `alanelguapo@gmail.com`,
            user: `alanelguapo`,
            password: `alan123`,
            status: 1
        },
        {
            id: 4,
            name: `Angela`,
            address: `Av Omega`,
            last_pa: `Perez`,
            last_ma: `Ramos`,
            gender: `H`,
            rfc: `HUITHQE3243HU32`,
            tel: `477382473434`,
            email: `angela@gmail.com`,
            user: `angelaomega`,
            password: `angi34`,
            status: 1
        }
]


function setUpdateElements(id){
    $form.querySelector(`.title-form`).textContent = `Editar Cliente`;
    $form.querySelector(`.create`).textContent = `Editar`;

    var btnUpdate = getClienteById(id);
    console.log(btnUpdate)
    $form.querySelector(`#id`).value = btnUpdate.id;
    $form.querySelector(`#name`).value = btnUpdate.name;
    $form.querySelector(`#address`).value = btnUpdate.address;
    $form.querySelector(`#last_pa`).value = btnUpdate.last_pa;
    $form.querySelector(`#last_ma`).value = btnUpdate.last_ma;
    $form.querySelector(`#${btnUpdate.gender === `H`
        ? "man-gender"
        : btnUpdate.gender === `M` 
            ? "womam-gender"
            : "other-gender"}`)
    .checked = true;
    $form.querySelector(`#rfc`).value = btnUpdate.rfc;
    $form.querySelector(`#tel`).value = btnUpdate.tel;
    $form.querySelector(`#email`).value = btnUpdate.email;
    $form.querySelector(`#user`).value = btnUpdate.user;
    $form.querySelector(`#password`).value = btnUpdate.password;
    $form.querySelector(`#password_confirm`).value = btnUpdate.password;
    $form.querySelector(`#action`).value = `UPDATE`;
    var i = searchClientById(parseInt(btnUpdate.id));
    $form.querySelector(`#position`).value = i;

    showModal(true);
}

// CRUD ----------------------------------------------------------------

/**
 * Esta función gestiona las acciones al momendo de crear o actualizar un elemento.
 */


function accion(){
    var $accion = d.getElementById(`action`);
    if($accion.value === `CREATE`){
        create();
    }
    if($accion.value === `UPDATE`){
        update();
    }
}

function create(form){
    var cliente = new Object();

    cliente.id = parseInt(d.getElementById(`id`).value);
    cliente.name = d.getElementById(`name`).value;
    cliente.address = d.getElementById(`address`).value;
    cliente.last_pa = d.getElementById(`last_pa`).value;
    cliente.last_ma = d.getElementById(`last_ma`).value;
    cliente.gender = 
    d.getElementById(`man-gender`).checked ? `H` 
    : d.getElementById(`woman-gender`).checked ? `M`
    : `O`;
    cliente.rfc = d.getElementById(`rfc`).value;
    cliente.tel = d.getElementById(`tel`).value;
    cliente.email = d.getElementById(`email`).value;
    cliente.user = d.getElementById(`user`).value;
    cliente.password = d.getElementById(`password`).value;
    cliente.status = 1;

    var i = searchClientById(cliente.id);
    if(i === -1){
        this.clientes.push(cliente);
        Swal.fire({
            title: `Cliente Creado`,
            text: `El Cliente fue creado correctamente`,
            icon: `success`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false
        });
    }else{
        Swal.fire({
            title: `Error`,
            text: `El id del cliente ya existe`,
            icon: `error`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });
    }

    clearForm();
    showModal(false);
    readAllElements();
}

function readAllElements(){
    var contenido = ``;
    for(var i = 0; i < this.clientes.length; i++){
        contenido+= getContentRow(clientes[i]);
    }
    $tbody.innerHTML = contenido;
}

function getContentRow(el){
    return `
    <tr class="fila">
        <td class="id">${el.id}</td>
        <td class="name">${el.name}</td>
        <td class="address">${el.address}</td>
        <td class="last_pa">${el.last_pa}</td>
        <td class="last_ma">${el.last_ma}</td>
        <td class="gender">${el.gender}</td>
        <td class="rfc">${el.rfc}</td>
        <td class="tel">${el.tel}</td>
        <td class="email">${el.email}</td>
        <td class="user">${el.user}</td>
        <td class="password">${el.password}</td>
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
    `;
}

// Recibe por parametro el formulario donde se genero el evento

function update(form){
    var i = parseInt(d.getElementById(`position`).value);
    var j = searchClientById(parseInt(d.getElementById(`id`).value));

    if(j !== -1 && j !== i) {
        
        Swal.fire({
            title: `Error`,
            text: `El id del cliente ya existe`,
            icon: `error`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });
        return;
    }

    this.clientes[i].id = parseInt(d.getElementById(`id`).value);
    this.clientes[i].name = d.getElementById(`name`).value;
    this.clientes[i].address = d.getElementById(`address`).value;
    this.clientes[i].last_pa = d.getElementById(`last_pa`).value;
    this.clientes[i].last_ma = d.getElementById(`last_ma`).value;
    this.clientes[i].gender = 
    d.getElementById(`man-gender`).checked ? `H` 
    : d.getElementById(`woman-gender`).checked ? `M`
    : `O`;
    this.clientes[i].rfc = d.getElementById(`rfc`).value;
    this.clientes[i].tel = d.getElementById(`tel`).value;
    this.clientes[i].email = d.getElementById(`email`).value;
    this.clientes[i].user = d.getElementById(`user`).value;
    this.clientes[i].password = d.getElementById(`password`).value;

    showModal(false);
    clearForm();
    readAllElements();


    Swal.fire({
        title: `Cliente Actualizado`,
        text: `El cliente se actualizo correctamente`,
        icon: `success`,
        padding: '2rem',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });

}

function deleteById(id){

    Swal.fire({
        title: `Eliminar`,
        text: `¿Esta seguro de eliminar este cliente con id ${id}?`,
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
            this.clientes = this.clientes.filter(function(el){
                return el.id !== parseInt(id);
            });
            
            Swal.fire({
                title: `Cliente Eliminado`,
                text: `El cliente fue eliminado correctamente`,
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

function searchClientById(id){
    for(var i = 0; i < this.clientes.length; i++){
        if(this.clientes[i].id === id){
            return i;
        }
    }
    return -1;
}

function getClienteById(id){
    for(var i = 0; i < this.clientes.length; i++){
        if(this.clientes[i].id === id){
            return this.clientes[i];
        }
    }
    return null;
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

function clearForm(){
    $form.querySelector(`.title-form`).textContent = `Nuevo Cliente`;
    $form.querySelector(`.create`).value = `Crear`;
    
    $form.querySelector(`#id`).value = "";
    $form.querySelector(`#name`).value = "";
    $form.querySelector(`#address`).value = "";
    $form.querySelector(`#last_pa`).value = "";
    $form.querySelector(`#last_ma`).value = "";
    $form.querySelector(`#man-gender`).checked = false;
    $form.querySelector(`#woman-gender`).checked = false;
    $form.querySelector(`#other-gender`).checked = false;
    $form.querySelector(`#rfc`).value = "";
    $form.querySelector(`#tel`).value = "";
    $form.querySelector(`#email`).value = "";
    $form.querySelector(`#user`).value = "";
    $form.querySelector(`#password`).value = "";
    $form.querySelector(`#password_confirm`).value = "";
    $form.querySelector(`#action`).value = "CREATE";
    $form.querySelector(`#position`).value = "";
}

readAllElements();