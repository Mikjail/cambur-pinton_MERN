productosCtrl.$inject = ['$scope', 'ProductsService', 'ProductsTypeService', '$window'];
formCtrl.$inject = ['$scope', '$http', '$location', 'API_URL']
angular.module('starter')
    .controller("productosCtrl", productosCtrl)
    .controller("formCtrl", formCtrl);

function productosCtrl($scope, ProductsService,ProductsTypeService, $window) {
    $scope.isVisible=true;
    $scope.viewArepas = "";
    $scope.detalles;
    $scope.productoPedido = {
        arepas: null,
        tequenos: null,
        empanadas: null
    };
    $scope.productsType={};
    $scope.products={};
    $scope.pTypeSelected={"id": 1,
    "name": "arepaMaiz",
    "description": "Arepas de Maiz"};
    
    ProductsService.getProducts().then(({data})=>{
        $scope.products= data;
        ProductsTypeService.getProductsType().then(({data})=>{
                $scope.productsType = data;
       
        $scope.totalBought= 0;

        $scope.productTypeSelected = function(productType){
            $scope.pTypeSelected = productType;
        }

        $scope.totalCompra = ()=> {
             $scope.totally = 0;
            $scope.products.forEach((product)=> {
                if(product.cant > 0){
                  $scope.totally+= (product.price * product.cant); 
                 }
            });
            return  $scope.totally;
        }
        
        $scope.totalCantidad = ()=>{
            $scope.totalCantBought =0;
            $scope.products.forEach((product)=>{
                $scope.totalCantBought  += product.cant;
            });
            return  $scope.totalCantBought;
        }

        $scope.productsBought = ()=>{
            return $scope.products.filter((product)=>{ return product.cant > 0 })
        }

        $scope.productTypeName = (product)=>{
            return $scope.productsType.find((productType)=>{ return productType.id == product.productstype_id})
        }
       
        $scope.totalByType = (type) =>{
            $scope.cantTotalByType=0;
            $scope.products.forEach((product)=>{
               if(product.productstype_id === type.id){
                $scope.cantTotalByType += product.price * product.cant;
               }
            })
            return  $scope.cantTotalByType;
        }

        $scope.substractProduct = (product)=>{ 
            product.cant -= 1;
          
            console.log(product.cant);
         }
        
         $scope.addProduct= (product)=>{
            product.cant += 1;
         }
        
         $scope.promo = () =>{
            return $scope.totalCompra() * 0.90;
        }

    $scope.isOpen = () => {
        var date = new Date();
        var day = date.getDay();
        var hour = date.getHours();

        if (day >= 2 && day <= 7) {
            if (hour >= 18 && hour <= 23) {
                return false;
            }
        }

        return false;
    }

    $scope.reloadPage = () =>{
        $window.location.reload();
    }

    $scope.orderNow = () =>{
        $scope.isVisible = false;
        setTimeout(()=>{
            $('html, body').animate({
                scrollTop: $("#menuMobile").offset().top
            }, 2000);
        },500)
        
    }
    $scope.cantidadTotal = 0;


        });
      
    
    }); 

    

}

function formCtrl($scope, $http, $location, API_URL) {
    $scope.hourSelected={ selection: ''};
    $scope.minSelected={ selection: ''};
    $scope.daySelected = { selection: {}};
    $scope.scheduleDays= [
        { day : 'Martes' },
        { day: 'Miercoles' },
        { day: 'Jueves' }, 
        { day: 'Viernes'},
        { day: 'Sabado'}, 
        { day: 'Domingo'}];
    var date = new Date();
    // console.log(date.getDay());
    var day = date.getDay()-1;
    $scope.scheduleDays = $scope.scheduleDays.splice(day,7-date.getDay());
    if(day != 0){
        $scope.scheduleDays.unshift({ day: 'Hoy' });
    }
    // $scope.dia = $scope.scheduleDays[0];
    // console.log( $scope.dia );

    $scope.registrarForm = function() {
        if($scope.comment == '' || $scope.comment == null || $scope.comment == undefined){
            $scope.comment="no comment";
        }
        // console.log($scope.scheduleHour);
        // console.log(  $scope.dia.day + ' a las ' + $scope.scheduleHour +' : '+$scope.scheduleMin+'hs')
        // console.log($scope.productsBought())
        $http({method: 'POST',
            url: API_URL+'contactUs', data:$.param({
            nombre: $scope.nombreForm,
            apellido: $scope.apellidoForm,
            email: $scope.mailForm,
            telefono: $scope.telForm,
            calle: $scope.calle,
            altura: $scope.altura,
            piso: $scope.piso,
            depto: $scope.depto,
            localidad: $scope.localidad,
            comment: $scope.comment,
            productoPedido: $scope.productsBought(),
            productsType: $scope.productsType,
            total:$scope.promo(),
            horario: $scope.daySelected.selection.day +
             ' a las ' + $scope.hourSelected.selection +' : '+
             $scope.minSelected.selection+'hs'
        }), headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function(response) {
            $location.path("/finalOrder");
            $scope.nombreForm = "";
            $scope.apellidoForm = "";
            $scope.mailForm = "";
            $scope.telForm = "";
            $scope.comment = "";
            $scope.calle = "";
            $scope.altura = "";
            $scope.localidad = "";
            $scope.piso = "";
            $scope.depto = "";
       
        }).error(function(response) {
            alert('Hubo un error al intentar hacer el pedido, contactese por telefono');
        });
    }

    $scope.registrarConsulta = function() {
        if($scope.comment == '' || $scope.comment == null || $scope.comment == undefined){
            $scope.comment="no comment";
        }
        $scope.apellidoForm="consulta";
        $scope.nombreForm="consulta";
        $scope.telForm="consulta";
        $scope.calle="consulta";
        $scope.altura="consulta";
        $scope.piso="consulta";
        $scope.depto="consulta";
        $scope.localidad="consulta";
        $http({method: 'POST',
        url: API_URL+'contactUs', data:$.param({
            nombre: $scope.nombreForm,
            apellido: $scope.apellidoForm,
            email: $scope.mailForm,
            telefono: $scope.telForm,
            comment: $scope.comment,
            calle: $scope.calle,
            altura: $scope.altura,
            piso: $scope.piso,
            depto: $scope.depto,
            localidad: $scope.localidad
        }), headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).success(function(response) {
            $('#anotherModal').modal('show');
            $location.path("/finalOrder");
            // console.log(response);
            $scope.nombreForm = "";
            $scope.apellidoForm = "";
            $scope.mailForm = "";
            $scope.telForm = "";
            $scope.comment = "";
            $scope.calle = "";
            $scope.altura = "";
            $scope.localidad = "";
            $scope.piso = "";
            $scope.depto = "";
        }).error(function(response) {
            // console.log(response);
            // alert('This is embarassing. An error has occured. Please check the log for details');
        });
    }
}