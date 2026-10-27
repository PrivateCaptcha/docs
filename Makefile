.PHONY: run

HUGO ?= hugo

run:
	$(HUGO) serve --buildDrafts --disableFastRender --ignoreCache
