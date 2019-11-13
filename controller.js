var app = angular.module('validationApp', ["ui.router"]);

app.controller('mainController', function ($scope, $rootScope, $state) {

    $scope.login = function (data) {
        console.log(data);
        if (data.email == 'user@gmail.com' && data.password == '123456') {
            $state.go('dashboard');
        }
        else {
            alert("Please check the Credentials");
        }

    };
    $scope.signup = function () {
        $state.go('signup')
    }
});
app.controller('regController', function ($scope, $rootScope, $state) {
    $rootScope.Loginarray = [];
    console.log("In amaravathi page");
    $scope.submitForm = function (data) {
        console.log(data);
        $rootScope.Loginarray.push({ 'first': data.fname, 'mid': data.midname, 'last': data.lastname, 'mobile': data.nobile, 'email': data.email, 'password': data.pwd });

        alert("success fully Registered");
    }
});
app.controller('regController', function ($scope, $rootScope, $state, $http) {
    $scope.userForm = [];
    console.log("In amaravathi page");
    $scope.submitForm = function (data) {
        console.log(data);
       return $http.post('http://localhost:5005/nodeapp/addUsr', data)
            .then(function (success) {
                console.log(success);
                if (success.status == 200) {
                    alert("success fully Registered");
                    $scope.userForm = {};
                    $scope.user={};
                    $state.go('home');
                }

            })

            
    }

});
app.controller('dashController', function ($scope, $http, $state) {
    $scope.getuser = function () {
        $http.get('http://localhost:5005/nodeapp/getusrData')
        .then(function (resdata) {
            $scope.gameusrcnt = resdata.data;
            console.log($scope.gameusrcnt);
            // $scope.maxvalue = Math.max.apply(Math,$scope.gameusrcnt.map(function(item){return item.gamecnt;}));
        })
        
    }
    $scope.getuser();
    $scope.hide=false;
    $scope.edit=function(data){
        $scope.hide=true;
        $scope.view=data;
    }
    $scope.update=function(data){

        return $http.post('http://localhost:5005/nodeapp/updateusr', data)
        .then(function (success) {
            console.log(success);
            if (success.status == 200) {
                alert("success fully updated");
                 $scope.hide=false;   
                $scope.view={};
                $scope.getuser();
            }

        })
    }
    $scope.delete=function(data){

        return $http.post('http://localhost:5005/nodeapp/deleteeusr', data)
        .then(function (success) {
            console.log(success);
            if (success.status == 200) {
                alert("success fully deleted");
                $scope.getuser();
            }

        })
    }
});

app.config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider, $stateProvider
        // show home page
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: 'mainController'
        })
        //show page2
        .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html',
        })
        //show page3
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard.html',
            controller:'dashController'
        })
        .state('course', {
            url: '/course',
            templateUrl: 'course.html'
        })
        .state('blog', {
            url: '/blog',
            templateUrl: 'blog.html'
        })
        .state('services', {
            url: '/services',
            templateUrl: 'services.html'
        })
        .state('practice', {
            url: '/practice',
            templateUrl: 'practice/practice.html'
        })
        .state('practicetst', {
            url: '/practicetst',
            templateUrl: 'practice/practicetest.html'
        })
        .state('questionPaper', {
            url: '/questionPaper',
            templateUrl: 'questionPaper/qstn_Paper.html'
        })
    $urlRouterProvider.otherwise('/home');



});