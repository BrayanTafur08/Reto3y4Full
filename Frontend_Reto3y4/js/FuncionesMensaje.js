function traerInformacionMensajes(){
    $.ajax({
        url:"http://129.151.105.111:8081/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta);
        }
    });
}

function pintarRespuestaMensajes(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
    myTable+="<td> <b>| MESSAGETEXT |</b> </td>";
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td> <button onclick='borrarElementoMensajes("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="<td> <button onclick='editarInformacionMensajes("+respuesta[i].idMessage+")'>Editar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}

function validarCamposMensaje(){
    if($("#MmessageText").val().length == 0 ){
        return false
    }else{
        return true
    }
    
}

function guardarInformacionMensajes(){
    if(validarCamposMensaje()){
        let myData = {
            messageText:$("#MmessageText").val(),
            };

            $.ajax({
                type:'POST',
                contentType: "application/json; charset=utf-8",
                dataType: 'JSON',
                data: JSON.stringify(myData),
                
                url:"http://129.151.105.111:8081/api/Message/save",
            
                success:function(response) {
                    console.log(response);
                    console.log("Se guardo correctamente");
                    $("#MmessageText").val("");
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


function editarInformacionMensajes(idElemento){
    if(validarCamposMensaje()){
        let myData = {
            idClient:idElemento,
            email:$("#MmessageText").val(),
            };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://129.151.105.111:8081/api/Message/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#MmessageText").val("");
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

function borrarElementoMensajes(idElemento){
    $.ajax({
        url:"http://129.151.105.111:8081/api/Message/"+String(idElemento),
        type:"DELETE",
        success:function(respuesta){
            alert("Se ha Eliminado.")
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Borro correctamente");
        }
    });
}