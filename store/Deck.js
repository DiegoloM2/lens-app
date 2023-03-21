export default class Deck {
    constructor(id, title, description, owner, parentDeck = null, studiedToday) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.owner = owner;
      this.parentDeck = parentDeck;
      this.studiedToday = studiedToday;
    }
};
