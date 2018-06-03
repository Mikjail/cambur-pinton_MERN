app.directive("slideArepas", function() {
    return {
        restrict: "E",
        templateUrl: "templates/arepas.html"
    }
});
app.directive("menu", function() {
    return {
        restrict: "E",
        templateUrl: "templates/menu.html"
    }
});
app.directive("menuMobile", function() {
    return {
        restrict: "E",
        templateUrl: "templates/menu.html"
    }
});
app.directive("detalles", function() {
    return {
        restrict: "E",
        templateUrl: "templates/detalles.html"
    }
});
app.directive("comprar", function() {
    return {
        restrict: "E",
        templateUrl: "templates/modal.html"
    }
});
app.directive("contacto", function() {
    return {
        restrict: "E",
        templateUrl: "templates/contacto.html"
    }
});
app.directive("finalOrder", function() {
    return {
        restrict: "E",
        templateUrl: "templates/suPedido.html"
    }
});
app.directive("fueraHorario", function() {
    return {
        restrict: "E",
        templateUrl: "templates/fueraHorario.html"
    }
});

