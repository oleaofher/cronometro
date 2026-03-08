<script setup lang="ts">
const { formatarCronometro, normalizarInput } = useTempoFormatter()

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
  return formatarCronometro(props.tempo)
})

function aoSairDoCampo() {
  tempoAlvoLocal.value = normalizarInput(tempoAlvoLocal.value)
}

function aoTeclarEnter(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    (event.target as HTMLInputElement).blur()
  }
}
</script>

<template>
  <div class="relative bg-gradient-to-b from-white/[0.07] to-transparent rounded-3xl shadow-2xl p-8 border border-white/[0.07] backdrop-blur-sm overflow-hidden">
    <!-- Card inner glow -->
    <div class="absolute inset-0 bg-navy-800/90 rounded-3xl -z-10"></div>
    
    <!-- Display -->
    <div class="text-center mb-10">
      <div class="text-7xl font-share-tech font-bold text-white tracking-wider mb-3 timer-glow-orange-intense">
        {{ tempoFormatado }}
      </div>
      <div class="text-xs font-barlow-condensed text-white/40 uppercase tracking-[0.25em]">
        Tempo Total do Exercício
      </div>
    </div>

    <!-- Controles -->
    <div class="flex gap-3 justify-center mb-5">
      <button
        v-if="!rodando"
        @click="emit('iniciar')"
        class="flex-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-barlow font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
      >
        Iniciar
      </button>
      
      <button
        v-else
        @click="emit('pausar')"
        class="flex-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-barlow font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 animate-pulse-slow ring-2 ring-orange-500/20"
      >
        Pausar
      </button>
      
      <button
        @click="emit('resetar')"
        class="flex-1 border-2 border-orange-600/60 hover:border-orange-500 hover:bg-orange-500/10 text-white font-barlow font-semibold py-4 px-6 rounded-xl transition-all duration-200"
      >
        Resetar
      </button>
    </div>

    <!-- Botão Marcar Série -->
    <button
      @click="emit('marcarSerie')"
      :disabled="!rodando"
      class="w-full bg-cyan-600/80 hover:bg-cyan-600 active:bg-cyan-700 disabled:bg-navy-700/30 disabled:cursor-not-allowed disabled:opacity-40 text-white font-barlow font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/45 disabled:shadow-none mb-5"
    >
      Marcar Série
    </button>

    <!-- Campo Tempo Entre Séries -->
    <div class="pt-5 border-t border-white/[0.07]">
      <label class="block text-center text-xs font-barlow-condensed text-white/40 uppercase tracking-[0.25em] mb-3">
        Tempo Entre Séries
      </label>
      <input
        v-model="tempoAlvoLocal"
        @blur="aoSairDoCampo"
        @keydown.enter="aoTeclarEnter"
        type="text"
        placeholder="30 ou 1:30"
        class="w-full bg-navy-700/60 border border-white/20 focus:border-orange-500 rounded-xl py-3 px-4 text-white placeholder:text-white/30 text-center font-share-tech text-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all"
      />
      <div class="text-xs font-barlow text-white/40 text-center mt-2">
        Digite segundos (90) ou tempo (1:30) e pressione Enter
      </div>
    </div>
  </div>
</template>

<style scoped>
.timer-glow-orange-intense {
  text-shadow: 
    0 0 10px rgba(249, 115, 22, 0.8),
    0 0 20px rgba(249, 115, 22, 0.6),
    0 0 40px rgba(249, 115, 22, 0.4),
    0 0 80px rgba(249, 115, 22, 0.2);
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.95;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
