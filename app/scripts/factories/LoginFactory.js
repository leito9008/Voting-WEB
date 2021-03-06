"use strict";

/* globals Firebase */

(function () {

    angular
        .module("webApp.factories")
        .factory("LoginFactory", LoginFactory);

    LoginFactory.$inject = ["$q", "$firebaseAuth", "localStorageService", "UsersFactory", "FirebaseUrl"];

    function LoginFactory($q, $firebaseAuth, localStorageService, UsersFactory, FirebaseUrl) {

        var service = {
            facebookLogin: facebookLogin,
            logout: logout
        };

        return service;

        /**
         * Loguea un usuario con facebook y guarda en el localStorage los datos del mismo
         * @returns {Promise} una promesa cuando se terminó de recuperar el usuario
         */
        function facebookLogin() {
            var firebaseObject = new Firebase(FirebaseUrl);
                
            return $q(function (resolve, reject) {
                firebaseObject.authWithOAuthPopup("facebook", function (error, authData) {
                    if (error) {
                        reject(error);
                    } else {
                        UsersFactory.createOrRetrieveUser(authData.facebook).then(function(user) {
                            var facebookId = Object.keys(user)[0],
                                loginUser = user[facebookId];

                            loginUser.facebookId = facebookId;
                            localStorageService.set('loginUser', loginUser);

                            resolve(loginUser);
                        }, function(err) {
                            console.log("No se pudo recuperar el usuario", err);
                        }); 
                    }
                });
            });
        }

        /**
         * Desloguea un usuario, borrando las credenciales en firebase y el localStorage
         */
        function logout() {
            var firebaseObject = new Firebase(FirebaseUrl);
            firebaseObject.unauth();
            //limpia el local storage
            localStorageService.clearAll();
        }
    
    }

}());
