import { zeroPad, padIfLenOne, formatTime } from '../formatTime'

context('tests for formatTime and its implementing functions', function() {

	specify('zeroPad left-pads a 0 onto a given string', function() {
		expect(zeroPad('reminds me of leftpad')).to.equal('0reminds me of leftpad')
		expect(zeroPad('c')).to.equal('0c')
		expect(zeroPad('')).to.equal('0')
	})

	specify('padIfLenOne zeroPads a string whose length is one', function() {
		expect(padIfLenOne('44')).to.equal('44')
		expect(padIfLenOne('4')).to.equal('04')
		expect(padIfLenOne('')).to.equal('')
	})

	specify('formatTime takes an [h]h:[m]m time string and returns an hh:mm string', function() {
		expect(formatTime('3:2')).to.equal('03:02')
		expect(formatTime('4:40')).to.equal('04:40')
		expect(formatTime('15:8')).to.equal('15:08')
		expect(formatTime('23:28')).to.equal('23:28')
	})

})
