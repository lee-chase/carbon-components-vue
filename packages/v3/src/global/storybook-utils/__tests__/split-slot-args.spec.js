import { splitSlotArgs } from '../';

describe('splitSlotArgs', () => {
  it('Should cope with null', () => {
    expect(splitSlotArgs()).toEqual({
      args: {},
      slots: {},
    });
  });

  it('should split args and slot args', () => {
    expect(
      splitSlotArgs({
        abc: 'abc',
        def: 'def',
        'slot.ghi': 'ghi',
        'slot.jkl': 'jkl',
      })
    ).toEqual({
      args: {
        abc: 'abc',
        def: 'def',
      },
      slots: {
        ghi: 'ghi',
        jkl: 'jkl',
      },
    });
  });
});
