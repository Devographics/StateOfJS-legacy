---
type: conclusion
section: testing
locale: hu-HU
---
 A tesztelői tér egyfajta furcsaság: amíg a JavaScript ökoszisztéma más részei szépen lassan letelepedtek pár domináns megoldás mellett, addig a tesztelés a mai napig igen fragmentált: sok különböző, egymást kiegészítő eszköz osztozik a tortán. Még így is, a fejlesztők összességében elégedettek a tesztelő megoldásaikkal, ahogyan azt a legalacsonyabb  68%-os elégedettségi ráta is mutatja.

A felmérés megerősíti, hogy a **Mocha** még mindig a leghasználtabb unit tesztelő keretrendszer, több mint 10.000 felhasználóval. Mivel ez az egyik legrégebbi eszköz, ennek a legnagyobb ökoszisztémája, és a legtöbb Node.js fejlesztő jól ismeri.

A **Jest** szorosan a nyomában felhasználók számát tekintve, valamint kicsivel magasabb elégedettségi rátával: 92% vs. 82%. Mellékesen a 96% a második legmagasabb elégedettségi ráta az egész felmérésben idén. Csak az ES6 szerzett jobb jegyet!

Ez azt mutatja, hogy a fejlesztők igazán díjazzák a Facebook erőfeszítéseit, hogy egy teljes értékű teszt keretrendszert tegyen le az asztalra, ami ugyanúgy használható front-end (a kezdetben csak React komponensek tesztelése volt a szándék) mint back-end kód tesztelésére is, bárminemű konfiguráció nélkül.

Az "Egyoldalas alkalmazások" korában, a web alkalmazások egyre összetettebbé válnak, több és több logika van implementálva a kliens oldalon. A felmérés tisztán megmutatja, hogy a fejlesztők sokféle eszközt használnak alkalmazásaik tesztelésére.

A tesztelés spektruma nagy: unit tesztelés, integráció tesztelés, végponttól végpontig terjedő tesztelés, ahogy "vizuális tesztelés" is, ahogy látjuk a **Storybook** sikerén (a második legnagyobb elégedettségi ráta ebben a kategóriában).

A jövő tesztelési megoldásai több, böngészőben futtatható automatizált tesztet hozhatnak. Olyan projektek jelenhetnek meg a felmérésben jövőre, mint a [Cypress](https://www.cypress.io/), és több eszközre is számíthatunk amik a [Puppeteer](https://pptr.dev/)-re alapoznak.