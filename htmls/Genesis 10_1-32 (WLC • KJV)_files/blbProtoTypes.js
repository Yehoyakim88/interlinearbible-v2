if(typeof BLB == 'undefined') BLB = {};
(function() {
	var tld = [];

	BLB.BookChapters	= [];
	BLB.BookLongName	= [];
	BLB.BookNumbers		= [];
	BLB.BookOrder		= [];
	BLB.Months			= [];
	BLB.BookNames = [];
	BLB.EngToSpanish = [];

	BLB.primaryListDelim = String.fromCharCode(169);
	BLB.primarySubListDelim = String.fromCharCode(167);
	BLB.primarySuperSubListDelim = String.fromCharCode(183);

	BLB.BookNames["1 ##j"] = "1Jo";BLB.BookNames["1 ch"] = "1Ch";BLB.BookNames["1 chr"] = "1Ch";BLB.BookNames["1 chro"] = "1Ch";BLB.BookNames["1 chron"] = "1Ch";BLB.BookNames["1 chronicles"] = "1Ch";BLB.BookNames["1 co"] = "1Co";BLB.BookNames["1 cor"] = "1Co";BLB.BookNames["1 cori"] = "1Co";BLB.BookNames["1 corint"] = "1Co";BLB.BookNames["1 corinth"] = "1Co";BLB.BookNames["1 corinthian"] = "1Co";BLB.BookNames["1 corinthians"] = "1Co";BLB.BookNames["1 corintios"] = "1Co";BLB.BookNames["1 cr"] = "1Co";BLB.BookNames["1 cronicas"] = "1Ch";BLB.BookNames["1 crónicas"] = "1Ch";BLB.BookNames["1 jhn"] = "1Jo";BLB.BookNames["1 jn"] = "1Jo";BLB.BookNames["1 jo"] = "1Jo";BLB.BookNames["1 joh"] = "1Jo";BLB.BookNames["1 john"] = "1Jo";BLB.BookNames["1 juan"] = "1Jo";BLB.BookNames["1 kgs"] = "1Ki";BLB.BookNames["1 ki"] = "1Ki";BLB.BookNames["1 kin"] = "1Ki";BLB.BookNames["1 king"] = "1Ki";BLB.BookNames["1 kings"] = "1Ki";BLB.BookNames["1 kngs"] = "1Ki";BLB.BookNames["1 pe"] = "1Pe";BLB.BookNames["1 pedro"] = "1Pe";BLB.BookNames["1 pet"] = "1Pe";BLB.BookNames["1 pete"] = "1Pe";BLB.BookNames["1 peter"] = "1Pe";BLB.BookNames["1 pt"] = "1Pe";BLB.BookNames["1 reyes"] = "1Ki";BLB.BookNames["1 sa"] = "1Sa";BLB.BookNames["1 sam"] = "1Sa";BLB.BookNames["1 samuel"] = "1Sa";BLB.BookNames["1 tesalonicenses"] = "1Th";BLB.BookNames["1 th"] = "1Th";BLB.BookNames["1 the"] = "1Th";BLB.BookNames["1 thes"] = "1Th";BLB.BookNames["1 thess"] = "1Th";BLB.BookNames["1 thessa"] = "1Th";BLB.BookNames["1 thessal"] = "1Th";BLB.BookNames["1 thessalon"] = "1Th";BLB.BookNames["1 thessalonian"] = "1Th";BLB.BookNames["1 thessalonians"] = "1Th";BLB.BookNames["1 ths"] = "1Th";BLB.BookNames["1 ti"] = "1Ti";BLB.BookNames["1 tim"] = "1Ti";BLB.BookNames["1 timo"] = "1Ti";BLB.BookNames["1 timoteo"] = "1Ti";BLB.BookNames["1 timothy"] = "1Ti";BLB.BookNames["1##j"] = "1Jo";BLB.BookNames["1ch"] = "1Ch";BLB.BookNames["1chr"] = "1Ch";BLB.BookNames["1chro"] = "1Ch";BLB.BookNames["1chron"] = "1Ch";BLB.BookNames["1chronicles"] = "1Ch";BLB.BookNames["1co"] = "1Co";BLB.BookNames["1cor"] = "1Co";BLB.BookNames["1cori"] = "1Co";BLB.BookNames["1corint"] = "1Co";BLB.BookNames["1corinth"] = "1Co";BLB.BookNames["1corinthian"] = "1Co";BLB.BookNames["1corinthians"] = "1Co";BLB.BookNames["1corintios"] = "1Co";BLB.BookNames["1cr"] = "1Co";BLB.BookNames["1cronicas"] = "1Ch";BLB.BookNames["1crón"] = "1Ch";BLB.BookNames["1crónicas"] = "1Ch";BLB.BookNames["1jhn"] = "1Jo";BLB.BookNames["1jn"] = "1Jo";BLB.BookNames["1jo"] = "1Jo";BLB.BookNames["1joh"] = "1Jo";BLB.BookNames["1john"] = "1Jo";BLB.BookNames["1juan"] = "1Jo";BLB.BookNames["1kgs"] = "1Ki";BLB.BookNames["1ki"] = "1Ki";BLB.BookNames["1kin"] = "1Ki";BLB.BookNames["1king"] = "1Ki";BLB.BookNames["1kings"] = "1Ki";BLB.BookNames["1kngs"] = "1Ki";BLB.BookNames["1pe"] = "1Pe";BLB.BookNames["1ped"] = "1Pe";BLB.BookNames["1pedro"] = "1Pe";BLB.BookNames["1pet"] = "1Pe";BLB.BookNames["1pete"] = "1Pe";BLB.BookNames["1peter"] = "1Pe";BLB.BookNames["1pt"] = "1Pe";BLB.BookNames["1rey"] = "1Ki";BLB.BookNames["1reyes"] = "1Ki";BLB.BookNames["1sa"] = "1Sa";BLB.BookNames["1sa."] = "1Sa";BLB.BookNames["1sam"] = "1Sa";BLB.BookNames["1samuel"] = "1Sa";BLB.BookNames["1tes"] = "1Th";BLB.BookNames["1tesalonicenses"] = "1Th";BLB.BookNames["1th"] = "1Th";BLB.BookNames["1the"] = "1Th";BLB.BookNames["1thes"] = "1Th";BLB.BookNames["1thess"] = "1Th";BLB.BookNames["1thessa"] = "1Th";BLB.BookNames["1thessal"] = "1Th";BLB.BookNames["1thessalon"] = "1Th";BLB.BookNames["1thessalonian"] = "1Th";BLB.BookNames["1thessalonians"] = "1Th";BLB.BookNames["1ths"] = "1Th";BLB.BookNames["1ti"] = "1Ti";BLB.BookNames["1tim"] = "1Ti";BLB.BookNames["1timo"] = "1Ti";BLB.BookNames["1timoteo"] = "1Ti";BLB.BookNames["1timothy"] = "1Ti";BLB.BookNames["2 ##j"] = "2Jo";BLB.BookNames["2 ch"] = "2Ch";BLB.BookNames["2 chr"] = "2Ch";BLB.BookNames["2 chro"] = "2Ch";BLB.BookNames["2 chron"] = "2Ch";BLB.BookNames["2 chronicles"] = "2Ch";BLB.BookNames["2 co"] = "2Co";BLB.BookNames["2 cor"] = "2Co";BLB.BookNames["2 cori"] = "2Co";BLB.BookNames["2 corint"] = "2Co";BLB.BookNames["2 corinth"] = "2Co";
	BLB.BookNames["2 corinthian"] = "2Co";BLB.BookNames["2 corinthians"] = "2Co";BLB.BookNames["2 corintios"] = "2Co";BLB.BookNames["2 cr"] = "2Co";BLB.BookNames["2 cronicas"] = "2Ch";BLB.BookNames["2 crónicas"] = "2Ch";BLB.BookNames["2 jhn"] = "2Jo";BLB.BookNames["2 jn"] = "2Jo";BLB.BookNames["2 jo"] = "2Jo";BLB.BookNames["2 joh"] = "2Jo";BLB.BookNames["2 john"] = "2Jo";BLB.BookNames["2 juan"] = "2Jo";BLB.BookNames["2 kgs"] = "2Ki";BLB.BookNames["2 ki"] = "2Ki";BLB.BookNames["2 kin"] = "2Ki";BLB.BookNames["2 king"] = "2Ki";BLB.BookNames["2 kings"] = "2Ki";BLB.BookNames["2 kngs"] = "2Ki";BLB.BookNames["2 pe"] = "2Pe";BLB.BookNames["2 pedro"] = "2Pe";BLB.BookNames["2 pet"] = "2Pe";BLB.BookNames["2 pete"] = "2Pe";BLB.BookNames["2 peter"] = "2Pe";BLB.BookNames["2 pt"] = "2Pe";BLB.BookNames["2 reyes"] = "2Ki";BLB.BookNames["2 sa"] = "2Sa";BLB.BookNames["2 sam"] = "2Sa";BLB.BookNames["2 samuel"] = "2Sa";BLB.BookNames["2 sm"] = "2Sa";BLB.BookNames["2 tesalonicenses"] = "2Th";BLB.BookNames["2 th"] = "2Th";BLB.BookNames["2 the"] = "2Th";BLB.BookNames["2 thes"] = "2Th";BLB.BookNames["2 thess"] = "2Th";BLB.BookNames["2 thessa"] = "2Th";BLB.BookNames["2 thessal"] = "2Th";BLB.BookNames["2 thessalon"] = "2Th";BLB.BookNames["2 thessalonian"] = "2Th";BLB.BookNames["2 thessalonians"] = "2Th";BLB.BookNames["2 ths"] = "2Th";BLB.BookNames["2 ti"] = "2Ti";BLB.BookNames["2 tim"] = "2Ti";BLB.BookNames["2 timo"] = "2Ti";BLB.BookNames["2 timoteo"] = "2Ti";BLB.BookNames["2 timothy"] = "2Ti";BLB.BookNames["2##j"] = "2Jo";BLB.BookNames["2ch"] = "2Ch";BLB.BookNames["2chr"] = "2Ch";BLB.BookNames["2chro"] = "2Ch";BLB.BookNames["2chron"] = "2Ch";BLB.BookNames["2chronicles"] = "2Ch";BLB.BookNames["2co"] = "2Co";BLB.BookNames["2cor"] = "2Co";BLB.BookNames["2cori"] = "2Co";BLB.BookNames["2corint"] = "2Co";BLB.BookNames["2corinth"] = "2Co";BLB.BookNames["2corinthian"] = "2Co";BLB.BookNames["2corinthians"] = "2Co";BLB.BookNames["2corintios"] = "2Co";BLB.BookNames["2cr"] = "2Co";BLB.BookNames["2cronicas"] = "2Ch";BLB.BookNames["2crón"] = "2Ch";BLB.BookNames["2crónicas"] = "2Ch";BLB.BookNames["2jhn"] = "2Jo";BLB.BookNames["2jn"] = "2Jo";BLB.BookNames["2jo"] = "2Jo";BLB.BookNames["2joh"] = "2Jo";BLB.BookNames["2john"] = "2Jo";BLB.BookNames["2juan"] = "2Jo";BLB.BookNames["2kgs"] = "2Ki";BLB.BookNames["2ki"] = "2Ki";BLB.BookNames["2kin"] = "2Ki";BLB.BookNames["2king"] = "2Ki";BLB.BookNames["2kings"] = "2Ki";BLB.BookNames["2kngs"] = "2Ki";BLB.BookNames["2pe"] = "2Pe";BLB.BookNames["2ped"] = "2Pe";BLB.BookNames["2pedro"] = "2Pe";BLB.BookNames["2pet"] = "2Pe";BLB.BookNames["2pete"] = "2Pe";BLB.BookNames["2peter"] = "2Pe";BLB.BookNames["2pt"] = "2Pe";BLB.BookNames["2rey"] = "2Ki";BLB.BookNames["2reyes"] = "2Ki";BLB.BookNames["2sa"] = "2Sa";BLB.BookNames["2sa."] = "2Sa";BLB.BookNames["2sam"] = "2Sa";BLB.BookNames["2samuel"] = "2Sa";BLB.BookNames["2sm"] = "2Sa";BLB.BookNames["2tes"] = "2Th";BLB.BookNames["2tesalonicenses"] = "2Th";BLB.BookNames["2th"] = "2Th";BLB.BookNames["2the"] = "2Th";BLB.BookNames["2thes"] = "2Th";BLB.BookNames["2thess"] = "2Th";BLB.BookNames["2thessa"] = "2Th";BLB.BookNames["2thessal"] = "2Th";BLB.BookNames["2thessalon"] = "2Th";BLB.BookNames["2thessalonian"] = "2Th";BLB.BookNames["2thessalonians"] = "2Th";BLB.BookNames["2ths"] = "2Th";BLB.BookNames["2ti"] = "2Ti";BLB.BookNames["2tim"] = "2Ti";BLB.BookNames["2timo"] = "2Ti";BLB.BookNames["2timoteo"] = "2Ti";BLB.BookNames["2timothy"] = "2Ti";BLB.BookNames["3 ##j"] = "3Jo";BLB.BookNames["3 jhn"] = "3Jo";BLB.BookNames["3 jn"] = "3Jo";BLB.BookNames["3 jo"] = "3Jo";BLB.BookNames["3 joh"] = "3Jo";BLB.BookNames["3 john"] = "3Jo";BLB.BookNames["3 juan"] = "3Jo";BLB.BookNames["3##j"] = "3Jo";BLB.BookNames["3jhn"] = "3Jo";BLB.BookNames["3jn"] = "3Jo";BLB.BookNames["3jo"] = "3Jo";BLB.BookNames["3joh"] = "3Jo";BLB.BookNames["3john"] = "3Jo";BLB.BookNames["3juan"] = "3Jo";BLB.BookNames["abd"] = "Oba";BLB.BookNames["abdias"] = "Oba";BLB.BookNames["abdías"] = "Oba";BLB.BookNames["ac"] = "Act";BLB.BookNames["acs"] = "Act";BLB.BookNames["act"] = "Act";BLB.BookNames["acts"] = "Act";BLB.BookNames["am"] = "Amo";
	BLB.BookNames["amo"] = "Amo";BLB.BookNames["amos"] = "Amo";BLB.BookNames["ams"] = "Amo";BLB.BookNames["amós"] = "Amo";BLB.BookNames["apo"] = "Rev";BLB.BookNames["apoc"] = "Rev";BLB.BookNames["apocalipsis"] = "Rev";BLB.BookNames["apocalypse"] = "Rev";BLB.BookNames["apocolypse"] = "Rev";BLB.BookNames["apokaluyis ioannou"] = "Rev";BLB.BookNames["apokaluyis"] = "Rev";BLB.BookNames["apostolwn"] = "Act";BLB.BookNames["bamidbar"] = "Num";BLB.BookNames["bereishit"] = "Gen";BLB.BookNames["cant"] = "Sng";BLB.BookNames["cantares"] = "Sng";BLB.BookNames["canticle canticles"] = "Sng";BLB.BookNames["canticle of canticles"] = "Sng";BLB.BookNames["canticle"] = "Sng";BLB.BookNames["canticles"] = "Sng";BLB.BookNames["chabakuk"] = "Hab";BLB.BookNames["chaggai"] = "Hag";BLB.BookNames["co"] = "Col";BLB.BookNames["col"] = "Col";BLB.BookNames["coll"] = "Col";BLB.BookNames["collosians"] = "Col";BLB.BookNames["collossians"] = "Col";BLB.BookNames["colo"] = "Col";BLB.BookNames["colos"] = "Col";BLB.BookNames["colosenses"] = "Col";BLB.BookNames["coloss"] = "Col";BLB.BookNames["colossi"] = "Col";BLB.BookNames["colossian"] = "Col";BLB.BookNames["colossians"] = "Col";BLB.BookNames["colossions"] = "Col";BLB.BookNames["da"] = "Dan";BLB.BookNames["dan"] = "Dan";BLB.BookNames["dani"] = "Dan";BLB.BookNames["daniel"] = "Dan";BLB.BookNames["de"] = "Deu";BLB.BookNames["deu"] = "Deu";BLB.BookNames["deu."] = "Deu";BLB.BookNames["deut"] = "Deu";BLB.BookNames["deuter"] = "Deu";BLB.BookNames["deutero"] = "Deu";BLB.BookNames["deuteronomio"] = "Deu";BLB.BookNames["deuteronomy"] = "Deu";BLB.BookNames["devarim"] = "Deu";BLB.BookNames["divrei-hayamim1"] = "1Ch";BLB.BookNames["divrei-hayamim2"] = "2Ch";BLB.BookNames["dnl"] = "Dan";BLB.BookNames["ebraious"] = "Heb";BLB.BookNames["ec"] = "Ecc";BLB.BookNames["ecc"] = "Ecc";BLB.BookNames["eccl"] = "Ecc";BLB.BookNames["eccl."] = "Ecc";BLB.BookNames["eccle"] = "Ecc";BLB.BookNames["eccles"] = "Ecc";BLB.BookNames["ecclesiastes"] = "Ecc";BLB.BookNames["ecl"] = "Ecc";BLB.BookNames["eclesiastes"] = "Ecc";BLB.BookNames["eclesiastés"] = "Ecc";BLB.BookNames["ecls"] = "Ecc";BLB.BookNames["ecs"] = "Ecc";BLB.BookNames["ef"] = "Eph";BLB.BookNames["efesios"] = "Eph";BLB.BookNames["efesious"] = "Eph";BLB.BookNames["eicha"] = "Lam";BLB.BookNames["ep"] = "Eph";BLB.BookNames["eph"] = "Eph";BLB.BookNames["eph."] = "Eph";BLB.BookNames["ephe"] = "Eph";BLB.BookNames["ephes"] = "Eph";BLB.BookNames["ephesi"] = "Eph";BLB.BookNames["ephesian"] = "Eph";BLB.BookNames["ephesians"] = "Eph";BLB.BookNames["ephesions"] = "Eph";BLB.BookNames["ephsns"] = "Eph";BLB.BookNames["es"] = "Est";BLB.BookNames["esd"] = "Ezr";BLB.BookNames["esdras"] = "Ezr";BLB.BookNames["est"] = "Est";BLB.BookNames["ester"] = "Est";BLB.BookNames["esth"] = "Est";BLB.BookNames["esther"] = "Est";BLB.BookNames["estr"] = "Est";BLB.BookNames["ex"] = "Exo";BLB.BookNames["exd"] = "Exo";BLB.BookNames["exds"] = "Exo";BLB.BookNames["exo"] = "Exo";BLB.BookNames["exod"] = "Exo";BLB.BookNames["exodo"] = "Exo";BLB.BookNames["exodus"] = "Exo";BLB.BookNames["eze"] = "Eze";BLB.BookNames["ezek"] = "Eze";BLB.BookNames["ezekiel"] = "Eze";BLB.BookNames["ezeq"] = "Eze";BLB.BookNames["ezequiel"] = "Eze";BLB.BookNames["ezr"] = "Ezr";BLB.BookNames["ezra"] = "Ezr";BLB.BookNames["fil"] = "Phl";BLB.BookNames["filem"] = "Phm";BLB.BookNames["filemon"] = "Phm";BLB.BookNames["filemón"] = "Phm";BLB.BookNames["filhmona"] = "Phm";BLB.BookNames["filipenses"] = "Phl";BLB.BookNames["filipphsious"] = "Phl";BLB.BookNames["ga"] = "Gal";BLB.BookNames["gal"] = "Gal";BLB.BookNames["gala"] = "Gal";BLB.BookNames["galat"] = "Gal";BLB.BookNames["galatas"] = "Gal";BLB.BookNames["galati"] = "Gal";BLB.BookNames["galatians"] = "Gal";BLB.BookNames["galations"] = "Gal";BLB.BookNames["gals"] = "Gal";BLB.BookNames["ge"] = "Gen";BLB.BookNames["gen"] = "Gen";BLB.BookNames["gen."] = "Gen";BLB.BookNames["gene"] = "Gen";BLB.BookNames["genes"] = "Gen";BLB.BookNames["genesi"] = "Gen";BLB.BookNames["genesis"] = "Gen";BLB.BookNames["glts"] = "Gal";BLB.BookNames["gns"] = "Gen";BLB.BookNames["gálatas"] = "Gal";BLB.BookNames["gén"] = "Gen";
	BLB.BookNames["génesis"] = "Gen";BLB.BookNames["hab"] = "Hab";BLB.BookNames["hab."] = "Hab";BLB.BookNames["haba"] = "Hab";BLB.BookNames["habacuc"] = "Hab";BLB.BookNames["habak"] = "Hab";BLB.BookNames["habakk"] = "Hab";BLB.BookNames["habakkuk"] = "Hab";BLB.BookNames["hag"] = "Hag";BLB.BookNames["hagai"] = "Hag";BLB.BookNames["hageo"] = "Hag";BLB.BookNames["hagg"] = "Hag";BLB.BookNames["haggai"] = "Hag";BLB.BookNames["hbk"] = "Hab";BLB.BookNames["hbr"] = "Heb";BLB.BookNames["hbrs"] = "Heb";BLB.BookNames["he"] = "Heb";BLB.BookNames["heb"] = "Heb";BLB.BookNames["hebr"] = "Heb";BLB.BookNames["hebreos"] = "Heb";BLB.BookNames["hebres"] = "Heb";BLB.BookNames["hebrew"] = "Heb";BLB.BookNames["hebrews"] = "Heb";BLB.BookNames["hech"] = "Act";BLB.BookNames["hechos"] = "Act";BLB.BookNames["hga"] = "Hag";BLB.BookNames["ho"] = "Hos";BLB.BookNames["hos"] = "Hos";BLB.BookNames["hos."] = "Hos";BLB.BookNames["hose"] = "Hos";BLB.BookNames["hosea"] = "Hos";BLB.BookNames["hoshaya"] = "Hos";BLB.BookNames["hsa"] = "Hos";BLB.BookNames["iakwbou"] = "Jas";BLB.BookNames["ioannou"] = "Rev";BLB.BookNames["iouda"] = "Jde";BLB.BookNames["is"] = "Isa";BLB.BookNames["isa"] = "Isa";BLB.BookNames["isa."] = "Isa";BLB.BookNames["isai"] = "Isa";BLB.BookNames["isaia"] = "Isa";BLB.BookNames["isaiah"] = "Isa";BLB.BookNames["isaias"] = "Isa";BLB.BookNames["isaías"] = "Isa";BLB.BookNames["ish"] = "Isa";BLB.BookNames["iwannhn"] = "Jhn";BLB.BookNames["iwannou av"] = "1Jo";BLB.BookNames["iwannou bv"] = "2Jo";BLB.BookNames["iwannou gv"] = "3Jo";BLB.BookNames["iyov"] = "Job";BLB.BookNames["ja"] = "Jas";BLB.BookNames["jam"] = "Jas";BLB.BookNames["jame"] = "Jas";BLB.BookNames["james"] = "Jas";BLB.BookNames["jas"] = "Jas";BLB.BookNames["jas."] = "Jas";BLB.BookNames["jb"] = "Job";BLB.BookNames["jde"] = "Jde";BLB.BookNames["jdg"] = "Jdg";BLB.BookNames["jdgs"] = "Jdg";BLB.BookNames["je"] = "Jer";BLB.BookNames["jer"] = "Jer";BLB.BookNames["jer."] = "Jer";BLB.BookNames["jere"] = "Jer";BLB.BookNames["jerem"] = "Jer";BLB.BookNames["jeremiah"] = "Jer";BLB.BookNames["jeremias"] = "Jer";BLB.BookNames["jeremías"] = "Jer";BLB.BookNames["jhn"] = "Jhn";BLB.BookNames["jl"] = "Joe";BLB.BookNames["jms"] = "Jas";BLB.BookNames["jn"] = "Jhn";BLB.BookNames["jn."] = "Jhn";BLB.BookNames["job"] = "Job";BLB.BookNames["joe"] = "Joe";BLB.BookNames["joel"] = "Joe";BLB.BookNames["joh"] = "Jhn";BLB.BookNames["john"] = "Jhn";BLB.BookNames["jon"] = "Jon";BLB.BookNames["jona"] = "Jon";BLB.BookNames["jonah"] = "Jon";BLB.BookNames["jonas"] = "Jon";BLB.BookNames["jonás"] = "Jon";BLB.BookNames["jos"] = "Jos";BLB.BookNames["josh"] = "Jos";BLB.BookNames["joshua"] = "Jos";BLB.BookNames["josue"] = "Jos";BLB.BookNames["josué"] = "Jos";BLB.BookNames["jr"] = "Jer";BLB.BookNames["jsh"] = "Jos";BLB.BookNames["juan"] = "Jhn";BLB.BookNames["jud"] = "Jde";BLB.BookNames["judas"] = "Jde";BLB.BookNames["jude"] = "Jde";BLB.BookNames["judg"] = "Jdg";BLB.BookNames["judge"] = "Jdg";BLB.BookNames["judges"] = "Jdg";BLB.BookNames["jue"] = "Jdg";BLB.BookNames["jueces"] = "Jdg";BLB.BookNames["kata iwannhn"] = "Jhn";BLB.BookNames["kata loukan"] = "Luk";BLB.BookNames["kata maqqaion"] = "Mat";BLB.BookNames["kata markonv"] = "Mar";BLB.BookNames["kohelet"] = "Ecc";BLB.BookNames["kolossaeis"] = "Col";BLB.BookNames["korinqious av"] = "1Co";BLB.BookNames["korinqious bv"] = "2Co";BLB.BookNames["la"] = "Lam";BLB.BookNames["lam"] = "Lam";BLB.BookNames["lame"] = "Lam";BLB.BookNames["lamen"] = "Lam";BLB.BookNames["lament"] = "Lam";BLB.BookNames["lamentaciones"] = "Lam";BLB.BookNames["lamentation"] = "Lam";BLB.BookNames["lamentations"] = "Lam";BLB.BookNames["le"] = "Lev";BLB.BookNames["lev"] = "Lev";BLB.BookNames["levi"] = "Lev";BLB.BookNames["levit"] = "Lev";BLB.BookNames["levitic"] = "Lev";BLB.BookNames["levitico"] = "Lev";BLB.BookNames["leviticus"] = "Lev";BLB.BookNames["levítico"] = "Lev";BLB.BookNames["lk"] = "Luk";BLB.BookNames["lke"] = "Luk";BLB.BookNames["loukan"] = "Luk";BLB.BookNames["lu"] = "Luk";BLB.BookNames["lu."] = "Luk";BLB.BookNames["luc"] = "Luk";BLB.BookNames["lucas"] = "Luk";BLB.BookNames["luk"] = "Luk";
	BLB.BookNames["luke"] = "Luk";BLB.BookNames["mal"] = "Mal";BLB.BookNames["mala"] = "Mal";BLB.BookNames["malac"] = "Mal";BLB.BookNames["malach"] = "Mal";BLB.BookNames["malachi"] = "Mal";BLB.BookNames["malaquias"] = "Mal";BLB.BookNames["malaquías"] = "Mal";BLB.BookNames["malichi"] = "Mal";BLB.BookNames["maqqaion"] = "Mat";BLB.BookNames["mar"] = "Mar";BLB.BookNames["marc"] = "Mar";BLB.BookNames["marcos"] = "Mar";BLB.BookNames["mark"] = "Mar";BLB.BookNames["markonv"] = "Mar";BLB.BookNames["mat"] = "Mat";BLB.BookNames["mateo"] = "Mat";BLB.BookNames["mathew"] = "Mat";BLB.BookNames["matt"] = "Mat";BLB.BookNames["matth"] = "Mat";BLB.BookNames["matthe"] = "Mat";BLB.BookNames["matthew"] = "Mat";BLB.BookNames["mch"] = "Mic";BLB.BookNames["melachim1"] = "1Ki";BLB.BookNames["melachim2"] = "2Ki";BLB.BookNames["mi"] = "Mic";BLB.BookNames["mic"] = "Mic";BLB.BookNames["mica"] = "Mic";BLB.BookNames["micah"] = "Mic";BLB.BookNames["micha"] = "Mic";BLB.BookNames["miq"] = "Mic";BLB.BookNames["miqueas"] = "Mic";BLB.BookNames["mishlei"] = "Pro";BLB.BookNames["mk"] = "Mar";BLB.BookNames["mlc"] = "Mal";BLB.BookNames["mlci"] = "Mal";BLB.BookNames["mr"] = "Mar";BLB.BookNames["mrk"] = "Mar";BLB.BookNames["mt"] = "Mat";BLB.BookNames["mt."] = "Mat";BLB.BookNames["mth"] = "Mat";BLB.BookNames["mtthw"] = "Mat";BLB.BookNames["mtw"] = "Mat";BLB.BookNames["na"] = "Nah";BLB.BookNames["nachum"] = "Nah";BLB.BookNames["nah"] = "Nah";BLB.BookNames["nahu"] = "Nah";BLB.BookNames["nahum"] = "Nah";BLB.BookNames["nahúm"] = "Nah";BLB.BookNames["ne"] = "Neh";BLB.BookNames["nechemia"] = "Neh";BLB.BookNames["neh"] = "Neh";BLB.BookNames["neh."] = "Neh";BLB.BookNames["nehe"] = "Neh";BLB.BookNames["nehem"] = "Neh";BLB.BookNames["nehemiah"] = "Neh";BLB.BookNames["nehemias"] = "Neh";BLB.BookNames["nehemías"] = "Neh";BLB.BookNames["nu"] = "Num";BLB.BookNames["num"] = "Num";BLB.BookNames["numb"] = "Num";BLB.BookNames["number"] = "Num";BLB.BookNames["numbers"] = "Num";BLB.BookNames["numeros"] = "Num";BLB.BookNames["núm"] = "Num";BLB.BookNames["números"] = "Num";BLB.BookNames["ob"] = "Oba";BLB.BookNames["oba"] = "Oba";BLB.BookNames["obad"] = "Oba";BLB.BookNames["obadiah"] = "Oba";BLB.BookNames["obd"] = "Oba";BLB.BookNames["os"] = "Hos";BLB.BookNames["oseas"] = "Hos";BLB.BookNames["ovadia"] = "Oba";BLB.BookNames["petrou av"] = "1Pe";BLB.BookNames["petrou bv"] = "2Pe";BLB.BookNames["ph"] = "Phl";BLB.BookNames["phi"] = "Phl";BLB.BookNames["phil"] = "Phl";BLB.BookNames["phile"] = "Phm";BLB.BookNames["philem"] = "Phm";BLB.BookNames["philemon"] = "Phm";BLB.BookNames["phili"] = "Phl";BLB.BookNames["philip"] = "Phl";BLB.BookNames["philipians"] = "Phl";BLB.BookNames["philipp"] = "Phl";BLB.BookNames["philippi"] = "Phl";BLB.BookNames["philippian"] = "Phl";BLB.BookNames["philippians"] = "Phl";BLB.BookNames["philli"] = "Phl";BLB.BookNames["phillip"] = "Phl";BLB.BookNames["phillipp"] = "Phl";BLB.BookNames["phillippi"] = "Phl";BLB.BookNames["phillippian"] = "Phl";BLB.BookNames["phillippians"] = "Phl";BLB.BookNames["phl"] = "Phl";BLB.BookNames["phm"] = "Phm";BLB.BookNames["phn"] = "Phm";BLB.BookNames["php"] = "Phl";BLB.BookNames["pr"] = "Pro";BLB.BookNames["praxeis apostolwn"] = "Act";BLB.BookNames["pro"] = "Pro";BLB.BookNames["pros ebraious"] = "Heb";BLB.BookNames["pros efesious"] = "Eph";BLB.BookNames["pros filhmona"] = "Phm";BLB.BookNames["pros filipphsious"] = "Phl";BLB.BookNames["pros galatas"] = "Gal";BLB.BookNames["pros kolossaeis"] = "Col";BLB.BookNames["pros korinqious av"] = "1Co";BLB.BookNames["pros korinqious bv"] = "2Co";BLB.BookNames["pros qessalonikeis av"] = "1Th";BLB.BookNames["pros qessalonikeis bv"] = "2Th";BLB.BookNames["pros rwmaious"] = "Rom";BLB.BookNames["pros timoqeon av"] = "1Ti";BLB.BookNames["pros timoqeon bv"] = "2Ti";BLB.BookNames["pros titon"] = "Tit";BLB.BookNames["prov"] = "Pro";BLB.BookNames["prov."] = "Pro";BLB.BookNames["proverb"] = "Pro";BLB.BookNames["proverbios"] = "Pro";BLB.BookNames["proverbs"] = "Pro";BLB.BookNames["prv"] = "Pro";BLB.BookNames["prvs"] = "Pro";BLB.BookNames["ps"] = "Psa";BLB.BookNames["ps."] = "Psa";BLB.BookNames["psa"] = "Psa";
	BLB.BookNames["psal"] = "Psa";BLB.BookNames["psalm"] = "Psa";BLB.BookNames["psalms"] = "Psa";BLB.BookNames["pss"] = "Psa";BLB.BookNames["qessalonikeis av"] = "1Th";BLB.BookNames["qessalonikeis bv"] = "2Th";BLB.BookNames["re"] = "Rev";BLB.BookNames["rev"] = "Rev";BLB.BookNames["reve"] = "Rev";BLB.BookNames["revel"] = "Rev";BLB.BookNames["revelat"] = "Rev";BLB.BookNames["revelation"] = "Rev";BLB.BookNames["revelations"] = "Rev";BLB.BookNames["rms"] = "Rom";BLB.BookNames["ro"] = "Rom";BLB.BookNames["rom"] = "Rom";BLB.BookNames["roma"] = "Rom";BLB.BookNames["roman"] = "Rom";BLB.BookNames["romanos"] = "Rom";BLB.BookNames["romans"] = "Rom";BLB.BookNames["rth"] = "Rth";BLB.BookNames["ru"] = "Rth";BLB.BookNames["rut"] = "Rth";BLB.BookNames["ruth"] = "Rth";BLB.BookNames["rwmaious"] = "Rom";BLB.BookNames["sal"] = "Psa";BLB.BookNames["salmos"] = "Psa";BLB.BookNames["sant"] = "Jas";BLB.BookNames["santiago"] = "Jas";BLB.BookNames["sgs"] = "Sng";BLB.BookNames["shir-hashirim"] = "Sng";BLB.BookNames["shmot"] = "Exo";BLB.BookNames["shmuel1"] = "1Sa";BLB.BookNames["shmuel2"] = "2Sa";BLB.BookNames["shoftim"] = "Jdg";BLB.BookNames["sng"] = "Sng";BLB.BookNames["sngs"] = "Sng";BLB.BookNames["so"] = "Sng";BLB.BookNames["sof"] = "Zep";BLB.BookNames["sofonias"] = "Zep";BLB.BookNames["sofonías"] = "Zep";BLB.BookNames["solomon"] = "Sng";BLB.BookNames["son"] = "Sng";BLB.BookNames["song of solomon"] = "Sng";BLB.BookNames["song of songs"] = "Sng";BLB.BookNames["song solomon"] = "Sng";BLB.BookNames["song songs"] = "Sng";BLB.BookNames["song"] = "Sng";BLB.BookNames["songs of solomon"] = "Sng";BLB.BookNames["songs solomon"] = "Sng";BLB.BookNames["songs"] = "Sng";BLB.BookNames["sos"] = "Sng";BLB.BookNames["tehillim"] = "Psa";BLB.BookNames["timoqeon av"] = "1Ti";BLB.BookNames["timoqeon bv"] = "2Ti";BLB.BookNames["tit"] = "Tit";BLB.BookNames["tito"] = "Tit";BLB.BookNames["titon"] = "Tit";BLB.BookNames["titus"] = "Tit";BLB.BookNames["tts"] = "Tit";BLB.BookNames["tzephania"] = "Zep";BLB.BookNames["vayikra"] = "Lev";BLB.BookNames["yechezkel"] = "Eze";BLB.BookNames["yehoshua"] = "Jos";BLB.BookNames["yermiyahu"] = "Jer";BLB.BookNames["yeshaiya"] = "Isa";BLB.BookNames["yoel"] = "Joe";BLB.BookNames["yona"] = "Jon";BLB.BookNames["zac"] = "Zec";BLB.BookNames["zacarias"] = "Zec";BLB.BookNames["zacarías"] = "Zec";BLB.BookNames["zc"] = "Zec";BLB.BookNames["ze"] = "Zep";BLB.BookNames["zec"] = "Zec";BLB.BookNames["zech"] = "Zec";BLB.BookNames["zecha"] = "Zec";BLB.BookNames["zechar"] = "Zec";BLB.BookNames["zecharia"] = "Zec";BLB.BookNames["zechariah"] = "Zec";BLB.BookNames["zep"] = "Zep";BLB.BookNames["zeph"] = "Zep";BLB.BookNames["zepha"] = "Zep";BLB.BookNames["zephan"] = "Zep";BLB.BookNames["zephaniah"] = "Zep";BLB.BookNames["zp"] = "Zep";BLB.BookNames["zph"] = "Zep";BLB.BookNames["éxodo"] = "Exo";
	BLB.Months = {Jan:'1,31', Feb:'32,60', Mar:'61,91', Apr:'92,121', May:'122,152', Jun:'153,182', Jul:'183,213', Aug:'214,244', Sep:'245,274', Oct:'275,305', Nov:'306,335', Dec:'336,366'};

	// This is the zero based chapter_ID of the first Chapter:Verse of the said book
	// Why?  So we can predict the current Chapter_ID of something like Ecc 17:5
	// It would be 659+17
	BLB.BookChapters["Gen"] = 0;	BLB.BookChapters["Exo"] = 50;	BLB.BookChapters["Lev"] = 90;	BLB.BookChapters["Num"] = 117;	BLB.BookChapters["Deu"] = 153;	BLB.BookChapters["Jos"] = 187;
	BLB.BookChapters["Jdg"] = 211;	BLB.BookChapters["Rth"] = 232;	BLB.BookChapters["1Sa"] = 236;	BLB.BookChapters["2Sa"] = 267;	BLB.BookChapters["1Ki"] = 291;	BLB.BookChapters["2Ki"] = 313;
	BLB.BookChapters["1Ch"] = 338;	BLB.BookChapters["2Ch"] = 367;	BLB.BookChapters["Ezr"] = 403;	BLB.BookChapters["Neh"] = 413;	BLB.BookChapters["Est"] = 426;	BLB.BookChapters["Job"] = 436;
	BLB.BookChapters["Psa"] = 478;	BLB.BookChapters["Pro"] = 628;	BLB.BookChapters["Ecc"] = 659;	BLB.BookChapters["Sng"] = 671;	BLB.BookChapters["Isa"] = 679;	BLB.BookChapters["Jer"] = 745;
	BLB.BookChapters["Lam"] = 797;	BLB.BookChapters["Eze"] = 802;	BLB.BookChapters["Dan"] = 850;	BLB.BookChapters["Hos"] = 862;	BLB.BookChapters["Joe"] = 876;	BLB.BookChapters["Amo"] = 879;
	BLB.BookChapters["Oba"] = 888;	BLB.BookChapters["Jon"] = 889;	BLB.BookChapters["Mic"] = 893;	BLB.BookChapters["Nah"] = 900;	BLB.BookChapters["Hab"] = 903;	BLB.BookChapters["Zep"] = 906;
	BLB.BookChapters["Hag"] = 909;	BLB.BookChapters["Zec"] = 911;	BLB.BookChapters["Mal"] = 925;	BLB.BookChapters["Mat"] = 929;	BLB.BookChapters["Mar"] = 957;	BLB.BookChapters["Luk"] = 973;
	BLB.BookChapters["Jhn"] = 997;	BLB.BookChapters["Act"] = 1018;	BLB.BookChapters["Rom"] = 1046;	BLB.BookChapters["1Co"] = 1062;	BLB.BookChapters["2Co"] = 1078;	BLB.BookChapters["Gal"] = 1091;
	BLB.BookChapters["Eph"] = 1097;	BLB.BookChapters["Phl"] = 1103;	BLB.BookChapters["Col"] = 1107;	BLB.BookChapters["1Th"] = 1111;	BLB.BookChapters["2Th"] = 1116;	BLB.BookChapters["1Ti"] = 1119;
	BLB.BookChapters["2Ti"] = 1125;	BLB.BookChapters["Tit"] = 1129;	BLB.BookChapters["Phm"] = 1132;	BLB.BookChapters["Heb"] = 1133;	BLB.BookChapters["Jas"] = 1146;	BLB.BookChapters["1Pe"] = 1151;
	BLB.BookChapters["2Pe"] = 1156;	BLB.BookChapters["1Jo"] = 1159;	BLB.BookChapters["2Jo"] = 1164;	BLB.BookChapters["3Jo"] = 1165;	BLB.BookChapters["Jde"] = 1166;	BLB.BookChapters["Rev"] = 1167;

	// Structure of Short Book Name to Long Book Name
	BLB.BookLongName["Gen"] = "Genesis";	BLB.BookLongName["Exo"] = "Exodus";		BLB.BookLongName["Lev"] = "Leviticus";	BLB.BookLongName["Num"] = "Numbers";	BLB.BookLongName["Deu"] = "Deuteronomy";
	BLB.BookLongName["Jos"] = "Joshua";		BLB.BookLongName["Jdg"] = "Judges";		BLB.BookLongName["Rth"] = "Ruth";		BLB.BookLongName["1Sa"] = "1 Samuel";	BLB.BookLongName["2Sa"] = "2 Samuel";
	BLB.BookLongName["1Ki"] = "1 Kings";	BLB.BookLongName["2Ki"] = "2 Kings";	BLB.BookLongName["1Ch"] = "1 Chronicles";	BLB.BookLongName["2Ch"] = "2 Chronicles";	BLB.BookLongName["Ezr"] = "Ezra";
	BLB.BookLongName["Neh"] = "Nehemiah";	BLB.BookLongName["Est"] = "Esther";		BLB.BookLongName["Job"] = "Job";		BLB.BookLongName["Psa"] = "Psalms";		BLB.BookLongName["Pro"] = "Proverbs";
	BLB.BookLongName["Ecc"] = "Ecclesiastes";	BLB.BookLongName["Sng"] = "Song of Songs";	BLB.BookLongName["Isa"] = "Isaiah";		BLB.BookLongName["Jer"] = "Jeremiah";	BLB.BookLongName["Lam"] = "Lamentations";
	BLB.BookLongName["Eze"] = "Ezekiel";	BLB.BookLongName["Dan"] = "Daniel";		BLB.BookLongName["Hos"] = "Hosea";		BLB.BookLongName["Joe"] = "Joel";		BLB.BookLongName["Amo"] = "Amos";
	BLB.BookLongName["Oba"] = "Obadiah";	BLB.BookLongName["Jon"] = "Jonah";		BLB.BookLongName["Mic"] = "Micah";		BLB.BookLongName["Nah"] = "Nahum";		BLB.BookLongName["Hab"] = "Habakkuk";
	BLB.BookLongName["Zep"] = "Zephaniah";	BLB.BookLongName["Hag"] = "Haggai";		BLB.BookLongName["Zec"] = "Zechariah";	BLB.BookLongName["Mal"] = "Malachi";	BLB.BookLongName["Mat"] = "Matthew";
	BLB.BookLongName["Mar"] = "Mark";		BLB.BookLongName["Luk"] = "Luke";		BLB.BookLongName["Jhn"] = "John";		BLB.BookLongName["Act"] = "Acts";		BLB.BookLongName["Rom"] = "Romans";
	BLB.BookLongName["1Co"] = "1 Corinthians";	BLB.BookLongName["2Co"] = "2 Corinthians";	BLB.BookLongName["Gal"] = "Galatians";	BLB.BookLongName["Eph"] = "Ephesians";	BLB.BookLongName["Phl"] = "Philippians";
	BLB.BookLongName["Col"] = "Colossians";	BLB.BookLongName["1Th"] = "1 Thessalonians";	BLB.BookLongName["2Th"] = "2 Thessalonians";	BLB.BookLongName["1Ti"] = "1 Timothy";	BLB.BookLongName["2Ti"] = "2 Timothy";
	BLB.BookLongName["Tit"] = "Titus";		BLB.BookLongName["Phm"] = "Philemon";	BLB.BookLongName["Heb"] = "Hebrews";	BLB.BookLongName["Jas"] = "James";	BLB.BookLongName["1Pe"] = "1 Peter";
	BLB.BookLongName["2Pe"] = "2 Peter";	BLB.BookLongName["1Jo"] = "1 John";		BLB.BookLongName["2Jo"] = "2 John";		BLB.BookLongName["3Jo"] = "3 John";		BLB.BookLongName["Jde"] = "Jude";
	BLB.BookLongName["Rev"] = "Revelation";

	// English Bookname to Spanish
	BLB.EngToSpanish["Genesis"]="Génesis"; BLB.EngToSpanish["Exodus"]="Éxodo"; BLB.EngToSpanish["Leviticus"]="Levítico"; BLB.EngToSpanish["Numbers"]="Números"; BLB.EngToSpanish["Deuteronomy"]="Deuteronomio"; 
	BLB.EngToSpanish["Joshua"]="Josué"; BLB.EngToSpanish["Judges"]="Jueces"; BLB.EngToSpanish["Ruth"]="Rut"; BLB.EngToSpanish["1 Samuel"]="1 Samuel"; BLB.EngToSpanish["2 Samuel"]="2 Samuel"; 
	BLB.EngToSpanish["1 Kings"]="1 Reyes"; BLB.EngToSpanish["2 Kings"]="2 Reyes"; BLB.EngToSpanish["1 Chronicles"]="1 Crónicas"; BLB.EngToSpanish["2 Chronicles"]="2 Crónicas"; BLB.EngToSpanish["Ezra"]="Esdras"; 
	BLB.EngToSpanish["Nehemiah"]="Nehemías"; BLB.EngToSpanish["Esther"]="Ester"; BLB.EngToSpanish["Job"]="Job"; BLB.EngToSpanish["Psalms"]="Salmos"; BLB.EngToSpanish["Proverbs"]="Proverbios"; 
	BLB.EngToSpanish["Ecclesiastes"]="Eclesiastés"; BLB.EngToSpanish["Song of Songs"]="Cantares"; BLB.EngToSpanish["Isaiah"]="Isaías"; BLB.EngToSpanish["Jeremiah"]="Jeremías"; BLB.EngToSpanish["Lamentations"]="Lamentaciones"; 
	BLB.EngToSpanish["Ezekiel"]="Ezequiel"; BLB.EngToSpanish["Daniel"]="Daniel"; BLB.EngToSpanish["Hosea"]="Oseas"; BLB.EngToSpanish["Joel"]="Joel"; BLB.EngToSpanish["Amos"]="Amós"; 
	BLB.EngToSpanish["Obadiah"]="Abdías"; BLB.EngToSpanish["Jonah"]="Jonás"; BLB.EngToSpanish["Micah"]="Miqueas"; BLB.EngToSpanish["Nahum"]="Nahúm"; BLB.EngToSpanish["Habakkuk"]="Habacuc"; 
	BLB.EngToSpanish["Zephaniah"]="Sofonías"; BLB.EngToSpanish["Haggai"]="Hageo"; BLB.EngToSpanish["Zechariah"]="Zacarías"; BLB.EngToSpanish["Malachi"]="Malaquías"; BLB.EngToSpanish["Matthew"]="Mateo"; 
	BLB.EngToSpanish["Mark"]="Marcos"; BLB.EngToSpanish["Luke"]="Lucas"; BLB.EngToSpanish["John"]="Juan"; BLB.EngToSpanish["Acts"]="Hechos"; BLB.EngToSpanish["Romans"]="Romanos"; 
	BLB.EngToSpanish["1 Corinthians"]="1 Corintios"; BLB.EngToSpanish["2 Corinthians"]="2 Corintios"; BLB.EngToSpanish["Galatians"]="Gálatas"; BLB.EngToSpanish["Ephesians"]="Efesios"; BLB.EngToSpanish["Philippians"]="Filipenses"; 
	BLB.EngToSpanish["Colossians"]="Colosenses"; BLB.EngToSpanish["1 Thessalonians"]="1 Tesalonicenses"; BLB.EngToSpanish["2 Thessalonians"]="2 Tesalonicenses"; BLB.EngToSpanish["1 Timothy"]="1 Timoteo"; BLB.EngToSpanish["2 Timothy"]="2 Timoteo"; 
	BLB.EngToSpanish["Titus"]="Tito"; BLB.EngToSpanish["Philemon"]="Filemón"; BLB.EngToSpanish["Hebrews"]="Hebreos"; BLB.EngToSpanish["James"]="Santiago"; BLB.EngToSpanish["1 Peter"]="1 Pedro"; 
	BLB.EngToSpanish["2 Peter"]="2 Pedro"; BLB.EngToSpanish["1 John"]="1 Juan"; BLB.EngToSpanish["2 John"]="2 Juan"; BLB.EngToSpanish["3 John"]="3 Juan"; BLB.EngToSpanish["Jude"]="Judas"; BLB.EngToSpanish["Revelation"]="Apocalipsis"; 
	BLB.EngToSpanish["Gen"] ="Gén"; BLB.EngToSpanish["Exo"] ="Ex"; BLB.EngToSpanish["Lev"] ="Lev"; BLB.EngToSpanish["Num"] ="Núm"; BLB.EngToSpanish["Deu"] ="Deut"; BLB.EngToSpanish["Jos"] ="Jos"; BLB.EngToSpanish["Jdg"] ="Jue"; 
	BLB.EngToSpanish["Rth"] ="Rut"; BLB.EngToSpanish["1Sa"] ="1Sam"; BLB.EngToSpanish["2Sa"] ="2Sam"; BLB.EngToSpanish["1Ki"] ="1Rey"; BLB.EngToSpanish["2Ki"] ="2Rey"; BLB.EngToSpanish["1Ch"] ="1Crón"; BLB.EngToSpanish["2Ch"] ="2Crón"; 
	BLB.EngToSpanish["Ezr"] ="Esd"; BLB.EngToSpanish["Neh"] ="Neh"; BLB.EngToSpanish["Est"] ="Est"; BLB.EngToSpanish["Job"] ="Job"; BLB.EngToSpanish["Psa"] ="Sal"; BLB.EngToSpanish["Pro"] ="Prov"; BLB.EngToSpanish["Ecc"] ="Ecl"; 
	BLB.EngToSpanish["Sng"] ="Cant"; BLB.EngToSpanish["Isa"] ="Isa"; BLB.EngToSpanish["Jer"] ="Jer"; BLB.EngToSpanish["Lam"] ="Lam"; BLB.EngToSpanish["Eze"] ="Ezeq"; BLB.EngToSpanish["Dan"] ="Dan"; BLB.EngToSpanish["Hos"] ="Os"; 
	BLB.EngToSpanish["Joe"] ="Joel"; BLB.EngToSpanish["Amo"] ="Amós"; BLB.EngToSpanish["Oba"] ="Abd"; BLB.EngToSpanish["Jon"] ="Jon"; BLB.EngToSpanish["Mic"] ="Miq"; BLB.EngToSpanish["Nah"] ="Nah"; BLB.EngToSpanish["Hab"] ="Hab"; 
	BLB.EngToSpanish["Zep"] ="Sof"; BLB.EngToSpanish["Hag"] ="Hag"; BLB.EngToSpanish["Zec"] ="Zac"; BLB.EngToSpanish["Mal"] ="Mal"; BLB.EngToSpanish["Mat"] ="Mat"; BLB.EngToSpanish["Mar"] ="Mar"; BLB.EngToSpanish["Luk"] ="Luc"; 
	BLB.EngToSpanish["Jhn"] ="Juan"; BLB.EngToSpanish["Act"] ="Hech"; BLB.EngToSpanish["Rom"] ="Rom"; BLB.EngToSpanish["1Co"] ="1Cor"; BLB.EngToSpanish["2Co"] ="2Cor"; BLB.EngToSpanish["Gal"] ="Gal"; BLB.EngToSpanish["Eph"] ="Ef"; 
	BLB.EngToSpanish["Phl"] ="Fil"; BLB.EngToSpanish["Col"] ="Col"; BLB.EngToSpanish["1Th"] ="1Tes"; BLB.EngToSpanish["2Th"] ="2Tes"; BLB.EngToSpanish["1Ti"] ="1Tim"; BLB.EngToSpanish["2Ti"] ="2Tim"; BLB.EngToSpanish["Tit"] ="Tito"; 
	BLB.EngToSpanish["Phm"] ="Filem"; BLB.EngToSpanish["Heb"] ="Heb"; BLB.EngToSpanish["Jas"] ="Sant"; BLB.EngToSpanish["1Pe"] ="1Ped"; BLB.EngToSpanish["2Pe"] ="2Ped"; BLB.EngToSpanish["1Jo"] ="1Jn"; BLB.EngToSpanish["2Jo"] ="2Jn"; 
	BLB.EngToSpanish["3Jo"] ="3Jn"; BLB.EngToSpanish["Jde"] ="Jde"; BLB.EngToSpanish["Rev"] ="Apoc"; 

	// Structure of Verses per Chapter
	BLB.BookNumbers["Gen"]="31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26";
	BLB.BookNumbers["Exo"]="22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38";
	BLB.BookNumbers["Lev"]="17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34";
	BLB.BookNumbers["Num"]="54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13";
	BLB.BookNumbers["Deu"]="46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12";
	BLB.BookNumbers["Jos"]="18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33";
	BLB.BookNumbers["Jdg"]="36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25";
	BLB.BookNumbers["Rth"]="22,23,18,22";
	BLB.BookNumbers["1Sa"]="28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13";
	BLB.BookNumbers["2Sa"]="27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25";
	BLB.BookNumbers["1Ki"]="53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53";
	BLB.BookNumbers["2Ki"]="18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30";
	BLB.BookNumbers["1Ch"]="54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30";
	BLB.BookNumbers["2Ch"]="17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23";
	BLB.BookNumbers["Ezr"]="11,70,13,24,17,22,28,36,15,44";
	BLB.BookNumbers["Neh"]="11,20,32,23,19,19,73,18,38,39,36,47,31";
	BLB.BookNumbers["Est"]="22,23,15,17,14,14,10,17,32,3";
	BLB.BookNumbers["Job"]="22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17";
	BLB.BookNumbers["Psa"]="6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,10,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6";
	BLB.BookNumbers["Pro"]="33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31";
	BLB.BookNumbers["Ecc"]="18,26,22,16,20,12,29,17,18,20,10,14";
	BLB.BookNumbers["Sng"]="17,17,11,16,16,13,13,14";
	BLB.BookNumbers["Isa"]="31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24";
	BLB.BookNumbers["Jer"]="19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34";
	BLB.BookNumbers["Lam"]="22,22,66,22,22";
	BLB.BookNumbers["Eze"]="28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35";
	BLB.BookNumbers["Dan"]="21,49,30,37,31,28,28,27,27,21,45,13";
	BLB.BookNumbers["Hos"]="11,23,5,19,15,11,16,14,17,15,12,14,16,9";
	BLB.BookNumbers["Joe"]="20,32,21";
	BLB.BookNumbers["Amo"]="15,16,15,13,27,14,17,14,15";
	BLB.BookNumbers["Oba"]="21";
	BLB.BookNumbers["Jon"]="17,10,10,11";
	BLB.BookNumbers["Mic"]="16,13,12,13,15,16,20";
	BLB.BookNumbers["Nah"]="15,13,19";
	BLB.BookNumbers["Hab"]="17,20,19";
	BLB.BookNumbers["Zep"]="18,15,20";
	BLB.BookNumbers["Hag"]="15,23";
	BLB.BookNumbers["Zec"]="21,13,10,14,11,15,14,23,17,12,17,14,9,21";
	BLB.BookNumbers["Mal"]="14,17,18,6";
	BLB.BookNumbers["Mat"]="25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20";
	BLB.BookNumbers["Mar"]="45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20";
	BLB.BookNumbers["Luk"]="80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53";
	BLB.BookNumbers["Jhn"]="51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25";
	BLB.BookNumbers["Act"]="26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31";
	BLB.BookNumbers["Rom"]="32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27";
	BLB.BookNumbers["1Co"]="31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24";
	BLB.BookNumbers["2Co"]="24,17,18,18,21,18,16,24,15,18,33,21,14";
	BLB.BookNumbers["Gal"]="24,21,29,31,26,18";
	BLB.BookNumbers["Eph"]="23,22,21,32,33,24";
	BLB.BookNumbers["Phl"]="30,30,21,23";
	BLB.BookNumbers["Col"]="29,23,25,18";
	BLB.BookNumbers["1Th"]="10,20,13,18,28";
	BLB.BookNumbers["2Th"]="12,17,18";
	BLB.BookNumbers["1Ti"]="20,15,16,16,25,21";
	BLB.BookNumbers["2Ti"]="18,26,17,22";
	BLB.BookNumbers["Tit"]="16,15,15";
	BLB.BookNumbers["Phm"]="25";
	BLB.BookNumbers["Heb"]="14,18,19,16,14,20,28,13,28,39,40,29,25";
	BLB.BookNumbers["Jas"]="27,26,18,17,20";
	BLB.BookNumbers["1Pe"]="25,25,22,19,14";
	BLB.BookNumbers["2Pe"]="21,22,18";
	BLB.BookNumbers["1Jo"]="10,29,24,21,21";
	BLB.BookNumbers["2Jo"]="13";
	BLB.BookNumbers["3Jo"]="15";
	BLB.BookNumbers["Jde"]="25";
	BLB.BookNumbers["Rev"]="20,29,22,11,14,17,17,13,21,11,19,18,18,20,8,21,18,24,21,15,27,21";

	BLB.BookOrder["1"] = "Gen";		BLB.BookOrder["2"] = "Exo";		BLB.BookOrder["3"] = "Lev";		BLB.BookOrder["4"] = "Num";		BLB.BookOrder["5"] = "Deu";		BLB.BookOrder["6"] = "Jos";		BLB.BookOrder["7"] = "Jdg";
	BLB.BookOrder["8"] = "Rth";		BLB.BookOrder["9"] = "1Sa";		BLB.BookOrder["10"] = "2Sa";	BLB.BookOrder["11"] = "1Ki";	BLB.BookOrder["12"] = "2Ki";	BLB.BookOrder["13"] = "1Ch";	BLB.BookOrder["14"] = "2Ch";
	BLB.BookOrder["15"] = "Ezr";	BLB.BookOrder["16"] = "Neh";	BLB.BookOrder["17"] = "Est";	BLB.BookOrder["18"] = "Job";	BLB.BookOrder["19"] = "Psa";	BLB.BookOrder["20"] = "Pro";	BLB.BookOrder["21"] = "Ecc";
	BLB.BookOrder["22"] = "Sng";	BLB.BookOrder["23"] = "Isa";	BLB.BookOrder["24"] = "Jer";	BLB.BookOrder["25"] = "Lam";	BLB.BookOrder["26"] = "Eze";	BLB.BookOrder["27"] = "Dan";	BLB.BookOrder["28"] = "Hos";
	BLB.BookOrder["29"] = "Joe";	BLB.BookOrder["30"] = "Amo";	BLB.BookOrder["31"] = "Oba";	BLB.BookOrder["32"] = "Jon";	BLB.BookOrder["33"] = "Mic";	BLB.BookOrder["34"] = "Nah";	BLB.BookOrder["35"] = "Hab";
	BLB.BookOrder["36"] = "Zep";	BLB.BookOrder["37"] = "Hag";	BLB.BookOrder["38"] = "Zec";	BLB.BookOrder["39"] = "Mal";	BLB.BookOrder["40"] = "Mat";	BLB.BookOrder["41"] = "Mar";	BLB.BookOrder["42"] = "Luk";
	BLB.BookOrder["43"] = "Jhn";	BLB.BookOrder["44"] = "Act";	BLB.BookOrder["45"] = "Rom";	BLB.BookOrder["46"] = "1Co";	BLB.BookOrder["47"] = "2Co";	BLB.BookOrder["48"] = "Gal";	BLB.BookOrder["49"] = "Eph";
	BLB.BookOrder["50"] = "Phl";	BLB.BookOrder["51"] = "Col";	BLB.BookOrder["52"] = "1Th";	BLB.BookOrder["53"] = "2Th";	BLB.BookOrder["54"] = "1Ti";	BLB.BookOrder["55"] = "2Ti";	BLB.BookOrder["56"] = "Tit";
	BLB.BookOrder["57"] = "Phm";	BLB.BookOrder["58"] = "Heb";	BLB.BookOrder["59"] = "Jas";	BLB.BookOrder["60"] = "1Pe";	BLB.BookOrder["61"] = "2Pe";	BLB.BookOrder["62"] = "1Jo";	BLB.BookOrder["63"] = "2Jo";
	BLB.BookOrder["64"] = "3Jo";	BLB.BookOrder["65"] = "Jde";	BLB.BookOrder["66"] = "Rev";

	BLB.BookOrder["Gen"] = 1;	BLB.BookOrder["Exo"] = 2;	BLB.BookOrder["Lev"] = 3;	BLB.BookOrder["Num"] = 4;	BLB.BookOrder["Deu"] = 5;	BLB.BookOrder["Jos"] = 6;	BLB.BookOrder["Jdg"] = 7;
	BLB.BookOrder["Rth"] = 8;	BLB.BookOrder["1Sa"] = 9;	BLB.BookOrder["2Sa"] = 10;	BLB.BookOrder["1Ki"] = 11;	BLB.BookOrder["2Ki"] = 12;	BLB.BookOrder["1Ch"] = 13;	BLB.BookOrder["2Ch"] = 14;
	BLB.BookOrder["Ezr"] = 15;	BLB.BookOrder["Neh"] = 16;	BLB.BookOrder["Est"] = 17;	BLB.BookOrder["Job"] = 18;	BLB.BookOrder["Psa"] = 19;	BLB.BookOrder["Pro"] = 20;	BLB.BookOrder["Ecc"] = 21;
	BLB.BookOrder["Sng"] = 22;	BLB.BookOrder["Isa"] = 23;	BLB.BookOrder["Jer"] = 24;	BLB.BookOrder["Lam"] = 25;	BLB.BookOrder["Eze"] = 26;	BLB.BookOrder["Dan"] = 27;	BLB.BookOrder["Hos"] = 28;
	BLB.BookOrder["Joe"] = 29;	BLB.BookOrder["Amo"] = 30;	BLB.BookOrder["Oba"] = 31;	BLB.BookOrder["Jon"] = 32;	BLB.BookOrder["Mic"] = 33;	BLB.BookOrder["Nah"] = 34;	BLB.BookOrder["Hab"] = 35;
	BLB.BookOrder["Zep"] = 36;	BLB.BookOrder["Hag"] = 37;	BLB.BookOrder["Zec"] = 38;	BLB.BookOrder["Mal"] = 39;	BLB.BookOrder["Mat"] = 40;	BLB.BookOrder["Mar"] = 41;	BLB.BookOrder["Luk"] = 42;
	BLB.BookOrder["Jhn"] = 43;	BLB.BookOrder["Act"] = 44;	BLB.BookOrder["Rom"] = 45;	BLB.BookOrder["1Co"] = 46;	BLB.BookOrder["2Co"] = 47;	BLB.BookOrder["Gal"] = 48;	BLB.BookOrder["Eph"] = 49;
	BLB.BookOrder["Phl"] = 50;	BLB.BookOrder["Col"] = 51;	BLB.BookOrder["1Th"] = 52;	BLB.BookOrder["2Th"] = 53;	BLB.BookOrder["1Ti"] = 54;	BLB.BookOrder["2Ti"] = 55;	BLB.BookOrder["Tit"] = 56;
	BLB.BookOrder["Phm"] = 57;	BLB.BookOrder["Heb"] = 58;	BLB.BookOrder["Jas"] = 59;	BLB.BookOrder["1Pe"] = 60;	BLB.BookOrder["2Pe"] = 61;	BLB.BookOrder["1Jo"] = 62;	BLB.BookOrder["2Jo"] = 63;
	BLB.BookOrder["3Jo"] = 64;	BLB.BookOrder["Jde"] = 65;	BLB.BookOrder["Rev"] = 66;

	BLB.keyCodes = { space: 32, backspace: 8, tab: 9, enter: 13, shift: 16, ctrl: 17, alt: 18, pause: 19, 'break': 19, capsLock: 20, escape: 27, pageUp: 33, pageDown: 34, end: 35, home: 36, leftArrow: 37, upArrow: 38, rightArrow: 39, downArrow: 40, 'insert': 45, 'delete': 46, 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90, leftWindow: 91, rightWindowkey: 92, selectKey: 93, numpad0: 96, numpad1: 97, numpad2: 98, numpad3: 99, numpad4: 100, numpad5: 101, numpad6: 102, numpad7: 103, numpad8: 104, numpad9: 105, multiply: 106, add: 107, subtract: 109, decimal: 110, divide: 111, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120, f10: 121, f11: 122, f12: 123, numLock: 144, scrollLock: 145, semiColon: 186, equal: 187, comma: 188, dash: 189, period: 190, forwardSlash: 191, graveAccent: 192, openBracket: 219, backSlash: 220, closeBraket: 221, singleQuote: 222 };
	BLB.tld = {};
	BLB.tld.list = 'aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,amazon,americanexpress,americanfamily,amex,amfam,amica,amsterdam,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,arab,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,black,blackfriday,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,bosch,bostik,boston,bot,boutique,box,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,casa,case,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,charity,chase,chat,cheap,chintai,christmas,chrome,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cpa,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dog,domains,dot,download,drive,dtv,dubai,duck,dunlop,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,email,emerck,energy,engineer,engineering,enterprises,epson,equipment,er,ericsson,erni,es,esq,estate,et,etisalat,eu,eurovision,eus,events,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gay,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,grocery,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,horse,hospital,host,hosting,hot,hoteles,hotels,hotmail,house,how,hr,hsbc,ht,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,inc,industries,infiniti,info,ing,ink,institute,insurance,insure,int,international,intuit,investments,io,ipiranga,iq,ir,irish,is,ismaili,ist,istanbul,it,itau,itv,jaguar,java,jcb,je,jeep,jetzt,jewelry,jio,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,lamborghini,lamer,lancaster,lancia,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,llc,llp,loan,loans,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,map,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,merckmsd,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,moda,moe,moi,mom,monash,money,monster,mormon,mortgage,moscow,moto,motorcycles,mov,movie,mp,mq,mr,ms,msd,mt,mtn,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nagoya,name,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,ooo,open,oracle,orange,org,organic,origins,osaka,otsuka,ott,ovh,pa,page,panasonic,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,phd,philips,phone,photo,photography,photos,physio,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,rugby,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scot,sd,se,search,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,spa,space,sport,spot,sr,srl,ss,st,stada,staples,star,statebank,statefarm,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,ug,uk,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xn--11b4c3d,xn--1ck2e1b,xn--1qqw23a,xn--2scrj9c,xn--30rr7y,xn--3bst00m,xn--3ds443g,xn--3e0b707e,xn--3hcrj9c,xn--3oq18vl8pn36a,xn--3pxu8k,xn--42c2d9a,xn--45br5cyl,xn--45brj9c,xn--45q11c,xn--4dbrk0ce,xn--4gbrim,xn--54b7fta0cc,xn--55qw42g,xn--55qx5d,xn--5su34j936bgsg,xn--5tzm5g,xn--6frz82g,xn--6qq986b3xl,xn--80adxhks,xn--80ao21a,xn--80aqecdr1a,xn--80asehdb,xn--80aswg,xn--8y0a063a,xn--90a3ac,xn--90ae,xn--90ais,xn--9dbq2a,xn--9et52u,xn--9krt00a,xn--b4w605ferd,xn--bck1b9a5dre4c,xn--c1avg,xn--c2br7g,xn--cck2b3b,xn--cckwcxetd,xn--cg4bki,xn--clchc0ea0b2g2a9gcd,xn--czr694b,xn--czrs0t,xn--czru2d,xn--d1acj3b,xn--d1alf,xn--e1a4c,xn--eckvdtc9d,xn--efvy88h,xn--fct429k,xn--fhbei,xn--fiq228c5hs,xn--fiq64b,xn--fiqs8s,xn--fiqz9s,xn--fjq720a,xn--flw351e,xn--fpcrj9c3d,xn--fzc2c9e2c,xn--fzys8d69uvgm,xn--g2xx48c,xn--gckr3f0f,xn--gecrj9c,xn--gk3at1e,xn--h2breg3eve,xn--h2brj9c,xn--h2brj9c8c,xn--hxt814e,xn--i1b6b1a6a2e,xn--imr513n,xn--io0a7i,xn--j1aef,xn--j1amh,xn--j6w193g,xn--jlq480n2rg,xn--jlq61u9w7b,xn--jvr189m,xn--kcrx77d1x4a,xn--kprw13d,xn--kpry57d,xn--kput3i,xn--l1acc,xn--lgbbat1ad8j,xn--mgb9awbf,xn--mgba3a3ejt,xn--mgba3a4f16a,xn--mgba7c0bbn0a,xn--mgbaakc7dvf,xn--mgbaam7a8h,xn--mgbab2bd,xn--mgbah1a3hjkrd,xn--mgbai9azgqp6j,xn--mgbayh7gpa,xn--mgbbh1a,xn--mgbbh1a71e,xn--mgbc0a9azcg,xn--mgbca7dzdo,xn--mgbcpq6gpa1a,xn--mgberp4a5d4ar,xn--mgbgu82a,xn--mgbi4ecexp,xn--mgbpl2fh,xn--mgbt3dhd,xn--mgbtx2b,xn--mgbx4cd0ab,xn--mix891f,xn--mk1bu44c,xn--mxtq1m,xn--ngbc5azd,xn--ngbe9e0a,xn--ngbrx,xn--node,xn--nqv7f,xn--nqv7fs00ema,xn--nyqy26a,xn--o3cw4h,xn--ogbpf8fl,xn--otu796d,xn--p1acf,xn--p1ai,xn--pgbs0dh,xn--pssy2u,xn--q7ce6a,xn--q9jyb4c,xn--qcka1pmc,xn--qxa6a,xn--qxam,xn--rhqv96g,xn--rovu88b,xn--rvc1e0am3e,xn--s9brj9c,xn--ses554g,xn--t60b56a,xn--tckwe,xn--tiq49xqyj,xn--unup4y,xn--vermgensberater-ctb,xn--vermgensberatung-pwb,xn--vhquv,xn--vuq861b,xn--w4r85el8fhu5dnra,xn--w4rs40l,xn--wgbh1c,xn--wgbl6a,xn--xhq521b,xn--xkc2al3hye2a,xn--xkc2dl3a5ee0h,xn--y9a3aq,xn--yfro4i67o,xn--ygbi2ammx,xn--zfr164b,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yun,za,zappos,zara,zero,zip,zm,zone,zuerich,zw';
	tld = BLB.tld.list.split(/,/);
	for(var i=0;i<tld.length;i++) BLB.tld[tld[i]]=i;
	BLB.protoTypesLoaded = true;
})();

/*
space
backspace
tab
enter
shift
ctrl
alt
pause
break
capsLock
escape
pageUp
pageDown
end
home
leftArrow
upArrow
rightArrow
downArrow
insert
delete
0
1
2
3
4
5
6
7
8
9
a
b
c
d
e
f
g
h
i
j
k
l
m
n
o
p
q
r
s
t
u
v
w
x
y
z
leftWindow
rightWindowkey
selectKey
numpad0
numpad1
numpad2
numpad3
numpad4
numpad5
numpad6
numpad7
numpad8
numpad9
multiply
add
subtract
decimal
divide
f1
f2
f3
f4
f5
f6
f7
f8
f9
f10
f11
f12
numLock
scrollLock
semiColon
equal
comma
dash
period
forwardSlash
graveAccent
openBracket
backSlash
closeBraket
singleQuote
*/
