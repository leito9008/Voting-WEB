"use strict";

/* globals Firebase */

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */

(function () {

    angular
        .module("webApp.controllers")
        .controller("PostsController", PostsController);

    PostsController.$inject = ["$scope", "$firebaseArray", "$location", "$firebaseObject"];

    function PostsController($scope, $firebaseArray, $location, $firebaseObject) {

        var firebaseObj = new Firebase("https://voting-web.firebaseio.com/Posts");
        var sync = $firebaseArray(firebaseObj.startAt($scope.username).endAt($scope.username));
        $scope.articles = sync;

        $scope.AddPost = function () {
            var title = $scope.article.title;
            var post = $scope.article.post;
            //var firebaseObj = new Firebase("https://voting-web.firebaseio.com/Posts");
            var fb = $firebaseArray(firebaseObj);

            fb.$add({
                title: title,
                post: post,
                done: false,
                likes: 0,
                timestamp: moment().format() // Now!
            });
        };

        $scope.confirmDelete = function (id) {
            //traigo el post a eliminar
            var fb = new Firebase("https://voting-web.firebaseio.com/Posts/" + id);
            var post = $firebaseObject(fb);
            //guardo en el scope el post a eliminar
            $scope.postToDelete = post;
            //abro ventana modal de confirmación
            $('#deleteModal').modal();
        };

        $scope.deletePost = function () {
            //traigo el post a eliminar
            var fb = new Firebase("https://voting-web.firebaseio.com/Posts/" + $scope.postToDelete.$id);
            var post = $firebaseObject(fb);
            //elimino post y oculto ventana modal
            post.$remove().then(function (ref) {
                $('#deleteModal').modal('hide');
            }, function (error) {
                console.log("Error:", error);
            });
        };

        $scope.addLike = function (id) {
            //traigo el post a sumar un like
            var fb = new Firebase("https://voting-web.firebaseio.com/Posts/" + id);
            var postR = $firebaseObject(fb);
            //hago el update (loaded() + save())
            postR.$loaded().then(function () {
                postR.likes = postR.likes + 1;
                postR.$save();
            }).then(function () {
                console.log("post guardado!");
            }).catch(function (error) {
                console.log("Error:", error);
            });
        };
    }

}());
