<script>
// eslint-disable-next-line no-unused-vars
exports.install = function(Vue, options) {
  Vue.prototype.GetBarcode = function() {
    // 1. 从route中获取barCode
    // 2.若不存在，则从缓存中获取
    // 3.若仍不存在，则加载空表

    this.barCode = this.$route.query.barCode;

    if (!this.barCode) {
      let sessionBarcode = sessionStorage.getItem("barCode");

      if (sessionBarcode != null || sessionBarcode != undefined) {
        this.barCode = sessionBarcode;
      }
    }
  };
  Vue.prototype.GetBarcodeAndDay = function() {
    this.barCode = this.$route.query.barCode;
    this.daycount = this.$route.query.daycount;

    if (!this.barCode) {
      let sessionBarcode = sessionStorage.getItem("barCode");

      if (sessionBarcode != null || sessionBarcode != undefined) {
        this.barCode = sessionBarcode;
        this.daycount = 180;
      }
    }
  };
  Vue.prototype.GetcategoryNameId = function() {
    // 1. 从route中获取categoryNameId
    // 2.若不存在，则从缓存中获取
    // 3.若仍不存在，则加载空表

    this.categoryNameId = this.$route.query.categoryNameId;
    if (!this.categoryNameId) {
      let sessioncategoryNameId = sessionStorage.getItem("categoryNameId");

      if (sessioncategoryNameId != null || sessioncategoryNameId != undefined) {
        this.categoryNameId = sessioncategoryNameId;
      }
    }
  };
  Vue.prototype.GetcategoryName = function() {
    // 1. 从route中获取categoryName
    // 2.若不存在，则从缓存中获取
    // 3.若仍不存在，则加载空表

    this.categoryName = this.$route.query.categoryName;

    if (!this.categoryName) {
      let sessioncategoryName = sessionStorage.getItem("categoryName");

      if (sessioncategoryName != null || sessioncategoryName != undefined) {
        this.categoryName = sessioncategoryName;
      }
    }
  };
  Vue.prototype.SetLocalStorage = function(type, name, id) {
    var history = JSON.parse(window.sessionStorage.getItem("localhistory"));

    if (!history) {
      let temp = [
        {
          type: type,
          name: name,
          id: id
        }
      ];
      sessionStorage.setItem("localhistory", JSON.stringify(temp));
    } else if (history.length > 0 && history.length < 9) {
      let isReptition = 0; //0为此次插入的历史记录不重复，旨在剔除存储的访问历史中重复的选项
      for (let i = 0; i < history.length; i++) {
        if (name == history[i].name) {
          isReptition = 1;
        }
      }
      if (isReptition == 0) {
        let temp = {
          type: type,
          name: name,
          id: id
        };
        history[history.length] = temp;
        sessionStorage.setItem("localhistory", JSON.stringify(history));
      }
    } else {
      let isReptition = 0;
      for (let i = 0; i < history.length; i++) {
        if (name == history[i].name) {
          isReptition = 1;
        }
      }
      if (isReptition == 0) {
        let temp = {
          type: type,
          name: name,
          id: id
        };
        for (let i = 1; i < history.length; i++) {
          history[i - 1] = history[i];
        }
        history[9] = temp;
        sessionStorage.setItem("localhistory", JSON.stringify(history));
      }
    }
  };
};
</script>
