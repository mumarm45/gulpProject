/**
 * Created by Umar on 12/31/14.
 */

(function(){
  'use strict';
angular
  .module("app.auth")
    .factory('PermissionService',PermissionService);

function PermissionService($rootScope){
  var permissionList ;
  var isAuthAction = function (userToken, reqToken) {
    if (angular.lowercase(userToken) == angular.lowercase( reqToken) || userToken=="*")
      return true;
    else
      return false;
  }
  return {
    hasPermission:function(permission){
      if($rootScope._user == null || $rootScope._user == undefined){
        return true;
      }
      else{
        var permissionToken = permission.split(":");
        if(permissionToken.length > 1){
          var userID = 0;
          var controller = permissionToken[0].trim();
          var action = permissionToken[1].trim();
          if(permissionToken.length > 2)
            userID = permissionToken[2];
          var result = false;
          if($rootScope._user.userPermissions == null || $rootScope._user.userPermissions == undefined){
            return true;
          }
          else{
            permissionList = $rootScope._user.userPermissions.split(";");
            _.forEach(permissionList,function(expression){
              var inExpressionPer = expression.split(":");
              var expController = inExpressionPer[0].trim();
              var expAction = inExpressionPer[1].trim();
              var expUserId = 0;
              if(inExpressionPer.length > 2)
                expUserId = inExpressionPer[2].trim();
              var expActionSeparator =  expAction.split(",");
              _.forEach(expActionSeparator,function(exp){
                if(isAuthAction(expController,controller))
                  if(isAuthAction(exp,action))
                  {
                    if(isAuthAction(expUserId,userID)) {
                      result = true;
                      return;
                    }
                  }
              })
            });
          }
        }
        return result;
      }
    }
  }
}
})();
