/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var bnetbase = 'https://www.bungie.net/Platform';
            var apiKey = 'a61931b6a6e1482396c1ea8ba3f58328';
            
            
             $scope.getAccessTokensFromCode = function() {
			$scope.showAccessTokenRequest = true;
			return $http({
				method: 'POST',
				url: bnetBase+'/App/GetAccessTokensFromCode/',
				headers: {
					'X-API-Key': $scope.apiKey ? $scope.apiKey : apiKey,
					'Content-Type': 'application/json; charset=UTF-8;'
				},
				data: JSON.stringify({
					code: $scope.authCode
				}),
				transformRequest: false

			}).then(function(response) {
				var data = response.data;
				console.log('GetAccessTokensFromCode', data);

				$scope.accessTokensResponse = JSON.stringify(data, null, 4);

				if (data.ErrorCode == 1) {
					var time = new Date().getTime();
					tokens.accessToken = data.Response.accessToken.value;
					tokens.accessTokenReadyDate = time+data.Response.accessToken.readyin*1000;
					tokens.accessTokenExpiryDate = time+data.Response.accessToken.expires*1000;
					tokens.refreshToken = data.Response.refreshToken.value;
					tokens.refreshTokenReadyDate = time+data.Response.refreshToken.readyin*1000;
					tokens.refreshTokenExpiryDate = time+data.Response.refreshToken.expires*1000;
					tokens.scope = data.Response.scope;

					localStorage.setItem('tokens', JSON.stringify(tokens));

					//$scope.test();
				}
				return data.ErrorCode == 1;
			});
		};

		var tokens = {
			accessToken: null,
			accessTokenReadyDate: 0,
			accessTokenExpiryDate: 0,
			refreshToken: null,
			refreshTokenReadyDate: 0,
			refreshTokenExpiryDate: 0,
			scope: 0
		};

		var savedTokens = localStorage.getItem('tokens');
		if (savedTokens) tokens = JSON.parse(savedTokens);

		console.log('Tokens', tokens);

		window.addEventListener('message', function(e) {
			//console.log('Message', e);
			if (e.data.message === "getResult" && !$scope.authWindow && $scope.authCode !== null) {
				console.log('GetResult');
				$scope.authWindow = true;
				$scope.getAccessTokensFromCode().then(function() {
					window.opener.location.reload();
					window.close();
				});
			}
		});

		$scope.accessTokensResponse = null;

		$scope.tokens = tokens;

		function timeRemaining(time) {
			var now = new Date().getTime();
			var diff = time-now;
			var days = Math.floor(diff/24/60/60/1000);
			var hours = Math.floor((diff-(days*24*60*60*1000))/60/60/1000);
			var mins = Math.floor((diff-((days*24+hours)*60*60*1000))/60/1000);
			var secs = Math.floor((diff-(((days*24+hours)*60+mins)*60*1000))/1000);
			return  (days ? days+'d ' : '')+(days || hours ? hours+'h ' : '')+mins+'m '+secs+'s';
		}

		function isExpired(time) {
			var now = new Date().getTime();
			var diff = time-now;
			return diff < 0;
		}

		$scope.accessTokenTime = '';
		$scope.refreshTokenTime = '';

		function renderTime() {
			if (tokens.accessToken) {
				$scope.accessTokenTime = isExpired(tokens.accessTokenExpiryDate) ? 'is expired' : 'will expire in <strong>'+timeRemaining(tokens.accessTokenExpiryDate)+'</strong>';
				$scope.refreshTokenTime = isExpired(tokens.refreshTokenExpiryDate) ? 'is expired' : 'will expire in <strong>'+timeRemaining(tokens.refreshTokenExpiryDate)+'</strong>';
			}
		}

		$interval(renderTime, 500);
		renderTime();

		$scope.test = function() {
			$scope.testResponse = null;

			$scope.isRequesting = true;
			$http({
				method: 'GET',
				url: bnetBase+'/User/GetCurrentBungieNetUser/',
				headers: {
					'X-API-Key': $scope.apiKey ? $scope.apiKey : apiKey,
					'Authorization': 'Bearer '+tokens.accessToken
				}
			}).then(function(response) {
				$scope.isRequesting = false;
				var data = response.data;
				console.log('GetCurrentBungieNetUser', data);

				//$scope.test.response = response;//JSON.stringify(data, null, 4);

				if (data.ErrorCode == 1) {
					$scope.username = data.Response.displayName;
				} else {
					$scope.username = null;
				}
			});
		};

		if (tokens.accessToken && !isExpired(tokens.accessTokenExpiryDate)) $scope.test();

		$scope.getAccessTokensFromRefreshToken = function() {
			$scope.isRequestingToken = true;
			$http({
				method: 'POST',
				url: bnetBase+'/App/GetAccessTokensFromRefreshToken/',
				headers: {
					'X-API-Key': $scope.apiKey ? $scope.apiKey : apiKey
				},
				data: JSON.stringify({
					refreshToken: tokens.refreshToken
				}),
				transformRequest: false
			}).then(function(response) {
				$scope.isRequestingToken = false;
				var data = response.data;
				console.log('GetAccessTokensFromRefreshToken', data);

				$scope.test.response = response;//JSON.stringify(data, null, 4);

				if (data.ErrorCode == 1) {
					var time = new Date().getTime();
					tokens.accessToken = data.Response.accessToken.value;
					tokens.accessTokenReadyDate = time+data.Response.accessToken.readyin*1000;
					tokens.accessTokenExpiryDate = time+data.Response.accessToken.expires*1000;
					tokens.refreshToken = data.Response.refreshToken.value;
					tokens.refreshTokenReadyDate = time+data.Response.refreshToken.readyin*1000;
					tokens.refreshTokenExpiryDate = time+data.Response.refreshToken.expires*1000;
					tokens.scope = data.Response.scope;

					localStorage.setItem('tokens', JSON.stringify(tokens));
				}
			});
		};

