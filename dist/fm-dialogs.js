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
	ConfirmController.$inject = ["$uibModalInstance", "body", "title"];
	angular.module( "fmDialogs", [ "ui.bootstrap" ] );

	angular.module( "fmDialogs" )
		.provider( "fmDialogs", DialogsProvider )
		.controller( "fmAlertController", AlertController )
		.controller( "fmConfirmController", ConfirmController );

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

		DialogsService.prototype.confirm = function DialogsService$confirm( body, title ) {
			var modalInstance = this.$uibModal.open( {
				templateUrl      : "confirm.html",
				controller       : "fmConfirmController",
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

	AlertController.prototype.close = function AlertController$close() {
		this.$uibModalInstance.close();
	};

	function ConfirmController( $uibModalInstance, body, title ) {
		this.$uibModalInstance = $uibModalInstance;
		this.body              = body;
		this.title             = title;
	}

	ConfirmController.prototype.cancel = function ConfirmController$cancel() {
		this.$uibModalInstance.dismiss();
	};

	ConfirmController.prototype.confirm = function ConfirmController$confirm() {
		this.$uibModalInstance.close();
	};

	function resolver( argument ) {
		return function resolveWithArgument() {
			return argument;
		};
	}
})();
