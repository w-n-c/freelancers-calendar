import { zeroPad, padIfLenOne, formatTime } from '../formatTime'

describe('formatTime and its utils', () => {
	describe('formatTime', () => {
		it('left pads hour and minute as necessary', () => {
			expect(formatTime('2:2')).toEqual('02:02')
			expect(formatTime('14:5')).toEqual('14:05')
			expect(formatTime('8:34')).toEqual('8:34')
			expect(formatTime('15:20')).toEqual('15:20')
		})
	})

	describe('padIfLenOne', () => {
		it('zeroPads only if given string length is one', () => {
			expect(padIfLenOne('')).toEqual('')
			expect(padIfLenOne('1')).toEqual('01')
			expect(padIfLenOne(3)).toEqual('03')
			expect(padIfLenOne(40)).toEqual('40')
			expect(padIfLenOne('dowapdowapwap')).toEqual('dowapdowapwap')
		}) 
	})

	describe('zeroPad', () => {
		it('adds a zero to the beginning of a given string', () => {
			expect(zeroPad('')).toEqual('0')
			expect(zeroPad('test')).toEqual('0test')
			expect(zeroPad(10)).toEqual('010')
		})
	})
})
