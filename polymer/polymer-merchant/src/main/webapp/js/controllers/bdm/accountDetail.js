'use strict';

/* Controllers */

  // controller
app.controller('AccountDetailCtrl', ['$scope','$rootScope', '$http','$state', function($scope,$rootScope,$http,$state) {
    if ($scope.condition==undefined){
    	$scope.condition = {};
    }
    if ($scope.entity==undefined){
    	$scope.entity = {};
    }
	if ($scope.currentPage==undefined){
		$scope.currentPage = 0;
	}
	if ($scope.totalPage==undefined){
		$scope.totalPage = -1;
	}
	if ($scope.totalRecord==undefined){
		$scope.totalRecord = -1;
	}
	if ($scope.isNeedRefreshList==undefined){
		$scope.isNeedRefreshList = false;
	}
	if ($scope.list==undefined){
		$scope.list = [];
	}
	//$scope.switchPages = [{label:'1',num:1},{label:'2',num:2},{label:'3',num:3},{label:'4',num:4},{label:'5',num:5},{label:'>>',num:6}];
	
	
	$scope.query = function(pageNum) {
		if (pageNum==undefined)$scope.currentPage = 1;
		else $scope.currentPage = pageNum;
		$scope.list = [];
		
		$scope.condition.currentPage = $scope.currentPage;
		var param = $.param($scope.condition);
		$http.post('accountDetail/list', param,{headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}})
	      .then(function(response) {
	    	  if (response.data.status=='000000'){//操作成功
	    		  $scope.list = response.data.list;
	    		  $scope.currentPage = response.data.currentPage;
	    		  $scope.totalPage = response.data.totalPage;
	    		  $scope.totalRecord = response.data.totalRecord;	  
	    		  var start = 0;
				  var end = 0;
				  var size = 3;
				  if ($scope.currentPage<=3)start = 1;
				  else start = parseInt($scope.currentPage)-3;
				  if (($scope.totalPage-$scope.currentPage)<=3){
					  end = $scope.totalPage
				  } else end = parseInt($scope.currentPage)+3;
				  $scope.switchPages=[];
				  
				  for (var i=start;i<=end;i++){
					  $scope.switchPages.push({label:i+'',num:i});
				  }	    			
	    	  }else{//操作失败
	    		  $rootScope.authError = response.data.message;
	    		  $state.go("login");
	    	  }
	      },function(x) {
	        $scope.authError = x;
	      });
    };
    
}]);
