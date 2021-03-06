var pageCommon = require("./page-common");
var enums = require("ui/enums");
var actionBar = require("ui/action-bar");
var gridLayout = require("ui/layouts/grid-layout");
global.moduleMerge(pageCommon, exports);
var trace;
function ensureTrace() {
    if (!trace) {
        trace = require("trace");
    }
}
var color;
function ensureColor() {
    if (!color) {
        color = require("color");
    }
}
exports.DIALOG_FRAGMENT_TAG = "dialog";
var DialogFragmentClass;
function ensureDialogFragmentClass() {
    if (DialogFragmentClass) {
        return;
    }
    var DialogFragmentClassInner = (function (_super) {
        __extends(DialogFragmentClassInner, _super);
        function DialogFragmentClassInner(owner, fullscreen, dismissCallback) {
            _super.call(this);
            this._owner = owner;
            this._fullscreen = fullscreen;
            this._dismissCallback = dismissCallback;
            return global.__native(this);
        }
        DialogFragmentClassInner.prototype.onCreateDialog = function (savedInstanceState) {
            var dialog = new android.app.Dialog(this._owner._context);
            dialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
            this._owner.horizontalAlignment = this._fullscreen ? enums.HorizontalAlignment.stretch : enums.HorizontalAlignment.center;
            this._owner.verticalAlignment = this._fullscreen ? enums.VerticalAlignment.stretch : enums.VerticalAlignment.center;
            this._owner.actionBarHidden = true;
            dialog.setContentView(this._owner._nativeView, this._owner._nativeView.getLayoutParams());
            var window = dialog.getWindow();
            window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
            if (this._fullscreen) {
                window.setLayout(android.view.ViewGroup.LayoutParams.FILL_PARENT, android.view.ViewGroup.LayoutParams.FILL_PARENT);
            }
            return dialog;
        };
        DialogFragmentClassInner.prototype.onDismiss = function () {
            if (typeof this._dismissCallback === "function") {
                this._dismissCallback();
            }
        };
        return DialogFragmentClassInner;
    }(android.app.DialogFragment));
    ;
    DialogFragmentClass = DialogFragmentClassInner;
}
var Page = (function (_super) {
    __extends(Page, _super);
    function Page(options) {
        _super.call(this, options);
        this._isBackNavigation = false;
    }
    Object.defineProperty(Page.prototype, "android", {
        get: function () {
            return this._grid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "_nativeView", {
        get: function () {
            return this._grid;
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype._createUI = function () {
        this._grid = new org.nativescript.widgets.GridLayout(this._context);
        this._grid.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.auto));
        this._grid.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.star));
    };
    Page.prototype._addViewToNativeVisualTree = function (child, atIndex) {
        if (this._nativeView && child._nativeView) {
            if (child instanceof actionBar.ActionBar) {
                gridLayout.GridLayout.setRow(child, 0);
                child.horizontalAlignment = enums.HorizontalAlignment.stretch;
                child.verticalAlignment = enums.VerticalAlignment.top;
            }
            else {
                gridLayout.GridLayout.setRow(child, 1);
            }
        }
        return _super.prototype._addViewToNativeVisualTree.call(this, child, atIndex);
    };
    Page.prototype._onDetached = function (force) {
        var skipDetached = !force && this.frame.android.cachePagesOnNavigate && !this._isBackNavigation;
        if (skipDetached) {
            ensureTrace();
            trace.write("Caching " + this, trace.categories.NativeLifecycle);
        }
        else {
            _super.prototype._onDetached.call(this);
        }
    };
    Page.prototype.onNavigatedFrom = function (isBackNavigation) {
        this._isBackNavigation = isBackNavigation;
        _super.prototype.onNavigatedFrom.call(this, isBackNavigation);
    };
    Page.prototype._showNativeModalView = function (parent, context, closeCallback, fullscreen) {
        _super.prototype._showNativeModalView.call(this, parent, context, closeCallback, fullscreen);
        if (!this.backgroundColor) {
            ensureColor();
            this.backgroundColor = new color.Color("White");
        }
        this._onAttached(parent._context);
        this._isAddedToNativeVisualTree = true;
        this.onLoaded();
        ensureDialogFragmentClass();
        var that = this;
        this._dialogFragment = new DialogFragmentClass(this, fullscreen, function () {
            that.closeModal();
        });
        _super.prototype._raiseShowingModallyEvent.call(this);
        this._dialogFragment.show(parent.frame.android.activity.getFragmentManager(), exports.DIALOG_FRAGMENT_TAG);
        _super.prototype._raiseShownModallyEvent.call(this, parent, context, closeCallback);
    };
    Page.prototype._hideNativeModalView = function (parent) {
        this._dialogFragment.dismissAllowingStateLoss();
        this._dialogFragment = null;
        this.onUnloaded();
        this._isAddedToNativeVisualTree = false;
        this._onDetached(true);
        _super.prototype._hideNativeModalView.call(this, parent);
    };
    Page.prototype._updateActionBar = function (hidden) {
        this.actionBar.update();
    };
    return Page;
}(pageCommon.Page));
exports.Page = Page;
