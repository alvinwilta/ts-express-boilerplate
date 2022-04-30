//* Generate pseudorandom token
// TODO: Need ehancement to avoid duplicates

function generateToken(length: Number) {
  if (length < 4) {
    throw Error("Length too short!");
  }
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export default generateToken;
