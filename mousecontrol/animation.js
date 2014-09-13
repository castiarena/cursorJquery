/**
 * Created by agu on 13/09/14.
 */
var circulo = {
    resultado: "",
    radio: 0,
    color: null,
    $obj: null,
    id: null,
    styles:{},
    dibujar:function(_radio, _color, _name){
        this.color = _color;
        this.radio = _radio;
        this.stylesConfig();
        this.generaId(_name);
        this.resultado = "<span id='"+this.id+"'></span>";
        return this.resultado;
    },
    stylesConfig: function(){
        var self = this;
        this.styles ={
            width: self.radio*2+"px",
            height: self.radio*2+"px",
            backgroundColor: self.color,
            position: "absolute",
            display: "block",
            borderRadius: self.radio +"px",
            top: window.innerHeight/2 - self.radio,
            left: window.innerWidth/2 - self.radio
        }
    },

    generaId: function(name){
        this.id = name + parseInt(Math.random()*1000);
    },

    getId:function(){
        return "#"+this.id;
    },
    getStyles:function(){
        return this.styles;
    }
}

var controlador = {
    posX : 0,
    posY : 0,
    posXtemp : 0,
    posYtemp : 0,
    $handler : $('body'),
    circulos : {},
    init: function(){
        var self = this;
        self.styleBody("#000");
        self.circulos ={
            blanco: {
                cuerpo : circulo.dibujar(10, "#FFF","uno"),
                id : circulo.getId(),
                styles : circulo.getStyles()
            },
            rojo: {
                cuerpo : circulo.dibujar(450, "#F00","dos"),
                id : circulo.getId(),
                styles : circulo.getStyles()
            }
        };
        $(document).ready(function(){

            self.$handler.append(self.circulos.rojo.cuerpo);
            self.$handler.find(self.circulos.rojo.id).css(self.circulos.rojo.styles);
            self.eventos();
            self.draw(30);
            console.log(self.circulos.blanco.styles);
        });
    },

    eventos: function(){
        var self = this;
        $(document).on('mousemove',function(e){
            self.posXtemp = e.pageX;
            self.posYtemp = e.pageY;

        });


    },

    draw :function(fRate){
        var self = this;
        self.$handler.append(self.circulos.blanco.cuerpo);

        var handler = self.$handler.find(self.circulos.blanco.id);
        handler.css(self.circulos.blanco.styles);
        setInterval(function(e){
            self.posX = self.tiendeA(self.posX,self.posXtemp,0.2);
            self.posY = self.tiendeA(self.posY,self.posYtemp,0.2);
            handler.css({
                top: self.posY,
                left: self.posX
            });
        }, 1000 / fRate);
    },

    /**
     * @params: BACKGROUND
     */
    styleBody: function(backogrund){
        $("body,html").css({
            position: "fixed",
            display:"block",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            margin: "0px",
            padding: "0px",
            background: backogrund,
            cursor: "none"
        });
    },

    /**
     * @params: radio del circulo
     */
    circle:function(){

    },
    /**
     * @params: tiende desde a hacia b
     */
    tiendeA: function(a,b,percent){
        var result = a + (b-a) * percent;
        return result;
    }
};



controlador.init();
