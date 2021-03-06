define(["require", "exports", "angular"], function (require, exports, angular) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var moduleName = require('feed-mgr/feeds/edit-feed/module-name');
    var directive = function () {
        return {
            restrict: "EA",
            bindToController: {
                processingdttm: '=',
                rowsPerPage: '='
            },
            controllerAs: 'vm',
            scope: {},
            templateUrl: 'js/feed-mgr/feeds/edit-feed/profile-history/profile-valid-results.html',
            controller: "FeedProfileValidResultsController",
            link: function ($scope, element, attrs, controller) {
            }
        };
    };
    var FeedProfileValidResultsController = /** @class */ (function () {
        function FeedProfileValidResultsController($scope, $http, FeedService, RestUrlService, HiveService, Utils, BroadcastService, FattableService) {
            this.$scope = $scope;
            this.$http = $http;
            this.FeedService = FeedService;
            this.RestUrlService = RestUrlService;
            this.HiveService = HiveService;
            this.Utils = Utils;
            this.BroadcastService = BroadcastService;
            this.FattableService = FattableService;
            // define(['angular','feed-mgr/feeds/edit-feed/module-name'], function (angular,moduleName) {
            this.model = this.FeedService.editFeedModel;
            this.loading = false;
            this.limitOptions = [10, 50, 100, 500, 1000];
            this.limit = this.limitOptions[2];
            this.queryResults = null;
            this.getProfileValidation().then(this.setupTable);
        }
        //noinspection JSUnusedGlobalSymbols
        FeedProfileValidResultsController.prototype.onLimitChange = function () {
            this.getProfileValidation().then(this.setupTable);
        };
        ;
        FeedProfileValidResultsController.prototype.getProfileValidation = function () {
            var _this = this;
            this.loading = true;
            var successFn = function (response) {
                var result = _this.queryResults = _this.HiveService.transformResultsToUiGridModel(response);
                _this.headers = result.columns;
                _this.rows = result.rows;
                _this.loading = false;
                _this.BroadcastService.notify('PROFILE_TAB_DATA_LOADED', 'valid');
            };
            var errorFn = function (err) {
                _this.loading = false;
            };
            var promise = this.$http.get(this.RestUrlService.FEED_PROFILE_VALID_RESULTS_URL(this.model.id), { params: {
                    'processingdttm': this.processingdttm,
                    'limit': this.limit
                }
            });
            promise.then(successFn, errorFn);
            return promise;
        };
        FeedProfileValidResultsController.prototype.setupTable = function () {
            this.FattableService.setupTable({
                tableContainerId: "validProfile",
                headers: this.headers,
                rows: this.rows
            });
        };
        return FeedProfileValidResultsController;
    }());
    exports.FeedProfileValidResultsController = FeedProfileValidResultsController;
    angular.module(moduleName).controller('FeedProfileValidResultsController', ["$scope", "$http", "FeedService", "RestUrlService", "HiveService", "Utils", "BroadcastService", "FattableService", FeedProfileValidResultsController]);
    angular.module(moduleName).directive('thinkbigFeedProfileValid', directive);
});
//# sourceMappingURL=profile-valid.js.map