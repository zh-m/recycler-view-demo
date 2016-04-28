declare module "recycler-view" {
    import view = require("ui/core/view");
    import dependencyObservable = require("ui/core/dependency-observable");
    
    /**
     * Known template names.
     */
    export module knownTemplates {
        /**
         * The ListView item template.
         */
        export var itemTemplate: string;
    }
    
    export class RecyclerView extends view.View {
        /**
         * Defines the items property for a RecyclerView.
         */
        public static itemsProperty: dependencyObservable.Property;
        
         /**
         * Defines the item template property for a RecyclerView.
         */
        public static itemTemplateProperty: dependencyObservable.Property;

        android: android.support.v7.widget.RecyclerView;
        
        /**
         * Gets or set the items collection of the RecyclerView. 
         */
        items: any;
        
         /**
         * Gets or set the item template of the RecyclerView. 
         */
        itemTemplate: string | view.Template;
        
         /**
         * Forces the RecyclerView to rebind.
         */
         refresh();
    }
} 