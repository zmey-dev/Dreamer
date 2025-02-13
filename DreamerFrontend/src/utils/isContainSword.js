import store from "../store/store";

function removeDefinedSymbols(text, symbolsToRemove) {
  const regex = new RegExp(
    `[${symbolsToRemove.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}]`,
    "g"
  );
  return text.replace(regex, "");
}

const symbols = "!@#$%^&*()_+{}|:\"<>?~`-=[]\\;',./ ";

export const isContainSword = (text) => {
  const swearWords = store
    .getState()
    .swear.swear_words.map((swear) => swear.name);

  let dealedText = removeDefinedSymbols(text, symbols).toLowerCase();

  for (let word of swearWords) {
    const regex = new RegExp(word, "gi");
    if (regex.test(dealedText)) {
      return true;
    }
  }
  return false;
};
