<template>
  <article class="panel">
    <div class="panel-head">
      <div>
        <p class="eyebrow">ROI and unit economics</p>
        <h2 class="panel-title">Live launch model</h2>
        <p class="panel-sub">Change price, demand, CAC, and freight to stress-test the pitch.</p>
      </div>
      <span class="status-pill"><i class="dot" :style="{ background: marginColor }"></i>{{ marginLabel }}</span>
    </div>
    <div class="panel-body">
      <div class="control">
        <label for="units">Monthly units</label>
        <b>{{ scenario.units.toLocaleString() }}</b>
        <input id="units" class="range" type="range" min="400" max="4200" step="50" :value="scenario.units" @input="emitNumber('units', $event)" />
      </div>
      <div class="control">
        <label for="price">Retail price</label>
        <input id="price" class="input" type="number" min="24" max="140" step="1" :value="scenario.price" @input="emitNumber('price', $event)" />
      </div>
      <div class="control">
        <label for="cac">Paid CAC</label>
        <input id="cac" class="input" type="number" min="2" max="32" step=".25" :value="scenario.adCac" @input="emitNumber('adCac', $event)" />
      </div>

      <div class="metric-grid mt-4">
        <div class="metric">
          <strong>{{ money(metrics.landed) }}</strong>
          <span>Landed cost per unit</span>
        </div>
        <div class="metric" style="border-top-color:var(--violet)">
          <strong>{{ money(metrics.contribution) }}</strong>
          <span>Contribution per unit</span>
        </div>
        <div class="metric" style="border-top-color:var(--green)">
          <strong>{{ money(metrics.launchCash) }}</strong>
          <span>Cash to first PO plus launch</span>
        </div>
        <div class="metric" style="border-top-color:var(--amber)">
          <strong>{{ metrics.breakEvenUnits.toLocaleString() }}</strong>
          <span>Break-even units</span>
        </div>
      </div>

      <div class="two-col mt-4">
        <div class="note">
          <b>Payback:</b> {{ metrics.paybackMonths.toFixed(1) }} months at current velocity.
        </div>
        <div class="note">
          <b>Reorder trigger:</b> {{ metrics.reorderPoint.toLocaleString() }} units before stockout.
        </div>
      </div>

      <div class="mt-4 row">
        <span>
          <b>{{ supplier.name }}</b><br />
          <small class="text-slate-500">MOQ {{ supplier.moq.toLocaleString() }} units, lead time {{ supplier.leadDays }} days</small>
        </span>
        <span class="text-right text-sm font-900">{{ money(supplier.unitCost) }} ex-works</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    product: { type: Object, required: true },
    supplier: { type: Object, required: true },
    scenario: { type: Object, required: true },
    metrics: { type: Object, required: true }
  },
  emits: ['update-scenario'],
  computed: {
    marginLabel() {
      if (this.metrics.grossMargin >= 0.42) return 'Healthy margin';
      if (this.metrics.grossMargin >= 0.28) return 'Watch CAC';
      return 'Needs revision';
    },
    marginColor() {
      if (this.metrics.grossMargin >= 0.42) return 'var(--green)';
      if (this.metrics.grossMargin >= 0.28) return 'var(--amber)';
      return 'var(--red)';
    }
  },
  methods: {
    emitNumber(key, event) {
      this.$emit('update-scenario', { [key]: Number(event.target.value) });
    },
    money(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    }
  }
};
</script>
