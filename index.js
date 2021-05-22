////////// FUNCIONES PARA INPUT Y MOSTRAR/OCULTAR ELEMENTOS ///////////


var tBoton = $("#boton")[0]

var input = $("#entrada")[0]

tBoton.addEventListener("click", function () {

    traerInfo();
    
})

function pagination() {

    setTimeout(function () {

        $("#pagination").css("display", "flex");

    }, 3000);

}


function spinner() {

    setTimeout(function () {

        $("#spinner").css("display", "none");
        $("#container").css("display", "flex");
        $("#pagination").css("display", "flex");

    }, 1000);

}
////////// PARSEAR EL JSON A UN OBJETO //////////////

function loadDoc(url) {

   
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {


        if (this.readyState == 4 && this.status == 200) {
            objetos = JSON.parse(this.responseText);;
            for (let i = 0; i < objetos.articles.length; i++) {
                divs(objetos.articles[i]);
            }

        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}



//////////// LLAMADA A LA API Y MAQUETACION DE DATOS ///////////////

function divs(objeto) {

    var newDiv = $("<div class='noticia'></div>")
    $(newDiv).html("<h3>" + " <a href=" + objeto.url + " target=_blank>" + objeto.title + "</a>" + "</h3>" + "<br>" + "<br>" + "<img src=" + objeto.urlToImage + ">" + "<p>" + objeto.description + "</p>" + "<br>");

    $(newDiv).append($('<button>').attr("class", "boton").text("+info").click(function () {
        info(objeto)
    }));

    $("#container").append(newDiv)
}



function info(objeto) {

    console.log("pulsado")

    var newDiv = $("<div class='noticia2'></div>")

   


    $(newDiv).html("<h3>" + " <a href=" + objeto.url + " target=_blank>" + objeto.title + "</a>" + "</h3>" + "<br>" +  "<img src=" + objeto.urlToImage + ">" + "<p>" + objeto.content + "</p>" +"<p>"+"<p>Published at: "+objeto.publishedAt + "</p>" )
    $(newDiv).append($('<button>').attr("class", "boton").text("x").click(function () {

        cerrarDiv()

    }));

    
    $("#info").append(newDiv)
    $("#info").css("display","block")



}

function cerrarDiv(){

  
   $("#info").css("display","none")
   $("#info").empty()

}

/////////////////// PAGINA INICIAL LA UNO ////////////////////////

page=1



function traerInfo(page) {
    {

        $("#spinner").css("display", "block");

        spinner();

        $("#titulo").css("display", "none");

        noticia = $("#entrada").val();

        $("#container").empty();

        $('#pagination').css("display", "none")
        
        pagination()


        direccion="https://newsapi.org/v2/everything?q=" + noticia + "&pageSize=12&page=" + page + "&apiKey=067bdec191fb4b0cbe14fa478bde44d1"
    
        $.ajax({
            url: direccion,
            beforeSend: function () {
                console.log("llamando")
                $("#spinner").css("display", "block");
                $("#pagination").css("display", "none");
            }
        })
            .done(function () {
        
                console.log("cargado");
                $("#spinner").css("display", "none");
                  $("#pagination").css("display", "flex");
        
        
            });
     
    loadDoc("Access-Control-Allow-Origin:https://newsapi.org/v2/everything?q=" + noticia + "&pageSize=12&page=" + page + "&apiKey=067bdec191fb4b0cbe14fa478bde44d1")

  
    }
}


function anterior() {


    pagination()
    page--
    traerInfo(page)

    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
}


function siguiente() {

pagination()
page++
traerInfo(page)


$("html, body").animate({ scrollTop: 0 }, "slow");
return false;


}
