/**
 * Composable para gerenciamento de atalhos de teclado
 */

export const useKeyboardShortcuts = () => {
  /**
   * Registra listeners de teclado
   * @param callbacks - Objeto com callbacks para cada ação
   */
  const registrarAtalhos = (callbacks: {
    onIniciarOuMarcarSerie: () => void
    onResetar: () => void
  }) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignora se estiver digitando em um input/textarea
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return
      }

      // Escape → Resetar
      if (event.code === 'Escape') {
        event.preventDefault()
        callbacks.onResetar()
        return
      }

      // Space → Iniciar/Pausar ou Marcar Série
      if (event.code === 'Space') {
        event.preventDefault()
        callbacks.onIniciarOuMarcarSerie()
        return
      }
    }

    // Adiciona listener
    window.addEventListener('keydown', handleKeyDown)

    // Retorna função de cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }

  return {
    registrarAtalhos
  }
}
