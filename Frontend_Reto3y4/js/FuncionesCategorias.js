function traerInformacionCategorias(){
    $.ajax({
        url:"http://129.151.105.111:8081/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
    myTable+="<td> <b>| NAME </b> </td>";
    myTable+="<td> <b>| DESCRIPTION |</b> </td>";
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick='borrarElementoCategorias("+respuesta[i].id+")'>Borrar</button>";
        myTable+="<td> <button onclick='editarInformacionCategorias("+respuesta[i].id+")'>Editar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function validarCamposCategoria(){
    if($("#Cname").val().length == 0 | $("#Cdescription").val().length == 0){
        return false
    }else{
        return true
    }
    
}

function guardarInformacionCategorias(){
    
    if (validarCamposCategoria()){
        let var2 = {
            name:$("#Cname").val(),
            description:$("#Cdescription").val(),
        };

        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var2),
            
            url:"http://129.151.105.111:8081/api/Category/save",
            
            success:function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                $("#Cname").val("");
                $("#Cdescription").val("");
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se guardo correctamente");
            }
        });
    }else{
        alert("Campos vacios");
    }

}

function editarInformacionCategorias(idElemento){
    if(validarCamposCategoria()){
        let myData={
            id:idElemento,
            name:$("#Cname").val(),
            description:$("#Cdescription").val(),
        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://129.151.105.111:8081/api/Category/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#Cname").val("");
                $("#Cdescription").val("");
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

function borrarElementoCategorias(idElemento){
    $.ajax({
        url:"http://129.151.105.111:8081/api/Category/"+String(idElemento),
        type:"DELETE",
        success:function(respuesta){
            alert("Se ha Eliminado.")
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Borro correctamente");
        }

    });
}