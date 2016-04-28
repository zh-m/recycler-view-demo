var common = require("./recycler-view-common");
var stackLayout = require("ui/layouts/stack-layout");
var textViewModule = require("ui/text-view");
import { View } from "ui/core/view";
import builder = require('ui/builder');

require("utils/module-merge").merge(common, module.exports);

export class RecyclerView extends common.RecyclerView {
        private _android: android.support.v7.widget.RecyclerView;
        private _adapter: any;
    
        public _createUI() {
            this._android = new android.support.v7.widget.RecyclerView(this._context);
            var layoutManager = new android.support.v7.widget.LinearLayoutManager(this._context);
             
            this._android.setLayoutManager(layoutManager);
            this._android.setHasFixedSize(true);
            
            this._adapter = new RecyclerViewAdapter(this);
            this._android.setAdapter(this._adapter);

            this.refresh();
       }

        get android(): android.support.v7.widget.RecyclerView {
            return this._android;
        }

        public refresh() {
            if (!this._android || !this._android.getAdapter()) {
                return;
            }
            
            if (this._android && this._adapter) {
                this._adapter.notifyDataSetChanged();
            }
        }        
            
        public getItem(index: number) {            
            return this.items[index];
        }
        
        public getContainerForItem() {
            var container = this.itemTemplate ? builder.parse(this.itemTemplate) : this.getDefaultContainerForItem();
            return container;
        }
        
        private getDefaultContainerForItem(): View {    
            var textView = new textViewModule.TextView();
            textView.bind({
                targetProperty: "text",
                sourceProperty: "$value"
            });

            return textView;
        }
    
}

class ItemViewHolder extends android.support.v7.widget.RecyclerView.ViewHolder {
    private _view: View;

    constructor(view: View) {
        super(view.android);
        this._view = view;

        return global.__native(this);
    }

    public get view() {
        return this._view;
    }
}

class RecyclerViewAdapter extends android.support.v7.widget.RecyclerView.Adapter {
    private _recyclerView: RecyclerView;

    constructor(recyclerView: RecyclerView) {
        super();

        this._recyclerView = recyclerView;

        return global.__native(this);
    }

    public getItemCount(): number {
        if (this._recyclerView.items) {
            return this._recyclerView.items.length;
        }

        return 0;
    }

    public onCreateViewHolder(parent: any, viewType: number): ItemViewHolder {
        var view = this._recyclerView.getContainerForItem();
        var viewHolder = new ItemViewHolder(view);

        return viewHolder;
    }

    public onBindViewHolder(holder, position) {
        holder.view.bindingContext = this._recyclerView.getItem(position);
    }
}