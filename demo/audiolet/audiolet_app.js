// audio synthesis with audiolet.js
var Synth = new Class({
	Extends: AudioletGroup,
	initialize: function(audiolet, frequency) {
		AudioletGroup.prototype.initialize.apply(this, [audiolet, 0, 1]);
		// Basic wave
		this.sine = new Sine(audiolet, frequency);
		
		// Gain envelope
		this.gain = new Gain(audiolet);
		this.env = new PercussiveEnvelope(audiolet, 1, 0.2, .5,
			function() {
				this.audiolet.scheduler.addRelative(0, this.remove.bind(this));
			}.bind(this)
		);
		this.envMulAdd = new MulAdd(audiolet, 0.3, 0);

		// Main signal path
		this.sine.connect(this.gain);
		this.gain.connect(this.outputs[0]);

		// Envelope
		this.env.connect(this.envMulAdd);
		this.envMulAdd.connect(this.gain, 0, 1);
	}
});

var AudioletAppNote = new Class({
	initialize: function(note) {
		this.audiolet = new Audiolet();
		
		var synth = new Synth(this.audiolet, note.frequency());
		synth.connect(this.audiolet.output);
	}
});

var AudioletAppChord = new Class({
	initialize: function(chordArray) {
		this.audiolet = new Audiolet();

		var chordPattern = new PSequence([chordArray]);

		// Play the progression
		this.audiolet.scheduler.play([chordPattern], 1,
									 this.playChord.bind(this));
	},

	playChord: function(chord) {
		for (var i=0; i<chord.length; i++) {
			var synth = new Synth(this.audiolet, chord[i].frequency());
			synth.connect(this.audiolet.output);
		}
	}
});

var AudioletAppScale = new Class({
		initialize: function(scaleArray) {
		this.audiolet = new Audiolet();

		var freqArray = new Array();
		var durationArray = new Array();
		// loop through scale array for each note object
		for (var i = 0; i < scaleArray.length; i++) {
			freqArray.push(scaleArray[i].frequency());
			durationArray.push(1);
		}
		
		// walk down scale
		for (var i = 0; i < scaleArray.length; i++) {
			freqArray.push(scaleArray[(scaleArray.length-1)-i].frequency());
			durationArray.push(1);
		}
		
		
		var melody = new PSequence(freqArray);
		var frequencyPattern = new PChoose([melody]);
		
		var durationPattern = new PChoose([new PSequence(durationArray)]);
		
		this.audiolet.scheduler.play([frequencyPattern], durationPattern,
			function(frequency) {
				var synth = new Synth(this.audiolet, frequency);
				synth.connect(this.audiolet.output);
			}.bind(this)
		);
	}
});