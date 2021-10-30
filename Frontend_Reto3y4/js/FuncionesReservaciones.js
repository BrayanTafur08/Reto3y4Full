function traerInformacionReservaciones(){
    $.ajax({
        url:"http://129.151.105.111:8081/api/Reservation/all",
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

    myTable+="<td> <b>| STAR DATE </b> </td>";
    myTable+="<td> <b>| DEVOLUTION DATE |</b> </td>";
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td> <button onclick='borrarElementoReservaciones("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="<td> <button onclick='editarInformacionReservaciones("+respuesta[i].idReservation+")'>Editar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}

function validarCamposReservaciones(){
    if($("#Rstart").val() == "" | $("#Rdevolution").val() == "" ){
        return false
    }else{
        return true
    }
    
}

function guardarInformacionReservaciones(){
    if(validarCamposReservaciones()){
        let var4 = {
            startDate:$("#Rstart").val(),
            devolutionDate:$("#Rdevolution").val(),
            };

            $.ajax({
                type:'POST',
                contentType: "application/json; charset=utf-8",
                dataType: 'JSON',
                data: JSON.stringify(var4),
                
                url:"http://129.151.105.111:8081/api/Reservation/save",
            
                success:function(response) {
                    console.log(response);
                    console.log("Se guardo correctamente");
                    $("#Rstart").val("");
                    $("#Rdevolution").val("");
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


function editarInformacionReservaciones(idElemento){
    if(validarCamposReservaciones()){
        let myData = {
            idReservation:idElemento,
            startDate:$("#Rstart").val(),
            devolutionDate:$("#Rdevolution").val(),
            };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://129.151.105.111:8081/api/Reservation/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#Rstart").val("");
                $("#Rdevolution").val("");
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

function borrarElementoReservaciones(idElemento){
    $.ajax({
        url:"http://129.151.105.111:8081/api/Reservation/"+String(idElemento),
        type:"DELETE",
        success:function(respuesta){
            alert("Se ha Eliminado.")
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Borro correctamente");
        }
    });
}