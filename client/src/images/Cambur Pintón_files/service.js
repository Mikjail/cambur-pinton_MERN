ProductsService.$inject = ['$http', 'API_URL', '$q'];
ProductsTypeService.$inject = ['$http', 'API_URL', '$q'];
angular.module('starter')
    .service('ProductsService', ProductsService)
    .service('ProductsTypeService', ProductsTypeService);

function ProductsTypeService($http, API_URL, $q) {
    var def = $q.defer();
    this.getProductsType = function () {
        $http.get(API_URL + "productsType")
        .then(function (response) {
            def.resolve(response);

        });
        return def.promise;
    }

}

function ProductsService($http, API_URL, $q) {
    var def = $q.defer();
    this.getProducts = function () {

        $http.get(API_URL + "products")
            .then(function (response) {
                def.resolve(response);

            });
        return def.promise;
    }

}


function parseResponse(response) {
    if (typeof response.value.data != 'undefined' && response.value.data != null) {
        return response.value.data;
    }
    else {
        alert("No existen datos al servicio que llama");
    }

}

