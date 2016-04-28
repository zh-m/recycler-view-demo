declare module "number-picker" {
    import view = require("ui/core/view");
    import dependencyObservable = require("ui/core/dependency-observable");

    export class NumberPicker extends view.View {
        // static (prototype) properties
        public static valueProperty: dependencyObservable.Property;

        // instance properties
        value: number;

        android: android.widget.NumberPicker;
    }
} 