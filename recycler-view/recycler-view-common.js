"use strict";
var view = require("ui/core/view");
var proxy = require("ui/core/proxy");
var dependencyObservable = require("ui/core/dependency-observable");
var observableArray;
function ensureObservableArray() {
    if (!observableArray) {
        observableArray = require("data/observable-array");
    }
}
var builder;
function ensureBuilder() {
    if (!builder) {
        builder = require("ui/builder");
    }
}
var ITEMS = "items";
var ITEMTEMPLATE = "itemTemplate";
var RECYCLERVIEW = "RecyclerView";
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = "itemTemplate";
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
function onItemsPropertyChanged(data) {
    var recyclerView = data.object;
    recyclerView._onItemsPropertyChanged(data);
}
function onItemTemplatePropertyChanged(data) {
    var recyclerView = data.object;
    recyclerView.refresh();
}
var RecyclerView = (function (_super) {
    __extends(RecyclerView, _super);
    function RecyclerView() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(RecyclerView.prototype, "items", {
        get: function () {
            return this._getValue(RecyclerView.itemsProperty);
        },
        set: function (value) {
            this._setValue(RecyclerView.itemsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecyclerView.prototype, "itemTemplate", {
        get: function () {
            return this._getValue(RecyclerView.itemTemplateProperty);
        },
        set: function (value) {
            this._setValue(RecyclerView.itemTemplateProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RecyclerView.prototype.refresh = function () {
    };
    RecyclerView.prototype._onItemsPropertyChanged = function (data) {
        ensureObservableArray();
        this.refresh();
    };
    RecyclerView.prototype._onItemsChanged = function (args) {
        this.refresh();
    };
    RecyclerView.itemsProperty = new dependencyObservable.Property(ITEMS, RECYCLERVIEW, new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, onItemsPropertyChanged));
    RecyclerView.itemTemplateProperty = new dependencyObservable.Property(ITEMTEMPLATE, RECYCLERVIEW, new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.AffectsLayout, onItemTemplatePropertyChanged));
    return RecyclerView;
}(view.View));
exports.RecyclerView = RecyclerView;
//# sourceMappingURL=recycler-view-common.js.map