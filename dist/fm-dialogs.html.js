angular.module('fmDialogs').run(['$templateCache', function($templateCache) {
  $templateCache.put("alert.html",
    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"vm.close()\">&times;</button><h4 class=\"modal-title\">{{vm.title}}</h4></div><div class=\"modal-body\"><p>{{vm.body}}</p></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.close()\">Close</button></div>");
  $templateCache.put("confirm.html",
    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"vm.cancel()\">&times;</button><h4 class=\"modal-title\">{{vm.title}}</h4></div><div class=\"modal-body\"><p>{{vm.body}}</p></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.confirm()\">Confirm</button> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.cancel()\">Cancel</button></div>");
  $templateCache.put("error.html",
    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"vm.close()\">&times;</button><h4 class=\"modal-title\">{{vm.title}}</h4></div><div class=\"modal-body\"><p>{{vm.body}}</p><pre>{{vm.error.message}}</pre></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.close()\">Close</button></div>");
  $templateCache.put("notify.html",
    "<div class=\"modal-header dialog-header-notify\"><button type=\"button\" class=\"close\" ng-click=\"close()\" class=\"pull-right\">&times;</button><h4 class=\"modal-title text-info\"><span class=\"glyphicon glyphicon-info-sign\"></span> startSym header endSym</h4></div><div class=\"modal-body text-info\" ng-bind-html=\"msg\"></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-primary\" ng-click=\"close()\">startSym defaultStrings.ok endSym</button></div>");
  $templateCache.put("wait.html",
    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"vm.close()\" ng-show=\"vm.options.finished && !vm.options.autoClose\">&times;</button><h4 class=\"modal-title\">{{vm.title}}</h4></div><div class=\"modal-body\"><p>{{vm.body}}</p><uib-progressbar value=\"vm.options.progress\" animate=\"true\" ng-show=\"vm.hasProgress\"></uib-progressbar><uib-progressbar class=\"progress-striped active\" ng-hide=\"vm.hasProgress\"></uib-progressbar></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.abort()\" ng-show=\"!vm.options.finished\">Abort</button> <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.close()\" ng-show=\"vm.options.finished && !vm.options.autoClose\">Close</button></div>");
}]);
