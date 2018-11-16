<template>
  <div class="food">
    <Food msg="Food Vue"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Food from '@/components/Form-Food.vue'

export default {
  name: 'food',
  components: {
    Food
  }
}
</script>
