<template>
  <article class="panel">
    <div class="panel-head">
      <div>
        <p class="eyebrow">Sourcing workflow</p>
        <h2 class="panel-title">From concept to launch handoff</h2>
        <p class="panel-sub">Each step exposes the Accio prompt, owner, duration, and expected artifact.</p>
      </div>
      <button class="btn secondary" type="button" @click="$emit('advance-step')">Approve step</button>
    </div>
    <div class="panel-body">
      <div class="steps" role="tablist" aria-label="Sourcing workflow steps">
        <button
          v-for="step in workflow"
          :key="step.id"
          class="step"
          :class="{ active: step.id === activeStepId, done: step.status === 'done' }"
          type="button"
          @click="$emit('select-step', step.id)"
        >
          <b>{{ step.label }}</b>
          <small>{{ step.owner }} - {{ step.duration }}</small>
        </button>
      </div>

      <div class="two-col mt-4">
        <div class="note">
          <p class="label">Accio prompt</p>
          <p class="mt-1">{{ active.prompt }}</p>
        </div>
        <div class="note">
          <p class="label">Output artifact</p>
          <p class="mt-1">{{ active.output }}</p>
        </div>
      </div>

      <div class="metric-grid mt-4">
        <div class="metric">
          <strong>{{ doneCount }}/{{ workflow.length }}</strong>
          <span>Workflow steps approved</span>
        </div>
        <div class="metric" style="border-top-color:var(--green)">
          <strong>{{ active.owner }}</strong>
          <span>Current owner for the active handoff</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    workflow: { type: Array, required: true },
    activeStepId: { type: String, required: true }
  },
  emits: ['select-step', 'advance-step'],
  computed: {
    active() {
      return this.workflow.find((step) => step.id === this.activeStepId);
    },
    doneCount() {
      return this.workflow.filter((step) => step.status === 'done').length;
    }
  }
};
</script>
