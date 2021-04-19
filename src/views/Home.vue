<template>
  <play-list :musics="musics" @add-music="addMusic">
    <span
      class="material-icons text-green-400 animate-pulse hover:text-green-300"
    >
      add_circle_outline
    </span>
  </play-list>
</template>

<script>
// import BaseAudio from '../components/BaseAudio.vue';
import PlayList from "../components/PlayList.vue";
export default {
  name: "Home",
  components: {
    "play-list": PlayList,
  },
  data() {
    return {
      urlAllmusic: "http://localhost:5000/musics",
      urlPlaylist: "http://localhost:5000/musicsLike",
      musics: [],
      musicsLike: [],
      name: "",
      editName: "",
    };
  },
  methods: {
    async fetchMusics() {
      const res = await fetch("http://localhost:5000/musics");
      const data = await res.json();
      return data;
    },
    async fetchMusicsLike() {
      const res = await fetch("http://localhost:5000/musicsLike");
      const data = await res.json();
      return data;
    },
    async addMusic(song) {
      var boolean = true;
      if (this.musicsLike != []) {
        for (var key of this.musicsLike) {
          if (key.id == song.id) {
            boolean = false;
          }
        }
      }
      try {
        if (boolean) {
          const res = await fetch(this.urlPlaylist, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              nameref: song.nameref,
              fullname: song.fullname,
              isedit: false,
              id: song.id,
            }),
          });
          const data = await res.json();
          this.musicsLike = [...this.musicsLike, data];
        } else {
          alert("you have already on yourplaylist");
        }
      } catch (error) {
        console.log(`Could not save! ${error}`);
      }
    },
  },
  async created() {
    this.musics = await this.fetchMusics();
    this.musicsLike = await this.fetchMusicsLike();
  },
};
</script>