import { sudokuReducer, START, END, GET_BOARD, SET_BOARD, SOLVE_BOARD, UPDATE_BOARD, SetBoardPayload, actionCreators, SudokuActionTypes } from 'modules/sudoku';

describe('Sudoku Redux Module Test', () => {
  describe('actions', () => {
    test('Should create actions', () => {
      const actions = [
        actionCreators.start(),
        actionCreators.end(),
        actionCreators.getBoard('easy'),
        actionCreators.setBoard({board: [
          [0,0,4,0,0,0,0,3,0],
          [2,0,0,0,4,9,0,7,0],
          [0,0,0,3,0,0,1,2,0],
          [1,2,0,4,7,5,8,0,0],
          [4,0,6,8,0,0,3,0,0],
          [0,9,0,0,1,3,4,5,0],
          [0,0,0,5,8,0,0,9,0],
          [0,0,0,0,0,6,2,0,0],
          [9,0,0,7,0,0,5,8,0]
        ],
        solution: [
          [5,1,4,2,6,7,9,3,8],
          [2,3,8,1,4,9,6,7,5],
          [6,7,9,3,5,8,1,2,4],
          [1,2,3,4,7,5,8,6,9],
          [4,5,6,8,9,2,3,1,7],
          [8,9,7,6,1,3,4,5,2],
          [3,4,2,5,8,1,7,9,6],
          [7,8,5,9,3,6,2,4,1],
          [9,6,1,7,2,4,5,8,3]
        ]}),
        actionCreators.solveBoard(),
        actionCreators.updateBoard({x: 0, y: 0, value: 5})
      ];
      expect(actions).toMatchSnapshot();
    });
  });
  describe('reducer', () => {
    let state = sudokuReducer(undefined, {} as SudokuActionTypes);
    test('Should return the initial', () => {
      expect(state).toHaveProperty('status', 'unsolved');
      expect(state).toHaveProperty('board', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]);
      expect(state).toHaveProperty('solution', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]);
    });

    test('Should start game', () => {
      state = sudokuReducer(state, actionCreators.start());
      expect(state).toHaveProperty('status', 'unsolved');
      expect(state).toHaveProperty('board', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]);
      expect(state).toHaveProperty('solution', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]);
    });

    test('Should end game', () => {
      state = sudokuReducer(state, actionCreators.end());
      expect(state).toHaveProperty('status', 'unsolved');
      expect(state).toHaveProperty('board', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]);
      expect(state).toHaveProperty('solution', [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]);
    });
    
    test('Should set board', () => {
      state = sudokuReducer(state, actionCreators.setBoard({board: [
        [0,0,4,0,0,0,0,3,0],
        [2,0,0,0,4,9,0,7,0],
        [0,0,0,3,0,0,1,2,0],
        [1,2,0,4,7,5,8,0,0],
        [4,0,6,8,0,0,3,0,0],
        [0,9,0,0,1,3,4,5,0],
        [0,0,0,5,8,0,0,9,0],
        [0,0,0,0,0,6,2,0,0],
        [9,0,0,7,0,0,5,8,0]
      ],
      solution: [
        [5,1,4,2,6,7,9,3,8],
        [2,3,8,1,4,9,6,7,5],
        [6,7,9,3,5,8,1,2,4],
        [1,2,3,4,7,5,8,6,9],
        [4,5,6,8,9,2,3,1,7],
        [8,9,7,6,1,3,4,5,2],
        [3,4,2,5,8,1,7,9,6],
        [7,8,5,9,3,6,2,4,1],
        [9,6,1,7,2,4,5,8,3]
      ]}));
      expect(state).toHaveProperty('status', 'unsolved');
      expect(state).toHaveProperty('board', [
        [0,0,4,0,0,0,0,3,0],
        [2,0,0,0,4,9,0,7,0],
        [0,0,0,3,0,0,1,2,0],
        [1,2,0,4,7,5,8,0,0],
        [4,0,6,8,0,0,3,0,0],
        [0,9,0,0,1,3,4,5,0],
        [0,0,0,5,8,0,0,9,0],
        [0,0,0,0,0,6,2,0,0],
        [9,0,0,7,0,0,5,8,0]
      ]);
      expect(state).toHaveProperty('solution', [
        [5,1,4,2,6,7,9,3,8],
        [2,3,8,1,4,9,6,7,5],
        [6,7,9,3,5,8,1,2,4],
        [1,2,3,4,7,5,8,6,9],
        [4,5,6,8,9,2,3,1,7],
        [8,9,7,6,1,3,4,5,2],
        [3,4,2,5,8,1,7,9,6],
        [7,8,5,9,3,6,2,4,1],
        [9,6,1,7,2,4,5,8,3]
      ]);
    });

    test('Should update board', () => {
      state = sudokuReducer(state, actionCreators.updateBoard({
        x: 0,
        y: 0,
        value: 5
      }));
      expect(state).toHaveProperty('status', 'unsolved');
      expect(state).toHaveProperty('board', [
        [5,0,4,0,0,0,0,3,0],
        [2,0,0,0,4,9,0,7,0],
        [0,0,0,3,0,0,1,2,0],
        [1,2,0,4,7,5,8,0,0],
        [4,0,6,8,0,0,3,0,0],
        [0,9,0,0,1,3,4,5,0],
        [0,0,0,5,8,0,0,9,0],
        [0,0,0,0,0,6,2,0,0],
        [9,0,0,7,0,0,5,8,0]
      ]);
      expect(state).toHaveProperty('solution', [
        [5,1,4,2,6,7,9,3,8],
        [2,3,8,1,4,9,6,7,5],
        [6,7,9,3,5,8,1,2,4],
        [1,2,3,4,7,5,8,6,9],
        [4,5,6,8,9,2,3,1,7],
        [8,9,7,6,1,3,4,5,2],
        [3,4,2,5,8,1,7,9,6],
        [7,8,5,9,3,6,2,4,1],
        [9,6,1,7,2,4,5,8,3]
      ]);
    });

    test('Should partially set board', () => {
      state = sudokuReducer(state, actionCreators.setBoard({board: [
        [5,0,4,2,6,7,9,3,8],
        [2,3,8,1,4,9,6,7,5],
        [6,7,9,3,5,8,1,2,4],
        [1,2,3,4,7,5,8,6,9],
        [4,5,6,8,9,2,3,1,7],
        [8,9,7,6,1,3,4,5,2],
        [3,4,2,5,8,1,7,9,6],
        [7,8,5,9,3,6,2,4,1],
        [9,6,1,7,2,4,5,8,3]
      ],
      solution: [
        [5,1,4,2,6,7,9,3,8],
        [2,3,8,1,4,9,6,7,5],
        [6,7,9,3,5,8,1,2,4],
        [1,2,3,4,7,5,8,6,9],
        [4,5,6,8,9,2,3,1,7],
        [8,9,7,6,1,3,4,5,2],
        [3,4,2,5,8,1,7,9,6],
        [7,8,5,9,3,6,2,4,1],
        [9,6,1,7,2,4,5,8,3]
      ]}));
      expect(state).toHaveProperty('status', 'unsolved');
      expect(state).toHaveProperty('board', [
        [5,0,4,2,6,7,9,3,8],
        [2,3,8,1,4,9,6,7,5],
        [6,7,9,3,5,8,1,2,4],
        [1,2,3,4,7,5,8,6,9],
        [4,5,6,8,9,2,3,1,7],
        [8,9,7,6,1,3,4,5,2],
        [3,4,2,5,8,1,7,9,6],
        [7,8,5,9,3,6,2,4,1],
        [9,6,1,7,2,4,5,8,3]
      ]);
      expect(state).toHaveProperty('solution', [
        [5,1,4,2,6,7,9,3,8],
        [2,3,8,1,4,9,6,7,5],
        [6,7,9,3,5,8,1,2,4],
        [1,2,3,4,7,5,8,6,9],
        [4,5,6,8,9,2,3,1,7],
        [8,9,7,6,1,3,4,5,2],
        [3,4,2,5,8,1,7,9,6],
        [7,8,5,9,3,6,2,4,1],
        [9,6,1,7,2,4,5,8,3]
      ]);
    });

    test('Should complete board', () => {
      state = sudokuReducer(state, actionCreators.updateBoard({
        x: 0,
        y: 1,
        value: 1
      }));
      expect(state).toHaveProperty('status', 'solved');
      expect(state).toHaveProperty('board', [
        [5,1,4,2,6,7,9,3,8],
        [2,3,8,1,4,9,6,7,5],
        [6,7,9,3,5,8,1,2,4],
        [1,2,3,4,7,5,8,6,9],
        [4,5,6,8,9,2,3,1,7],
        [8,9,7,6,1,3,4,5,2],
        [3,4,2,5,8,1,7,9,6],
        [7,8,5,9,3,6,2,4,1],
        [9,6,1,7,2,4,5,8,3]
      ]);
      expect(state).toHaveProperty('solution', [
        [5,1,4,2,6,7,9,3,8],
        [2,3,8,1,4,9,6,7,5],
        [6,7,9,3,5,8,1,2,4],
        [1,2,3,4,7,5,8,6,9],
        [4,5,6,8,9,2,3,1,7],
        [8,9,7,6,1,3,4,5,2],
        [3,4,2,5,8,1,7,9,6],
        [7,8,5,9,3,6,2,4,1],
        [9,6,1,7,2,4,5,8,3]
      ]);
      expect(state.board.toString()).toEqual(state.solution.toString());
    });
  });
});
