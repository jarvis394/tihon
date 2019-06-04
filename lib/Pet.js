class Pet {
  
  constructor(options) {

    /**
     * Pet's icon
     */
    this.icon = options.icon

    /**
     * Pet's name
     */
    this.name = options.name

    /**
     * Pet's price
     */
    this.price = options.price

    /**
     * Pet's ID
     */
    this.id = options.id
  }

  /**
   * Buys this pet
   * @param {User} user User class
   */
  buy(user) {
    user.subtract(this.price)
    user.addPet(this)
  }
  
}

module.exports = Pet