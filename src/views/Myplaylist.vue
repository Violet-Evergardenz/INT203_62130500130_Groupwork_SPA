<template>
  <div class="mx-8 rounded-sm font-sans bg-red-200 p-2">
    <div v-if="!isHave">u not yet add song to yourplaylist</div>
    <div v-if="isHave">
      <base-row
        hbgColor="hover:bg-blue-900"
        hTextColor="hover:text-yellow-400"
        v-for="ml in musicsLike"
        :key="ml.id"
      >
        <div class="m-2 flex flex-row w-3/4">
          <span v-if="!ml.isEdit">{{ ml.fullname }}</span>
          <input
            v-if="ml.isEdit"
            type="text"
            v-model="editName"
            class="bg-black text-indigo-50 w-2/5"
          />
        </div>
        <div class="flex flex-row-reverse w-1/4 m-2">
          <base-button v-if="ml.isEdit" @click="cancelNameInMyplaylist(ml)">
            Cancel
          </base-button>
          <base-button v-if="ml.isEdit" @click="editNameInMyplaylist(ml)">
            Change
          </base-button>
          <base-button v-if="!ml.isEdit" @click="removeSongMyplaylist(ml.id)">
            <span class="material-icons"> clear </span>
          </base-button>
          <base-button v-if="!ml.isEdit" @click="showTagInput(ml)">
            <span class="material-icons"> edit </span>
          </base-button>
        </div>
      </base-row>
    </div>
  </div>
  <!-- <div v-for="ml in musicsLike" :key="ml.id">
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
        <span class="material-icons"> edit </span>
      </button>
      <button v-if="!ml.isEdit" @click="removeSongMyplaylist(ml.id)">
        <span class="material-icons"> clear </span>
      </button>
    </div>
  </div> -->
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
      isHave: false,
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
      if (this.musicsLike[0] == undefined) {
        this.isHave = false;
      }
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
    if (this.musicsLike[0] != undefined) {
      this.isHave = true;
    }
    console.log(this.musicsLike[0]);
    console.log(this.isHave);
  },
};
</script>