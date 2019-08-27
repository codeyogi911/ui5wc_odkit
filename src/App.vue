<template>
  <div id="app">
    <header class="app-header">
      <ui5-shellbar primary-title="myVision Inspection" :logo="logo">
        <ui5-icon src="nav-back" slot="icon"></ui5-icon>
      </ui5-shellbar>
    </header>
    <section class="button">
    <div class="row">
      <div class="col-sm-7">
        <ui5-list
          id="myList"
          separators="Inner"
          no-data-text="No Data Available"
          class="full-width"
          header-text="MIS Instrumente"
        >
          <ui5-card
            v-bind:heading="materialData.name"
            class="small"
            slot="header"
          >
            <div class="button">
              <div class="row">
                <div class="col">
                  <ui5-label id="myLabel" for="materialId">Material ID</ui5-label>
              <ui5-input
                id="materialId"
                aria-labelledby="myLabel"
                readonly
                v-bind:value="materialData.materialId"
              ></ui5-input>
                </div>
                <div class="col">
                  <ui5-label id="myLabel2" for="materialId2">Reservation Number</ui5-label>
              <ui5-input
                id="materialId2"
                aria-labelledby="myLabel"
                readonly
                v-bind:value="materialData.reservationNumber"
              ></ui5-input>
                </div>
              </div>
              
            </div>
          </ui5-card>
          <ui5-li-groupheader>Expected Items</ui5-li-groupheader>
          <ui5-li
            v-bind:icon="item.status==='Expected'?'sap-icon://warning':'sap-icon://accept'"
            v-for="item in items"
            v-bind:key="item.id"
            v-bind:info="item.status"
            v-bind:info-state="item.status==='Expected'?'Warning':'Success'"
            v-bind:description="item.partid"
          >{{ item.name }}</ui5-li>
          <!-- <ui5-li-groupheader>Custom List</ui5-li-groupheader>
          <ui5-li-custom v-for="item in items" v-bind:key="item.id">
            <p>{{ item.name }}</p>
          </ui5-li-custom> -->
        </ui5-list>
      </div>
      <div class="col-sm-5">
        <image-capture @reset="reset" @detected="onDetectionComplete"></image-capture>
      </div>
    </div>
    </section>
  </div>
</template>

<script>
import logo from "./assets/sap-logo-svg.svg";
import materialData from "./model/json/material.json";
import "@ui5/webcomponents/dist/ShellBar";
import "@ui5/webcomponents/dist/Title";
import ImageCapture from "./components/ImageCapture";
import "@ui5/webcomponents/dist/GroupHeaderListItem";
import "@ui5/webcomponents/dist/Badge";
import "@ui5/webcomponents/dist/CustomListItem";
import "@ui5/webcomponents/dist/Input.js";

export default {
  mounted() {
    this.items = JSON.parse(JSON.stringify(this.materialData.refList));
  },
  name: "app",
  data() {
    return {
      logo: logo,
      items: [],
      materialData: materialData
    };
  },
  components: {
    "image-capture": ImageCapture
  },
  methods: {
    reset() {
      this.items = JSON.parse(JSON.stringify(this.materialData.refList));
    },
    onDetectionComplete(data) {
      var detectedItems = this.materialData.refList.filter(value =>
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
</style>
