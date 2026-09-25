function calculateGrade() {
  // Vize ve Final notlarını al
  var vize = Number(document.getElementById("inputVize").value);
  var final = Number(document.getElementById("inputFinal").value);
  var resultDiv = document.getElementById("test");

  // Geçerli sayı kontrolü
  if (isNaN(vize) || isNaN(final) || vize < 0 || final < 0 || vize > 100 || final > 100) {
    resultDiv.innerHTML = "Lütfen 0-100 arası geçerli bir not girin.";
    resultDiv.className = "alert alert-danger text-center mt-3";
    return;
  }

  // Ortalama hesaplama
  var ortalama = vize * 0.3 + final * 0.7;

  // Sonucu göster
  if (ortalama < 35) {
    resultDiv.innerHTML = "Kaldın! Ortalamanız: " + ortalama.toFixed(2);
    resultDiv.className = "alert alert-danger text-center mt-3";
  } else {
    resultDiv.innerHTML = "Geçtin! Ortalamanız: " + ortalama.toFixed(2);
    resultDiv.className = "alert alert-success text-center mt-3";
  }
}