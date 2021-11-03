//Campos del Formulario
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

const formulario = document.querySelector("#nueva-cita");

const contenedorCitas = document.querySelector("#citas");

class Citas{
    constructor() {
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = {...this.citas, cita};
        console.log(this.citas)

    }
}

class UI{
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);

    }
}

const ui = new UI();
const administrarCitas = new Citas();


//Registrar los eventos
eventListeners();
function eventListeners() {
  mascotaInput.addEventListener("input", datosCita);
  propietarioInput.addEventListener("input", datosCita);
  telefonoInput.addEventListener("input", datosCita);
  fechaInput.addEventListener("input", datosCita);
  horaInput.addEventListener("input", datosCita);
  sintomasInput.addEventListener("input", datosCita);
  formulario.addEventListener('submit',nuevaCita);
}

//Object con la info de la cita
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

//Llenar el object de cita
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;

}

// Valida y agrega una nueva cita  a la clase de Citas
function nuevaCita(e){
    e.preventDefault();

    //Extraer la informacion del obj cita

    const {mascota,propietario,telefono,fecha,hora,sintomas} = citaObj;

    //Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
       ui.imprimirAlerta('Todos los campos son Obligatorios','error');

        return;
    }

    //Generar un id unico
    citaObj.id = Date.now();
    //Crear una nueva cita
    administrarCitas.agregarCita({...citaObj});

    //Reiniciar el Obj para la validacion
    reiniciarObjeto();
    //Reiniciar Formulario
    formulario.reset();

    //Mostrar el Html de las citas


}
function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}