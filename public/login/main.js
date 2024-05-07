const app = angular.module('login', []);

app.controller('loginController', function ($scope, $http) {
    $scope.email = "";
    $scope.password = "";

    $scope.submit = () => {
        $http.post("http://localhost:3333/api/v1/login", {
            email: $scope.email,
            password: $scope.password,
        })
            .then((res) => {
                console.log('nao entrou');
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                console.log(res.data.message);
                if (res.data.user.role === "admin") {
                    console.log('entrou');
                    window.location.href = "/admin"
                } else {
                    window.location.href = "/";
                }
            })

            .catch((error) => {
                console.error("Error:", error);
                alert("Um erro ocorreu. Por favor, tente novamente mais tarde");
            });
    };

});
