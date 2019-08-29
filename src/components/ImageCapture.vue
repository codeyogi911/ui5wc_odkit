<template>
  <ui5-card
    avatar="sap-icon://add-photo"
    heading="Detection View"
    subtitle="Ikea Drill Machine 202.26.401"
    v-bind:status="imageHtml === null?'Not Detected':'Kit Detected'"
    class="medium sticky"
  >
    <div class="card-content">
      <ui5-busyindicator ref="busycontainer" id="busycontainer" size="Medium">
        <div class="col">
          <div v-html="imageHtml" v-show="imageHtml !== null" />
          <video
            v-show="imageHtml === null"
            ref="video"
            id="video"
            width="640"
            height="480"
            autoplay
          ></video>
          <ui5-messagestrip
            v-show="imageHtml === null"
            type="Information"
            no-close-button
          >Place the kit in frame and click detect.</ui5-messagestrip>
          <ui5-messagestrip
            v-show="imageHtml !== null"
            type="Positive"
            no-close-button
          >Objects were detected in {{requestDuration}} seconds</ui5-messagestrip>
          <ui5-button
            @press="reset()"
            v-show="imageHtml !== null"
            class="button"
            icon="sap-icon://refresh"
            aria-labelledby="lblAway"
          >Run Again</ui5-button>
          <ui5-button
            class="button"
            design="Default"
            @press="capture()"
            v-show="imageHtml === null"
          >Detect</ui5-button>
        </div>
        <ui5-popover ref="resultsPopover" header-text="Results">
          <div class="popover-content">
            <div class="flex-column">
              <ui5-label>{{errorMessage}}</ui5-label>
            </div>
          </div>
        </ui5-popover>
        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
      </ui5-busyindicator>
    </div>
  </ui5-card>
</template>

<script>
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/BusyIndicator";
import "@ui5/webcomponents/dist/Popover";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/MessageStrip";

export default {
  name: "image-capture",
  data() {
    return {
      imageHtml: null,
      errorMessage: "Nothing found. Try again.",
      requestDuration: 0,
      video: {},
      canvas: {},
      captures: []
    };
  },
  mounted() {
    this.resultsPopover = this.$refs.resultsPopover;
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        // this.video.src = window.URL.createObjectURL(stream);
        this.video.srcObject = stream;
        this.video.play();
      });
    }
  },
  methods: {
    reset() {
      this.imageHtml = null;
      this.video.play();
      this.$emit("reset");
    },
    postData(url = "", data = {}) {
      // Default options are marked with *
      return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "no-cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          // "Content-Type": "application/json"
          // "Content-Type": "application/x-www-form-urlencoded"
          // "Content-Type": "multipart/form-data"
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: data // body data type must match "Content-Type" header
      }).then(response => response.json()); // parses JSON response into native JavaScript objects
    },
    capture() {
      this.busyIndicator = this.$refs.busycontainer;
      this.busyIndicator.active = true;
      this.video.pause();
      var that = this;
      this.canvas = this.$refs.canvas;
      this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
      // this.captures.push(canvas.toDataURL("image/png"));
      this.canvas.toBlob(function(blob) {
        var formData = new FormData();
        formData.append("file", blob);
        that.startime = new Date().getTime();
        that
          .postData("http://localhost:5000/detect", formData)
          .then(data => {
            that.endtime = new Date().getTime();
            that.requestDuration = (that.endtime - that.startime) / 1000;
            // console.log(JSON.stringify(data));
            if (data.image) {
              that.imageHtml = data.image;
            } else {
              that.errorMessage = "Nothing found. Try again.";
              that.video.play();
              that.resultsPopover.openBy(that.video);
            }

            that.$emit("detected", data);
            that.busyIndicator.active = false;
          }) // JSON-string from `response.json()` call
          .catch(error => {
            that.busyIndicator.active = false;
            that.errorMessage = error.message + ", cannot connect to service";
            that.video.play();
            that.resultsPopover.openBy(that.video);
          });
      });
    }
  }
};
</script>