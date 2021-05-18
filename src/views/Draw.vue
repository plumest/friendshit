<template>
  <div class="about">
    <h1>This is a book {{ bookId }}</h1>
    <b-button size="small" variant="outline-light" @click="loadSave('u')"><i class="ion ion-link"></i></b-button>
    <div id="draw">
      <div class="app-wrapper">
        <canvas id="canvas">
        </canvas>
        <div class="cursor" id="cursor"></div>
        <div class="controls">
          <div class="btn-row">
            <div class="history" title="history">
              {{ history.length }}
            </div>
          </div>
          <div class="btn-row">
            <button type="button"
                    v-on:click="removeHistoryItem"
                    v-bind:class="{ disabled: !history.length }" title="Undo">
              <i class="ion ion-reply"></i>
            </button>
            <button type="button"
                    v-on:click="removeAllHistory"
                    v-bind:class="{ disabled: !history.length }" title="Clear all">
              <i class="ion ion-trash-a"></i>
            </button>
          </div>

          <div class="btn-row">
            <button title="Brush options"
                    v-on:click="popups.showOptions = !popups.showOptions">
              <i class="ion ion-android-create"></i>
            </button>

            <div class="popup" v-if="popups.showOptions">
              <div class="popup-title">
                Options
              </div>
              <button title="Restrict movement vertical"
                      v-on:click="options.restrictY = !options.restrictY; options.restrictX = false"
                      v-bind:class="{ active: options.restrictY }">
                <i class="ion ion-arrow-right-c"></i>
                Restrict vertical
              </button>
              <button title="Restrict movement horizontal"
                      v-on:click="options.restrictX = !options.restrictX; options.restrictY = false"
                      v-bind:class="{ active: options.restrictX }">
                <i class="ion ion-arrow-up-c"></i>
                Restrict horizontal
              </button>
              <button type="button"
                      v-on:click="simplify"
                      v-bind:class="{ disabled: !history.length }" title="Simplify paths">
                <i class="ion ion-wand"></i>
                Simplify paths
              </button>
              <button type="button"
                      v-on:click="jumble"
                      v-bind:class="{ disabled: !history.length }" title="Go nutz">
                <i class="ion ion-shuffle"></i>
                Go nutz
              </button>
            </div>

          </div>

          <div class="btn-row">
            <button title="Pick a brush size"
                    v-on:click="popups.showSize = !popups.showSize"
                    v-bind:class="{ active: popups.showSize }">
              <i class="ion ion-android-radio-button-on"></i>
              <span class="size-icon">
                        {{ size }}
                    </span>
            </button>

            <div class="popup" v-if="popups.showSize">
              <div class="popup-title">
                Brush size
              </div>
              <label v-for="sizeItem in sizes" :key="sizeItem" class="size-item">
                <input type="radio" name="size" v-model="size" v-bind:value="sizeItem">
                <span class="size"
                      v-bind:style="{width: sizeItem + 'px', height: sizeItem + 'px'}"
                      v-on:click="changeBrushSize(sizeItem)"></span>
              </label>
            </div>
          </div>

          <div class="btn-row">
            <button title="Pick a color"
                    v-on:click="popups.showColor = !popups.showColor"
                    v-bind:class="{ active: popups.showColor }">
              <i class="ion ion-android-color-palette"></i>
              <span class="color-icon"
                    v-bind:style="{backgroundColor: color}">
                    </span>
            </button>

            <div class="popup" v-if="popups.showColor">
              <div class="popup-title">
                Brush color
              </div>
              <label v-for="colorItem in colors" :key="colorItem" class="color-item">
                <input type="radio"
                       name="color"
                       v-model="color"
                       v-bind:value="colorItem">
                <span v-bind:class="'color color-' + colorItem"
                      v-bind:style="{backgroundColor: colorItem}"
                      v-on:click="changeColor(colorItem)"></span>
              </label>
            </div>
          </div>

          <div class="btn-row">
            <button title="Save"
                    v-on:click="popups.showSave = !popups.showSave">
              <i class="ion ion-android-cloud-outline"></i>
            </button>

            <div class="popup" v-if="popups.showSave">
              <div class="popup-title">
                Save your design
              </div>
              <div class="form">
                <input type="text"
                       placeholder="Save name"
                       v-model="save.name">
                <div v-if="save.name.length < 3" class="text-faded">
                  <i>
                    Min 3 characters
                  </i>
                </div>
                <span class="btn"
                      v-on:click="saveItem">
                            Save as
                            <span class="text-faded">
                                {{ save.name }}
                            </span>
                        </span>
              </div>

              <div class="saves" v-if="save.saveItems.length">
                <div class="popup-title">
                  Load a save
                </div>

                <div class="save-item"
                     v-for="item in save.saveItems"
                     :key="item"
                >
                  <h3>{{ item.name }}</h3>
                  <span class="btn"
                        v-on:click="loadSave(item)">load</span>
                </div>
              </div>
            </div>

          </div>

          <div class="btn-row">
            <button v-on:click="popups.showWelcome = true" title="Made by Lewi">
              <i class="ion ion-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
class Draw {
  constructor(app){
    this.app = app
    this.c = document.getElementById('canvas');
    this.ctx = this.c.getContext('2d');

    this.mouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;

    this.tempHistory = [];

    this.setSize();

    this.listen();

    this.redraw();
  }

  listen(){
    this.c.addEventListener('mousedown', (e)=>{
      this.mouseDown = true;
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
      this.setDummyPoint();
    });

    this.c.addEventListener('mouseup', ()=>{
      if(this.mouseDown){
        this.setDummyPoint();
      }
      this.mouseDown = false;
    });

    this.c.addEventListener('mouseleave', ()=>{
      if(this.mouseDown){
        this.setDummyPoint();
      }
      this.mouseDown = false;
    });

    this.c.addEventListener('mousemove', (e)=>{
      this.moveMouse(e);

      if(this.mouseDown){

        if(!this.app.options.restrictX){
          this.mouseX = e.offsetX;
        }

        if(!this.app.options.restrictY){
          this.mouseY = e.offsetY;
        }

        var item = {
          isDummy: false,
          x: this.mouseX,
          y: this.mouseY,
          c: this.app.color,
          r: this.app.size
        };

        this.app.history.push(item);
        this.draw(item, this.app.history.length);
      }
    });

    window.addEventListener('resize', ()=>{
      this.setSize();
      this.redraw();
    });
  }

  setSize(){
    this.c.width = window.innerWidth;
    this.c.height = window.innerHeight - 60;
  }

  moveMouse(e){
    let element = document.getElementById('canvas');
    let top = element.getBoundingClientRect().top

    let x = e.offsetX;
    let y = e.offsetY + top;

    var cursor = document.getElementById('cursor');

    cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
  }

  getDummyItem(){
    if (!this.app.history) {
      let lastPoint = this.app.history[this.app.history.length-1];

      return {
        isDummy: true,
        x: lastPoint.x,
        y: lastPoint.y,
        c: null,
        r: null
      };
    } else {
      return {
        isDummy: true,
        x: 0,
        y: 0,
        c: null,
        r: null
      };
    }
  }

  setDummyPoint(){
    var item = this.getDummyItem();
    this.app.history.push(item);
    this.draw(item, this.app.history.length);
  }

  redraw(){
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
    this.drawBgDots();

    if(!this.app.history.length){
      return true;
    }

    this.app.history.forEach((item, i)=>{
      this.draw(item, i);
    });
  }

  drawBgDots(){
    var gridSize = 50;
    this.ctx.fillStyle = 'rgba(0, 0, 0, .2)';

    for(var i = 0; i*gridSize < this.c.width; i++){
      for(var j = 0; j*gridSize < this.c.height; j++){
        if(i > 0 && j > 0){
          this.ctx.beginPath();
          this.ctx.rect(i * gridSize, j * gridSize, 2, 2);
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }

  draw(item, i){
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin="round";

    var prevItem = this.app.history[i-2];

    if(i < 2){
      return false;
    }

    if(!item.isDummy && !this.app.history[i-1].isDummy && !prevItem.isDummy){
      this.ctx.strokeStyle = item.c;
      this.ctx.lineWidth = item.r;

      this.ctx.beginPath();
      this.ctx.moveTo(prevItem.x, prevItem.y);
      this.ctx.lineTo(item.x, item.y);
      this.ctx.stroke();
      this.ctx.closePath();
    } else if (!item.isDummy) {
      this.ctx.strokeStyle = item.c;
      this.ctx.lineWidth = item.r;

      this.ctx.beginPath();
      this.ctx.moveTo(item.x, item.y);
      this.ctx.lineTo(item.x, item.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
}


export default {
  data() { return {
    history: [],
    color: '#13c5f7',
    popups: {
      showColor: false,
      showSize: false,
      showWelcome: true,
      showSave: false,
      showOptions: false
    },
    options: {
      restrictY: false,
      restrictX: false
    },
    save: {
      name: '',
      saveItems: []
    },
    size: 12,
    colors: [
      '#d4f713',
      '#13f7ab',
      '#13f3f7',
      '#13c5f7',
      '#138cf7',
      '#1353f7',
      '#2d13f7',
      '#7513f7',
      '#a713f7',
      '#d413f7',
      '#f713e0',
      '#f71397',
      '#f7135b',
      '#f71313',
      '#f76213',
      '#f79413',
      '#f7e013'],
    sizes: [6, 12, 24, 48],
    weights: [ 2, 4, 6 ],
    draw_pad: '',
  } },
  methods: {
    removeHistoryItem() {
      this.history.splice(this.history.length-2, 1);
      this.draw_pad.redraw();
    },
    removeAllHistory() {
      this.history = [];
      this.draw_pad.redraw();
    },
    simplify() {
      var simpleHistory = [];
      this.history.forEach((item, i)=>{
        if(i % 6 !== 1 || item.isDummy){
          simpleHistory.push(item);
        }
      });
      this.history = simpleHistory;
      this.draw_pad.redraw();
    },
    jumble() {
      this.history.forEach((item, i)=>{
        item.r += Math.sin(i * 20) * 5;
      });
      this.history = this.shuffle(this.history);
      this.draw_pad.redraw();
    },
    shuffle(a){
      var b = [];

      a.forEach((item)=>{
        if(!item.isDummy){
          var l = b.length;
          var r = Math.floor(l * Math.random());
          b.splice(r, 0, item);
        }
      });

      for(var i = 0; i < b.length; i++){
        if(i % 20 === 1){
          b.push(this.draw_pad.getDummyItem());
        }
      }

      return b;
    },
    saveItem(){
      if(this.save.name.length > 2){
        var historyItem = {
          history: this.history.slice(),
          name: this.save.name
        };

        this.save.saveItems.push(historyItem);
        this.$store.dispatch('addPaths', {
          bookId: this.bookId,
          paths: historyItem
        })
        console.log(this.save.saveItems)
        this.save.name = "";
      }
    },
    async loadSave(item) {
      const history = await this.$store.dispatch("fetchPaths", {bookId: this.bookId });
      this.history = history.history //item.history.slice();
      console.log(item)
      console.log('lol')
      console.log(history)
      this.draw_pad.redraw();

    },
    sendPaths() {
      this.$store.dispatch("fetchPaths");
    },
    deletePaths(index, _id) {
      let payload = { index: index, _id: _id };
      this.$store.dispatch("deletePaths", payload);
    },
    createBook() {
      this.$router.push({ path: '/books/create' })
    },
    changeColor(color) {
      this.popups.showColor = !this.popups.showColor
      this.color = color
    },
    changeBrushSize(size) {
      this.popups.showSize = !this.popups.showSize
      this.size = size
    },
  },
  computed: {
    bookId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.draw_pad = new Draw(this)
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body, button, input {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
}
h1, h2, h3, h4, h5 {
  font-weight: 500;
}
.text-faded {
  opacity: 0.5;
}
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid #1e1e1e;
  pointer-events: none;
  user-select: none;
  mix-blend-mode: difference;
  opacity: 0;
  transition: opacity 1s;
}
canvas {
  width: 100%;
  height: calc(100vh - 60px);
  background-color: white;
  cursor: none;
}
canvas:hover + .cursor {
  opacity: 1;
}
canvas:active + .cursor {
  border-color: #3c3c3c;
}
.controls {
  position: fixed;
  z-index: 5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.stat {
  font-size: 20px;
  margin-bottom: 15px;
}
.btn-row {
  position: relative;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 15px;
  border-radius: 4px;
}
.popup {
  position: absolute;
  width: 300px;
  bottom: 58px;
  padding: 30px;
  left: calc(50% - 150px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
  color: #1e1e1e;
  border-radius: 10px 10px 0 0;
  border: 1px solid #dcdcdc;
  border-bottom-width: 0;
  opacity: 0;
  animation: popup 0.5s forwards cubic-bezier(0.2, 2, 0.4, 1);
  z-index: 2;
  overflow: hidden;
  max-height: 80vh;
  overflow-y: auto;
}
.popup .popup-title {
  flex: 0 0 100%;
  text-align: center;
  font-size: 16px;
  color: black;
  opacity: 0.5;
  margin-bottom: 10px;
}
.popup button {
  height: 80px;
  width: 80px;
  text-align: center;
  font-size: 14px;
  color: rgba(0, 0, 0, .4);
}
.popup button i {
  display: block;
  font-size: 30px;
  margin-bottom: 5px;
  color: rgba(0, 0, 0, .2);
}
.popup button.disabled {
  color: rgba(0, 0, 0, .2);
}
.popup button.disabled i {
  color: rgba(0, 0, 0, .1);
}
.popup button.active, .popup button:active {
  color: rgba(0, 0, 0, .4);
}
.popup button.active i, .popup button:active i {
  color: #0095ff;
}
@keyframes popup {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.welcome-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-color: #0095ff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fade-up {
  opacity: 0;
  animation: fade-up 1s forwards cubic-bezier(0.2, 2, 0.4, 1);
}
.btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 4px;
  background-color: #0095ff;
  color: white;
  animation-delay: 1s;
  transition: all 0.15s;
  cursor: pointer;
}
.btn:hover {
  background-color: #3af;
}
.welcome {
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.welcome h1.fade-up {
  font-weight: 300;
  font-size: 40px;
  animation-delay: 0.25s;
}
.welcome h2.fade-up {
  font-weight: 400;
  color: rgba(255, 255, 255, .5);
  animation-delay: 0.5s;
}
.welcome a.fade-up {
  color: rgba(255, 255, 255, .5);
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  animation-delay: 0.75s;
}
.welcome .btn.fade-up {
  background-color: rgba(255, 255, 255, .2);
  color: white;
  margin-top: 60px;
}
.welcome .btn.fade-up:hover {
  background-color: rgba(255, 255, 255, .3);
}
@keyframes fade-up {
  from {
    transform: translateY(80px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}
.form {
  flex: 0 0 100%;
}
.form input {
  display: block;
  appearance: none;
  border: 0;
  box-shadow: none;
  outline: 0;
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 10px 15px;
  width: 100%;
  margin-bottom: 4px;
}
button {
  appearance: none;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  width: 40px;
  height: 60px;
  display: inline-block;
  background-color: transparent;
  color: #8c8c8c;
  font-size: 22px;
  transition: all 0.15s;
  cursor: pointer;
  outline: 0;
  position: relative;
}
button .size-icon, button .color-icon {
  position: absolute;
  top: 10px;
  right: 0;
}
button .color-icon {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
button .size-icon {
  font-size: 6px;
  text-align: right;
}
button:hover {
  opacity: 0.8;
}
button:active, button.active {
  color: white;
}
button.disabled {
  color: #323232;
  cursor: not-allowed;
}
.history {
  width: 30px;
  height: 30px;
  background-color: #1e1e1e;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  overflow: hidden;
  color: #8c8c8c;
}
.color-item {
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.color-item input {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}
.color-item input:checked + .color {
  opacity: 1;
  border: 2px solid #0095ff;
}
.color-item .color {
  display: block;
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
}
.color-item .color:hover {
  opacity: 0.8;
}
@keyframes pulsate {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale(1.15);
  }
}
.size-item {
  width: 40px;
  height: 60px;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  vertical-align: top;
  cursor: pointer;
}
.size-item input {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
}
.size-item .size {
  background-color: #8c8c8c;
  display: inline-block;
  border-radius: 50%;
  transition: all 0.15s;
  transform: translate(-50%, -50%) scale(0.6);
  position: absolute;
  top: 50%;
  left: 50%;
}
.size-item .size:hover {
  opacity: 0.8;
}
.size-item input:checked + .size {
  background-color: #0095ff;
}
.saves {
  flex: 0 0 calc(100% + 60px);
  margin: 30px -30px -30px;
  padding: 30px;
  background-color: #f0f0f0;
  max-height: 250px;
  overflow-y: auto;
}
.saves .save-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
