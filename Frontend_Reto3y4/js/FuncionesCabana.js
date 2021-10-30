function traerInformacionCabana(){
    $.ajax({
        url:"http://129.151.105.111:8081/api/Cabin/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCabana(respuesta);
        }
    });
}

function pintarRespuestaCabana(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
    myTable+="<td> <b>| NAME </b> </td>";
    myTable+="<td> <b>| BRAND </b> </td>";
    myTable+="<td> <b>| ROOMS </b> </td>";
    myTable+="<td> <b>| DESCRIPTION |</b> </td>";
    myTable+="</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].rooms+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button onclick='borrarElementoCabana("+respuesta[i].id+")'>Borrar</button>";
        myTable+="<td> <button onclick='editarInformacionCabana("+respuesta[i].id+")'>Editar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function validarCamposCabana(){
    if($("#CAbrand").val().length == 0 | $("#CArooms").val().length == 0 | $("#CAname").val().length == 0 | $("#CAdescription").val().length == 0 ){
        return false
    }else{
        return true
    }
    
}

function guardarInformacionCabana(){
    if(validarCamposCabana()){
        let var3 = {
            brand:$("#CAbrand").val(),
            rooms:$("#CArooms").val(),
            name:$("#CAname").val(),
            description:$("#CAdescription").val(),
            };
        
            $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var3),
            
            url:"http://129.151.105.111:8081/api/Cabin/save",
        
            
            success:function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                $("#CAid").val("");
                $("#CAbrand").val("");
                $("#CArooms").val("");
                $("#CAdescription").val("");
                $("#CAname").val("");
                alert("Se guardo correctamente");
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");
        
        
            }

            });
    }else{
        alert("Campos vacios");
    }
}

function editarInformacionCabana(idElemento){
    if(validarCamposCabana()){
        let myData={
            id:idElemento,
            brand:$("#CAbrand").val(),
            rooms:$("#CArooms").val(),
            description:$("#CAdescription").val(),
            name:$("#CAname").val(),
        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            url:"http://129.151.105.111:8081/api/Cabin/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",

            success:function(respuesta){
                $("#CAid").val("");
                $("#CAbrand").val("");
                $("#CArooms").val("");
                $("#CAdescription").val("");
                $("#CAname").val("");
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

function borrarElementoCabana(idElemento){
    $.ajax({
        url:"http://129.151.105.111:8081/api/Cabin/"+String(idElemento),
        type:"DELETE",

        success:function(respuesta){
            alert("Se ha Eliminado.")
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se Borro correctamente");
        }
    });
}

