// Utilidad para calcular recargos de Mercado Pago
export const calcularRecargos = (montoBase, tipoTarjeta, moneda) => {
  // Comisiones de Mercado Pago (actualizadas 2024)
  const comisiones = {
    debito: {
      ars: 0.0399, // 3.99%
      usd: 0.0399
    },
    credito: {
      ars: 0.0499, // 4.99% (1% adicional por crédito)
      usd: 0.0499
    }
  };

  const comision = comisiones[tipoTarjeta][moneda];
  const recargo = montoBase * comision;
  const total = montoBase + recargo;

  return {
    montoBase,
    comision: comision * 100,
    recargo,
    total,
    tipoTarjeta,
    moneda
  };
};

// Función para verificar límites de Mercado Pago
export const verificarLimites = (monto, moneda) => {
  const limiteMP = 500000; // Límite máximo por transacción en ARS
  
  if (monto > limiteMP && moneda === 'ars') {
    return {
      excedeLimite: true,
      limite: limiteMP,
      montoExcedente: monto - limiteMP,
      necesitaDivision: true
    };
  }
  
  return {
    excedeLimite: false,
    limite: limiteMP,
    montoExcedente: 0,
    necesitaDivision: false
  };
};

// Función para calcular pago dividido
export const calcularPagoDividido = (montoTotal, limite = 500000) => {
  const primeraParte = limite;
  const segundaParte = montoTotal - limite;
  
  return {
    primeraParte,
    segundaParte,
    totalPartes: 2,
    montoTotal
  };
};
