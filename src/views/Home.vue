<template>
  <div class="mx-8 rounded-sm font-sans bg-red-200 p-2">
    <base-row
      hbgColor="hover:bg-blue-900"
      hTextColor="hover:text-yellow-400"
      v-for="m in musics"
      :key="m.id"
    >
      <div class="m-2 flex flex-row w-3/4">
        {{ m.fullname }}
      </div>
      <div class="flex flex-row-reverse w-1/4 m-2">
        <base-button  @click="addNewSurvey(m)">
          <span class="material-icons text-green-400 animate-pulse  hover:text-green-300 "> add_circle_outline </span>
          <!-- <img src="../assets/add_circle_black_24dp.svg" alt="" /> -->
        </base-button>
      </div>
    </base-row>
  </div>


  <!-- <div v-for="m in musics" :key="m.id">
    <div class="flex flex-row">
      <span>{{ m.fullname }}</span>
      <button @click="addNewSurvey(m)">
        <img src="../assets/add_circle_black_24dp.svg" alt="" />
      </button>
    </div>
  </div> -->

  <!-- <div v-for="ml in musicsLike" :key="ml.id">
    <div class="flex flex-row">
      <span v-if="!ml.isEdit">{{ ml.fullname }}</span>
      <input
        v-if="ml.isEdit"
        type="text"
        v-model="editName"
        class="bg-black text-indigo-50"
      />
      <button v-if="ml.isEdit" @click="editNameInMyplaylist(ml)">Change</button>
      <button v-if="ml.isEdit" @click="cancelNameInMyplaylist(ml)">
        Cancel
      </button>

      <button v-if="!ml.isEdit" @click="showTagInput(ml)">
        <img src="../assets/edit_black_24dp.svg" alt="" />
      </button>
      <button v-if="!ml.isEdit" @click="removeSongMyplaylist(ml.id)">
        <img src="../assets/clear_black_24dp.svg" alt="" />
      </button>
    
    </div>
  </div> -->
  
  <play-list></play-list>


  
</template>

<script>
import PlayList from "../components/PlayList.vue";
export default {
  name: "Home",
  components: {
    "play-list": PlayList,
    //"local-registration": LocalRegistration,
    // "base-audio": BaseAudio
    // HelloWorld
  },
  data() {
    return {
      urlAllmusic: "http://localhost:5000/musics",
      urlPlaylist: "http://localhost:5000/musicsLike",
      musics: [],
      musicsLike: [],

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
    async addNewSurvey(song) {
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