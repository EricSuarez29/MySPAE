var d = document,
    $template = d.getElementById(`templ-empleado`).content,
    $tbody = d.querySelector(`tbody`),
    $form = d.querySelector(`.formulario`);

var empleados = [
        {
            id: 1,
            name: `Pedro`,
            address: `Av Pase de la ermita #321`,
            last_pa: `Juarez`,
            last_ma: `Salazar`,
            gender: `H`,
            rfc: `PDRO21383434`,
            tel: `4771235432`,
            jobposition: `Masajista`,
            photo: `pedro`,
            url: `assets/images/empleados/pedro.jpg`,
            user: `pedro123`,
            password: `pedro123`,
            status: 1
        }
]


function setUpdateElements(id){
    $form.querySelector(`.title-form`).textContent = `Editar Empleado`;
    $form.querySelector(`.create`).textContent = `Editar`;

    var btnUpdate = getEmpleadoById(id);
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
    $form.querySelector(`#jobposition`).value = btnUpdate.jobposition;
    $form.querySelector(`#photo`).value = btnUpdate.jobposition;
    // $form.querySelector(`#url`).value = btnUpdate.url;
    $form.querySelector(`#user`).value = btnUpdate.user;
    $form.querySelector(`#password`).value = btnUpdate.password;
    $form.querySelector(`#password_confirm`).value = btnUpdate.password;
    $form.querySelector(`#action`).value = `UPDATE`;
    var i = searchEmpleadoById(parseInt(btnUpdate.id));
    $form.querySelector(`#position`).value = i;

    showModal(true);
}

// CRUD ----------------------------------------------------------------

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
    var empleado = new Object();

    empleado.id = parseInt(form.id.value);
    empleado.name = form.name.value;
    empleado.address = form.address.value;
    empleado.last_pa = form.last_pa.value;
    empleado.last_ma = form.last_ma.value;
    empleado.gender = form.gender.value;
    empleado.rfc = form.rfc.value;
    empleado.tel = form.tel.value;
    empleado.photo = form.photo.value;
    empleado.url = form.url.value;
    empleado.user = form.user.value;
    empleado.password = form.password.value;
    empleado.status = 1;

    var i = searchEmpleadoById(empleado.id);
    if(i === -1){
        this.empleados.push(empleado);
        Swal.fire({
            title: `Empleado Creado`,
            text: `El empleado fue creado correctamente`,
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
            text: `El id del empleado ya existe`,
            icon: `error`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });
    }

    clearForm();
    readAllElements();
}

function readAllElements(){
    var contenido = '';
    for(var i = 0; i < this.empleados.length; i++){
        contenido += getContentRow(this.empleados[i]);
    }
    $tbody.innerHTML = contenido;
}

function getContentRow(el){
    return `
    <tr class="fila large-fila">
        <td><img class="url img-empleado" src="" alt=""></td>
        <td class="id">${el.id}</td>
        <td class="name">${el.name}</td>
        <td class="address">${el.address}</td>
        <td class="last_pa">${el.last_pa}</td>
        <td class="last_ma">${el.last_ma}</td>
        <td class="gender">${el.gender}</td>
        <td class="rfc">${el.rfc}</td>
        <td class="tel">${el.tel}</td>
        <td class="jobposition">${el.jobposition}</td>
        <td class="photo">${el.photo}</td>
        <td class="user">${el.user}</td>
        <td class="password">${el.password}</td>
        <td class="status">${el.status}</td>
        <td>
            <button class="update btn" onclick="setUpdateElements(${el.id});">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete btn" onclick="deleteById(${el.id});">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    </tr>
    `;
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

function getEmpleadoById(id){
    for(var i = 0; i < this.empleados.length; i++){
        if(this.empleados[i].id === id){
            return this.empleados[i];
        }
    }
    return null;
}

// Recibe por parametro el formulario donde se genero el evento

function update(form){
    var i = parseInt(d.getElementById(`position`).value);
    var j = searchEmpleadoById(parseInt(d.getElementById(`id`).value));

    if(j !== -1 && j !== i) {
        
        Swal.fire({
            title: `Error`,
            text: `El id del empleado ya existe`,
            icon: `error`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });

        return;
    }

    this.empleados[i].id = parseInt(d.getElementById(`id`).value);
    this.empleados[i].name = d.getElementById(`name`).value;
    this.empleados[i].address = d.getElementById(`address`).value;
    this.empleados[i].last_pa = d.getElementById(`last_pa`).value;
    this.empleados[i].last_ma = d.getElementById(`last_ma`).value;
    this.empleados[i].gender = 
    d.getElementById(`man-gender`).checked ? `H` 
    : d.getElementById(`woman-gender`).checked ? `M`
    : `O`;
    this.empleados[i].rfc = d.getElementById(`rfc`).value;
    this.empleados[i].tel = d.getElementById(`tel`).value;
    this.empleados[i].jobposition = d.getElementById(`jobposition`).value;
    this.empleados[i].photo = d.getElementById(`photo`).value;
    this.empleados[i].url = d.getElementById(`url`).value;
    this.empleados[i].user = d.getElementById(`user`).value;
    this.empleados[i].password = d.getElementById(`password`).value;

    clearForm();
    showModal(false);
    readAllElements();


    Swal.fire({
        title: `Empleado Actualizado`,
        text: `El empleado se actualizo correctamente`,
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
        text: `¿Esta seguro de eliminar este empleado con id ${id}?`,
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
            this.empleados = this.empleados.filter(function(el){
                return el.id !== parseInt(id);
            });
            
            Swal.fire({
                title: `Empleado Eliminado`,
                text: `El empleado fue eliminado correctamente`,
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

function searchEmpleadoById(id){
    for(var i = 0; i < this.empleados.length; i++){
        if(this.empleados[i].id === id){
            return i;
        }
    }
    return -1;
}

function clearForm(){
    $form.querySelector(`.title-form`).textContent = `Nuevo Empleado`;
    $form.querySelector(`.create`).textContent = `Crear`;
    
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
    $form.querySelector(`#jobposition`).value = "";
    $form.querySelector(`#photo`).value = "";
    $form.querySelector(`#url`).value = "";
    $form.querySelector(`#user`).value = "";
    $form.querySelector(`#password`).value = "";
    $form.querySelector(`#password_confirm`).value = "";
    $form.querySelector(`#action`).value = "CREATE";
    $form.querySelector(`#position`).value = "";
}

readAllElements();