let bible = await fetch('genesis.json');
let bibleAsJSON = await bible.json();
console.log(bibleAsJSON);