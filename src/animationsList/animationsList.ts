export const animations = [
  {
    name: "Collapse transition",
    route: "collapseTransition",
    description:
      "<p>Анимация очень быстрая в имплементации.<br />Моменты которые стоит учитывать:&nbsp;</p><ul><li>Для анимации нужно будет добавить паддинг чуть больше чем в макете (1-3 px)</li>	<li>Паддинг тоже анимируется, без этого всё сломается</li><li>Анимируется всё внутри контейнера, т.е. если это список, то анимировать удаление/добавление нельзя</li><li>Снизу вверх анимировать нельзя</li><li>В ширину анимировать в теории можно, но это нужно будет обсуждать от кейса к кейсу</li></ul>",
  },
  {
    name: "Opacity transition",
    route: "opacityTransition",
    description: "<p>Стандартная анимация появления</p>",
  },
  {
    name: "Move transition",
    route: "moveTransition",
    description: "<p>Стандартная анимация появления с перемещением</p>",
  },
  {
    name: "Default text transition",
    route: "defaultTextTransition",
    description: "<p>Стандартная анимация замены текста</p>",
  },
  {
    name: "Move text transition",
    route: "moveTextTransition",
    description: "<p>Стандартная анимация замены текста c перемещением</p>",
  },
  {
    name: "Rotary text transition",
    route: "rotaryTextTransition",
    description:
      "роторная анимация замены текста.</p><ul><li>в некоторых лэй-аутах анимация просто не сработает, нужно обсуждать от кейса к кейсу</li><li>расстояния от центра ротации считается по формуле (360/number of sides)</li><li>глубина влияет на расстояние от центра ротации до текста<br /></li</ul>",
  },
    {
    name: "List move transition",
    route: "listMoveTransition",
    description:"eeeee",
  },
];

export interface TimingFunction {
  name: string;
  function: string;
}

export const timingFunctions: TimingFunction[] = [
  {
    name: "ease",
    function: "ease",
  },
  {
    name: "ease-out",
    function: "ease-out",
  },
  {
    name: "ease-in",
    function: "ease-in",
  },
  {
    name: "ease-in-out-expo",
    function: "cubic-bezier(0.87, 0, 0.13, 1)",
  },
  {
    name: "ease-in-out-back",
    function: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  },
];

export interface MoveDirection {
  name: string;
  css: string;
}

export const moveDirection: MoveDirection[] = [
  {
    name: "xAxis",
    css: "translateX",
  },
  {
    name: "yAxis",
    css: "translateY",
  },
];
