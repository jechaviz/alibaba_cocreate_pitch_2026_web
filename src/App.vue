<template>
  <main class="app-shell">
    <header class="topbar">
      <div class="brand">
        <div class="mark">AW</div>
        <div>
          <h1>Accio Work commerce launch console</h1>
          <p>Operational demo for Alibaba CoCreate Pitch 2026: source, model, de-risk, launch, and prove the competitive edge.</p>
        </div>
      </div>
      <div class="toolbar">
        <select class="select" :value="productId" @change="setProduct($event.target.value)" aria-label="Product concept">
          <option v-for="product in data.products" :key="product.id" :value="product.id">{{ product.name }}</option>
        </select>
        <select class="select" v-model="scenario.freightMode" aria-label="Freight mode">
          <option value="sea">Sea freight</option>
          <option value="rail">Rail freight</option>
          <option value="air">Air freight</option>
        </select>
        <button class="btn primary" type="button" @click="runAccio">Run Accio Work</button>
      </div>
    </header>

    <section class="grid-main">
      <ConceptPanel
        :product="product"
        :metrics="metrics"
        :active-log="latestLog"
      />

      <EconomicsPanel
        :product="product"
        :supplier="supplier"
        :scenario="scenario"
        :metrics="metrics"
        @update-scenario="updateScenario"
      />

      <CompetitionPanel
        :modes="data.competition"
        :active-id="judgeModeId"
        :product="product"
        :supplier="supplier"
        :metrics="metrics"
        @select-mode="judgeModeId = $event"
        @generate-proof="generateJudgeProof"
      />

      <SupplierPanel
        class="wide"
        :suppliers="data.suppliers"
        :selected-id="supplierId"
        :product="product"
        @select-supplier="supplierId = $event"
      />

      <WorkflowPanel
        class="wide"
        :workflow="workflowState"
        :active-step-id="activeStepId"
        @select-step="activeStepId = $event"
        @advance-step="advanceWorkflow"
      />

      <AccioSteps
        class="wide"
        :steps="data.accioSteps"
        :completed="completedAgents"
        :log="accioLog"
        @execute="executeAgent"
      />
    </section>
  </main>
</template>

<script>
import ConceptPanel from './components/ConceptPanel.vue';
import EconomicsPanel from './components/EconomicsPanel.vue';
import SupplierPanel from './components/SupplierPanel.vue';
import WorkflowPanel from './components/WorkflowPanel.vue';
import AccioSteps from './components/AccioSteps.vue';
import CompetitionPanel from './components/CompetitionPanel.vue';

export default {
  components: { ConceptPanel, EconomicsPanel, SupplierPanel, WorkflowPanel, AccioSteps, CompetitionPanel },
  data() {
    const data = window.ACCIO_DEMO_DATA;
    const product = data.products[0];
    return {
      data,
      productId: product.id,
      supplierId: data.suppliers[0].id,
      judgeModeId: data.competition[0].id,
      activeStepId: 'discover',
      completedSteps: ['brief'],
      completedAgents: ['agent-brief'],
      accioLog: [
        { title: 'Brief generated', detail: 'Accio translated the product idea into sourcing constraints and storefront angles.' }
      ],
      scenario: {
        units: product.targetUnits,
        price: product.retailPrice,
        adCac: product.adCac,
        freightMode: 'sea'
      }
    };
  },
  computed: {
    product() {
      return this.data.products.find((item) => item.id === this.productId);
    },
    supplier() {
      return this.data.suppliers.find((item) => item.id === this.supplierId);
    },
    judgeMode() {
      return this.data.competition.find((item) => item.id === this.judgeModeId);
    },
    workflowState() {
      return this.data.workflow.map((step) => ({
        ...step,
        status: this.completedSteps.includes(step.id) ? 'done' : (step.id === this.activeStepId ? 'active' : 'queued')
      }));
    },
    latestLog() {
      return this.accioLog[0];
    },
    metrics() {
      const freight = this.supplier.freight[this.scenario.freightMode];
      const tariff = this.supplier.unitCost * this.product.tariffRate;
      const landed = this.supplier.unitCost + freight + tariff + this.product.packaging;
      const paymentFee = this.scenario.price * 0.035;
      const contribution = this.scenario.price - landed - this.product.fulfillment - this.scenario.adCac - paymentFee;
      const grossMargin = contribution / this.scenario.price;
      const launchCash = this.supplier.moq * landed + this.product.fixedLaunchCost + this.supplier.sampleCost;
      const monthlyProfit = contribution * this.scenario.units - (this.product.fixedLaunchCost / 3);
      const breakEvenUnits = Math.ceil(this.product.fixedLaunchCost / Math.max(contribution, 1));
      const paybackMonths = launchCash / Math.max(contribution * this.scenario.units, 1);
      const reorderPoint = Math.ceil((this.scenario.units / 30) * (this.supplier.leadDays + 10));
      return {
        freight,
        tariff,
        landed,
        contribution,
        grossMargin,
        launchCash,
        monthlyProfit,
        breakEvenUnits,
        paybackMonths,
        reorderPoint
      };
    }
  },
  methods: {
    setProduct(id) {
      const next = this.data.products.find((item) => item.id === id);
      this.productId = id;
      this.scenario.units = next.targetUnits;
      this.scenario.price = next.retailPrice;
      this.scenario.adCac = next.adCac;
      const fit = this.data.suppliers.find((supplier) => next.category.toLowerCase().includes('pet') ? supplier.id === 'harbor' : next.category.toLowerCase().includes('creator') ? supplier.id === 'northstar' : supplier.id === 'spark');
      this.supplierId = fit.id;
      this.accioLog.unshift({ title: 'Concept switched', detail: 'Scenario knobs, supplier fit, and storefront copy refreshed for ' + next.name + '.' });
    },
    updateScenario(patch) {
      this.scenario = { ...this.scenario, ...patch };
    },
    advanceWorkflow() {
      const currentIndex = this.data.workflow.findIndex((step) => step.id === this.activeStepId);
      if (!this.completedSteps.includes(this.activeStepId)) this.completedSteps.push(this.activeStepId);
      const next = this.data.workflow[currentIndex + 1] || this.data.workflow[currentIndex];
      this.activeStepId = next.id;
      this.accioLog.unshift({ title: 'Workflow advanced', detail: 'Accio Work prepared the next handoff: ' + next.output });
    },
    executeAgent(id) {
      if (!this.completedAgents.includes(id)) this.completedAgents.push(id);
      const step = this.data.accioSteps.find((item) => item.id === id);
      this.accioLog.unshift({ title: step.title, detail: step.result });
    },
    generateJudgeProof() {
      this.accioLog.unshift({
        title: 'Judge proof generated',
        detail: 'Against ' + this.judgeMode.label + ', Accio ties ' + this.product.name + ' to ' + this.supplier.name + ', live margin, risk evidence, and the launch handoff.'
      });
    },
    runAccio() {
      const next = this.data.accioSteps.find((step) => !this.completedAgents.includes(step.id));
      if (next) this.executeAgent(next.id);
      else this.advanceWorkflow();
    }
  }
};
</script>
