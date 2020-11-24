import { v4 as uuidv4 } from 'uuid';

export class UUID {
  // get new UUID
  getUUID = () => uuidv4()

  // make a new itemWithKey
  getNewItemWithKey = item => ({ key: this.getUUID(), item })

  // strip keys
  stripKeys = itemsWithKeys => itemsWithKeys.map(itemWithKey => itemWithKey.item)

  // add keys
  addKeys = items => items.map(item => ({ key: this.getUUID(), item }))
}
