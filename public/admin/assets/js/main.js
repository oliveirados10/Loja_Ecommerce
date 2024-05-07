const app = angular.module("ecommerceShoes", [])

app.controller("shoesController", ($scope, $http) => {
    $scope.modal = false
    $scope.modalDelete = false
    $scope.modalUpdate = false
    $scope.products = []
    $scope.productIdUpdate;
    $scope.name = "";
    $scope.description = "";
    $scope.price = "";
    $scope.img = "";

    $scope.openModal = () => {
        $scope.modal = true;
    };
    $scope.closeModal = () => {
        $scope.modal = false;
    }

    $scope.openmodalDelete = (id) => {
        $scope.productIdUpdate = id
        $scope.modalDelete = true;
    };
    $scope.closemodalDelete = () => {
        $scope.modalDelete = false;
    }

    $scope.openmodalUpdate = (id) => {
        $scope.productIdUpdate = id
        $scope.getProduct(id)
        $scope.modalUpdate = true;
    };
    $scope.closemodalUpdate = () => {
        $scope.modalUpdate = false;
        $scope.name = "";
        $scope.description = "";
        $scope.price = "";
        $scope.img = "";
    }




    $scope.getAllProducts = () => {
        $http.get("http://localhost:3333/api/v1/product", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            $scope.products = response.data;
        }).catch((error) => {
            console.log(error);
        });
    }


    $scope.submit = (name, description, price, imgUrl) => {
        console.log(name, description, price, imgUrl)
        $http.post("http://localhost:3333/api/v1/product", {
            name,
            description,
            price,
            imageUrl: imgUrl,

        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllProducts();
            $scope.closeModalProducts();
        }).catch((error) => {
            console.log(error);
        });
    };

    $scope.getAllProducts()

    $scope.removeProduct = () => {
        $http.delete(`http://localhost:3333/api/v1/product/${$scope.productIdUpdate}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllProducts();
            $scope.closeModalProducts();
        }).catch((error) => {
            console.log(error);
        });
    }

    $scope.updateProduct = () => {
        $http.update(`http://localhost:3333/api/v1/product/${$scope.productIdUpdate}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllProducts();
            $scope.closeModalProducts();
        }).catch((error) => {
            console.log(error);
        });
    }

    $scope.getProduct = (id) => {
        $http.get(`http://localhost:3333/api/v1/product/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response);
                $scope.name = response.data.name;
                $scope.description = response.data.description;
                $scope.price = response.data.price;
                $scope.img = response.data.imageUrl;
            })
            .catch((error) => {
                console.log(error);
            })
    }


    $scope.submitUpdateProduct = (name, description, price, img) => {
        $http.put(`http://localhost:3333/api/v1/product/${$scope.productIdUpdate}`, {
            name,
            description,
            price,
            imageUrl:img,
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            $scope.getAllProducts();
            $scope.closemodalUpdate();
        }).catch((error) => {
            console.log(error);
        });
    }

})

