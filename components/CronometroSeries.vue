<script setup lang="ts">
interface Volta {
  numero: number
  tempoVolta: number
}

interface Props {
  tempoSerieAtual: number
  voltas: Volta[]
  devePiscar: boolean
}

defineProps<Props>()

function formatarTempo(ms: number): string {
  const totalSegundos = Math.floor(ms / 1000)
  const minutos = Math.floor(totalSegundos / 60)
  const segundos = totalSegundos % 60
  const milissegundos = Math.floor((ms % 1000) / 10)
  
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}.${String(milissegundos).padStart(2, '0')}`
}
</script>

<template>
  <div class="flex flex-col space-y-4">
    <!-- Card: Cronômetro da Série Atual -->
    <div class="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-white/20">
      <div class="text-center">
        <div class="text-xs text-purple-200 uppercase tracking-widest mb-2">
          Série Atual
        </div>
        <div 
          class="text-5xl font-mono font-bold tracking-wider transition-colors duration-300"
          :class="devePiscar ? 'text-orange-500 animate-pulse' : 'text-green-400'"
        >
          {{ formatarTempo(tempoSerieAtual) }}
        </div>
      </div>
    </div>

    <!-- Contador de Séries -->
    <div class="text-center">
      <div class="text-sm text-purple-200">
        {{ voltas.length }} {{ voltas.length === 1 ? 'série' : 'séries' }} completas
      </div>
    </div>

    <!-- Lista de Séries (sem scroll, itens soltos) -->
    <div v-if="voltas.length > 0" class="space-y-3">
      <div
        v-for="volta in voltas.slice().reverse()"
        :key="volta.numero"
        class="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-4 border border-white/20 hover:bg-white/15 transition-colors"
      >
        <div class="flex justify-between items-center">
          <div class="text-purple-300 font-semibold text-sm">
            Série #{{ volta.numero }}
          </div>
          <div class="text-white font-mono font-bold text-lg">
            {{ formatarTempo(volta.tempoVolta) }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-purple-300/50 py-8">
      <div class="text-4xl mb-3">💪</div>
      <div class="text-sm">Marque suas séries para acompanhar o descanso</div>
    </div>
  </div>
</template>


