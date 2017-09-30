let store = {customers: [], employers: [], meals: [], deliveries: []}

let customerId = 0

class Customer {
  constructor(name, employer){
    this.id = ++customerId
    this.name = name
    this.employer = employer

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter((delivery) => {
      return delivery.customerId == this.id
    })
  }

  totalSpent(){

  }
}

let employerId = 0

class Employer {
  constructor(name){
    this.id = ++employerId
    this.name = name

    store.employers.push(this)
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

  customer(){
    return store.customers.filter((customer) => {
      return customer.mealId == this.id
    })
  }
}

let deliveryId = 0

class Delivery {
  constructor(meal, customer){
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
