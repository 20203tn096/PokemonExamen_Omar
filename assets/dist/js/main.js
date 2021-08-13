var count = 1;
var array = [];
array.push({
    "nombre":"Omar",
    "apellido":"Morales",
    "apellido2":"Demetrio",
    "pokemon":"Pikachu"
});

function findData() {
    let result = document.querySelector('#res');
    result.innerHTML = '';
    var count = 0;
    for (let pokemon of array) {
            result.innerHTML += `
            <tr>
           <td>${pokemon.nombre}</td>
           <td>${pokemon.apellido}</td>
           <td>${pokemon.apellido2}</td>
           <td>${pokemon.pokemon}</td>
           <td>
           <button type="button" class="btn btn-outline-primary" onclick="consultar('${count}','2')" data-bs-toggle="modal" data-bs-target="#update"><i class="fas fa-edit"></i> Modificar</button>                
           <button type="button"  class="btn btn-outline-danger" onclick="consultar('${count}','1');" data-bs-toggle="modal" data-bs-target="#delete"><i class="fas fa-trash"></i> Eliminar</button>
           </td>
           </tr> 
            `
        count++;
    }
}

function findPokemon(){
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=100'
    }).done(function (res) {
        let listPokemon = res.results;
        let form = document.querySelector('#form-control');
        form.innerHTML =`
        <label>Nombre :</label>
    <input class="form-control" type="text" name="name" id="name"  />
    <br>
    <label>Apellido Paterno:</label>
    <input class="form-control" type="text" name="lastname1"  id="lastname1"/>
    <br>
    <label>Apellido Materno:</label>
    <input class="form-control" type="text" name="lastname2" id="lastname2" />
    <br>
    <label>Pokemon:</label>
    <select class="form-select" name="text" id="pokemon">

    </select>
        `;
        let result = document.querySelector('#pokemon');
       result.innerHTML='';
        for (let pokemon of listPokemon) {
            result.innerHTML += `
                 <option value="${pokemon.name}">${pokemon.name}</option>      
                `
        }
    });
}


function createUser(){
    let name =document.getElementById("name").value;
    let lastname1 = document.getElementById("lastname1").value;
    let lastname2 = document.getElementById("lastname2").value;
    let category = document.getElementById("pokemon").value;
    array.push({
        "nombre": name,
        "apellido":lastname1,
        "apellido2":lastname2,
        "pokemon":category
    });
    findData();
}

function deletePokemon(){
    let id = document.getElementById("id2").value;
    array.splice(id,1);
    findData();
}

function consultar(id,type){
    let idUser = id;
    if(type==1){
        let registro = array[idUser];
        document.getElementById("id2").value=idUser;
        document.getElementById("name2").innerHTML=registro.nombre;
    }else{
        let registro = array[idUser];
        document.getElementById("id3").value=id;
        document.getElementById("name1").value=registro.nombre;
        document.getElementById("lastname11").value=registro.apellido;
        document.getElementById("lastname21").value=registro.apellido2;
        document.getElementById("pokemon1").value=registro.pokemon;
        findPokemon2();
    }

}

function updateUser(){
    let id =document.getElementById("id3").value;
    let name =document.getElementById("name1").value;
    let lastname1 = document.getElementById("lastname11").value;
    let lastname2 = document.getElementById("lastname21").value;
    let category = document.getElementById("pokemon1").value;
    array[id] = {
    "nombre":name,
    "apellido":lastname1,
    "apellido2":lastname2,
    "pokemon":category
};
findData();
}


function findPokemon2(){
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=100'
    }).done(function (res) {
        let listPokemon = res.results;
        let result = document.querySelector('#pokemon1');
        result.innerHTML='';
        for (let pokemon of listPokemon) {
            result.innerHTML += `
                 <option value="${pokemon.name}">${pokemon.name}</option>      
                `
        }
    });
}