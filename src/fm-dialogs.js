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

	angular.module( "fmDialogs", [ "ui.bootstrap" ] );

	angular.module( "fmDialogs" )
		.provider( "fmDialogs", DialogsProvider )
		.controller( "fmAlertController", AlertController )
		.controller( "fmConfirmController", ConfirmController )
		.controller( "fmErrorController", ErrorController )
		.controller( "fmWaitController", WaitController )
		.value( "fmDialogsStrings", DialogStrings );

	function DialogsProvider() {
		var self = this;

		var serviceInstance;

		self.$get = function DialogsProvider$$get( $uibModal ) {
			if( !serviceInstance ) {
				serviceInstance = new DialogsService( $uibModal );
			}

			return serviceInstance;
		};

		self.translate = function DialogsProvider$translate() {

		};

		function DialogsService( $uibModal ) {
			this.$uibModal = $uibModal;
		}

		DialogsService.prototype.alert = function DialogsService$alert( body, title ) {
			var modalInstance = this.$uibModal.open( getModalDescription( "alert.html", "fmAlertController", {
					body  : resolver( body ),
					title : resolver( title )
				}
			) );

			modalInstance.result.modal = modalInstance;

			return modalInstance.result;
		};

		DialogsService.prototype.confirm = function DialogsService$confirm( body, title ) {
			var modalInstance = this.$uibModal.open( getModalDescription( "confirm.html", "fmConfirmController", {
					body  : resolver( body ),
					title : resolver( title )
				}
			) );

			modalInstance.result.modal = modalInstance;

			return modalInstance.result;
		};

		DialogsService.prototype.error = function DialogsService$error( error, body, title ) {
			var modalInstance = this.$uibModal.open( getModalDescription( "error.html", "fmErrorController", {
					error : resolver( error ),
					body  : resolver( body ),
					title : resolver( title )
				}
			) );

			modalInstance.result.modal = modalInstance;

			return modalInstance.result;
		};

		DialogsService.prototype.notify = DialogsService.prototype.alert;

		DialogsService.prototype.wait = function DialogsService$wait( body, title, options ) {
			var modalInstance = this.$uibModal.open( getModalDescription( "wait.html", "fmWaitController", {
					body    : resolver( body ),
					title   : resolver( title ),
					options : resolver( options )
				}
			) );

			modalInstance.result.modal = modalInstance;

			return modalInstance.result;
		};
	}

	function getModalDescription( template, controller, resolve ) {
		return {
			templateUrl      : template,
			controller       : controller,
			controllerAs     : "vm",
			bindToController : true,
			backdrop         : "static",
			resolve          : resolve
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

	function ErrorController( $uibModalInstance, body, title, error ) {
		this.$uibModalInstance = $uibModalInstance;
		this.body              = body;
		this.title             = title;
		this.error             = error;
	}

	ErrorController.prototype.close = function ErrorController$close() {
		this.$uibModalInstance.close();
	};

	function WaitController( $uibModalInstance, $scope, body, title, options ) {
		this.$uibModalInstance = $uibModalInstance;
		this.body              = body;
		this.title             = title;
		this.options           = options;
		this.hasProgress       = options.progress || options.progress === 0;

		$scope.$watch( "vm.options.finished", function onFinished( isFinished ) {
			if( isFinished && options.autoClose ) {
				$uibModalInstance.close();
			}
		} );
	}

	WaitController.prototype.abort = function WaitController$abort() {
		this.$uibModalInstance.dismiss();
	};

	WaitController.prototype.close = function WaitController$close() {
		this.$uibModalInstance.close();
	};

	function resolver( argument ) {
		return function resolveWithArgument() {
			return argument;
		};
	}

	var DialogStrings = {
		error               : "Error",
		errorMessage        : "An unknown error has occurred.",
		close               : "Close",
		pleaseWait          : "Please Wait",
		pleaseWaitEllipsis  : "Please Wait…",
		pleaseWaitMessage   : "Waiting on operation to complete.",
		percentComplete     : "% Complete",
		notification        : "Notification",
		notificationMessage : "Unknown application notification.",
		confirmation        : "Confirmation",
		confirmationMessage : "Confirmation required.",
		ok                  : "OK",
		yes                 : "Yes",
		no                  : "No"
	}
})();
