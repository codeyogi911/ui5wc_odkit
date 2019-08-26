<template>
  <div id="app">
    <header class="app-header">
      <ui5-shellbar primary-title="myVision Inspection" :logo="logo"></ui5-shellbar>
    </header>
    <section class="app-content">
      <div class="row">
        <div class="col-sm-4">
          <!-- <div class="container">
            <ui5-title level="H2">Ikea Drill Kit</ui5-title>
          </div>-->

          <ui5-list
            id="myList"
            separators="Inner"
            no-data-text="No Data Available"
            class="full-width"
            header-text="Ikea Drill Machine"
          >
            <ui5-li
              v-bind:icon="item.status==='Expected'?'sap-icon://warning':'sap-icon://accept'"
              v-for="item in items"
              v-bind:key="item.id"
              v-bind:info="item.status"
              v-bind:info-state="item.status==='Expected'?'Warning':'Success'"
              v-bind:description="item.partid"
            >{{ item.name }}</ui5-li>
          </ui5-list>
        </div>
        <div class="col-sm-8">
          <div class="row">
            <image-capture @reset="reset" @detected="onDetectionComplete"></image-capture>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import logo from "./assets/logo.png";
import "@ui5/webcomponents/dist/ShellBar";
import "@ui5/webcomponents/dist/Title";
import ImageCapture from "./components/ImageCapture";
export default {
  mounted() {
    this.items = JSON.parse(JSON.stringify(this.reflist));
  },
  name: "app",
  data() {
    return {
      logo: logo,
      items: [],
      reflist: [
        { id: 1, name: "Drill", partid: "1541218541AS", status: "Expected" },
        { id: 2, name: "Screw", partid: "1541454541A9", status: "Expected" },
        { id: 3, name: "Bit 1", partid: "1DCFV18541AS", status: "Expected" },
        { id: 4, name: "Bit 8", partid: "132323241AV", status: "Expected" },
        { id: 5, name: "Bit 2", partid: "CD1218541AS", status: "Expected" },
        { id: 6, name: "Bit 6", partid: "WDD3343541AS", status: "Expected" }
      ]
    };
  },
  components: {
    "image-capture": ImageCapture
  },
  methods: {
    reset() {
      this.items = JSON.parse(JSON.stringify(this.reflist));
    },
    onDetectionComplete(data) {
      var detectedItems = this.reflist.filter(value =>
        data.detections.includes(value.id)
      );
      this.items.forEach(element => {
        if (detectedItems.find(o => o.id === element.id)) {
          element.status = "Detected";
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "./css/custom.scss";
#myList {
  padding: 2rem;
}
</style>
