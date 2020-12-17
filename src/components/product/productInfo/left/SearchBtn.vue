<template>
  <div>
    <el-input
      id="searchText"
      v-model="content"
      type="search"
      placeholder="Search Keywords"
      class="searchBtn"
      @keyup.native="getBtnData()"
    />
    <ul class="ulCon">
      <li
        v-for="(search, index) in searchList"
        :key="searchKeys[index]"
        class="searchList"
        @click="loadSearchInfo(search.Barcode)"
      >
        {{ index + 1 }} :{{ search.ProductId }}<br />{{ search.model }}<br />{{
          search.company
        }}
      </li>
    </ul>
  </div>
</template>

<script>
import shortId from "shortid";

export default {
  name: "SearchBtn",
  data() {
    return {
      content: "",
      searchList: [],
      searchKeys: []
    };
  },
  methods: {
    loadSearchInfo(params) {
      window.location.href =
        "/#/productInfo?barCode=" + params + "&daycount=180";
    },
    getBtnData() {
      if (this.content == null) {
        this.searchList = [];
        this.searchKeys = [];
      } else {
        this.axios
          .get("/v1/ProductDetail/getBtnData?content=" + this.content)
          .then(response => {
            this.searchList = response.data.data;
            this.searchKeys = this.searchList.map(() => shortId.generate());
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
ul {
  padding: 0;
}
.totalData {
  padding-left: 20px;
}
.totalData h4 {
  text-align: left;
  font-weight: 500;
}

.searchBtn {
  width: 80%;
  float: left;
  margin-left: 10px;
  /* margin-top: 500px; */
}

.ulCon {
  margin-top: 10px;
}

.searchList {
  list-style: none;
  text-align: left;
  padding-left: 10px;
  padding-bottom: 10px;
  display: inline-block;
  width: 100%;
  overflow: hidden;
}

.searchList:hover {
  text-decoration: underline;
  font-weight: 700;
}
</style>
