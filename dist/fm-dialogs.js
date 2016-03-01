/**
 * Copyright (C) 2014-2016, HARTWIG Communication & Events GmbH & Co. KG
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

	AlertController.$inject = ["$uibModalInstance", "body", "title", "close"];
	ConfirmController.$inject = ["$uibModalInstance", "body", "title", "confirm", "cancel"];
	ErrorController.$inject = ["$uibModalInstance", "body", "title", "close", "errors"];
	WaitController.$inject = ["$uibModalInstance", "$scope", "body", "title", "close", "abort", "options"];
	htmlFilterProvider.$inject = ["$sce"];
	angular.module( "fmDialogs", [ "fmErrorAnalyzer", "ui.bootstrap" ] );

	angular.module( "fmDialogs" )
		.provider( "fmDialogs", DialogsProvider )
		.controller( "fmAlertController", AlertController )
		.controller( "fmConfirmController", ConfirmController )
		.controller( "fmErrorController", ErrorController )
		.controller( "fmWaitController", WaitController )
		.filter( "fmHtml", htmlFilterProvider )
		.value( "fmDialogsStrings", getDialogStrings() );

	function DialogsProvider() {
		var self = this;

		var serviceInstance;

		/* @ngInject */
		self.$get = ["$uibModal", "fmDialogsStrings", "fmErrorAnalyzer", function DialogsProvider$$get( $uibModal, fmDialogsStrings, fmErrorAnalyzer ) {
			if( !serviceInstance ) {
				serviceInstance = new DialogsService( $uibModal, fmDialogsStrings, fmErrorAnalyzer );
			}

			return serviceInstance;
		}];
		self.$get.$inject = ["$uibModal", "fmDialogsStrings", "fmErrorAnalyzer"];

		self.translate = function DialogsProvider$translate() {

		};

		function DialogsService( $uibModal, fmDialogsStrings, fmErrorAnalyzer ) {
			this.$uibModal = $uibModal;
			this.strings   = fmDialogsStrings;
			this.analyzer  = fmErrorAnalyzer;
		}

		DialogsService.prototype.alert = function DialogsService$alert( body, title, options ) {
			if( typeof title === "object" ) {
				options = title;
				title   = undefined;
			}
			options = options || {};

			var modalInstance = this.$uibModal.open( getModalDescription( "alert.html", "fmAlertController", {
					body  : resolver( body ),
					title : resolver( title ),
					close : resolver( options.close || this.strings.close )
				}
			) );

			modalInstance.result.modal = modalInstance;

			return modalInstance.result;
		};

		DialogsService.prototype.confirm = function DialogsService$confirm( body, title, options ) {
			if( typeof title === "object" ) {
				options = title;
				title   = undefined;
			}
			options = options || {};

			var modalInstance = this.$uibModal.open( getModalDescription( "confirm.html", "fmConfirmController", {
					body    : resolver( body ),
					title   : resolver( title ),
					confirm : resolver( options.confirm || this.strings.confirm ),
					cancel  : resolver( options.cancel || this.strings.cancel )
				}
			) );

			modalInstance.result.modal = modalInstance;

			return modalInstance.result;
		};

		DialogsService.prototype.error = function DialogsService$error( error, body, title, options ) {
			if( typeof title === "object" ) {
				options = title;
				title   = undefined;
			}
			options = options || {};

			var errors = this.analyzer.analyze( error );

			var modalInstance = this.$uibModal.open( getModalDescription( "error.html", "fmErrorController", {
					errors : resolver( errors ),
					body   : resolver( body || this.strings.errorMessage ),
					title  : resolver( title ),
					close  : resolver( options.close || this.strings.close )
				}
			) );

			modalInstance.result.modal = modalInstance;

			return modalInstance.result;
		};

		DialogsService.prototype.notify = DialogsService.prototype.alert;

		DialogsService.prototype.wait = function DialogsService$wait( body, title, options ) {
			if( typeof title === "object" ) {
				options = title;
				title   = undefined;
			}
			options = options || {};

			var modalInstance = this.$uibModal.open( getModalDescription( "wait.html", "fmWaitController", {
					body    : resolver( body || this.strings.pleaseWaitMessage ),
					title   : resolver( title ),
					close   : resolver( options.close || this.strings.close ),
					abort   : resolver( options.abort || this.strings.abort ),
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

	/* @ngInject */
	function AlertController( $uibModalInstance, body, title, close ) {
		this.$uibModalInstance = $uibModalInstance;
		this.body              = body;
		this.title             = title;
		this.closeLabel        = close;
	}

	AlertController.prototype.close = function AlertController$close() {
		this.$uibModalInstance.close();
	};

	/* @ngInject */
	function ConfirmController( $uibModalInstance, body, title, confirm, cancel ) {
		this.$uibModalInstance = $uibModalInstance;
		this.body              = body;
		this.title             = title;
		this.confirmLabel      = confirm;
		this.cancelLabel       = cancel;
	}

	ConfirmController.prototype.cancel = function ConfirmController$cancel() {
		this.$uibModalInstance.dismiss();
	};

	ConfirmController.prototype.confirm = function ConfirmController$confirm() {
		this.$uibModalInstance.close();
	};

	/* @ngInject */
	function ErrorController( $uibModalInstance, body, title, close, errors ) {
		this.$uibModalInstance = $uibModalInstance;
		this.body              = body;
		this.title             = title;
		this.errors            = errors;
		this.closeLabel        = close;
	}

	ErrorController.prototype.close = function ErrorController$close() {
		this.$uibModalInstance.close();
	};

	/* @ngInject */
	function WaitController( $uibModalInstance, $scope, body, title, close, abort, options ) {
		var self = this;

		self.$uibModalInstance = $uibModalInstance;
		self.body              = body;
		self.title             = title;
		self.closeLabel        = close;
		self.abortLabel        = abort;
		self.options           = options;
		self.hasProgress       = options.progress || options.progress === 0;

		$scope.$watch( "vm.options.finished", function onFinished( isFinished ) {
			if( isFinished && options.autoClose ) {
				$uibModalInstance.close();
			}
		} );

		$scope.$watch( "vm.options.status", function onStatusUpdated( statusText ) {
			if( statusText ) {
				self.body = statusText;
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

	/* @ngInject */
	function htmlFilterProvider( $sce ) {
		return function htmlFilter( input ) {
			return $sce.trustAsHtml( input );
		};
	}

	function getDialogStrings() {
		return {
			errorMessage      : "An error has occurred.",
			pleaseWaitMessage : "Waiting on operation to complete.",
			close             : "Close",
			abort             : "Abort",
			confirm           : "Confirm",
			cancel            : "Cancel"
		};
	}
})();
