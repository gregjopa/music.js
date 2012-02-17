MUSIC_JS := ../music.js

IN := before.js ${MUSIC_JS} after.js
OUT := music.plugin.js

CAT := cat

all: ${OUT}

${OUT}: ${IN}
	${CAT} $^ > $@

clean:
	rm ${OUT} -rf

.PHONY: clean all
