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
 * @copyright Copyright (C) 2014-2015, HARTWIG Communication & Events GmbH & Co. KG
 * @license http://opensource.org/licenses/mit-license.php MIT License
 */

(function() {
	"use strict";

	/* globals angular */

	angular.module( "fmDialogs.controllers", [ "ui.bootstrap.modal" ] )

		/**
		 * Error Dialog Controller
		 */
		.controller( "errorDialogCtrl",
			[ "$scope",
			  "$uibModalInstance",
			  "header",
			  "msg",
			  "defaultStrings",
			  function( $scope, $uibModalInstance, header, msg, defaultStrings ) {
				  //-- Variables -----//

				  $scope.header         = (angular.isDefined( header )) ? header : defaultStrings.error;
				  $scope.msg            = (angular.isDefined( msg )) ? msg : defaultStrings.errorMessage;
				  $scope.defaultStrings = defaultStrings;

				  //-- Methods -----//

				  $scope.close = function() {
					  $uibModalInstance.close();
				  }; // end close
			  } ] ) // end ErrorDialogCtrl

		/**
		 * Wait Dialog Controller
		 */
		.controller( "waitDialogCtrl",
			[ "$scope",
			  "$uibModalInstance",
			  "$timeout",
			  "header",
			  "msg",
			  "progress",
			  "defaultStrings",
			  function( $scope, $uibModalInstance, $timeout, header, msg, progress, defaultStrings ) {
				  //-- Variables -----//

				  $scope.header         = (angular.isDefined( header )) ? header : defaultStrings.pleaseWaitEllipsis;
				  $scope.msg            = (angular.isDefined( msg )) ? msg : defaultStrings.pleaseWaitMessage;
				  $scope.progress       = (angular.isDefined( progress )) ? progress : 100;
				  $scope.defaultStrings = defaultStrings;

				  //-- Listeners -----//

				  // Note: used $timeout instead of $scope.$apply() because I was getting a $$nextSibling error

				  // close wait dialog
				  $scope.$on( "fmDialogs.wait.complete", function() {
					  $timeout( function() {
						  $uibModalInstance.close();
					  } );
				  } ); // end on(fmDialogs.wait.complete)

				  // update the dialog's message
				  $scope.$on( "fmDialogs.wait.message", function( evt, args ) {
					  $scope.msg = (angular.isDefined( args.msg )) ? args.msg : $scope.msg;
					  $timeout( function() {
						  $scope.$apply();
					  } );
				  } ); // end on(fmDialogs.wait.message)

				  // update the dialog's progress (bar) and/or message
				  $scope.$on( "fmDialogs.wait.progress", function( evt, args ) {
					  $scope.msg      = (angular.isDefined( args.msg )) ? args.msg : $scope.msg;
					  $scope.progress = (angular.isDefined( args.progress )) ? args.progress : $scope.progress;
					  $timeout( function() {
						  $scope.$apply();
					  } );
				  } ); // end on(fmDialogs.wait.progress)

				  //-- Methods -----//

				  $scope.getProgress = function() {
					  return { "width" : $scope.progress + "%" };
				  }; // end getProgress
			  } ] ) // end WaitDialogCtrl

		/**
		 * Notify Dialog Controller
		 */
		.controller( "notifyDialogCtrl",
			[ "$scope",
			  "$uibModalInstance",
			  "header",
			  "msg",
			  "defaultStrings",
			  function( $scope, $uibModalInstance, header, msg, defaultStrings ) {
				  //-- Variables -----//

				  $scope.header         = (angular.isDefined( header )) ? header : defaultStrings.notification;
				  $scope.msg            = (angular.isDefined( msg )) ? msg : defaultStrings.notificationMessage;
				  $scope.defaultStrings = defaultStrings;

				  //-- Methods -----//

				  $scope.close = function() {
					  $uibModalInstance.close();
				  }; // end close
			  } ] ) // end WaitDialogCtrl

		/**
		 * Confirm Dialog Controller
		 */
		.controller( "confirmDialogCtrl",
			[ "$scope",
			  "$uibModalInstance",
			  "header",
			  "msg",
			  "defaultStrings",
			  function( $scope, $uibModalInstance, header, msg, defaultStrings ) {
				  //-- Variables -----//

				  $scope.header         = (angular.isDefined( header )) ? header : defaultStrings.confirmation;
				  $scope.msg            = (angular.isDefined( msg )) ? msg : defaultStrings.confirmationMessage;
				  $scope.defaultStrings = defaultStrings;

				  //-- Methods -----//

				  $scope.no = function() {
					  $uibModalInstance.dismiss( "no" );
				  }; // end close

				  $scope.yes = function() {
					  $uibModalInstance.close( "yes" );
				  }; // end yes
			  } ] ); // end ConfirmDialogCtrl / fmDialogs.controllers


//== Services ================================================================//

	angular.module( "fmDialogs.services", [ "ui.bootstrap.modal", "fmDialogs.controllers" ] )

		/**
		 * Dialogs Service
		 */
		.factory( "fmDialogs", [ "$uibModal", "defaultStrings", function( $uibModal, defaultStrings ) {
			return {
				error : function( header, msg, isStatic ) {
					return $uibModal.open( {
						templateUrl : "/dialogs/error.html",
						controller  : "errorDialogCtrl",
						backdrop    : (isStatic ? "isStatic" : true),
						keyboard    : (isStatic ? false : true),
						resolve     : {
							header : function() {
								return angular.copy( header );
							},
							msg    : function() {
								return angular.copy( msg );
							}
						}
					} ); // end modal.open
				}, // end error

				wait : function( header, msg, progress, isStatic ) {
					return $uibModal.open( {
						templateUrl : "/dialogs/wait.html",
						controller  : "waitDialogCtrl",
						backdrop    : (isStatic ? "isStatic" : true),
						keyboard    : (isStatic ? false : true),
						resolve     : {
							header   : function() {
								return angular.copy( header );
							},
							msg      : function() {
								return angular.copy( msg );
							},
							progress : function() {
								return angular.copy( progress );
							}
						}
					} ); // end modal.open
				}, // end wait

				notify : function( header, msg, isStatic ) {
					return $uibModal.open( {
						templateUrl : "/dialogs/notify.html",
						controller  : "notifyDialogCtrl",
						backdrop    : (isStatic ? "isStatic" : true),
						keyboard    : (isStatic ? false : true),
						resolve     : {
							header : function() {
								return angular.copy( header );
							},
							msg    : function() {
								return angular.copy( msg );
							}
						}
					} ); // end modal.open
				}, // end notify

				confirm : function( header, msg, isStatic ) {
					return $uibModal.open( {
						templateUrl : "/dialogs/confirm.html",
						controller  : "confirmDialogCtrl",
						backdrop    : (isStatic ? "isStatic" : true),
						keyboard    : (isStatic ? false : true),
						resolve     : {
							header : function() {
								return angular.copy( header );
							},
							msg    : function() {
								return angular.copy( msg );
							}
						}
					} ); // end modal.open
				}, // end confirm

				create : function( url, ctrlr, data, opts ) {
					opts  = angular.isDefined( opts ) ? opts : {};
					var k = (angular.isDefined( opts.keyboard )) ? opts.keyboard : true; // values: true,false
					var b = (angular.isDefined( opts.backdrop )) ? opts.backdrop : true; // values: "isStatic",true,false
					var w = (angular.isDefined( opts.windowClass )) ? opts.windowClass : "dialogs-default"; // additional CSS class(es) to be added to a modal window
					return $uibModal.open( {
						templateUrl : url,
						controller  : ctrlr,
						keyboard    : k,
						backdrop    : b,
						windowClass : w,
						resolve     : {
							data : function() {
								return angular.copy( data );
							}
						}
					} ); // end modal.open
				}, // end create

				translate : function( newStrings ) {
					return angular.extend( defaultStrings, newStrings );
				} // end translate
			};
		} ] ); // end $fmDialogs / fmDialogs.services

	angular.module( "fmDialogs" ).value( "defaultStrings", {
		error               : "Error",
		errorMessage        : "An unknown error has occurred.",
		close               : "Close",
		pleaseWait          : "Please Wait",
		pleaseWaitEllipsis  : "Please Wait...",
		pleaseWaitMessage   : "Waiting on operation to complete.",
		percentComplete     : "% Complete",
		notification        : "Notification",
		notificationMessage : "Unknown application notification.",
		confirmation        : "Confirmation",
		confirmationMessage : "Confirmation required.",
		ok                  : "OK",
		yes                 : "Yes",
		no                  : "No"
	} );
})();
