<template>
  <div v-for="ml in musicsLike" :key="ml.id">
    <div class="flex flex-row">
      <span v-if="!ml.isEdit">{{ ml.fullname }}</span>
      <input
        v-if="ml.isEdit"
        type="text"
        v-model="editName"
        class="bg-black text-indigo-50 w-2/5"
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
  </div>
</template>
<script>
export default {
  name: "Myplaylist",
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
    async removeSongMyplaylist(ml) {
      const res = await fetch(`${this.urlPlaylist}/${ml}`, {
        method: "DELETE",
      });
      res.status === 200
        ? (this.musicsLike = this.musicsLike.filter((song) => song.id !== ml))
        : alert("Error to delete ");
    },
    async showTagInput(ml) {
      try {
        const res = await fetch(`${this.urlPlaylist}/${ml.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            nameref: ml.nameref,
            fullname: ml.fullname,
            isEdit: true,
            id: ml.id,
          }),
        });
        const data = await res.json();
        this.musicsLike = this.musicsLike.map((song) =>
          song.id === ml.id
            ? {
                ...ml,
                nameref: data.nameref,
                fullname: data.fullname,
                isEdit: data.isEdit,
              }
            : song
        );
        // location.reload();
        console.log(this.musicsLike[0]);
      } catch (error) {
        console.log(`Could not edit! ${error}`);
      }
    },
    async cancelNameInMyplaylist(ml) {
      try {
        const res = await fetch(`${this.urlPlaylist}/${ml.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            nameref: ml.nameref,
            fullname: ml.fullname,
            isEdit: false,
            id: ml.id,
          }),
        });
        const data = await res.json();
        this.musicsLike = this.musicsLike.map((song) =>
          song.id === ml.id
            ? {
                ...song,
                nameref: data.nameref,
                fullname: data.fullname,
                isEdit: data.isEdit,
              }
            : song
        );
        // location.reload();
        console.log(this.musicsLike[0]);
      } catch (error) {
        console.log(`Could not edit! ${error}`);
      }
    },
    async editNameInMyplaylist(ml) {
      if (this.editName != "") {
        try {
          const res = await fetch(`${this.urlPlaylist}/${ml.id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              nameref: ml.nameref,
              fullname: this.editName,
              isEdit: false,
              id: ml.id,
            }),
          });
          const data = await res.json();
          this.musicsLike = this.musicsLike.map((survey) =>
            survey.id === ml.id
              ? {
                  ...survey,
                  nameref: data.nameref,
                  fullname: data.fullname,
                  isEdit: data.isEdit,
                }
              : survey
          );
          this.editName = "";
          // this.isEdit = false
          // this.editId = ''
          // this.enteredName = ''
          // this.rating = null
        } catch (error) {
          console.log(`Could not edit! ${error}`);
        }
      } else {
        alert("pls put your name is u want or cancel");
      }
    },
  },
  async created() {
    this.musics = await this.fetchMusics();
    this.musicsLike = await this.fetchMusicsLike();
  },
};
</script>