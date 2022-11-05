async function fetchBible() {
  let bibleFile;
  let bibleFileAsJson;
  let verse;
  let verseArray;
  let verseArrayReverse;
  let transliterationReverse;
  let germanBible;
  let germanBibleAsJson;
  let englishWord;
  let germanVerseAsArray;
  let germanVerseAsArrayReverse;

  let genesis;

  let transliteration = 'wə•ḡam ʾeṯ-šab•bə•ṯōw•ṯay nā•ṯat•tiy lā•hem lih•yōwṯ lə•ʾōwṯ bēy•niy uw•ḇēy•nēy•hem lā•ḏa•ʿaṯ kiy ʾă•niy yəh•wāh mə•qad•də•šām';
  transliteration = transliteration.replace("-", " ");
  transliteration = transliteration.split(" ");
  transliterationReverse = transliteration.reverse();
//   transliteration = cleanTransliteration(transliteration);

genesis = await fetch('./wo_transliterated/genesis.json');
genesis = await genesis.json();
console.log(genesis);



verse = genesis[0]['verse'];
console.log(verse);

  for(let i = 0; i < verse.length; i++) {
    document.getElementById("content").innerHTML += /*html*/ `
    <div id="word-block-${i}" class="wordBlock">
        <div class="interlinearGerman">${verse[i]['text']}</div>
        <div class="verse-Ezra-SIL">${verse[i]['word']}</div>
        <div class="wordStrongs">${verse[i]['number']}</div>
    </div>
    `;
  }
  // for(let i = germanVerseAsArrayReverse.length-1; i > 0; i--) {
  //   document.getElementById(`word-block-${i-9}`).innerHTML += /*html*/ `
  //   <div class="interlinearGerman">${germanVerseAsArrayReverse[i]}</div>
  // `;
  // }

//   document.getElementById("text-displayer").innerHTML += /*html*/ `
//       <h1>Verse as Array:</h1>
//       <br><span class="verse-Ezra-SIL">${verseArrayReverseRejoined}</span>
//       <br><span class="transliterated">${transliteration}</span>
//       `;
}

async function display_wlc_SBL_Hebrew() {
  let bibleFile = await fetch("./wlc.json");
  let bibleFileAsJson = await bibleFile.json();
  let verse =
    bibleFileAsJson["books"][13]["chapters"][19]["verses"][11]["text"];
  let singleWord =
    bibleFileAsJson["books"][13]["chapters"][19]["verses"][11]["text"][10];

  let verseModi = verse.replace("\u05be", " ");
  document.getElementById("text-displayer").innerHTML += /*html*/ `
    <br><span class="verse-SBL-Hebrew">${verse}</span>
    `;

  document.getElementById("text-displayer").innerHTML += /*html*/ `
    <br><span class="verse-SBL-Hebrew">${verseModi}</span>
    `;
}

function replaceSpecialChars(myString) {
  return myString.replace("\u05be", " ");
}


function cleanTransliteration(givenTransliteration) {
    // for (let index = 0; index < 100; index++) {
    //     givenTransliteration.replace("•", "");
    // }
    givenTransliteration.replace("-", " ");
    return givenTransliteration;
}


function verseAsSingleWordsArray(givenVerse) {
  return givenVerse.split(" ");
}


function testFunction() {
  document.getElementById("text-displayer").innerHTML += /*html*/ `
      <span class="bibleText">${verse}</span>
      <br><span class="bibleText">${singleWord}</span>
      <br><span class="bibleText">\u05d0\u05b6\u05ea\u05be\u05e9</span>
      <br><span class="bibleText">\u05be</span>
      `;
}