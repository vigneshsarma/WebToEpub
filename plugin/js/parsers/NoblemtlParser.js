"use strict";

parserFactory.register("daotranslate.com", () => new NoblemtlParser());
parserFactory.register("genesistls.com", () => new NoblemtlParser());
parserFactory.register("noblemtl.com", () => new NoblemtlParser());
parserFactory.register("tamagotl.com", () => new NoblemtlParser());
parserFactory.register("novelsemperor.com", () => new NoblemtlParser());
parserFactory.register("knoxt.space", () => new NoblemtlParser());
parserFactory.register("novelsknight.com", () => new NoblemtlParser());

parserFactory.register("pandamtl.com", () => new PandamtlParser());

class NoblemtlParser extends Parser{
    constructor() {
        super();
    }

    async getChapterUrls(dom) {
        return [...dom.querySelectorAll("div.eplister a")]
            .map(this.linkToChapter)
            .reverse()
    }

    linkToChapter(link) {
        let title = link.querySelector(".epl-num").textContent + " "
            + link.querySelector(".epl-title").textContent;
        return ({
            sourceUrl:  link.href,
            title: title
        });
    }

    findContent(dom) {
        return dom.querySelector(".entry-content");
    }

    extractTitleImpl(dom) {
        return dom.querySelector("h1.entry-title");
    }

    removeUnwantedElementsFromContentElement(element) {
        let toRemove = [...element.querySelectorAll("p")]
            .filter(p => p.style.opacity === "0");
        util.removeElements(toRemove);
        super.removeUnwantedElementsFromContentElement(element);
    }

    findChapterTitle(dom) {
        return dom.querySelector("h1.entry-title");
    }

    findCoverImageUrl(dom) {
        return util.getFirstImgSrc(dom, ".thumbook");
    }

    preprocessRawDom(webPageDom) {
        util.removeChildElementsMatchingCss(webPageDom, "div.saboxplugin-wrap");
    }

    getInformationEpubItemChildNodes(dom) {
        return [...dom.querySelectorAll("div.synp .entry-content")];
    }
}

class PandamtlParser extends NoblemtlParser{
    constructor() {
        super();
    }

    findCoverImageUrl(dom) {
        return util.getFirstImgSrc(dom, ".sertothumb");
    }

    getInformationEpubItemChildNodes(dom) {
        return [...dom.querySelectorAll("div.sersys.entry-content")];
    }
}
