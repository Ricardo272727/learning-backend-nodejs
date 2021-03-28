function createPaymentTable(payments){
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
  body{
    font-family: verdana;
    text-align: center;
  }
  .payments{
    width: 100%;
    padding: 1rem;
    background: #FFFFFF;
    border: none;
  }
  .payments thead td{
    margin-bottom: 3rem;
  }
  .payments tbody td{
    text-align: center;
    border-bottom: 1px solid #4499FF;
  }
  </style>
</head>
<body>
  <h1>Pagos de residentes</h1>
  <table class="payments">
    <thead>
      <tr>
        <th>ID</th>
        <th>Placa</th>
        <th>Tiempo estacionado (minutos)</th>
        <th>Total a pagar</th>
      </tr>
    </thead>
    <tbody>
    ${payments.map(p => `
      <tr>
        <td>${p.ID}</td>
        <td>${p.placa}</td>
        <td>${p.minutos}</td>
        <td>$${p.total}MXN.</td>
      </tr>
    `)}
    </tbody>
  </table>
</body>
</html>
  `
}

module.exports = { createPaymentTable };
