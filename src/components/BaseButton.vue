<template>
    <button  :class="[buttonColor, textColor,hbgColor, hTextColor]" ><slot></slot></button>
</template>
<script>
export default {
    props: ['buttonColor','textColor','hbgColor','hTextColor'],
}
</script>