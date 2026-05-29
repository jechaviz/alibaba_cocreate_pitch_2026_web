<template>
  <article class="panel">
    <div class="panel-head">
      <div>
        <p class="eyebrow">Product concept</p>
        <h2 class="panel-title">{{ product.name }}</h2>
        <p class="panel-sub">{{ product.category }} for {{ product.market }}</p>
      </div>
      <span class="status-pill"><i class="dot"></i>Demo ready</span>
    </div>
    <div class="panel-body">
      <div class="storefront">
        <div class="product-visual" aria-label="Product preview">
          <div class="device"></div>
        </div>
        <div>
          <p class="text-sm font-900 text-slate-900">{{ product.promise }}</p>
          <p class="mt-2 text-3xl font-900">${{ product.retailPrice }}</p>
          <p class="text-sm text-slate-500">Bundle: {{ product.bundle }}</p>
          <div class="tag-list mt-3">
            <span class="tag" v-for="tag in product.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div class="row" v-for="bullet in product.bullets" :key="bullet">
          <span class="text-sm leading-6 text-slate-700">{{ bullet }}</span>
        </div>
      </div>

      <div class="metric-grid mt-4">
        <div class="metric">
          <strong>{{ percent(metrics.grossMargin) }}</strong>
          <span>Contribution margin after freight, fees, and CAC</span>
        </div>
        <div class="metric" style="border-top-color:var(--green)">
          <strong>{{ money(metrics.monthlyProfit) }}</strong>
          <span>Modeled monthly profit at current scenario</span>
        </div>
      </div>

      <div class="note mt-4">
        <b>Latest Accio output:</b>
        <span> {{ activeLog.detail }}</span>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    product: { type: Object, required: true },
    metrics: { type: Object, required: true },
    activeLog: { type: Object, required: true }
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
