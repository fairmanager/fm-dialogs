angular.module('fmDialogs').run(['$templateCache', function($templateCache) {
  $templateCache.put("alert.html",
    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"vm.close()\">&times;</button><h4 class=\"modal-title\">{{vm.title}}</h4></div><div class=\"modal-body\"><p>{{vm.body}}</p></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.close()\">Close</button></div>");
  $templateCache.put("confirm.html",
    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"vm.cancel()\">&times;</button><h4 class=\"modal-title\">{{vm.title}}</h4></div><div class=\"modal-body\"><p>{{vm.body}}</p></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Cancel</button> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.confirm()\">Confirm</button></div>");
  $templateCache.put("notify.html",
    "<div class=\"modal-header dialog-header-notify\"><button type=\"button\" class=\"close\" ng-click=\"close()\" class=\"pull-right\">&times;</button><h4 class=\"modal-title text-info\"><span class=\"glyphicon glyphicon-info-sign\"></span> startSym header endSym</h4></div><div class=\"modal-body text-info\" ng-bind-html=\"msg\"></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-primary\" ng-click=\"close()\">startSym defaultStrings.ok endSym</button></div>");
  $templateCache.put("wait.html",
    "<div class=\"modal-header\"><h4 class=\"modal-title\">{{vm.title}}</h4></div><div class=\"modal-body\"><p>{{vm.body}}</p><uib-progressbar value=\"vm.options.progress\" animate=\"true\" ng-show=\"vm.options.progress || vm.options.progress === 0\"></uib-progressbar><uib-progressbar class=\"progress-striped active\" ng-hide=\"vm.options.progress && vm.options.progress !== 0\"></uib-progressbar></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.abort()\">Abort</button></div>");
}]);
