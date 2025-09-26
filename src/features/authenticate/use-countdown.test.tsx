import { act, renderHook } from '@testing-library/react';
import { assert } from 'riteway/vitest';
import { afterEach, beforeEach, describe, test, vi } from 'vitest';

import { useCountdown } from './use-countdown';

describe('useCountdown()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  test('initial state', () => {
    const { result } = renderHook(() => useCountdown(60));

    assert({
      given: 'an initial time of 60 seconds',
      should: 'initialize with that value',
      actual: result.current.secondsLeft,
      expected: 60,
    });
  });

  test('countdown progression', () => {
    const { result } = renderHook(() => useCountdown(3));

    assert({
      given: 'an initial time of 3 seconds',
      should: 'start with 3 seconds',
      actual: result.current.secondsLeft,
      expected: 3,
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    assert({
      given: 'one second has passed',
      should: 'count down to 2 seconds',
      actual: result.current.secondsLeft,
      expected: 2,
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    assert({
      given: 'two seconds have passed',
      should: 'count down to 1 second',
      actual: result.current.secondsLeft,
      expected: 1,
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    assert({
      given: 'three seconds have passed',
      should: 'reach zero and stop',
      actual: result.current.secondsLeft,
      expected: 0,
    });
  });

  test('stops at zero', () => {
    const { result } = renderHook(() => useCountdown(2));

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    assert({
      given: 'countdown reaches zero',
      should: 'stop at zero',
      actual: result.current.secondsLeft,
      expected: 0,
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    assert({
      given: 'additional time passes after reaching zero',
      should: 'remain at zero',
      actual: result.current.secondsLeft,
      expected: 0,
    });
  });

  test('initial seconds change', () => {
    const { result, rerender } = renderHook(
      ({ initialSeconds }) => useCountdown(initialSeconds),
      { initialProps: { initialSeconds: 5 } },
    );

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    assert({
      given: 'countdown has progressed for 2 seconds',
      should: 'show 3 seconds remaining',
      actual: result.current.secondsLeft,
      expected: 3,
    });

    rerender({ initialSeconds: 10 });

    assert({
      given: 'initial seconds changed to 10',
      should: 'reset to new initial value',
      actual: result.current.secondsLeft,
      expected: 10,
    });
  });

  test('zero or negative initial values', () => {
    const { result: zeroResult } = renderHook(() => useCountdown(0));
    const { result: negativeResult } = renderHook(() => useCountdown(-5));

    assert({
      given: 'initial value of zero',
      should: 'remain at zero',
      actual: zeroResult.current.secondsLeft,
      expected: 0,
    });

    assert({
      given: 'initial value of negative five',
      should: 'remain at negative five',
      actual: negativeResult.current.secondsLeft,
      expected: -5,
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    assert({
      given: 'time passes with zero initial value',
      should: 'not change from zero',
      actual: zeroResult.current.secondsLeft,
      expected: 0,
    });

    assert({
      given: 'time passes with negative initial value',
      should: 'not change from negative value',
      actual: negativeResult.current.secondsLeft,
      expected: -5,
    });
  });

  test('cleanup on unmount', () => {
    const { result, unmount } = renderHook(() => useCountdown(5));

    assert({
      given: 'hook is mounted with 5 seconds',
      should: 'start with 5 seconds',
      actual: result.current.secondsLeft,
      expected: 5,
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    assert({
      given: 'hook is unmounted and time passes',
      should: 'maintain last value before unmount',
      actual: result.current.secondsLeft,
      expected: 5,
    });
  });

  test('reset function', () => {
    const { result } = renderHook(() => useCountdown(10));

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    assert({
      given: '3 seconds have passed from initial 10',
      should: 'show 7 seconds remaining',
      actual: result.current.secondsLeft,
      expected: 7,
    });

    act(() => {
      result.current.reset();
    });

    assert({
      given: 'reset function is called',
      should: 'return to initial seconds',
      actual: result.current.secondsLeft,
      expected: 10,
    });
  });

  test('reset after countdown reaches zero', () => {
    const { result } = renderHook(() => useCountdown(3));

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    assert({
      given: 'countdown has reached zero',
      should: 'be at zero',
      actual: result.current.secondsLeft,
      expected: 0,
    });

    act(() => {
      result.current.reset();
    });

    assert({
      given: 'reset is called after reaching zero',
      should: 'restart at initial value',
      actual: result.current.secondsLeft,
      expected: 3,
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    assert({
      given: 'one second passes after reset',
      should: 'continue counting down',
      actual: result.current.secondsLeft,
      expected: 2,
    });
  });
});
