// HTML elementlerini seçiyoruz
const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchangeIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

// Dil seçeneklerini oluşturuyoruz
selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        // İlk select kutusu için varsayılan olarak İngilizce'yi seçiyoruz
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        // İkinci select kutusu için varsayılan olarak Türkçe'yi seçiyoruz
        } else if (id == 1 && country_code == "tr-TR") {
            selected = "selected";
        }
      
        // Seçenek oluşturup select kutusuna ekliyoruz
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Değişim ikonuna tıklama olayını ekliyoruz
exchangeIcon.addEventListener("click", () => {
    // Metinleri ve dilleri değiştiriyoruz
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});

// Çeviri butonuna tıklama olayını ekliyoruz
translateBtn.addEventListener("click", () => {
    // Çeviri için gerekli verileri alıyoruz
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    console.log(text, translateFrom, translateTo);

    // Çeviri API'sini çağırıyoruz
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        // Çeviri sonucunu toText alanına yazıyoruz
        toText.value = data.responseData.translatedText;
    });
});

// İkonlara tıklama olaylarını ekliyoruz
icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if (target.classList.contains("fa-copy")) {
            // Kopyalama işlemi
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            // Konuşma işlemi
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});
