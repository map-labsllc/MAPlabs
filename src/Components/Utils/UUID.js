export class UUID {

  // don't access this directly, JS 'class' is such crap
  uuid = 1;

  // get new UUID
  getUUID = () => {
    return this.uuid++
  }

  // make a new itemWithKey
  getNewItemWithKey = item => ( { key: this.getUUID(), item } )

  // strip keys
  stripKeys = itemsWithKeys => itemsWithKeys.map(itemWithKey => itemWithKey.item)

  // add keys
  addKeys = items => items.map( item => ({ key: this.getUUID(), item }) )
}
