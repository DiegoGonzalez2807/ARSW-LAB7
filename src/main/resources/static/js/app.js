

Blueprint = (function(){

    var Author = $("#AuthorInput").val();
    var AuthorNew;
    var blueprints;
    var UserPoints;
    var plano;
    var bps2;
    var planoM;
    var bp; // BluePrint a mostrar, conformado por nombre y número de puntos
    var canvas;
    var canvasM;
    var ctx;
    var ID;
    var bps;
    var lastPoint;

    var apiService = apiclient;

       /**
     * Funcion callback. Se necesita como parametro para usar las funciones de apimock
     * @param {Array} list 
     */
    var fun=function(list){
        blueprints = list;
       // console.log(blueprints)
    }


    /**
     * Funcion generada para actualizar el puntaje que se muestra en el HTMl de acuerdo
     * a la sumatoria de los puntos de todos los planos del autor
     */
    function actualizarTotalUPoints(){
        let points = 0;
        var pointsM = planoM.map(function (plano){
            return plano.puntos;
        })
        points = pointsM.reduce(getSum,0);
       // console.log(points);
        UserPoints = $("#totalPoints").html(points);
        
    }

    /**
     * Funcion generada para hacer la sumatoria entre dos valores
     * @param {number} total 
     * @param {number} sum 
     * @returns 
     */
    function getSum(total,sum){
        return total + sum;
    }


    /**
     * Funcion generada para cambiar el nombre del autor al valor que defina
     * el usuario
     * @param {Blueprint} blueprint Plano al cual se actualiza el autor
     * @param {String} newAuthor Nuevo autor del plano.
     */
     cambiarNombreAutor = function(bluePrint,newAuthor){}

     /**
      * Funcion generada para actualizar los planos a mostrar segun el autor dado.
      * @param {String} author Autor a mostrar sus planos.
      */
    function actualizarPlanos(){
            apiService.getBlueprintsByAuthor($("#AuthorInput").val(),fun);
            bps = blueprints;
            bps2 = bps.map(function(bp){
                plano = {nombre:bp.name, puntos: bp.points.length};
                return plano;
            }); 
            planoM = bps2;
            $("table tbody").empty();
            BlueprintTable = bps2.map(function(plano){        
                var columna = "<tr><td align=\"center\" id=\""+plano.nombre+"\">"+plano.nombre+"</td><td align=\"center\">"+plano.puntos+"</td><td><button onclick=\"Blueprint.dibujarPlano("+plano.nombre+".id)\">Open</button></td></tr>";
                $("table tbody").append(columna);
                return columna;
            });
            actualizarTotalUPoints();
                
        }
    
    /**
     * Funcion generada para que a partir de un canvas se pueda dibujar la imagen que 
     * conforma todos los puntos dados en cada plano. Para obtener los puntos
     * se hace uso de la funcion "getBlueprintsByNameAndAuthor", donde nos da la informacion
     * especifica de el plano
     * @param {int} id 
     */
    function dibujarPlano(id){
        canvas.width=canvas.width;
        AuthorNew= $("#AuthorInput").val();
        ID = id;
        canvasM = $("#myCanvas");
        canvas = $("#myCanvas")[0];
        ctx = canvas.getContext("2d");
        apiService.getBlueprintsByNameAndAuthor($("#AuthorInput").val(),ID,fun);
        var bps = blueprints;
        ctx.moveTo(bps.points[0]["x"],bps.points[0]["y"]);
        for(let i=1;i<bps.points.length; i++){
            ctx.lineTo(bps.points[i]["x"],bps.points[i]["y"]);
        }
        ctx.stroke();
    }

    /**
     * Funcion generada para guardar de manera temporal el nuevo punto que se quiere
     * unir al plano para asi llamar a la funcion de pintar y hacer la figura con 
     * el nuevo punto
     * @param {String} ID 
     * @param {Array} newPoint 
     */
    function repaint(ID,newPoint){
        apiService.getBlueprintsByNameAndAuthor($("#AuthorInput").val(),ID,fun);
        bps= blueprints;
        bps.points.push(newPoint);
        dibujarPlano(bps.name);
    }

    /**
     * Volviendo publicas las funciones necesarias
     */
    return{
        actualizarPlanos : actualizarPlanos,
        dibujarPlano:dibujarPlano,
        init:function(){
            //SE VUELVE A PEDIR LAS VARIABLES DE CANVAS PARA ACTUALIZACION DE EVENTO
            canvas = $("#myCanvas")[0];
            ctx = canvas.getContext("2d");
            let rect = canvas.getBoundingClientRect();
            console.info("Inicializando elementos...");
            //REVISION DE EVENTO DE POINTERDOWN
            if(window.PointerEvent){
                canvas.addEventListener("pointerdown", function(event){
                    //SE PONE EL 50 EN Y PARA QUE EL PINTADO QUEDE DE ACUERDO A DONDE VAYA
                    //EL MOUSE DEBIDO A QUE HAY UN ESPACIO ENTRE EL PINTADO Y EL MOUSE SI NO SE PONE
                    var newPoint = {x:event.clientX-rect.left,y:event.clientY-rect.top-50};
                    repaint(ID,newPoint);
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

 

    
