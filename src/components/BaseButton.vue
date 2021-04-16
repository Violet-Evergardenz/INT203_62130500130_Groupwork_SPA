<template>
    <button :class="[buttonCol, textCol,hbgCol, hTextCol]" ><slot></slot></button>
</template>
<script>
export default {
    props: ['buttonCol','textCol','hbgCol','hTextCol'],
}
</script>