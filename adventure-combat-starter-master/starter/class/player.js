const { Character } = require("./character");
const { Food } = require("./food");

class Player extends Character {
  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0; i < this.items.length; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Fill this in
    for (let i = 0; i < this.currentRoom.items.length; i++) {
      let item = this.currentRoom.items[i];
      if (item.name === itemName) {
        this.currentRoom.items.splice(i, 1);
        this.items.push(item);
        return;
      }
    }
  }

  dropItem(itemName) {
    // Fill this in
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (item.name === itemName) {
        this.items.splice(i, 1);
        this.currentRoom.items.push(item);
        return;
      }
    }
  }

  eatItem(itemName) {
    // Fill this in
    let item = this.getItemByName(itemName);
    if (item instanceof Food) {
      this.items.splice(this.items.indexOf(item), 1);
      return;
    }
  }

  getItemByName(name) {
    // Fill this in
    return this.items.find((item) => item.name === name);
  }

  hit(name) {
    // Fill this in
    let enemy = this.currentRoom.getEnemyByName(name);

    enemy.attackTarget = this; // Set the enemy's attack target to the player
    enemy.applyDamage(10);
    enemy.act(); // Trigger the enemy's act method to check for attack conditions
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }
}

module.exports = {
  Player,
};
