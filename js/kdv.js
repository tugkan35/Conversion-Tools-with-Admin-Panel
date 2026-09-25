function calculateKDV() {
  // Kullanıcıdan fiyat ve KDV oranını al
  var price = Number(document.getElementById("inputPrice").value);
  var taxRate = Number(document.getElementById("inputTaxRate").value);
  var resultDiv = document.getElementById("test");

  // Geçerli sayı kontrolü
  if (isNaN(price) || isNaN(taxRate) || price <= 0 || taxRate < 0) {
    resultDiv.innerHTML = "Lütfen geçerli bir fiyat ve KDV oranı girin.";
    resultDiv.className = "alert alert-danger text-center";
    return;
  }

  // KDV hesaplama
  var taxAmount = (price * taxRate) / 100;
  var totalPrice = price + taxAmount;

  // Sonucu göster
  resultDiv.innerHTML = `
    <strong>Fiyat:</strong> ${price.toFixed(2)} TL<br>
    <strong>KDV (${taxRate}%):</strong> ${taxAmount.toFixed(2)} TL<br>
    <strong>KDV'li Fiyat:</strong> ${totalPrice.toFixed(2)} TL
  `;
  resultDiv.className = "alert alert-success text-center";
}