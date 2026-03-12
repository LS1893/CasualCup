<script setup>
import { ref } from 'vue'

const MAX_LENGTH = 50

const headline = ref('Turniername')
const editing = ref(false)

function startEdit() {
  editing.value = true
}

function finishEdit() {
  editing.value = false
}

function enforceLimit(e) {
  if (headline.value.length > MAX_LENGTH) {
    headline.value = headline.value.substring(0, MAX_LENGTH)
  }
}
</script>

<template>
  <div>
    
    <!-- Display mode -->
    <h1
      v-if="!editing"
      class="editable-headline-display"
      @dblclick="startEdit"
    >
      {{ headline }}
    </h1>

    <!-- Edit mode -->
    <v-text-field
      v-else
      v-model="headline"
      :maxlength="MAX_LENGTH"
      variant="underlined"
      hide-details
      autofocus
      @keyup.enter="finishEdit"
      @blur="finishEdit"
      @input="enforceLimit"
    />

  </div>
</template>