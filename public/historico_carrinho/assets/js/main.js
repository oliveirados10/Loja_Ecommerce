const app = angular.module("appHistoricoCarrinho", [])


app.controller("controllerHistoricoCarrinho", ($scope, $http) => {

    $scope.cart = [];
    $scope.total = 0;
    $scope.totalItems = 0;

    $scope.getAllCartFinish = () => {
        $http.get(`http://localhost:3333/api/v1/cart/cartFinish/${JSON.parse(localStorage.getItem("user")).id}`, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then((response) => {
            console.log(response);
            $scope.cart = response.data;
        });
    }
    $scope.getAllCartFinish();
})

