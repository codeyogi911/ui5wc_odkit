<template>
  <div id="app">
    <header class="app-header">
      <ui5-shellbar primary-title="myVision Inspection" :logo="logo">
        <ui5-icon src="nav-back" slot="icon"></ui5-icon>
      </ui5-shellbar>
    </header>
    <section style="padding:1rem;">
      <div class="row">
        <div class="col-sm-7">
          <ui5-card
            v-bind:subtitle="'Serial Number: '+materialData.serial"
            v-bind:heading="materialData.name"
            class="small"
          >
            <div class="button">
              <div class="row">
                <div class="col">
                  <ui5-label id="combined-runlbl" for="combined-run">Combined Run</ui5-label>
                  <ui5-input
                    id="combined-run"
                    aria-labelledby="combined-runlbl"
                    readonly
                    v-bind:value="materialData.combinedRun"
                  ></ui5-input>
                  <ui5-label id="customerlbl" for="customer">Customer</ui5-label>
                  <ui5-input
                    id="customer"
                    aria-labelledby="customerlbl"
                    readonly
                    v-bind:value="materialData.customer"
                  ></ui5-input>
                  <ui5-label id="myLabel" for="materialId">Material</ui5-label>
                  <ui5-input
                    id="materialId"
                    aria-labelledby="myLabel"
                    readonly
                    v-bind:value="materialData.materialId"
                  ></ui5-input>
                </div>
                <div class="col">
                  <ui5-label id="myLabel2" for="materialId2">Reservation</ui5-label>
                  <ui5-input
                    id="materialId2"
                    aria-labelledby="myLabel"
                    readonly
                    v-bind:value="materialData.reservationNumber"
                  ></ui5-input>
                  <ui5-label id="equipmentlbl" for="equipment">Equipment</ui5-label>
                  <ui5-input
                    id="equipment"
                    aria-labelledby="equipmentlbl"
                    readonly
                    v-bind:value="materialData.equipment"
                  ></ui5-input>
                  <ui5-label id="objtyplbl" for="objtyp">Object Type</ui5-label>
                  <ui5-input
                    id="objtyp"
                    aria-labelledby="objtyplbl"
                    readonly
                    v-bind:value="materialData.objecttype"
                  ></ui5-input>
                </div>
              </div>
              <div class="row" style="padding-top:1.5rem">
                <ui5-table class="demo-table" id="table" ref="table">
                  <!-- Columns -->
                  <ui5-table-column slot="columns" class="table-cell" width="100px">
                    <span style="line-height: 1.4rem">Material</span>
                  </ui5-table-column>

                  <ui5-table-column
                    slot="columns"
                    popin-text="Desc."
                    class="table-cell"
                    width="180px"
                    min-width="800"
                    demand-popin
                  >
                    <span style="line-height: 1.4rem">Description</span>
                  </ui5-table-column>

                  <ui5-table-column
                    slot="columns"
                    popin-text="Batch"
                    demand-popin
                    min-width="800"
                    class="table-cell"
                    width="50px"
                  >
                    <span style="line-height: 1.4rem">Batch</span>
                  </ui5-table-column>

                  <ui5-table-column
                    slot="columns"
                    popin-text="Serial No."
                    demand-popin
                    min-width="800"
                    class="table-cell"
                    width="150px"
                  >
                    <span style="line-height: 1.4rem">Serial Number</span>
                  </ui5-table-column>

                  <ui5-table-column slot="columns" width="70px" class="table-cell">
                    <span style="line-height: 1.4rem">Issued</span>
                  </ui5-table-column>

                  <ui5-table-column slot="columns" width="70px" class="table-cell">
                    <span style="line-height: 1.4rem">Recieved</span>
                  </ui5-table-column>
                  <ui5-table-column slot="columns" width="70px" class="table-cell">
                    <span style="line-height: 1.4rem">Missing</span>
                  </ui5-table-column>
                  <ui5-table-column slot="columns" width="70px" class="table-cell">
                    <span style="line-height: 1.4rem">Damaged</span>
                  </ui5-table-column>

                  <ui5-table-column slot="columns" class="table-cell">
                    <span style="line-height: 1.4rem">Actions</span>
                  </ui5-table-column>

                  <ui5-table-column slot="columns" class="table-cell">
                    <span style="line-height: 1.4rem">Status</span>
                  </ui5-table-column>
                  <!-- Rows -->
                  <ui5-table-row v-for="item in items" v-bind:key="item.id">
                    <!-- Cells -->
                    <ui5-table-cell class="table-cell">
                      <p style="font-weight:bold">{{item.material}}</p>
                    </ui5-table-cell>
                    <ui5-table-cell class="table-cell">
                      <p>{{item.name}}</p>
                    </ui5-table-cell>
                    <ui5-table-cell class="table-cell">
                      <p>{{item.batch}}</p>
                    </ui5-table-cell>
                    <ui5-table-cell class="table-cell">
                      <p>{{item.serial}}</p>
                    </ui5-table-cell>
                    <ui5-table-cell class="table-cell">
                      <p>{{item.GI}}</p>
                    </ui5-table-cell>
                    <ui5-table-cell class="table-cell">
                      <ui5-input
                        v-bind:ref="'inputRcv'+item.id"
                        v-bind:readonly="item.readonly"
                        v-bind:value="item.GR"
                      ></ui5-input>
                    </ui5-table-cell>
                    <ui5-table-cell class="table-cell">
                      <ui5-input
                        v-bind:readonly="item.readonly"
                        v-bind:value="item.GM"
                        v-bind:ref="'inputMissing'+item.id"
                      ></ui5-input>
                    </ui5-table-cell>
                    <ui5-table-cell class="table-cell">
                      <ui5-input
                        v-bind:readonly="item.readonly"
                        v-bind:value="item.GD"
                        v-bind:ref="'inputDamaged'+item.id"
                      ></ui5-input>
                    </ui5-table-cell>
                    <ui5-table-cell class="table-cell">
                      <ui5-button
                        v-bind:ref="'verifyBtn'+item.id"
                        @click="verify(item)"
                        style="padding-right:0.25rem"
                        icon="sap-icon://accept"
                        design="Positive"
                      ></ui5-button>
                      <ui5-button @click="editPress(item)" icon="sap-icon://edit"></ui5-button>
                    </ui5-table-cell>
                    <ui5-table-cell class="table-cell">
                      <ui5-badge v-bind:color-scheme="item.status === 'Not Detected'?1:8">
                        <ui5-icon
                          v-bind:src="item.status==='Not Detected'?'sap-icon://message-warning':'sap-icon://accept'"
                          slot="icon"
                        ></ui5-icon>
                        {{item.status}}
                      </ui5-badge>
                      <ui5-badge v-bind:color-scheme="8" v-show="item.GR > 0">
                        <ui5-icon v-bind:src="'sap-icon://accept'" slot="icon"></ui5-icon>Recieved
                      </ui5-badge>
                      <ui5-badge v-bind:color-scheme="1" v-show="item.GM > 0">
                        <ui5-icon v-bind:src="'sap-icon://message-warning'" slot="icon"></ui5-icon>Missing
                      </ui5-badge>
                      <ui5-badge v-bind:color-scheme="item.verified?8:2">
                        <ui5-icon
                          v-bind:src="item.verified?'sap-icon://accept':'sap-icon://message-error'"
                          slot="icon"
                        ></ui5-icon>
                        {{item.verified?'Verified':'Not Verified'}}
                      </ui5-badge>
                    </ui5-table-cell>
                  </ui5-table-row>
                </ui5-table>
              </div>
            </div>
          </ui5-card>
          <ui5-popover ref="verifyPopover" header-text="Invalid Entry">
            <div class="popover-content">
              <div class="flex-column">
                <p>The values don't add up. Please check.</p>
              </div>
            </div>
            <!-- <div slot="footer" class="popover-footer">
              <div style="flex: 1;"></div>
              <ui5-button id="closePopoverButton" design="Emphasized">Subscribe</ui5-button>
            </div>-->
          </ui5-popover>
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
import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/Popover";

export default {
  mounted() {
    this.reset();
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
    verify(item) {
      var index = this.items.indexOf(item),
        inputGR = parseInt(this.$refs["inputRcv" + item.id][0].value),
        inputGM = parseInt(this.$refs["inputMissing" + item.id][0].value),
        inputGD = parseInt(this.$refs["inputDamaged" + item.id][0].value);
      var total = inputGR + inputGM + inputGD;
      if (item.GI - total === 0) {
        (item.GR = inputGR), (item.GM = inputGM), (item.GD = inputGD);
        item.verified = true;
        item.readonly = true;
        this.$set(this.items, index, item);
      } else {
        this.$refs.verifyPopover.openBy(this.$refs["verifyBtn" + item.id][0]);
      }
    },
    editPress(item) {
      var index = this.items.indexOf(item);
      item.readonly = !item.readonly;
      this.$set(this.items, index, item);
    },
    reset() {
      this.items = JSON.parse(JSON.stringify(this.materialData.refList));
      this.items.forEach(element => {
        element.GR = 0;
        element.GD = 0;
        element.GM = element.GI - element.GR;
        element.status = "Not Detected";
        element.readonly = true;
        element.verified = false;
      });
    },
    onDetectionComplete(data) {
      var detectedItems = this.materialData.refList.filter(value =>
        data.detections.includes(value.id)
      );
      this.items.forEach(element => {
        if (detectedItems.find(o => o.id === element.id)) {
          element.GR++;
          element.GM = element.GM - element.GR;
          element.status = "Auto Detected";
        }
      });
      this.$set(this.items);
    }
  }
};
</script>

<style lang="scss">
@import "./css/custom.scss";
</style>
