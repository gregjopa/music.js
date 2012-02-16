audioLib.MUSIC = MUSIC;

audioLib.Note		= MUSIC.Note		= Note;
audioLib.Interval	= MUSIC.Interval	= Interval;

audioLib.__extend(audioLib.Oscillator.prototype, {
	note: null,

	setNote: function (note) {
		this.note = note;
		this.setParam('frequency', note.frequency());
	},

	setNoteFromLatin: function () {
		return this.setNote(audioLib.Note.fromLatin.apply(audioLib.Note, arguments));
	},
});

audioLib.__extend(audioLib.Oscillator, {
	fromNote: function (sampleRate, note, waveShape) {
		var osc = audioLib.Oscillator(sampleRate, null, waveShape);

		if (typeof note === 'string') {
			osc.setNoteFromLatin(note);
		} else if (note instanceof audioLib.Note) {
			osc.setNote(note);
		}

		return osc;
	},
});


/* AUDIOLIB.JS PLUGIN WRAPPER STUFF FROM HERE ON */

}(audioLib));
audioLib.plugins('MUSIC', myPlugin);
}

if (typeof audioLib === 'undefined' && typeof exports !== 'undefined'){
	exports.init = initPlugin;
} else {
	initPlugin(audioLib);
}

}());
