✅ Yhteenveto

Tämä sovellus on suunniteltu taikureille ACAAN-tempun suorittamiseen Mnemonica-pinolla. Se laskee automaattisesti tarvittavat jako-ohjeet ja tarjoaa mahdollisuuden mobiilipiilotukseen, jotta ohjeet saa esiin vain kun taikuri haluaa.

🔍 Ohjelman tarkoitus

Auttaa taikuria toteuttamaan ACAAN-tempun käyttämällä Mnemonica-järjestystä, laskemalla automaattisesti:

    Valitun kortin sijainnin Mnemonica-pinossa

    Sallitun numerovalikoiman (niin että temppu voidaan suorittaa)

    Tarkan toimintasuunnitelman (kumpi puolisko pakkaa, kuinka monta korttia jaeta ennen ja jälkeen käännön)

🧠 Ohjelman keskeinen logiikka

    Mnemonica-pino (52 kortin järjestys) on kovakoodattu mnemonica-taulukkoon.

    Käyttäjä kirjoittaa kortin (esim. 4C tai ♣️4), jolloin:

        Kortin sijainti Mnemonica-pinossa lasketaan.

        Sen perusteella määritetään sallitut numerot, joita temppu voi käyttää.

    Käyttäjä syöttää numeron (esim. 17), jolloin:

        Ohjelma laskee tarvittavat jako-ohjeet:

            Kumpi puoli pakasta aloitetaan (Side 1 vai Side 2)

            Kuinka monta korttia jaetaan ennen kääntöä

            Tarvitaanko kääntö

            Kuinka monta korttia käännön jälkeen

    Ohjeet näytetään selkeästi (väritetty neliö ja tekstit)

🧰 Keskeiset komponentit ja toiminnot
Osio	Tarkoitus
cardInputRef	Viittaa ensimmäiseen input-kenttään (kortin syöttö)
getCardPosition(card)	Palauttaa kortin sijainnin Mnemonica-pinossa (1–52)
getValidRange(pos)	Määrittää numerovälin, johon temppu voidaan suorittaa (jotta jako on mahdollinen)
getDealingInstructions(pos, number)	Palauttaa toimintaohjeet: kumpi puoli aloittaa, jaot, käännöt
handleCardSelection(card)	Päivittää kortin sijainnin ja sallitun numerovälin
handleNumberSubmit(value)	Vahvistaa numeron ja laskee ohjeet, jos kaikki kelvollista
📱 Mobiilikäyttö

    Jos käyttäjä on mobiilissa, näytön alareunassa oleva läpinäkyvä alue toimii napina: se paljastaa tai piilottaa ohjeet.

    Tämä on tehty estämään ohjeiden näkyminen ennen aikojaan esitystilanteessa.

💡 Esimerkki

Jos käyttäjä syöttää:

    Kortti: AS (ässa pata) – joka on sijalla 7 Mnemonica-pinossa

    Numero: 10

Sovellus laskee:

    Side 2 aloitus

    Deal 3, flip, sitten deal 7

    Näytetään: 🔲 musta laatikko ja teksti “– 3 – 7”

🖼️ Visuaaliset yksityiskohdat

    Taustakuvana on IMG_3130.PNG, jonka oletetaan olevan taikatemppuun liittyvä kuva.

    Käyttöliittymä on minimalistinen, jotta se toimii lavalla tai puhelimella ilman turhaa hälinää.



## 🇬🇧 Description (English)

**ACAANApp** is an interactive tool designed for magicians to help perform the **Any Card At Any Number (ACAAN)** routine using the **Mnemonica stack**.

The user inputs a selected card and a number, and the app automatically calculates:
- the card's position in the Mnemonica stack
- the valid range of numbers for the trick to work
- exact dealing instructions: which side to start from, how many cards to deal, whether to flip the packet

The app includes mobile-specific features such as tap-to-reveal instructions, making it discreet and usable during live performances.

### 🔧 Technical Info
- Built with **React** (function component)
- Mnemonica stack is hardcoded in the `mnemonica` array
- Uses `useRef`, `useState`, and `useEffect` hooks
- Background image: `public/img/IMG_3130.PNG`

### 📱 Mobile Usage
On mobile, tap the lower-left corner of the screen to toggle instructions visibility.

---

## 🔗 Käyttöönotto / Getting Started

1. Aseta taustakuva `public/img/IMG_3130.PNG` hakemistoon
2. Lisää komponentti React-sovellukseesi tai suorita itsenäisesti
3. Käynnistä sovellus tavalliseen tapaan:
```bash
npm install
npm start

-------
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
