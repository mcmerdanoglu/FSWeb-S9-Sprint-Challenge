import React, { useState } from "react";
import axios from "axios";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [form, setForm] = useState({
    email: initialEmail,
    message: initialMessage,
  });
  const [counter, setCounter] = useState(initialSteps);
  const [currIndex, setCurrIndex] = useState(initialIndex);

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    if (currIndex < 3) {
      return [(currIndex % 3) + 1, 1];
    } else if (currIndex < 6) {
      return [(currIndex % 3) + 1, 2];
    } else if (currIndex < 9) {
      return [(currIndex % 3) + 1, 3];
    }
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setForm({ ...form, email: initialEmail, message: initialMessage });
    setCounter(initialSteps);
    setCurrIndex(initialIndex);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    const { id } = yon.target;
    switch (id) {
      case "left":
        if (currIndex !== 0 && currIndex !== 3 && currIndex !== 6) {
          setCurrIndex(currIndex - 1);
          setCounter(counter + 1);
          setForm({ ...form, message: "" });
        } else {
          setForm({ ...form, message: "Sola gidemezsiniz" });
        }
        break;
      case "up":
        if (currIndex !== 0 && currIndex !== 1 && currIndex !== 2) {
          setCurrIndex(currIndex - 3);
          setCounter(counter + 1);
          setForm({ ...form, message: "" });
        } else {
          setForm({ ...form, message: "Yukarıya gidemezsiniz" });
        }
        break;
      case "right":
        if (currIndex !== 2 && currIndex !== 5 && currIndex !== 8) {
          setCurrIndex(currIndex + 1);
          setCounter(counter + 1);
          setForm({ ...form, message: "" });
        } else {
          setForm({ ...form, message: "Sağa gidemezsiniz" });
        }
        break;
      case "down":
        if (currIndex !== 6 && currIndex !== 7 && currIndex !== 8) {
          setCurrIndex(currIndex + 3);
          setCounter(counter + 1);
          setForm({ ...form, message: "" });
        } else {
          setForm({ ...form, message: "Aşağıya gidemezsiniz" });
        }
        break;
      default:
        console.log(`Geçersiz yön...`);
    }
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    const event = evt;
    sonrakiIndex(event);
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    const { value, name } = evt.target;
    setForm({ ...form, [name]: value });
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    const { email } = form;
    const arrCoordinates = getXY();
    axios
      .post("http://localhost:9000/api/result", {
        x: arrCoordinates[0],
        y: arrCoordinates[1],
        steps: counter,
        email: email,
      })
      .then((res) => {
        console.log("success =>", res.data);
        setForm({ ...form, email: initialEmail, message: res.data.message });
      })
      .catch((err) => {
        console.error(err);
        if (email === "")
          setForm({
            ...form,
            message: "Ouch: email is required" /*Hata: email girilmelidir */,
          });
        if (email !== "" && !email.includes("@"))
          setForm({
            ...form,
            message:
              "Ouch: email must be a valid email" /*"Hata: geçerli bir email girilmelidir"*/,
          });
        if (email !== "" && !email.slice(email.length - 4).includes(".com"))
          setForm({ ...form, message: err.response.data.message });
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        {/* <h3 id="coordinates">Koordinatlar (2, 2)</h3> */}
        <h3 id="coordinates">Koordinatlar ({getXY().join(", ")})</h3>
        {/* <h3 id="steps">0 kere ilerlediniz</h3> */}
        <h3 id="steps">
          {/* {counter <= 0
            ? "Henüz ilerlemediniz"
            : counter + " kere ilerlediniz"} */}
          {counter <= 0 ? "0" : counter} kere ilerlediniz
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === /*4*/ currIndex ? " active" : ""}`}
          >
            {idx === /*4*/ currIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{form.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={ilerle}>
          SOL
        </button>
        <button id="up" onClick={ilerle}>
          YUKARI
        </button>
        <button id="right" onClick={ilerle}>
          SAĞ
        </button>
        <button id="down" onClick={ilerle}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          name="email"
          onChange={onChange}
          value={form.email}
        ></input>
        <input id="submit" type="submit" onClick={onSubmit}></input>
      </form>
    </div>
  );
}
