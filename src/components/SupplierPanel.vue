<template>
  <article class="panel">
    <div class="panel-head">
      <div>
        <p class="eyebrow">Supplier and risk dashboard</p>
        <h2 class="panel-title">Shortlist ranked for {{ product.name }}</h2>
        <p class="panel-sub">Accio Work turns supplier evidence into a buyer-ready comparison.</p>
      </div>
      <span class="status-pill"><i class="dot" :style="{ background: riskColor(selected.riskScore) }"></i>Risk {{ selected.riskScore }}</span>
    </div>
    <div class="panel-body">
      <div class="supplier-scroll">
        <table class="supplier-table">
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Fit</th>
              <th>MOQ</th>
              <th>Lead</th>
              <th>Risk</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="supplier in suppliers" :key="supplier.id" :class="{ active: supplier.id === selectedId }">
              <td>
                <b>{{ supplier.name }}</b><br />
                <small class="text-slate-500">{{ supplier.country }} - {{ supplier.focus }}</small>
              </td>
              <td>{{ supplier.accioScore }}</td>
              <td>{{ supplier.moq.toLocaleString() }}</td>
              <td>{{ supplier.leadDays }}d</td>
              <td>
                <div class="bar" :class="riskClass(supplier.riskScore)">
                  <i :style="{ width: Math.min(supplier.riskScore, 100) + '%' }"></i>
                </div>
              </td>
              <td><button class="link-button" type="button" @click="$emit('select-supplier', supplier.id)">Select</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="two-col mt-4">
        <div>
          <p class="label">Evidence</p>
          <div class="row" v-for="cert in selected.certs" :key="cert">
            <span>{{ cert }}</span>
            <span class="status-pill"><i class="dot"></i>Verified</span>
          </div>
        </div>
        <div>
          <p class="label">Risk controls</p>
          <div class="row">
            <span>On-time history</span>
            <b>{{ selected.onTime }}%</b>
          </div>
          <div class="row">
            <span>Defect estimate</span>
            <b>{{ selected.defectRate }}%</b>
          </div>
          <div class="row">
            <span>Capacity</span>
            <b>{{ selected.capacity }}</b>
          </div>
        </div>
      </div>

      <div class="note mt-4">
        <b>Accio risk memo:</b> {{ selected.notes }} Terms: {{ selected.terms }}.
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    suppliers: { type: Array, required: true },
    selectedId: { type: String, required: true },
    product: { type: Object, required: true }
  },
  emits: ['select-supplier'],
  computed: {
    selected() {
      return this.suppliers.find((supplier) => supplier.id === this.selectedId);
    }
  },
  methods: {
    riskClass(score) {
      if (score >= 36) return 'hot';
      if (score >= 26) return 'warn';
      return '';
    },
    riskColor(score) {
      if (score >= 36) return 'var(--red)';
      if (score >= 26) return 'var(--amber)';
      return 'var(--green)';
    }
  }
};
</script>
