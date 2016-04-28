import observable = require("data/observable");
import {ObservableArray} from "data/observable-array";

export class MainViewModel extends observable.Observable {

    private _items: ObservableArray<Person>;

    get items(): ObservableArray<Person> {
        return this._items;
    }
    set items(value: ObservableArray<Person>) {
        if (this._items !== value) {
            this._items = value;
        }
    }

    constructor() {
        super();
      
        this._items = this.getPersons();
    }

       private getPersons() : ObservableArray<Person> {        
        var data = new ObservableArray<Person>();

        for (var i = 0; i < 30; i++) {
            if(i % 2 == 0)
            {
                 data.push(new Person(i, "John Doe ", false));
            }      
            else
            {
                data.push(new Person(i, "Jessica Donovan", true));
            }      
        }
        
        return data; 
    }
}

export class Person {
    public age: number;
    public name: string;
    public isFemale: boolean;

    constructor(age: number, name: string, isFemale: boolean) {
        this.age = age;
        this.name = name;
        this.isFemale = isFemale;
    }
}