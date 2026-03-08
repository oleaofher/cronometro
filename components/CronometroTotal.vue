<script setup lang="ts">
interface Props {
  tempo: number
  rodando: boolean
  tempoAlvo: string
}

interface Emits {
  (e: 'iniciar'): void
  (e: 'pausar'): void
  (e: 'resetar'): void
  (e: 'marcarSerie'): void
  (e: 'update:tempoAlvo', valor: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const tempoAlvoLocal = computed({
  get: () => props.tempoAlvo,
  set: (valor) => emit('update:tempoAlvo', valor)
})

const tempoFormatado = computed(() => {
  return formatarTempo(props.tempo)
})

function formatarTempo(ms: number): string {
  const totalSegundos = Math.floor(ms / 1000)
  const minutos = Math.floor(totalSegundos / 60)
  const segundos = totalSegundos % 60
  const milissegundos = Math.floor((ms % 1000) / 10)
  
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}.${String(milissegundos).padStart(2, '0')}`
}

function formatarInputTempo(event: Event) {
  const input = event.target as HTMLInputElement
  let valor = input.value.replace(/\D/g, '')
  
  if (valor.length === 0) {
    return
  }
  
  if (valor.length > 4) {
    valor = valor.slice(0, 4)
  }
  
  if (valor.length <= 2) {
    tempoAlvoLocal.value = valor
  } else {
    const minutos = valor.slice(0, -2)
    let segundos = valor.slice(-2)
    
    const seg = parseInt(segundos)
    if (seg > 59) {
      segundos = '59'
    }
    
    tempoAlvoLocal.value = `${minutos}:${segundos}`
  }
}

function normalizarTempo() {
  let valor = tempoAlvoLocal.value.replace(/\D/g, '')
  
  if (valor.length === 0) {
    tempoAlvoLocal.value = '00:00'
    return
  }
  
  if (valor.length === 1) {
    valor = '00:0' + valor
  } else if (valor.length === 2) {
    valor = '00:' + valor
  } else if (valor.length === 3) {
    valor = '0' + valor.slice(0, 1) + ':' + valor.slice(1)
  } else {
    const minutos = valor.slice(0, -2)
    const segundos = valor.slice(-2)
    valor = minutos + ':' + segundos
  }
  
  const partes = valor.split(':')
  const seg = parseInt(partes[1] || '0')
  if (seg > 59) {
    partes[1] = '59'
  }
  
  tempoAlvoLocal.value = partes.join(':').padStart(5, '0')
}
</script>

<template>
  <div class="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
    <!-- Display -->
    <div class="text-center mb-8">
      <div class="text-7xl font-mono font-bold text-white tracking-wider mb-2">
        {{ tempoFormatado }}
      </div>
      <div class="text-sm text-purple-200 uppercase tracking-widest">
        Tempo Total do Exercício
      </div>
    </div>

    <!-- Controles -->
    <div class="flex gap-3 justify-center mb-4">
      <button
        v-if="!rodando"
        @click="emit('iniciar')"
        class="flex-1 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-150 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Iniciar
      </button>
      
      <button
        v-else
        @click="emit('pausar')"
        class="flex-1 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-150 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Pausar
      </button>
      
      <button
        @click="emit('resetar')"
        class="flex-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-150 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Resetar
      </button>
    </div>

    <!-- Botão Marcar Série -->
    <button
      @click="emit('marcarSerie')"
      :disabled="!rodando"
      class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-150 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
    >
      Marcar Série
    </button>

    <!-- Campo Tempo Entre Séries -->
    <div class="mt-6 pt-6 border-t border-white/20">
      <label class="block text-center text-sm text-purple-200 uppercase tracking-wider mb-3">
        Tempo Entre Séries
      </label>
      <input
        v-model="tempoAlvoLocal"
        @input="formatarInputTempo"
        @blur="normalizarTempo"
        type="text"
        placeholder="Digite segundos ou MM:SS"
        class="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white text-center font-mono text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
      <div class="text-xs text-purple-300/70 text-center mt-2">
        Digite 90 (90s) ou 1:30 (1min 30s)
      </div>
    </div>
  </div>
</template>
