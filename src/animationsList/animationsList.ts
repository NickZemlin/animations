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
    description: "<p>Стандартная анимация появления</p>",
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
