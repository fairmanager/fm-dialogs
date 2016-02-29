/**
 * Copyright (C) 2014-2015, HARTWIG Communication & Events GmbH & Co. KG
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * Created: 2016-02-25 21:37
 *
 * @author Oliver Salzburg <oliver.salzburg@gmail.com>
 * @copyright Copyright (C) 2014-2016, HARTWIG Communication & Events GmbH & Co. KG
 * @license http://opensource.org/licenses/mit-license.php MIT License
 */

(function() {
	"use strict";

	/* globals angular */

	AlertController.$inject = ["$uibModalInstance", "body", "title"];
	angular.module( "fmDialogs", [ "ui.bootstrap" ] );

	angular.module( "fmDialogs" )
		.provider( "fmDialogs", DialogsProvider )
		.controller( "fmAlertController", AlertController );

	function DialogsProvider() {
		var self = this;

		var serviceInstance;

		self.$get = ["$uibModal", function fmDialogsProvider$$get( $uibModal ) {
			if( !serviceInstance ) {
				serviceInstance = new DialogsService( $uibModal );
			}

			return serviceInstance;
		}];

		function DialogsService( $uibModal ) {
			this.$uibModal = $uibModal;
		}

		DialogsService.prototype.alert = function DialogsService$alert( body, title ) {
			var modalInstance = this.$uibModal.open( {
				templateUrl      : "alert.html",
				controller       : "fmAlertController",
				controllerAs     : "vm",
				bindToController : true,
				backdrop         : "static",
				resolve          : {
					body  : resolver( body ),
					title : resolver( title )
				}
			} );

			modalInstance.result.modal = modalInstance;

			return modalInstance.result;
		};
	}

	function AlertController( $uibModalInstance, body, title ) {
		this.$uibModalInstance = $uibModalInstance;
		this.body              = body;
		this.title             = title;
	}

	AlertController.prototype.close = function AlertController$cancel() {
		this.$uibModalInstance.close();
	};

	function resolver( argument ) {
		return function resolveWithArgument() {
			return argument;
		};
	}
})();

angular.module('fmDialogs').run(['$templateCache', function($templateCache) {
  $templateCache.put("alert.html",
    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"vm.close()\">×</button><h4 class=\"modal-title\">{{vm.title}}</h4></div><div class=\"modal-body\"><p>{{vm.body}}</p></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.close()\">Close</button></div>");
  $templateCache.put("confirm.html",
    "<div class=\"modal-header dialog-header-confirm\"><button type=\"button\" class=\"close\" ng-click=\"no()\">&times;</button><h4 class=\"modal-title\"><span class=\"glyphicon glyphicon-check\"></span> startSym header endSym</h4></div><div class=\"modal-body\" ng-bind-html=\"msg\"></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"yes()\">startSym defaultStrings.yes endSym</button> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"no()\">startSym defaultStrings.no endSym</button></div>");
  $templateCache.put("error.html",
    "<div class=\"modal-header dialog-header-error\"><button type=\"button\" class=\"close\" ng-click=\"close()\">&times;</button><h4 class=\"modal-title text-danger\"><span class=\"glyphicon glyphicon-warning-sign\"></span> <span ng-bind-html=\"header\"></span></h4></div><div class=\"modal-body text-danger\" ng-bind-html=\"msg\"></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"close()\">startSym defaultStrings.close endSym</button></div>");
  $templateCache.put("notify.html",
    "<div class=\"modal-header dialog-header-notify\"><button type=\"button\" class=\"close\" ng-click=\"close()\" class=\"pull-right\">&times;</button><h4 class=\"modal-title text-info\"><span class=\"glyphicon glyphicon-info-sign\"></span> startSym header endSym</h4></div><div class=\"modal-body text-info\" ng-bind-html=\"msg\"></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-primary\" ng-click=\"close()\">startSym defaultStrings.ok endSym</button></div>");
  $templateCache.put("wait.html",
    "<div class=\"modal-header dialog-header-wait\"><h4 class=\"modal-title\"><span class=\"glyphicon glyphicon-time\"></span> startSym defaultStrings.pleaseWait endSym</h4></div><div class=\"modal-body\"><p ng-bind-html=\"msg\"></p><div class=\"progress progress-striped active\"><div class=\"progress-bar progress-bar-info\" ng-style=\"getProgress()\"></div><span class=\"sr-only\">startSym progress endSym \" + startSym + \"defaultStrings.percentComplete endSym</span></div></div>");
}]);
