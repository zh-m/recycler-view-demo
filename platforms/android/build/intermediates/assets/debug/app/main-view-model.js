"use strict";
var observable = require("data/observable");
var observable_array_1 = require("data/observable-array");
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);
        this._items = this.getPersons();
    }
    Object.defineProperty(MainViewModel.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            if (this._items !== value) {
                this._items = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    MainViewModel.prototype.getPersons = function () {
        var data = new observable_array_1.ObservableArray();
        for (var i = 0; i < 10; i++) {
            if (i % 2 == 0) {
                data.push(new Person(i, "John Doe ", false));
            }
            else {
                data.push(new Person(i, "Jessica Donovan", true));
            }
        }
        return data;
    };
    return MainViewModel;
}(observable.Observable));
exports.MainViewModel = MainViewModel;
var Person = (function () {
    function Person(age, name, isFemale) {
        this.age = age;
        this.name = name;
        this.isFemale = isFemale;
    }
    return Person;
}());
exports.Person = Person;
//# sourceMappingURL=main-view-model.js.map