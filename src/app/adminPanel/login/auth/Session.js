/**
 * Created by Umar on 12/26/14.
 */

(function(){
  'use strict';
  angular
    .module('app.auth')


    .factory('Session',Session);


  function Session($rootScope,$http){
    var username= undefined;
    var userEmail= undefined;
    var userId= undefined;
    var teams = undefined;
    var userToken= undefined;
    var userPermissions= undefined;
    var userRole= undefined;
    return{
      create:function(data,rememberMe){
        username= data.username;
        userEmail= data.email;
        userId= data.id;
        userToken= data.token;
        $rootScope._user= data;
        $rootScope.remember_me = rememberMe;
        $rootScope.teams=data.teams;
        $rootScope.userRole = data.role;
        if(rememberMe){
          window.localStorage.setItem("username",data.username);// = JSON.stringify(data);
          window.localStorage.setItem("token",data.token);// = JSON.stringify(data);
          window.localStorage.setItem("userEmail",data.email);// = JSON.stringify(data);
          window.localStorage.setItem("userRole",data.role);// = JSON.stringify(data);
        }
        else{
          window.sessionStorage.setItem("token", data.token);
          window.sessionStorage.setItem("username", data.username);
          window.sessionStorage.setItem("email", data.email);
          window.sessionStorage.setItem("userRole", data.role);

        }
        $http.defaults.headers.common["X-AUTH-TOKEN"] = data.token;
      },
      username:function(){
        return username ||  $rootScope._user? $rootScope._user.username:"" ;
      },
      userEmail:function(){
        return userEmail || $rootScope._user?$rootScope._user.email: "";
      },
      userId:function(){
        return userId || $rootScope._user?$rootScope._user.id :"";
      },
      userToken:function(){
        return userToken || $rootScope._user ? $rootScope._user.token :"";
      },
      userTeams:function(){
        return userToken || $rootScope.teams ? $rootScope.teams :"";
      },
      update:function(data){
        $rootScope._user= data;
        username= data.username;
        userEmail= data.email;
        userId= data.id;
        teams= data.teams;
        userPermissions = data.userPermissions;
        userRole= data.userRole;
        window.teams=data.teams;
        window.userRole=angular.lowercase(data.role);
        window.localStorage.setItem("userRole",angular.lowercase(data.role));
      },
      destroy : function () {
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("userEmail");
        window.localStorage.removeItem("userRole");
        window.sessionStorage.removeItem("username");
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("email");
        window.sessionStorage.removeItem("userRole");
        username = null;
        userEmail = null;
        userId = null;
        userToken = null;
        teams=null;
        window.teams=null;
        window.userRole=null;
        $rootScope._user = null;
        $rootScope.agentList=undefined;
        // window.location.href = appBaseUrl+'/'
      },
      getUser:function(){
        return  {username:username,email:userEmail,id:userId,teams:teams}
      },
      setAuthToken:function(){
        $http.defaults.headers.common["X-AUTH-TOKEN"] = window.localStorage.getItem("token") || window.sessionStorage.getItem("token");
      }



    }
  }

})();


