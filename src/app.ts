const pizzas = [
    { name: 'Pepperoini', toppings: ['pepperoni']}
];

const mappedPizzas = pizzas.map(pizza => pizza.name.toUpperCase());

console.log(mappedPizzas);

const pizza = {
    name: "Blazing Inferno",
    getName: () =>  pizza.name
}

console.log(pizza.getName());

////////////////////////////// default function parameters

function multiply(a, b = 25) {
    return a * b;
}

console.log(multiply(5));   //uses default 25
console.log(multiply(5, 35));

///////////////////////////// literal improvements w/ es6 or ts
const pizza2 = {
    name: 'Pepperoni',
    price: 15,
    getName() { //dont need to-  "getName : function() {}"
        return this.name;
    }
};

const toppings = ['pepperoni'];

// const order = {
//     pizza: pizza2,
//     toppings: toppings,
// };
const order = { pizza2, toppings } //shorthand to create value off of value of another property

function createOrder(pizza2, toppings) {
    return {pizza2, toppings};
}

console.log(order);
console.log(createOrder(pizza2, toppings));

//////////////////////// rest parameter
// ...arr (similar to varargs in java)
function sumAll(message, ...arr) {
    console.log(message);
    arr.reduce((prev, next) => prev + next);
} 

const sum = sumAll('Hello!', 1,2,3,4,5,6,7,8,9,10);

console.log(sum);

/////////////////////// array spread operator

const toppings2 = ['bacon', 'chili'];
const newToppings = ['pepperoni'];

//spreads both array values into single array :: doesn't keep reference of object, but makes new copy (helps with immutable objects)
const allToppings = [...toppings, ...newToppings];
console.log(allToppings);

/////////////////////// destructuring

const pie = {
    name: 'Pepperoni',
    toppings: ['pepperoni'],
};

//if only asking for certain properties
function orderPie({name: pizzaName, toppings}) {
    console.log(pizzaName, toppings); //can only just ask for names of properties, and also creates them as variable names
    return {pizzaName, toppings};
}

const { pizzaName } = orderPie(pie); //can also deconstruct like this for only one property
//------
const topps = ['pepp', 'bacon', 'chili'];
const [a,b,c] = toppings;   //creates 3 variables with pepp, bacon, and chili
console.log(a,b,c);

function logToppings([a,b,c]: any) {
    console.log(a,b,c);
}

logToppings(topps);

///////////////////////////// Number types
const pizzaCost: number = 10;
const pizzaTopps: number = 2;

function calculatePrice(cost: number, toppings: number): number {
    return cost + 1.5 * toppings;
}

const cost: number = calculatePrice(pizzaCost, pizzaTopps);
console.log(`Pizza costs: ${cost}`);

///////////////////////////// String types
const coupon: string = 'pizza25';

function normalizeCoupon(code: string): string {
    return code.toUpperCase();
}

const couponMessage: string = `Final coupon is ${normalizeCoupon(coupon)}`;
console.log(couponMessage);

///////////////////////////// Boolean type
const pizzaCount: number = 5;
function offerDiscount(orders: number): boolean {
    return orders >= 3;
}

if(offerDiscount(pizzaCount)) {
    console.log(`You're entitled to a discount!`);
} else {
    console.log('Order more than 3 pizzas for a discount!');
}

///////////////////////////// 'any' type
let varName; // 'any' type, can assign anything to it
varName = 25;
varName = "25";
varName = true;

///////////////////////////// implicit vs explicit
let implicitCoupon = 'pizza25'; //implies string, say : any if going to reassign later
let explicitCoupon: string = 'pizza25';


///////////////////////////// never type
// function orderError(error: string): never {
//     throw new Error(error);
//     //never going to return a value!
// }

// orderError('Something went wrong');

///////////////////////////// Strict null check

// | null tells compiler we are able to set to null if we want to
let coupon2: string | null = 'pizza25';

function removeCoupon(): void {
    coupon2 = null;
}

console.log(coupon2);
removeCoupon();
console.log(coupon2);


/////////////////////////////  union types
let pizzaSize: string = 'small';
function selectSize(size: "small" | "medium" | "large"): void {
    pizzaSize = size;
}

selectSize("medium");
console.log(`pizza size: ${pizzaSize}`)


///////////////////////////// Function types
// let sumOrder: Function;
let sumOrder: (price: number, quantity: number) => number;

sumOrder = (x, y): number => x * y;


const sumPies = sumOrder(25, 2);

console.log(`Total sum: ${sum}`);

///////////////////////////// Functions and optional/default arguments
            
//                ** add ? for optional parameter **
let sumFunc: (price: number, quantity?: number) => number;

// sumFunc = (x, y = 1): number => { <-- 1 is default value in this case
sumFunc = (x, y): number => {
    const q = y || 1;
    return x*q;
}

const summPies = sumFunc(25);
console.log(`Total sum: ${summPies}`);

///////////////////////////// Objects
let p: {name: string, price: number, getName(): string};

p = {
    name: 'Plain old pepperoni',
    price: 20,
    getName() {
        return p.name;
    }
}

console.log(p.getName());

///////////////////////////// Array types and generics
let sizes: string[];
sizes = ['small', 'medium', 'large'];

let toppers: Array<string>; //same as above, just using constructor instead of []
toppers = ['pepp', 'tomato', 'bacon'];

///////////////////////////// Tuple types for arrays

// let pizzaz = ['Pepperoni', 20];   //union type
let pizzaz: [string, number, boolean];  //only if you know will be string, number, boolean structure
pizzaz = ['pepp', 20, true];

///////////////////////////// Type aliases
type Size = 'small' | 'medium' | 'large';
type Callback = (size: Size) => void;

let aPizzaSize: Size = 'small';

const selectASize: Callback = (x) => {
    aPizzaSize = x;
};

selectASize('small');

///////////////////////////// Type assertions
type Pizza = {name: string, toppings: number};
const aPizza: Pizza = {name: 'blazing inferno', toppings: 5};

const serialized = JSON.stringify(pizza);

function getNameFromJSON(obj: string) {
    return (JSON.parse(obj) as Pizza).name; //saying we know json.parse will return object as Pizza type
}

getNameFromJSON(serialized);

///////////////////////////// Interfaces

interface PizSizes {
    sizes: string[];
}

interface Piz extends PizSizes { //interface doesn't need = sign -- interface can be extended, type can not
    name: string;
    toppings?: number;
    getAvailableSizes(): string[];
    [key: number]: string
};

let piz: Piz;

function createPiz(name:string, sizes: string[]): Piz {
    return {
        name,
        sizes,
        getAvailableSizes() {
            return this.sizes
        }
    }
}

piz = createPiz('pepp', ['small', 'medium']);
piz[1] = 'xyz';
piz.toppings = 1;


///////////////////////////// Classes

//HOW JAVASCRIPT FUNCTION CONSTRUCTOR WORKS
// function PizzaPie(name: string) {
//     this.name = name;
//     this.toppings = [];
// }

// PizzaPie.prototype.addATopping = function(topping: string) {
//     this.toppings.push(topping);
// }

// new PizzaPie('pepperoni supreme')

//and now ts class...
interface SizesInterface {
    availableSizes: string[];
}
abstract class Sizes implements SizesInterface {  //abstract - cannot create instance of it
    constructor(protected sizes: string[]) {}

    set availableSizes(sizes: string[]) {
        this.sizes = sizes;
    }

    get availableSizes() {
        return this.sizes

    }
}

interface PizzaPieInterface extends SizesInterface {
    readonly name: string;
    toppings: string[];
    updateSizes(sizes: string[]): void;
    addATopping(topping: string): void;
}

class PizzaPie extends Sizes implements PizzaPieInterface {
    //when compiled to javascript, won't contain public or private
    public toppings: string[] = []; //don't need to say public, everything is public by default
    readonly sauce = "ABC";   //readonly property. can't be overridden, must be set on declaration or in constructor
    //if you specify public/private in constructor param, will add the field and don't need to declare it above
    constructor(readonly name:string, sizes: string[]) { 
        super(sizes);
    }

    public updateSizes(sizes: string[]) {
        this.sizes = sizes;
    }

    addATopping(topping: string) {
        this.toppings.push(topping)
    }
}

const pizzaPie = new PizzaPie('pepp', ['small', 'medium']);
//invoke getter
console.log(pizzaPie.availableSizes)
//invoke setter
pizzaPie.availableSizes = ['medium', 'large'];
pizzaPie.addATopping('pepp');
pizzaPie.updateSizes(['large']);
console.log(pizzaPie.availableSizes)
console.log(pizzaPie);

///////////////////////////// Static properties and Methods
class Coupon {
    static allowed = ['Pepperoni', 'Blazing Inferno'];
    static create(percentage: number) {
        return `PIZZA_RESTAURANT_${percentage}`
    }
}

console.log(Coupon.create(25));


