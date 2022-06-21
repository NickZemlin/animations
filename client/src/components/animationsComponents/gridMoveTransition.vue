<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import CustomButton from "../ui/CustomButton.vue";
import CustomRadio from "../ui/CustomRadio.vue";
import ControlPanel from "../ui/ControlPanel.vue";
import CustomDescription from "../ui/CustomDescription.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import CustomSlider from "../ui/CustomSlider.vue";
import { timingFunctions } from "../../animationsList/animationsList";
import { useAppStore } from "../../store/AppStore";

const description = computed(() => {
  return route.meta.description as string;
});

const route = useRoute();

const shuffleArray = (input: exampleItem[]) => {
  let currentIndex = input.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [input[currentIndex], input[randomIndex]] = [
      input[randomIndex],
      input[currentIndex],
    ];
  }
};

const sortDescending = (input: exampleItem[]) => {
  return input.sort((a, b) => a.displayNum - b.displayNum);
};

class exampleArray extends Array {
  public array!: exampleItem[];
  public customSort() {
    return sortDescending(this.array);
  }
  public shuffle() {
    shuffleArray(this.array);
  }
  public addNew() {
    if (this.array.length) {
      const temp = [...this.array].sort((a, b) => a.displayNum - b.displayNum);
      this.array.push(new exampleItem(temp[temp.length - 1].displayNum + 1));
    } else {
      this.array.push(new exampleItem(1));
    }
  }
  public removeFirst() {
    this.array.shift();
  }
  public removeLast() {
    this.array.pop();
  }
  constructor(amount: number) {
    super();
    this.array = generateExample(amount);
  }
}

class exampleItem {
  public displayNum!: number;
  public key!: number;

  constructor(display: number) {
    this.displayNum = display;
    this.key = display;
  }
}

const generateExample = (amount: number) => {
  const output = [];
  for (let i = 1; i < amount + 1; i++) {
    output.push(new exampleItem(i));
  }
  return output;
};

const renderArray = ref(new exampleArray(12));

interface Settings {
  enterDuration: number;
  enterDelay: number;
  exitDuration: number;
  moveDuration: number;
  moveDelay: number;
  easingEnter: string;
  easingLeave: string;
  easingMove: string;
}

const settings = ref<Settings>({
  enterDuration: 30,
  enterDelay: 0,
  exitDuration: 30,
  moveDuration: 75,
  moveDelay: 0,
  easingEnter: "ease",
  easingLeave: "ease",
  easingMove: "ease",
});

const appStore = useAppStore();
onBeforeMount(() => {
  appStore.updateSettings(settings.value);
});
watch(
  () => settings.value,
  () => {
    appStore.updateSettings(settings.value);
  }
);

const updateTimingFunction = (value: string, intent: "in" | "out" | "move") => {
  switch (intent) {
    case "in":
      settings.value.easingEnter = value;
      break;
    case "out":
      settings.value.easingLeave = value;
      break;
    case "move":
      settings.value.easingMove = value;
  }
};

const enterTiming = computed(() => {
  return `all ${settings.value.enterDuration / 100}s ${
    settings.value.easingEnter
  } ${settings.value.enterDelay / 100}s`;
});

const exitTiming = computed(() => {
  return `all ${settings.value.exitDuration / 100}s ${
    settings.value.easingLeave
  }`;
});

const moveTiming = computed(() => {
  return `all ${settings.value.moveDuration / 100}s ${
    settings.value.easingMove
  } ${settings.value.moveDelay / 100}s`;
});
</script>

<template>
  <ControlPanel>
    <CustomButton @click="renderArray.shuffle()">shuffle</CustomButton>
    <CustomButton @click="renderArray.customSort()">sort</CustomButton>
    <CustomButton @click="renderArray.addNew()">add new</CustomButton>
    <CustomButton @click="renderArray.removeFirst()">remove first</CustomButton>
    <CustomButton @click="renderArray.removeLast()">remove last</CustomButton>
  </ControlPanel>
  <teleport to="#Settings">
    <CustomDescription :text="description" />
    <CustomSlider
      v-model="settings.enterDuration"
      :value="settings.enterDuration"
      :max="100"
      name="enter duration"
      :default="settings.enterDuration"
      :min="0"
    />
    <CustomSlider
      v-model="settings.enterDelay"
      :value="settings.enterDelay"
      :max="100"
      name="Enter delay"
      :default="settings.enterDelay"
      :min="0"
    />
    <CustomSlider
      v-model="settings.exitDuration"
      :value="settings.exitDuration"
      :max="100"
      name="exit duration"
      :default="settings.exitDuration"
      :min="0"
    />
    <CustomSlider
      v-model="settings.moveDuration"
      :value="settings.moveDuration"
      :max="100"
      name="Move duration"
      :default="settings.moveDuration"
      :min="0"
    />
    <CustomSlider
      v-model="settings.moveDelay"
      :value="settings.moveDelay"
      :max="100"
      name="Move delay"
      :default="settings.moveDelay"
      :min="0"
    />
    <CustomRadio
      :selection="timingFunctions"
      header="Timing Function In"
      @update="updateTimingFunction($event, 'in')"
    />
    <CustomRadio
      :selection="timingFunctions"
      header="Timing Function out"
      @update="updateTimingFunction($event, 'out')"
    />
    <CustomRadio
      :selection="timingFunctions"
      header="Timing Function move"
      @update="updateTimingFunction($event, 'move')"
    />
  </teleport>
  <transition-group name="list" tag="div" class="example-wrap">
    <div class="example" v-for="li in renderArray.array" :key="li.key">
      {{ li.displayNum }}
    </div>
  </transition-group>
</template>

<style scoped lang="scss">
.example {
  &-wrap {
    display: flex;
    flex-direction: row;
    width: calc(50px * 4);
    align-content: flex-start;
    flex-wrap: wrap;
  }
  width: 50px;
  height: 50px;
  margin-right: 5px;
  margin-top: 5px;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  will-change: transition;
}

.list-enter-from {
  opacity: 0;
}
.list-enter-to {
  opacity: 1;
}
.list-enter-active {
  transition: v-bind(enterTiming);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-500px);
}
.list-leave-active {
  transition: v-bind(exitTiming);
  position: absolute;
}

.list-move {
  transition: v-bind(moveTiming);
}
</style>
