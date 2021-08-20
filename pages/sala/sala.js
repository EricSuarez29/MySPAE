var d = document,
    $form = d.querySelector('.formulario'),
    $tbody = d.querySelector('tbody');

var salas = [
    {
        id: 1,
        name: 'sala principal ',
        description: 'sala donde se haran los masajes y tratamientos',
        photo: 'foto sala principal',
        sucursal_id: 1,
        url: 'assets/images/salas/sala1.png',
        status: 1
    },
    {
        id: 2,
        name: 'sala de sauna ',
        description: 'sala donde tomaras un baño de relajante de vapor',
        photo: 'foto sala sauna',
        sucursal_id: 1,
        url: 'assets/images/salas/sala2.png',
        status: 1
    },
    {
        id: 3,
        name: 'sala de meditacion ',
        description: 'sala donde se se meditara con incienso',
        photo: 'foto sala meditacion',
        sucursal_id: 1,
        url: 'assets/images/salas/sala3.png',
        status: 1
    },
    {
        id: 4,
        name: 'sala con sonidos naturales',
        description: 'sala donde se escuchara a la naturaleza con un relajante masaje',
        photo: 'foto sala sonidos naturales',
        sucursal_id: 1,
        url: 'assets/images/salas/sala1.png',
        status: 1
    }
]

function getContentRow(el) {
    return `
    <tr class="fila large-fila">
        <td><img class="url img-empleado" src="${el.url}" alt=""></td>
        <td class="id">${el.id}</td>
        <td class="name">${el.name}</td>
        <td class="description">${el.description}</td>
        <td class="photo">${el.photo}</td>
        <td class="sucursal_id">${el.sucursal_id}</td>
        <td class="status">${el.status}</td>
        <td>
            <button class="update btn" onclick ='setUpdateElements(${el.id})'>
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete delete btn" onclick='deleteById(${el.id})'>
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    </tr>
    `
}

function action() {
    var $accion = d.getElementById('action');
    if ($accion.value === 'CREATE') {
        create();
    }
    if ($accion.value === 'UPDATE') {
        update();
    }
}

function create() {
    var sala = new Object();

    sala.id = parseInt(d.getElementById('id').value);
    sala.name = d.getElementById('name').value;
    sala.description = (d.getElementById('description').value);
    sala.photo = (d.getElementById('photo').value);
    sala.sucursal_id = parseInt(d.getElementById('sucursal_id').value);
    sala.url = (d.getElementById('url').value);
    sala.status = 1;

    var i = searchSalaById(sala.id);
    if (i === -1) {
        this.salas.push(sala);
        Swal.fire({
            title: `Sala Creada`,
            text: `la sala fue creada correctamente`,
            icon: `success`,
            padding: '2rem',
            backdrop: true,
            toast: true,
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false
        });
    } else {
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

function readAllElements() {
    var contenido = '';
    for (var i = 0; i < this.salas.length; i++) {
        contenido += getContentRow(salas[i]);
    }
    $tbody.innerHTML = contenido;

}

function deleteById(id) {

    Swal.fire({
        title: `Eliminar`,
        text: `¿Esta seguro de eliminar este sala con id ${id}?`,
        icon: `warning`,
        padding: '2rem',
        position: 'center',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar',
        cancelButtonColor: 'rgb(212, 93, 93)',
        confirmButtonColor: 'rgb(72, 138, 182)'
    }).then(function (result) {
        if (result.isConfirmed) {

            this.salas = this.salas.filter(function (el) {
                return el.id !== parseInt(id);
            });

            Swal.fire({
                title: `Sala Eliminado`,
                text: `El sala fue eliminado correctamente`,
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
function update() {
    var i = parseInt(d.getElementById('position').value);
    var j = searchSalaById(parseInt(d.getElementById('id').value));
    if (j !== -1 && j !== i) {
        Swal.fire({
            title: `Error`,
            text: `El id de sala ya existe`,
            icon: `error`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });

        return;
    }
    this.salas[i].id = parseInt(d.getElementById('id').value);
    this.salas[i].name = d.getElementById('name').value;
    this.salas[i].description = d.getElementById('description').value;
    this.salas[i].photo = d.getElementById('photo').value;
    this.salas[i].sucursal_id = d.getElementById('sucursal_id').value;
    this.salas[i].url = d.getElementById('url').value;

    showModal(false);
    readAllElements();

    Swal.fire({
        title: `Salas Actualizado`,
        text: `La sala se actualizo correctamente`,
        icon: `success`,
        padding: '2rem',
        toast: true,
        position: 'top-end',
        timer: 1500,
        showConfirmButton: false
    });
}

function setUpdateElements(id) {
    $form.querySelector('.title-form').textContent = 'Editar sala';
    $form.querySelector('.create').textContent = 'Editar';

    var sala = getSalaById(id);

    $form.querySelector('#id').value = sala.id;
    $form.querySelector('#name').value = sala.name;
    $form.querySelector('#description').value = sala.description;
    $form.querySelector('#photo').value = sala.photo;
    $form.querySelector('#sucursal_id').value = sala.sucursal_id;
    $form.querySelector('#url').value = sala.url;
    var i = searchSalaById(parseInt(sala.id));
    $form.querySelector('#position').value = i;
    $form.querySelector('#action').value = 'UPDATE';

    showModal(true);
}

function getSalaById(id) {
    for (var i = 0; i < this.salas.length; i++) {
        if (this.salas[i].id === id) {
            return salas[i];
        }
    }
    return null;
}

function searchSalaById(id) {
    for (var i = 0; i < this.salas.length; i++) {
        if (this.salas[i].id === id) {
            return i;
        }
    }
    return -1;
}

function showModal(isActive) {
    var modal = d.querySelector(`.main-modal`);
    if (isActive) {
        modal.classList.add(`active`);
    } else {
        modal.classList.remove(`active`);
        clearForm();
    }
}

function clearForm() {
    $form.querySelector('.title-form').textContent = 'Nueva sala';
    $form.querySelector('.create').textContent = 'Crear';

    $form.querySelector('#id').value = '';
    $form.querySelector('#name').value = '';
    $form.querySelector('#description').value = '';
    $form.querySelector('#photo').value = '';
    $form.querySelector('#sucursal_id').value = '';
    $form.querySelector('#url').value = '';

    $form.querySelector('#position').value = '';
    $form.querySelector('#action').value = 'CREATE';
}

readAllElements();
