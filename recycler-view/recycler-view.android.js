"use strict";
var common = require("./recycler-view-common");
var stackLayout = require("ui/layouts/stack-layout");
var textViewModule = require("ui/text-view");
var builder = require('ui/builder');
require("utils/module-merge").merge(common, module.exports);
var RecyclerView = (function (_super) {
    __extends(RecyclerView, _super);
    function RecyclerView() {
        _super.apply(this, arguments);
    }
    RecyclerView.prototype._createUI = function () {
        this._android = new android.support.v7.widget.RecyclerView(this._context);
        var layoutManager = new android.support.v7.widget.LinearLayoutManager(this._context);
        this._android.setLayoutManager(layoutManager);
        this._android.setHasFixedSize(true);
        this._adapter = new RecyclerViewAdapter(this);
        this._android.setAdapter(this._adapter);
        this.refresh();
    };
    Object.defineProperty(RecyclerView.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RecyclerView.prototype.refresh = function () {
        if (!this._android || !this._android.getAdapter()) {
            return;
        }
        if (this._android && this._adapter) {
            this._adapter.notifyDataSetChanged();
        }
    };
    RecyclerView.prototype.getItem = function (index) {
        return this.items[index];
    };
    RecyclerView.prototype.getContainerForItem = function () {
        var container = this.itemTemplate ? builder.parse(this.itemTemplate) : this.getDefaultContainerForItem();
        return container;
    };
    RecyclerView.prototype.getDefaultContainerForItem = function () {
        var textView = new textViewModule.TextView();
        textView.bind({
            targetProperty: "text",
            sourceProperty: "$value"
        });
        return textView;
    };
    return RecyclerView;
}(common.RecyclerView));
exports.RecyclerView = RecyclerView;
var ItemViewHolder = (function (_super) {
    __extends(ItemViewHolder, _super);
    function ItemViewHolder(view) {
        _super.call(this, view.android);
        this._view = view;
        return global.__native(this);
    }
    Object.defineProperty(ItemViewHolder.prototype, "view", {
        get: function () {
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    return ItemViewHolder;
}(android.support.v7.widget.RecyclerView.ViewHolder));
var RecyclerViewAdapter = (function (_super) {
    __extends(RecyclerViewAdapter, _super);
    function RecyclerViewAdapter(recyclerView) {
        _super.call(this);
        this._recyclerView = recyclerView;
        return global.__native(this);
    }
    RecyclerViewAdapter.prototype.getItemCount = function () {
        if (this._recyclerView.items) {
            return this._recyclerView.items.length;
        }
        return 0;
    };
    RecyclerViewAdapter.prototype.onCreateViewHolder = function (parent, viewType) {
        var view = this._recyclerView.getContainerForItem();
        var viewHolder = new ItemViewHolder(view);
        return viewHolder;
    };
    RecyclerViewAdapter.prototype.onBindViewHolder = function (holder, position) {
        holder.view.bindingContext = this._recyclerView.getItem(position);
    };
    return RecyclerViewAdapter;
}(android.support.v7.widget.RecyclerView.Adapter));
//# sourceMappingURL=recycler-view.android.js.map