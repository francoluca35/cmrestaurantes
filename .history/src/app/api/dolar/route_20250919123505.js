import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Intentar obtener el valor del dólar desde múltiples fuentes
    const fuentes = [
      'https://api.bluelytics.com.ar/v2/latest',
      'https://api.exchangerate-api.com/v4/latest/USD',
      'https://api.fixer.io/latest?access_key=YOUR_API_KEY&base=USD&symbols=ARS'
    ]

    let valorDolar = null
    let fuente = ''

    // Intentar con Bluelytics (específico para Argentina)
    try {
      const response = await fetch('https://api.bluelytics.com.ar/v2/latest', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        valorDolar = data.blue.value_sell // Valor de venta del dólar blue
        fuente = 'Bluelytics'
      }
    } catch (error) {
      console.log('Error con Bluelytics:', error.message)
    }

    // Si no funciona Bluelytics, intentar con ExchangeRate-API
    if (!valorDolar) {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        
        if (response.ok) {
          const data = await response.json()
          valorDolar = data.rates.ARS
          fuente = 'ExchangeRate-API'
        }
      } catch (error) {
        console.log('Error con ExchangeRate-API:', error.message)
      }
    }

    // Si no funciona ninguna API, usar valor de respaldo
    if (!valorDolar) {
      valorDolar = 1000 // Valor aproximado de respaldo
      fuente = 'Valor de respaldo'
    }

    return NextResponse.json({
      success: true,
      valor: valorDolar,
      fuente: fuente,
      timestamp: new Date().toISOString(),
      mensaje: 'Valor del dólar obtenido correctamente'
    })

  } catch (error) {
    console.error('Error al obtener valor del dólar:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Error al obtener el valor del dólar',
      valor: 1000, // Valor de respaldo
      fuente: 'Valor de respaldo',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
