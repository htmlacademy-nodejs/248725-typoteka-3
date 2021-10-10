'use strict';
const {getRandomValueFromArray} = require(`../utils`);

class UsersCreationService {
  constructor({
    emailList,
    passwordHashList,
    firstNameForWomanList,
    firstNameForManList,
    lastNameList,
    avatarList,
    usersNumberForCreation
  }) {
    this.users = new Array(usersNumberForCreation).fill(null).map(() => {
      const isWoman = Math.round(Math.random()) === 0;
      return ({
        email: this.createEmail(emailList),
        passwordHash: this.createPasswordHashes(passwordHashList),
        firstName: this.createFirstName(firstNameForManList, firstNameForWomanList, isWoman),
        lastName: this.createLastName(lastNameList, isWoman),
        avatar: this.createAvatar(avatarList),
      });
    });
  }

  createEmail(emails) {
    return getRandomValueFromArray(emails);
  }

  createPasswordHashes(passwordHashes) {
    return getRandomValueFromArray(passwordHashes);
  }

  createAvatar(avatars) {
    return getRandomValueFromArray(avatars);
  }

  createFirstName(firstNamesForMan, firstNamesForWoMan, isWoman) {
    return isWoman ? getRandomValueFromArray(firstNamesForWoMan) : getRandomValueFromArray(firstNamesForMan);
  }

  createLastName(lastNames, isWoman) {
    const lastName = getRandomValueFromArray(lastNames);
    return isWoman ? `${lastName}а` : lastName;
  }
}

module.exports = UsersCreationService;
