function traerInformacionClientes(){
    $.ajax({
        url:"http://129.151.105.111:8081/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta){

    let myTable="<table>";
    myTable+="<tr>";

    myTable+="<td> <b>| EMAIL </b> </td>";
    myTable+="<td> <b>| PASSWORD </b> </td>";
    myTable+="<td> <b>| NAME </b> </td>";
    myTable+="<td> <b>| AGE |</b> </td>";
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick='borrarElementoClientes("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="<td> <button onclick='editarInformacionClientes("+respuesta[i].idClient+")'>Editar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function validarCamposCliente(){
    if($("#CLemail").val().length == 0 | $("#CLpassword").val().length == 0 | $("#CLname").val().length == 0 | $("#CLage").val().length == 0 ){
        return false
    }else{
        return true
    }
    
}

function guardarInformacionClientes(){
    if(validarCamposCliente()){
        let var4 = {
            email:$("#CLemail").val(),
            password:$("#CLpassword").val(),
            name:$("#CLname").val(),
            age:$("#CLage").val(),
            };

            $.ajax({
                type:'POST',
                contentType: "application/json; charset=utf-8",
                dataType: 'JSON',
                data: JSON.stringify(var4),
                
                url:"http://129.151.105.111:8081/api/Client/save",
            
                success:function(response) {
                    console.log(response);
                    console.log("Se guardo correctamente");
                    $("#CLemail").val("");
                    $("#CLpassword").val("");
                    $("#CLname").val("");
                    $("#CLage").val("");
                    alert("Se guardo correctamente");

                },
                
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("No se guardo correctamente");
                }
            });
        }else{
            alert("Campos vacios");
        }
}


function editarInformacionClientes(idElemento){
    if(validarCamposCliente()){
        let myData = {
            idClient:idElemento,
            email:$("#CLemail").val(),
            password:$("#CLpassword").val(),
            name:$("#CLname").val(),
            age:$("#CLage").val(),
            };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://129.151.105.111:8081/api/Client/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#CLemail").val("");
                $("#CLpassword").val("");
                $("#CLname").val("");
                $("#CLage").val("");
                alert("se ha Actualizado los datos")
            },

            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo correctamente");
            }

        });
    }else{
        alert("Campos vacios");
    }

}

function borrarElementoClientes(idElemento){
    $.ajax({
        url:"http://129.151.105.111:8081/api/Client/"+String(idElemento),
        type:"DELETE",
        success:function(respuesta){
            alert("Se ha Eliminado.")
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Borro correctamente");
        }
    });
}