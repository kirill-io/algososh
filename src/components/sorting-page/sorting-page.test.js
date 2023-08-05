import { selectionSort, bubbleSort } from "./utils";
import { Direction } from "../../types/direction";

const resultForEmptyArray = [
  {
    currentArray: [],
    elementA: null,
    elementB: null,
    sortedElements: []
  }
];

describe('Тестирование алгоритмов сортировки выбором и пузырьком:', () => {
  it('Проверка корректности сортировки выбором по возрастанию пустого массива', () => {
    expect(selectionSort([], Direction.Ascending)).toStrictEqual(resultForEmptyArray);
  });

  it('Проверка корректности сортировки выбором по убыванию пустого массива', () => {
    const resultForEmptyArray = [
      {
        currentArray: [],
        elementA: null,
        elementB: null,
        sortedElements: []
      }
    ];

    expect(selectionSort([], Direction.Descending)).toStrictEqual(resultForEmptyArray);
  });

  it('Проверка корректности сортировки пузырьком по возрастанию пустого массива', () => {
    const resultForEmptyArray = [
      {
        currentArray: [],
        elementA: null,
        elementB: null,
        sortedElements: []
      }
    ];

    expect(bubbleSort([], Direction.Ascending)).toStrictEqual(resultForEmptyArray);
  });

  it('Проверка корректности сортировки пузырьком по убыванию пустого массива', () => {
    const resultForEmptyArray = [
      {
        currentArray: [],
        elementA: null,
        elementB: null,
        sortedElements: []
      }
    ];

    expect(bubbleSort([], Direction.Descending)).toStrictEqual(resultForEmptyArray);
  });

  it('Проверка корректности сортировки выбором по возрастанию массива из одного элемента', () => {
    const resultForArrayOfOneElement = [
      {
        currentArray: [1],
        elementA: null,
        elementB: null,
        sortedElements: []
      },
      {
        currentArray: [1],
        elementA: null,
        elementB: null,
        sortedElements: [0, 0]
      },
    ];

    expect(selectionSort([1], Direction.Ascending)).toStrictEqual(resultForArrayOfOneElement);
  });

  it('Проверка корректности сортировки выбором по убыванию массива из одного элемента', () => {
    const resultForArrayOfOneElement = [
      {
        currentArray: [1],
        elementA: null,
        elementB: null,
        sortedElements: []
      },
      {
        currentArray: [1],
        elementA: null,
        elementB: null,
        sortedElements: [0, 0]
      },
    ];

    expect(selectionSort([1], Direction.Descending)).toStrictEqual(resultForArrayOfOneElement);
  });

  it('Проверка корректности сортировки пузырьком по возрастанию массива из одного элемента', () => {
    const resultForArrayOfOneElement = [
      {
        currentArray: [1],
        elementA: null,
        elementB: null,
        sortedElements: []
      },
      {
        currentArray: [1],
        elementA: null,
        elementB: null,
        sortedElements: [0, 0]
      },
    ];

    expect(bubbleSort([1], Direction.Ascending)).toStrictEqual(resultForArrayOfOneElement);
  });

  it('Проверка корректности сортировки пузырьком по убыванию массива из одного элемента', () => {
    const resultForArrayOfOneElement = [
      {
        currentArray: [1],
        elementA: null,
        elementB: null,
        sortedElements: []
      },
      {
        currentArray: [1],
        elementA: null,
        elementB: null,
        sortedElements: [0, 0]
      },
    ];
    
    expect(bubbleSort([1], Direction.Descending)).toStrictEqual(resultForArrayOfOneElement);
  });

  it('Проверка корректности сортировки выбором по возрастанию массива из нескольких элементов', () => {
    const result = [
      {
        currentArray: [50, 20, 100],
        elementA: 0,
        elementB: 1,
        sortedElements: []
      },
      {
        currentArray: [50, 20, 100],
        elementA: 0,
        elementB: 2,
        sortedElements: []
      },
      {
        currentArray: [20, 50, 100],
        elementA: 1,
        elementB: 2,
        sortedElements: [0]
      },
      {
        currentArray: [20, 50, 100],
        elementA: null,
        elementB: null,
        sortedElements: [0, 1, 1, 2]
      }
    ];

    expect(selectionSort([50, 20, 100], Direction.Ascending)).toStrictEqual(result);
  });

  it('Проверка корректности сортировки выбором по убыванию массива из нескольких элементов', () => {
    const result = [
      {
        currentArray: [50, 20, 100],
        elementA: 0,
        elementB: 1,
        sortedElements: []
      },
      {
        currentArray: [50, 20, 100],
        elementA: 0,
        elementB: 2,
        sortedElements: []
      },
      {
        currentArray: [100, 20, 50],
        elementA: 1,
        elementB: 2,
        sortedElements: [0]
      },
      {
        currentArray: [100, 50, 20],
        elementA: null,
        elementB: null,
        sortedElements: [0, 1, 1, 2]
      }
    ];

    expect(selectionSort([50, 20, 100], Direction.Descending)).toStrictEqual(result);
  });

  it('Проверка корректности сортировки пузырьком по возрастанию массива из нескольких элементов', () => {
    const result = [
      {
        currentArray: [20, 50, 100],
        elementA: 0,
        elementB: 1,
        sortedElements: []
      },
      {
        currentArray: [20, 50, 100],
        elementA: 1,
        elementB: 2,
        sortedElements: []
      },
      {
        currentArray: [20, 50, 100],
        elementA: 0,
        elementB: 1,
        sortedElements: [2]
      },
      {
        currentArray: [20, 50, 100],
        elementA: null,
        elementB: null,
        sortedElements: [2, 1, 0]
      }
    ];

    expect(bubbleSort([50, 20, 100], Direction.Ascending)).toStrictEqual(result);
  });

  it('Проверка корректности сортировки пузырьком по убыванию массива из нескольких элементов', () => {
    const result = [
      {
        currentArray: [50, 20, 100],
        elementA: 0,
        elementB: 1,
        sortedElements: []
      },
      {
        currentArray: [50, 100, 20],
        elementA: 1,
        elementB: 2,
        sortedElements: []
      },
      {
        currentArray: [100, 50, 20],
        elementA: 0,
        elementB: 1,
        sortedElements: [2]
      },
      {
        currentArray: [100, 50, 20],
        elementA: null,
        elementB: null,
        sortedElements: [2, 1, 0]
      }
    ];

    expect(bubbleSort([50, 20, 100], Direction.Descending)).toStrictEqual(result);
  });
});