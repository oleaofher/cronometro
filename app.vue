<template>
  <div class="min-h-screen bg-[#0A0F1E] relative flex items-center justify-center p-4 font-barlow overflow-hidden">
    <!-- Background gradients & texture -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#0A0F1E] via-[#0D1B2A] to-[#0A0F1E]"></div>
    <div class="absolute inset-0 opacity-30" style="background: radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.08) 0%, transparent 60%);"></div>
    <div class="absolute inset-0 opacity-[0.02]" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;200&quot; height=&quot;200&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cfilter id=&quot;noiseFilter&quot;%3E%3CfeTurbulence type=&quot;fractalNoise&quot; baseFrequency=&quot;0.9&quot; numOctaves=&quot;4&quot; stitchTiles=&quot;stitch&quot;/%3E%3C/filter%3E%3Crect width=&quot;100%25&quot; height=&quot;100%25&quot; filter=&quot;url(%23noiseFilter)&quot;/%3E%3C/svg%3E');"></div>
    
    <div class="w-full max-w-5xl relative z-10">
      <!-- Título com decoração -->
      <div class="text-center mb-10">
        <div class="inline-block relative">
          <div class="text-[0.65rem] font-barlow-condensed font-semibold text-orange-500/80 uppercase tracking-[0.3em] mb-2">
            Training Timer
          </div>
          <h1 class="text-4xl md:text-5xl font-barlow-condensed font-bold text-white tracking-[0.15em] uppercase">
            Cronômetro de Séries
          </h1>
          <div class="h-[2px] w-20 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-3"></div>
        </div>
      </div>
      
      <Cronometro />
      
      <!-- Dicas de atalhos -->
      <div class="mt-8 flex justify-center gap-6 text-xs font-barlow text-white/30">
        <div class="flex items-center gap-2">
          <kbd class="px-2 py-1 bg-white/5 border border-white/10 rounded font-share-tech text-white/40">Space</kbd>
          <span>Iniciar / Marcar série</span>
        </div>
        <div class="flex items-center gap-2">
          <kbd class="px-2 py-1 bg-white/5 border border-white/10 rounded font-share-tech text-white/40">Ctrl</kbd>
          <span>+</span>
          <kbd class="px-2 py-1 bg-white/5 border border-white/10 rounded font-share-tech text-white/40">Space</kbd>
          <span>Resetar</span>
        </div>
      </div>
    </div>
  </div>
</template>
