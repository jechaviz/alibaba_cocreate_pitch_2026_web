<template>
  <article class="panel">
    <div class="panel-head">
      <div>
        <p class="eyebrow">Accio Work assisted steps</p>
        <h2 class="panel-title">Agent actions and audit trail</h2>
        <p class="panel-sub">Click an action to simulate a work packet generated for the submission demo.</p>
      </div>
      <span class="status-pill"><i class="dot"></i>{{ completed.length }}/{{ steps.length }} complete</span>
    </div>
    <div class="panel-body">
      <div class="two-col">
        <div>
          <div class="row" v-for="step in steps" :key="step.id">
            <span>
              <b>{{ step.title }}</b><br />
              <small class="text-slate-500">Confidence {{ step.confidence }}% - {{ step.result }}</small>
            </span>
            <button class="btn secondary" type="button" @click="$emit('execute', step.id)">
              {{ completed.includes(step.id) ? 'Refresh' : 'Run' }}
            </button>
          </div>
        </div>

        <div>
          <p class="label">Recent outputs</p>
          <div class="task-log mt-3">
            <div class="log-item" v-for="item in log.slice(0, 4)" :key="item.title + item.detail">
              <b>{{ item.title }}</b><br />
              <small>{{ item.detail }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    steps: { type: Array, required: true },
    completed: { type: Array, required: true },
    log: { type: Array, required: true }
  },
  emits: ['execute']
};
</script>
