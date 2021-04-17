<template>
  <div class="mx-8 rounded-sm font-sans bg-red-200 p-2">
    <div class="mx-8 rounded-sm font-sans">
      <base-row
        hbgColor="hover:bg-blue-900"
        hTextColor="hover:text-yellow-400"
        v-for="m in musics"
        :key="m.id"
      >
        <div class="m-2 flex flex-row w-3/4 truncate">
          {{ m.fullname }}
        </div>
        <div class="flex flex-row-reverse w-1/4 m-2">
          <base-button v-on:click="addMusic(m)">
            <slot ></slot>
            
          </base-button>
        </div>
      </base-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    musics: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    addMusic(m) {
      console.log(m)
      this.$emit("add-music", m);
    },
  },
};
</script>