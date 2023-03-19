export default class Deck {
    constructor(id, title, description, owner, cards = [], parentDeck = null) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.owner = owner;
      this.cards = cards;
      this.parentDeck = parentDeck;
    }
};