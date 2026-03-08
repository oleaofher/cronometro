/**
 * Composable para formatação e conversão de tempo
 * Lida com inputs no formato de segundos puros (30, 90, 120) ou MM:SS (1:30, 2:00)
 */

export const useTempoFormatter = () => {
  /**
   * Converte input para milissegundos
   * @param input - String no formato "30" (segundos) ou "1:30" (MM:SS)
   * @returns Tempo em milissegundos
   */
  const converterParaMilissegundos = (input: string): number => {
    const limpo = input.trim()
    
    if (limpo.includes(':')) {
      // Formato MM:SS
      const partes = limpo.split(':')
      const minutos = parseInt(partes[0]) || 0
      const segundos = parseInt(partes[1]) || 0
      return (minutos * 60 + segundos) * 1000
    } else {
      // Formato de segundos puros
      const segundos = parseInt(limpo) || 0
      return segundos * 1000
    }
  }

  /**
   * Formata milissegundos para exibição MM:SS
   * @param ms - Tempo em milissegundos
   * @returns String formatada "MM:SS"
   */
  const formatarParaExibicao = (ms: number): string => {
    const totalSegundos = Math.floor(ms / 1000)
    const minutos = Math.floor(totalSegundos / 60)
    const segundos = totalSegundos % 60
    
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
  }

  /**
   * Formata milissegundos para display de cronômetro (MM:SS.mmm)
   * @param ms - Tempo em milissegundos
   * @returns String formatada "MM:SS.mm"
   */
  const formatarCronometro = (ms: number): string => {
    const totalSegundos = Math.floor(ms / 1000)
    const minutos = Math.floor(totalSegundos / 60)
    const segundos = totalSegundos % 60
    const milissegundos = Math.floor((ms % 1000) / 10)
    
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}.${String(milissegundos).padStart(2, '0')}`
  }

  /**
   * Normaliza input do usuário para formato MM:SS
   * Aceita: "30" → "00:30", "90" → "01:30", "1:30" → "01:30"
   * @param input - String digitada pelo usuário
   * @returns String normalizada no formato MM:SS
   */
  const normalizarInput = (input: string): string => {
    const limpo = input.trim()
    
    if (!limpo) {
      return '00:00'
    }

    // Se já tem ":", valida e formata
    if (limpo.includes(':')) {
      const partes = limpo.split(':')
      const minutos = Math.max(0, parseInt(partes[0]) || 0)
      let segundos = Math.max(0, parseInt(partes[1]) || 0)
      
      // Valida segundos (máximo 59)
      if (segundos > 59) {
        segundos = 59
      }
      
      return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
    }

    // Apenas números: interpreta como segundos
    const totalSegundos = Math.max(0, parseInt(limpo) || 0)
    const minutos = Math.floor(totalSegundos / 60)
    const segundos = totalSegundos % 60
    
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
  }

  /**
   * Valida se o input é válido
   * @param input - String a validar
   * @returns true se válido
   */
  const validarInput = (input: string): boolean => {
    const limpo = input.trim()
    
    if (!limpo) return false
    
    // Aceita apenas números e ":"
    if (!/^[\d:]+$/.test(limpo)) return false
    
    // Se tem ":", deve ter exatamente um
    if (limpo.includes(':')) {
      const partes = limpo.split(':')
      if (partes.length !== 2) return false
      
      const minutos = parseInt(partes[0])
      const segundos = parseInt(partes[1])
      
      if (isNaN(minutos) || isNaN(segundos)) return false
      if (segundos > 59) return false
    }
    
    return true
  }

  return {
    converterParaMilissegundos,
    formatarParaExibicao,
    formatarCronometro,
    normalizarInput,
    validarInput
  }
}
