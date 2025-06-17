import { useState, useEffect, useRef } from "react";

const stacks = {
  // Structured Stack - suositut kortit sijoitettu paikoille, joista saadaan siistejä jakoja (20–30 korttia ennen tai jälkeen flipin)
  // Uusi Guided Stack - optimoitu siten, että suositut kortit ovat paikoilla 10–41 (helppo jako ilman flippiä)
  // Voit lisätä tänne uusia pakkoja. Muista: jokaisessa on oltava täsmälleen 52 korttia oikeassa muodossa.
  Mnemonica: [
    "4C", "2H", "7D", "3C", "4H", "6D", "AS", "5H", "9S", "2S",
    "QH", "3D", "QC", "8H", "6S", "5S", "9H", "KC", "2D", "JH",
    "3S", "8S", "6H", "10C", "5D", "KD", "2C", "3H", "8D", "5C",
    "KS", "JD", "8C", "10S", "KH", "JC", "7S", "10H", "AD", "4S",
    "7H", "4D", "AC", "9C", "JS", "QD", "7C", "QS", "10D", "6C",
    "AH", "9D"
  ],
  "Optimized Stack": [
    "2S", "3S", "QS", "8H", "10H", "10C", "AS", "4H", "8D", "10D", "QD", "AD", "2C",
    "JC", "QC", "10S", "QH", "2H", "3H", "5H", "2D", "4C", "AC", "8C", "4S", "7S",
    "AH", "8S", "6H", "7H", "4D", "KC", "7D", "JD", "3C", "5C", "KH", "7C", "5S",
    "JH", "6S", "9S", "KS", "9H", "3D", "5D", "6D", "JS", "9D", "6C", "KD", "9C"
  ]
,

  // Esimerkkipakka, voit muuttaa nimeä ja järjestystä vapaasti
  "Example Stack": [
    "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS",
    "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH",
    "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD",
    "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC"
  ],

  "Guided Stack": [
    "7C", "8C", "3C", "9C", "10C", "3D", "5D", "2C", "7D", "4C",
    "AS", "10S", "AC", "KH", "AD", "10H", "KC", "AH", "2S", "QS",
    "JS", "QH", "3S", "5H", "9S", "4S", "KD", "7H", "8S", "6S",
    "2H", "5S", "7S", "8H", "3H", "4H", "JD", "6H", "9H", "JH",
    "KS", "2D", "QC", "8D", "5C", "10D", "4D", "6D", "6C", "JC",
    "9D", "QD"
  ],

  "Structured Stack": [
    "9S", "4S", "KD", "7H", "8S", "6S", "2H", "5S", "7S", "8H",
    "3H", "4H", "JD", "6H", "9H", "JH", "KS", "2D", "QC", "3S",
    "JS", "2S", "AS", "10S", "AC", "KH", "AD", "10H", "KC", "AH",
    "QS", "QH", "5H", "9D", "5D", "10D", "3D", "6D", "4D", "8D",
    "2C", "6C", "7C", "3C", "4C", "7D", "5C", "8C", "9C", "10C",
    "JC", "QD"
  ]
};

const normalizeCardInput = (value) => {
  value = value.toLowerCase().trim().replace(/^b/, 'j').replace(/b$/, 'j');

  // Korvaa maat
  value = value.replace(/♠️|spade|pata/, 's')
               .replace(/♥️|heart|hertta/, 'h')
               .replace(/♦️|diamond|ruutu/, 'd')
               .replace(/♣️|club|risti/, 'c');

  // Korvaa nimetyt arvot
  value = value.replace(/ässä/, 'a')
               .replace(/rouva|akka/, 'q')
               .replace(/jätkä/, 'j')
               .replace(/kuningas|kunkku/, 'k');

  const parts = value.split(/\s+/);
  if (parts.length === 2) {
    const [part1, part2] = parts;
    const isSuit = (s) => ['s','h','d','c'].includes(s);
    if (isSuit(part1)) {
      value = part2 + part1;
    } else if (isSuit(part2)) {
      value = part1 + part2;
    } else {
      value = part1 + part2;
    }
  }

  // Jos on muotoa kuten "kh" tai "pj", ja molemmat merkit yksittäisiä
  if (value.length === 2) {
    const [r, s] = value;
    const ranks = "a23456789jqk";
    const suits = "shdc";
    if (ranks.includes(r) && suits.includes(s)) {
      value = r + s;
    } else if (suits.includes(r) && ranks.includes(s)) {
      value = s + r;
    }
  }

  return value.toUpperCase();
};


export default function ACAANApp() {
  //const [selectedStackName, setSelectedStackName] = useState(null);
  const [selectedStackName, setSelectedStackName] = useState("Mnemonica");
  const [deck, setDeck] = useState(stacks["Mnemonica"]);
  // yllä oletukseksi määritelty ilman valikkoa Mnemonica
  //const [deck, setDeck] = useState([]);
  const [cardPosition, setCardPosition] = useState(null);
  const [numberRange, setNumberRange] = useState(null);
  const [instructions, setInstructions] = useState({});
  const [revealInstructions, setRevealInstructions] = useState(false);
  const cardInputRef = useRef(null);

  useEffect(() => {
    if (cardInputRef.current) {
      cardInputRef.current.focus();
    }
  }, [deck]);

  const getCardPosition = (card) => deck.indexOf(card) + 1;

  const getValidRange = (pos) => {
    let lower = pos <= 26 ? pos : pos - 26;
    let upper = Math.min(52, lower + 25);
    return [lower, upper];
  };

  const getDealingInstructions = (pos, number) => {
    const n = parseInt(number);
    if (pos <= 26) {
      if (n === pos) return { start: "Side 1", dealFirst: pos, flip: false, dealAfterFlip: 0 };
      return { start: "Side 2", dealFirst: n - pos, flip: true, dealAfterFlip: pos };
    } else {
      const s2 = pos - 26;
      if (n === s2) return { start: "Side 2", dealFirst: s2, flip: false, dealAfterFlip: 0 };
      if (n === pos) return { start: "Side 1", dealFirst: pos, flip: false, dealAfterFlip: 0 };
      return { start: "Side 1", dealFirst: n - s2, flip: true, dealAfterFlip: s2 };
    }
  };

  const handleCardSelection = (card) => {
    const pos = getCardPosition(card);
    setCardPosition(pos);
    setInstructions({});
    setNumberRange(getValidRange(pos));
  };

  const handleNumberSubmit = (value) => {
    if (!value || value.trim() === "") return;
    let pos = cardPosition;
    if (!pos && cardInputRef.current) {
      const card = normalizeCardInput(cardInputRef.current.value);
      if (deck.includes(card)) {
        pos = getCardPosition(card);
        setCardPosition(pos);
        setNumberRange(getValidRange(pos));
      } else {
        alert("Card not found in selected stack.");
        return;
      }
    }
    const [min, max] = numberRange;
    const n = parseInt(value.trim());
    if (isNaN(n) || n < min || n > max) {
      alert(`Please enter a number between ${min} and ${max}.`);
      return;
    }
    setInstructions(getDealingInstructions(pos, n));
  };

  if (!selectedStackName) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      }}>
        <div style={{ textAlign: "center" }}>
          <h2>Valitse käytettävä korttipakka</h2>
          <select
            style={{ fontSize: "1.2rem", padding: "10px", borderRadius: 8 }}
            onChange={(e) => {
              const name = e.target.value;
              if (name) {
                setSelectedStackName(name);
                setDeck(stacks[name]);
              }
            }}
          >
            <option value="">-- Valitse pakka --</option>
            {Object.keys(stacks).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  //const bgUrl = "/img/IMG_3130.PNG";

  return (
    <>
      {typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent) && Object.keys(instructions).length > 0 && (
        <div
          onClick={() => setRevealInstructions(prev => !prev)}
          style={{ position: "fixed", bottom: 10, left: 10, width: 80, height: 80, backgroundColor: "transparent", zIndex: 10 }}
        />
      )}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
		backgroundImage: `url(${process.env.PUBLIC_URL}/img/IMG_3130.PNG)`,
 //       backgroundImage: `url(${bgUrl})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
      }} />
      <div style={{ position: "relative", minHeight: "100vh", width: "100vw", padding: '40px', boxSizing: "border-box" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ padding: 20, borderRadius: 12, backgroundColor: "transparent" }}>
            <div style={{ fontSize: '0.9rem', color: 'gray', textAlign: 'center' }}>
              {new Date().toLocaleString(undefined, { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </div>
            <div style={{ marginTop: 10 }}>
              <input
                ref={cardInputRef}
                id="card-input"
                tabIndex={0}
                onFocus={() => {
                  setCardPosition(null);
                  setRevealInstructions(false);
                  setNumberRange(null);
                  setInstructions({});
                }}
                onKeyDown={(e) => {
                  if (["Enter", "Tab"].includes(e.key)) {
                    const value = normalizeCardInput(e.currentTarget.value);
                    if (deck.includes(value)) {
                      handleCardSelection(value);
                      setTimeout(() => document.getElementById("number-input")?.focus(), 10);
                    } else {
                      alert("Card not found in selected stack.");
                    }
                  }
                }}
                style={{
                  width: "80%",
                  padding: 2,
                  marginTop: 5,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "1.4rem"
                }}
              />
            </div>
            {numberRange && (
              <>
                <div style={{ marginTop: 6 }}>
                  <input
                    id="number-input"
                    tabIndex={0}
                    type="text"
                    onFocus={() => setRevealInstructions(false)}
                    onKeyDown={(e) => {
                      if (["Enter", "Tab"].includes(e.key)) {
                        handleNumberSubmit(e.currentTarget.value);
                      }
                    }}
                    onBlur={(e) => {
                      handleNumberSubmit(e.currentTarget.value);
                    }}
                    style={{
                      width: "80%",
                      padding: 2,
                      marginTop: 5,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: "1.4rem"
                    }}
                  />
                </div>
                {Object.keys(instructions).length === 0 && (
                  <p style={{ marginTop: 10 }}>{numberRange[0]}–{numberRange[1]}</p>
                )}
              </>
            )}
            {Object.keys(instructions).length > 0 &&
              (!/Mobi|Android/i.test(navigator.userAgent) || revealInstructions) && (
                <div style={{ marginTop: 30 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 20, height: 20, backgroundColor: instructions.start === 'Side 1' ? 'red' : 'black' }}></div>
                    <span>- {instructions.dealFirst} - {instructions.flip ? instructions.dealAfterFlip : 0}</span>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
