<template>
  <ul>
    <li
      v-for="(Category, index) in categoryList"
      :key="categoryKeys[index]"
      class="cateListCategory"
      @click="loadCategoryInfo(Category.CategoryNameId)"
    >
      {{ Category.CategoryName }}
    </li>
  </ul>
</template>

<script>
import shortId from "shortid";
// import $ from "jquery";

export default {
  name: "CategoryList",
  data() {
    return {
      categoryList: [
        { CategoryNameId: 18, CategoryName: "Cases" },
        { CategoryNameId: 27, CategoryName: "Screen Protection" },
        { CategoryNameId: 28, CategoryName: "Speakers" },
        { CategoryNameId: 22, CategoryName: "Mounts" },
        { CategoryNameId: 17, CategoryName: "Cables" },
        { CategoryNameId: 24, CategoryName: "Pouches" },
        { CategoryNameId: 35, CategoryName: "Other Products" },
        { CategoryNameId: 19, CategoryName: "Chargers" },
        { CategoryNameId: 41, CategoryName: "Bundles" },
        { CategoryNameId: 39, CategoryName: "Offline products" },
        { CategoryNameId: 32, CategoryName: "Power Bank" },
        { CategoryNameId: 26, CategoryName: "Repair Tools" },
        { CategoryNameId: 25, CategoryName: "Hands-free" },
        { CategoryNameId: 23, CategoryName: "Packaging" },
        { CategoryNameId: 29, CategoryName: "Stylus Pens" },
        { CategoryNameId: 37, CategoryName: "Displays" },
        { CategoryNameId: 36, CategoryName: "License Plate Frame" },
        { CategoryNameId: 30, CategoryName: "Universal" },
        { CategoryNameId: 20, CategoryName: "Cool Gadgets" },
        { CategoryNameId: 31, CategoryName: "Ring Stands" },
        { CategoryNameId: 15, CategoryName: "Apple Watch" },
        { CategoryNameId: 34, CategoryName: "Card Pouch" },
        { CategoryNameId: 14, CategoryName: "Apple AirPods" },
        { CategoryNameId: 21, CategoryName: "Memory" },
        { CategoryNameId: 16, CategoryName: "Bluetooth" },
        { CategoryNameId: 38, CategoryName: "Screen Cleaning" },
        { CategoryNameId: 40, CategoryName: "Smart Watches" }
      ],
      categoryKeys: []
    };
  },
  created() {
    // this.getData();
  },
  mounted() {
    this.categoryKeys = this.categoryList.map(() => shortId.generate());
  },
  methods: {
    loadCategoryInfo(params) {
      this.$router.push({
        path: "/categoryInfo",
        query: { categoryNameId: params }
      });
    }
  }
};
</script>

<style>
.cateListCategory {
  list-style: decimal;
  padding-left: 20px;
  padding-bottom: 10px;
  float: left;
  width: 33%;
}

.cateListCategory:hover {
  text-decoration: underline;
  font-weight: 700;
}
</style>
