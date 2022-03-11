

Blueprint = (function(){

    var Author = $("#AuthorInput").val();
    var blueprints;
    var UserPoints;
    var planoM;
    var bp; // BluePrint a mostrar, conformado por nombre y número de puntos
    var Point;
    var canvas;
    var canvasM;
    var ctx;

    var fun=function(list){
        blueprints = list;
        console.log(blueprints)
    }

    function prueba(){alert("Se supone que entra")}

    /**
     * Actualiza el total de puntos de los planos.
     */
    function actualizarTotalUPoints(){
        let points = 0;
        var pointsM = planoM.map(function (plano){
            return plano.puntos;
        })
        points = pointsM.reduce(getSum,0);
        console.log(points);
        UserPoints = $("#totalPoints").html(points);
        
    }

    function getSum(total,sum){
        return total + sum;
    }

    
    function dibujarPlano(){

    }

    /**
     * Cambia el autor de un plano.
     * @param {Blueprint} blueprint Plano al cual se actualiza el autor
     * @param {String} newAuthor Nuevo autor del plano.
     */
     cambiarNombreAutor = function(bluePrint,newAuthor){}

     /**
      * Actualiza los planos a mostrar segun el autor dado.
      * @param {String} author Autor a mostrar sus planos.
      */
    function actualizarPlanos(){
            console.log( $("#AuthorInput").val());
            apimock.getBlueprintsByAuthor($("#AuthorInput").val(),fun);
            var bps = blueprints;
            console.log(bps);
            var bps2 = bps.map(function(bp){
                var plano = {nombre:bp.name, puntos: bp.points.length};
                return plano;
            }); 
            console.log(bps2);
            planoM = bps2;
            $("table tbody").empty();
            var BlueprintTable = bps2.map(function(plano){        
                var columna = "<tr><td align=\"center\" id=\""+plano.nombre+"_\">"+plano.nombre+"</td><td align=\"center\">"+plano.puntos+"</td><td><button onclick=\"Blueprint.dibujarPlano("+plano.nombre+"_)\">Open</button></td></tr>";
                $("table tbody").append(columna);
                return columna;
            });
            console.log(BlueprintTable);
            actualizarTotalUPoints();
                
        }
    
    function dibujarPlano(id){
        var ID = id["id"].substring(0,id["id"].length -1)
        canvasM = $("#myCanvas");
        canvas = $("#myCanvas")[0];
        ctx = canvas.getContext("2d");
        canvas.width=canvas.width;
        apimock.getBlueprintsByNameAndAuthor($("#AuthorInput").val(),ID,fun);
        var bps = blueprints;
        ctx.moveTo(bps.points[0]["x"],bps.points[0]["y"]);
        for(let i=1;i<bps.points.length; i++){
            ctx.lineTo(bps.points[i]["x"],bps.points[i]["y"]);
        }
        ctx.stroke();

    }
    


    return{
        prueba : prueba,
        actualizarPlanos : actualizarPlanos,
        dibujarPlano:dibujarPlano,
        init:function(){
            //SE VUELVE A PEDIR LAS VARIABLES DE CANVAS PARA ACTUALIZACION DE EVENTO
            canvas = $("#myCanvas")[0];
            ctx = canvas.getContext("2d");
            console.info("Inicializando elementos...");
            //REVISION DE EVENTO DE POINTERDOWN
            if(window.PointerEvent){
                canvas.addEventListener("pointerdown", function(event){
                    alert('pointerdown at '+event.pageX+','+event.pageY);
                });
            }  
        }
    };

})();
Blueprint;


// $("#GetBlueprintsButton").click(function(){
//     alert("Entro");
// });

// $(document).ready(function(){
//     $("#GetBlueprintsButton").click(function(){
//         alert("Esta sirviendo");
//     });
// });


// function funcionPrueba() {
//     alert("Se supone que ya sirve");
// };

// getBlueprintsBoton.addEventListener('click',funcionPrueba,true);

 

    
