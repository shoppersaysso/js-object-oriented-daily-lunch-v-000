let store = {customers: [], employers: [], meals: [], deliveries: []}

let customerId = 0

class Customer {
  constructor(name, employer = {}){
    this.id = ++customerId
    this.name = name
    this.employerId = employer.id

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter((delivery)=> {
      return delivery.customerId == this.id
    })
  }

  meals(){
    return this.deliveries().map((delivery)=> {
      return delivery.meal()
    })
  }

  totalSpent(){
    return this.meals().reduce(function(sum, meal)  { return sum + meal.price }, 0)
  }
}

let employerId = 0

class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
  }

  mealTotals(){
    let mealsTotals = {}
    let keys = this.meals().map( meal =>  meal.id)
    let mealsId = this.deliveries().map( delivery => delivery.mealId )
    for (let i = 0; i < keys.length; i++){
      mealsTotals[keys[i]] = mealsId.filter( mealId => { return mealId === keys[i] }).length
    }

    return mealsTotals
  }

  employees(){
    return store.customers.filter((customer)=> {
      return customer.employerId == this.id
    })
  }

  deliveries(){
    let allDeliveries = this.employees().map((employee)=> {
      return employee.deliveries()
    })
    let merged = [].concat.apply([], allDeliveries);
    return merged;
  }

  meals(){
    let allMeals = this.deliveries().map((delivery)=> {
      return delivery.meal()
    })
    let uniqueMeals = [...new Set(allMeals)]
    return uniqueMeals;
  }

}

let mealId = 0

class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = price

    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.mealId == this.id
    })
  }

  customers(){
    return this.deliveries().map((delivery) => {
      return delivery.customer()
    })
  }

  static byPrice(){
    return store.meals.sort((meal) => { return meal.price });
  }
}

let deliveryId = 0

class Delivery {
  constructor(meal ={}, customer ={}){
    this.id = ++deliveryId
    this.mealId = mealId
    this.customerId = customerId

    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find((meal) => { return meal.id === this.mealId })
  }

  customer(){
    return store.customers.find((customer) => { return customer.id === this.customerId })
  }
}
