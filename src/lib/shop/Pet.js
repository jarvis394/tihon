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
}

module.exports = Pet
