<script setup lang="ts">
const { formatarCronometro } = useTempoFormatter()

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
</script>

<template>
  <div class="flex flex-col space-y-4">
    <!-- Card: Cronômetro da Série Atual -->
    <div class="relative bg-gradient-to-b from-white/[0.07] to-transparent rounded-3xl shadow-2xl p-8 border border-white/[0.07] backdrop-blur-sm overflow-hidden">
      <div class="absolute inset-0 bg-navy-800/90 rounded-3xl -z-10"></div>
      <div class="text-center">
        <div class="text-xs font-barlow-condensed text-white/40 uppercase tracking-[0.25em] mb-3">
          Série Atual
        </div>
        <div 
          class="text-6xl font-share-tech font-bold tracking-wider transition-colors duration-300"
          :class="devePiscar ? 'text-orange-500 animate-pulse timer-glow-orange-intense' : 'text-teal-400 timer-glow-teal-intense'"
        >
          {{ formatarCronometro(tempoSerieAtual) }}
        </div>
      </div>
    </div>

    <!-- Contador de Séries -->
    <div class="text-center">
      <div class="text-sm font-barlow text-white/50">
        {{ voltas.length }} {{ voltas.length === 1 ? 'série' : 'séries' }} completas
      </div>
    </div>

    <!-- Lista de Séries (pill cards com hierarquia) -->
    <div v-if="voltas.length > 0" class="space-y-3">
      <div
        v-for="(volta, index) in voltas.slice().reverse()"
        :key="volta.numero"
        class="relative bg-gradient-to-b from-white/[0.05] to-transparent rounded-2xl shadow-lg p-4 backdrop-blur-sm overflow-hidden transition-all duration-200 hover:from-white/[0.08]"
        :class="index === 0 ? 'border border-orange-500/30 ring-1 ring-orange-500/10' : 'border border-white/[0.07] hover:border-orange-500/20'"
      >
        <div class="absolute inset-0 bg-navy-700/60 rounded-2xl -z-10"></div>
        <div class="flex justify-between items-center">
          <div class="font-barlow font-medium text-sm" :class="index === 0 ? 'text-white/80' : 'text-white/60'">
            Série #{{ volta.numero }}
          </div>
          <div class="font-share-tech font-bold text-lg" :class="index === 0 ? 'text-white' : 'text-white/90'">
            {{ formatarCronometro(volta.tempoVolta) }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-white/30 py-8">
      <div class="text-4xl mb-3">💪</div>
      <div class="text-sm font-barlow">Marque suas séries para acompanhar o descanso</div>
    </div>
  </div>
</template>

<style scoped>
.timer-glow-teal-intense {
  text-shadow: 
    0 0 10px rgba(45, 212, 191, 0.8),
    0 0 20px rgba(45, 212, 191, 0.6),
    0 0 40px rgba(45, 212, 191, 0.4),
    0 0 80px rgba(45, 212, 191, 0.2);
}

.timer-glow-orange-intense {
  text-shadow: 
    0 0 10px rgba(249, 115, 22, 0.8),
    0 0 20px rgba(249, 115, 22, 0.6),
    0 0 40px rgba(249, 115, 22, 0.4),
    0 0 80px rgba(249, 115, 22, 0.2);
}
</style>
