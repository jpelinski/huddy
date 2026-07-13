import { describe, it, expect } from "vitest";
import { formatTime, durationToTimeObject, timeObjectToDuration } from "./formatTime";

describe('formatTime', () => {
    it('should format time correctly', () => {
        expect(formatTime(0)).toBe('0:00:00');
        expect(formatTime(59)).toBe('0:00:59');
        expect(formatTime(60)).toBe('0:01:00');
        expect(formatTime(3599)).toBe('0:59:59');
        expect(formatTime(3600)).toBe('1:00:00');
        expect(formatTime(3661)).toBe('1:01:01');
    });
})
describe('durationToTimeObject', () => {
    it('converts seconds to time object correctly', () => {
        expect(durationToTimeObject(0)).toEqual({ hh: '00', mm: '00', ss: '00' });
        expect(durationToTimeObject(59)).toEqual({ hh: '00', mm: '00', ss: '59' });
        expect(durationToTimeObject(60)).toEqual({ hh: '00', mm: '01', ss: '00' });
        expect(durationToTimeObject(3599)).toEqual({ hh: '00', mm: '59', ss: '59' });
        expect(durationToTimeObject(3600)).toEqual({ hh: '01', mm: '00', ss: '00' });
        expect(durationToTimeObject(3661)).toEqual({ hh: '01', mm: '01', ss: '01' });
    });
});
describe('timeObjectToDuration', () => {
    it('converts time object to seconds correctly', () => {
        expect(timeObjectToDuration({ hh: '00', mm: '00', ss: '00' })).toBe(0);
        expect(timeObjectToDuration({ hh: '00', mm: '00', ss: '59' })).toBe(59);
        expect(timeObjectToDuration({ hh: '00', mm: '01', ss: '00' })).toBe(60);
        expect(timeObjectToDuration({ hh: '00', mm: '59', ss: '59' })).toBe(3599);
        expect(timeObjectToDuration({ hh: '01', mm: '00', ss: '00' })).toBe(3600);
        expect(timeObjectToDuration({ hh: '01', mm: '01', ss: '01' })).toBe(3661);
    });
});