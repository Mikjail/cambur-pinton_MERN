// url= "http://cambur-pinton.com/laravel5Angularjs/public/api/"

var app = angular.module('starter', ['ngRoute', 'camburTemplate'])
.constant('API_URL', 'https://cambur-pinton.com/public/api/');
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/detalles', {
            templateUrl: 'templates/detalles.html' // The ng-template id
        })
        .when('/menu', {
            templateUrl: 'templates/menu.html' // The ng-template id
        })
        .when('/suPedido', {
            templateUrl: 'templates/suPedido.html' // The ng-template id
        })
        .when('/enviar', {
            templateUrl: 'templates/formPedido.html', // The ng-template id
            controller: "formCtrl"
        })
        .when('/finalOrder', {
            templateUrl: 'templates/pedidoEnviado.html'
        })
        .when('/fueraHorario', {
            templateUrl: 'templates/fueraHorario.html'
        })
        .when('/menuExtra', {
            templateUrl: 'templates/menuExtra.html'
        })
        .when('/arepaMaiz', {
            templateUrl: 'templates/arepaMaiz.html'
        })
        .when('/arepaTrigo', {
            templateUrl: 'templates/arepaTrigo.html'
        })
        .when('/empanadas', {
            templateUrl: 'templates/empanadas.html'
        })
        .when('/tequenos', {
            templateUrl: 'templates/tequenos.html'
        })
        .when('/patacones', {
            templateUrl: 'templates/patacones.html'
        })
        .when('/combos', {
            templateUrl: 'templates/combos.html'
        })
        .when('/salsas', {
            templateUrl: 'templates/salsas.html'
        })
}]);
