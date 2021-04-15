<template>
  <div class="flex flex-row items-center mx-8 rounded-sm border-b-2 hover:shadow hover:bg-opacity-75 " :class="[hbgColor, hTextColor]">
    <slot></slot>
  </div>
</template>
<script>
export default {
    props: ['hbgColor','hTextColor'],
}
</script>
