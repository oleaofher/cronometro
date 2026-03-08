<script setup lang="ts">
import { ref, computed, watch, onUnmounted, onMounted } from 'vue'

const { converterParaMilissegundos } = useTempoFormatter()
const { registrarAtalhos } = useKeyboardShortcuts()

interface Volta {
  numero: number
  tempoVolta: number
}

const tempoTotal = ref(0)
const tempoSerieAtual = ref(0)
const rodando = ref(false)
const voltas = ref<Volta[]>([])
const tempoAlvo = ref('01:30')
const alertaSonoroTocado = ref(false)
const devePiscar = ref(false)

let intervalId: NodeJS.Timeout | null = null
let audioContext: AudioContext | null = null
let removerAtalhos: (() => void) | null = null

const tempoAlvoMs = computed(() => {
  return converterParaMilissegundos(tempoAlvo.value)
})

watch(tempoSerieAtual, (novoTempo) => {
  if (!rodando.value || tempoAlvoMs.value === 0) {
    devePiscar.value = false
    alertaSonoroTocado.value = false
    return
  }
  
  const tempoRestante = tempoAlvoMs.value - novoTempo
  
  if (tempoRestante <= 10000 && tempoRestante > 9900 && !alertaSonoroTocado.value) {
    tocarBeep()
    alertaSonoroTocado.value = true
  }
  
  if (tempoRestante <= 5000) {
    devePiscar.value = true
  } else {
    devePiscar.value = false
  }
})

function tocarBeep() {
  try {
    if (!audioContext) {
      audioContext = new AudioContext()
    }
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  } catch (e) {
    console.warn('Não foi possível tocar o som:', e)
  }
}

function iniciar() {
  if (rodando.value) return
  
  rodando.value = true
  const inicioTotal = Date.now() - tempoTotal.value
  const inicioSerie = Date.now() - tempoSerieAtual.value
  
  intervalId = setInterval(() => {
    tempoTotal.value = Date.now() - inicioTotal
    tempoSerieAtual.value = Date.now() - inicioSerie
  }, 10)
}

function pausar() {
  if (!rodando.value) return
  
  rodando.value = false
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function resetar() {
  pausar()
  tempoTotal.value = 0
  tempoSerieAtual.value = 0
  voltas.value = []
  alertaSonoroTocado.value = false
  devePiscar.value = false
}

function marcarSerie() {
  if (!rodando.value) return
  
  voltas.value.push({
    numero: voltas.value.length + 1,
    tempoVolta: tempoSerieAtual.value
  })
  
  alertaSonoroTocado.value = false
  devePiscar.value = false
  
  const inicioSerie = Date.now()
  
  if (intervalId) {
    clearInterval(intervalId)
  }
  
  const inicioTotal = Date.now() - tempoTotal.value
  
  intervalId = setInterval(() => {
    tempoTotal.value = Date.now() - inicioTotal
    tempoSerieAtual.value = Date.now() - inicioSerie
  }, 10)
}

function iniciarOuMarcarSerie() {
  if (!rodando.value) {
    iniciar()
  } else {
    marcarSerie()
  }
}

onMounted(() => {
  removerAtalhos = registrarAtalhos({
    onIniciarOuMarcarSerie: iniciarOuMarcarSerie,
    onResetar: resetar
  })
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  if (removerAtalhos) {
    removerAtalhos()
  }
})
</script>

<template>
  <div class="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
    <CronometroTotal
      :tempo="tempoTotal"
      :rodando="rodando"
      v-model:tempo-alvo="tempoAlvo"
      @iniciar="iniciar"
      @pausar="pausar"
      @resetar="resetar"
      @marcar-serie="marcarSerie"
    />
    
    <CronometroSeries
      :tempo-serie-atual="tempoSerieAtual"
      :voltas="voltas"
      :deve-piscar="devePiscar"
    />
  </div>
</template>
