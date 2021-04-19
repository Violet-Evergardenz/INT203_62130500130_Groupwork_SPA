<template>
  <form class="bg-black" @submit.prevent="addMusic">
    <input
      class="input m-3"
      id="name"
      type="text"
      v-model="inputname"
      placeholder="           Name Song"
    />
    <input
      class="input m-3"
      id="url"
      type="text"
      v-model="inputlink"
      placeholder="             Link url Song"
    />
    <button class="text-yellow-300 bg-red-400 m-3 px-10">Submit</button>
  </form>
  <div class="m-4 mx-40">
    <div v-for="music in playlistWorld" :key="music.id">
      <div class="flex flex-row justify-center">
        <a
          :href="music.url"
          target="_blank"
          class="m-2 flex flex-row w-3/4 truncate"
          >{{ music.fullname }}</a
        >
        <div class="flex flex-row-reverse w-1/4 m-2">
          <base-button v-on:click="removeSongMyplaylist(music)">
            <span class="material-icons"> remove </span>
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "playlistWorld",

  data() {
    return {
      urlAllmusic: "http://localhost:5000/playlistWorld",
      playlistWorld: [],
      inputname: "",
      inputlink: "",
    };
  },
  methods: {
    async fetchPlaylistWorld() {
      const res = await fetch("http://localhost:5000/playlistWorld");
      const data = await res.json();
      return data;
    },
    async removeSongMyplaylist(ml) {
      const res = await fetch(`${this.urlAllmusic}/${ml.id}`, {
        method: "DELETE",
      });
      res.status === 200
        ? (this.playlistWorld = this.playlistWorld.filter(
            (song) => song.id !== ml.id
          ))
        : alert("Error to delete ");
      // if (this.playlistWorld[0] == undefined) {
      //   this.isHave = false;
      // }
    },
    async addMusic() {
      console.log(this.inputname);
      console.log(this.inputlink);
      if(this.inputname != "" && this.inputlink != "") {
        try {
          const res = await fetch(this.urlAllmusic, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              fullname: this.inputname,
              url: this.inputlink,
            }),
          });
          const data = await res.json();
          this.playlistWorld = [...this.playlistWorld, data];
        } catch (error) {
          console.log(`Could not save! ${error}`);
        }
      } else {
        alert("pls putlink or name in iuput");
      }

      this.inputname = "";
      this.inputlink = "";
    },
  },
  async created() {
    this.playlistWorld = await this.fetchPlaylistWorld();
  },
};
</script>