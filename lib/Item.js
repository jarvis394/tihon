class Item {
  constructor(options) {
    /**
     * Item's icon
     */
    this.icon = options.icon

    /**
     * Item's name
     */
    this.name = options.name

    /**
     * Item's price
     */
    this.price = options.price

    /**
     * Item's ID
     */
    this.id = options.id

    /**
     * Item's group ID
     */
    this.groupId = options.groupId

    /**
     * Item's group
     */
    this.group = options.group

    /**
     * Item's hourly money earning
     */
    this.earning = options.earning

    /**
     * Item's reputation increment
     */
    this.rep = options.rep
  }
}

module.exports = Item
