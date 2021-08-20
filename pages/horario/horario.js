var d = document,
    $form = d.querySelector('.formulario'),
    $tbody = d.querySelector ('tbody');

var horarios = [
    {
        id : 1,
        start: 7,
        end: 9,
    },
    {
        id: 2,
        start: 9,
        end: 10,
    },
    {
        id : 3,
        start: 11,
        end: 12,
    },
    {
        id:4,
        start: 13,
        end: 14
    }
]


function getContentRow(el) {
    return `
<tr>
    <td class="id">${el.id}</td>
    <td class="start text-center">${el.start}:00</td>
    <td class="end text-center">${el.end}:00</td>
    <td>
        <button class="update btn" onclick="setUpdateElements(${el.id})">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete delete btn" onclick="deleteById(${el.id})">
            <i class="fas fa-trash-alt"></i>
        </button>
    </td>
</tr>
    `
}

function accion() {
    var $accion = d.getElementById('action');
    if ($accion.value === 'CREATE') {
        create();
    }
    if ($accion.value === 'UPDATE') {
        update();
    }
}

function create() {
    var horario = new Object();

    horario.id = parseInt(d.getElementById('id').value);
    horario.start = parseInt(d.getElementById('start').value);
    horario.end = parseInt(d.getElementById('end').value);

    var i = searchHorarioById(horario.id);
    if (i === -1) {
        this.horarios.push(horario);
        Swal.fire({
            title: `horario Creado`,
            text: `el horario fue creado correctamente`,
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
            text: `El id del horario ya existe`,
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
    for (var i = 0; i < this.horarios.length; i++) {
        contenido += getContentRow(horarios[i]);
    }
    $tbody.innerHTML = contenido;
}

function deleteById(id) {

    Swal.fire({
        title: `Eliminar`,
        text: `¿Esta seguro de eliminar este horarios con id ${id}?`,
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
        if(result.isConfirmed) {
            this.horarios = this.horarios.filter(function(el) {
                return el.id !== parseInt(id);
            });

            Swal.fire({
                title: `horarios Eliminado`,
                text: `El horario fue eliminado correctamente`,
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
    var j = searchHorarioById(parseInt(d.getElementById('id').value));
    if (j !== -1 && j !== i) {
        Swal.fire({
            title: `Error`,
            text: `El id de horario ya existe`,
            icon: `error`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 2500,
            showConfirmButton: false
        });

        return;
    }
    this.horarios[i].id = parseInt(d.getElementById('id').value);
    this.horarios[i].start = parseInt(d.getElementById('start').value);
    this.horarios[i].end = parseInt(d.getElementById('end').value);
    
    showModal(false);
    readAllElements();
        
    Swal.fire({
            title: `horarios Actualizado`,
            text: `horarios se actualizo correctamente`,
            icon: `successs`,
            padding: '2rem',
            toast: true,
            position: 'top-end',
            timer: 1500,
            showConfirmButton: false
    });
}


    function setUpdateElements(id) {
        $form.querySelector('.title-form').textContent = 'Editar horarios';
        $form.querySelector('.create').textContent = 'Editar';
    
        var horarios = getHorarioById(id);

        $form.querySelector('#id').value = horarios.id;
        $form.querySelector('#start').value = horarios.start;
        $form.querySelector('#end').value = horarios.end;
        var i = searchHorarioById(parseInt(horarios.id));
        $form.querySelector('#position').value = i;
        $form.querySelector('#action').value = 'UPDATE';

        showModal(true);

    }

function getHorarioById(id) {
    for (var i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].id === id) {
            return horarios[i];
        }
    }
    return null;
}

function searchHorarioById(id) {
    for (var i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].id === id) {
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
    $form.querySelector('.title-form').textContent = 'Nuevo horario';
    $form.querySelector('.create').textContent = 'Crear';

    $form.querySelector('#id').value = '';
    $form.querySelector('#start').value = '';
    $form.querySelector('#end').value = '';
    $form.querySelector('#position').value = '';
    $form.querySelector('#action').value = 'CREATE';
}

readAllElements();