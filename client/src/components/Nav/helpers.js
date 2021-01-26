const calcAvatar = (name) => {
  let splitedName = name.split(' ');
  let firstName = '';
  let lastName = '';
  if (splitedName[0]) {
    firstName = splitedName[0].charAt(0).toUpperCase();
  }
  if (splitedName[1]) {
    lastName = splitedName[1].charAt(0).toUpperCase();
  }

  return `${firstName}${lastName}`;
};

module.exports = { calcAvatar };
