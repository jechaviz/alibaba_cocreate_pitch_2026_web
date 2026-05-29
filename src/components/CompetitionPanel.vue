<template>
  <article class="panel">
    <div class="panel-head">
      <div>
        <p class="eyebrow">Competition-aware judge mode</p>
        <h2 class="panel-title">Proof against {{ active.label }}</h2>
        <p class="panel-sub">Switch the rival workflow; the evidence stays tied to this product, supplier, and ROI model.</p>
      </div>
      <span class="status-pill"><i class="dot"></i>+{{ winDelta }} pts</span>
    </div>
    <div class="panel-body">
      <div class="competitor-tabs" role="tablist" aria-label="Competitive comparison">
        <button
          v-for="mode in modes"
          :key="mode.id"
          class="competitor-tab"
          :class="{ active: mode.id === activeId }"
          type="button"
          :aria-pressed="mode.id === activeId"
          @click="$emit('select-mode', mode.id)"
        >
          <b>{{ mode.shortLabel }}</b>
          <small>{{ mode.altScore }}/100 baseline</small>
        </button>
      </div>

      <div class="note mt-4">
        <p class="label">{{ active.label }} gap</p>
        <p class="mt-1">{{ active.problem }}</p>
      </div>

      <div class="note mt-3">
        <p class="label">Accio commerce copilot edge</p>
        <p class="mt-1">{{ active.advantage }}</p>
      </div>

      <div class="metric-grid mt-4">
        <div class="metric">
          <strong>{{ active.accioScore }}/100</strong>
          <span>Judge score with live sourcing, risk, finance, and launch proof</span>
        </div>
        <div class="metric" style="border-top-color:var(--green)">
          <strong>{{ active.timeSaved }}</strong>
          <span>Manual work compressed into an auditable workflow</span>
        </div>
      </div>

      <div class="proof-list mt-4">
        <div class="row" v-for="item in proofRows" :key="item.title">
          <span>
            <b>{{ item.title }}</b><br />
            <small class="text-slate-500">{{ item.detail }}</small>
          </span>
          <span class="status-pill"><i class="dot"></i>{{ item.status }}</span>
        </div>
      </div>

      <button class="btn primary proof-button" type="button" @click="$emit('generate-proof')">Generate judge proof</button>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    modes: { type: Array, required: true },
    activeId: { type: String, required: true },
    product: { type: Object, required: true },
    supplier: { type: Object, required: true },
    metrics: { type: Object, required: true }
  },
  emits: ['select-mode', 'generate-proof'],
  computed: {
    active() {
      return this.modes.find((mode) => mode.id === this.activeId);
    },
    winDelta() {
      return this.active.accioScore - this.active.altScore;
    },
    proofRows() {
      return [
        {
          title: 'Supplier evidence',
          detail: this.supplier.name + ' mapped to MOQ, lead time, certifications, terms, and risk memo.',
          status: 'Live'
        },
        {
          title: 'Unit economics',
          detail: this.money(this.metrics.contribution) + ' contribution at ' + this.percent(this.metrics.grossMargin) + ' margin.',
          status: 'Modeled'
        },
        {
          title: 'Launch handoff',
          detail: this.product.bundle + ' packaged for ' + this.product.channels.slice(0, 2).join(' and ') + '.',
          status: 'Ready'
        }
      ];
    }
  },
  methods: {
    money(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    },
    percent(value) {
      return new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 }).format(value);
    }
  }
};
</script>
