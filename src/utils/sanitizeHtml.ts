import { default as sH, IOptions } from "sanitize-html";

function sanitizeHtml(content: string, options?: IOptions) {
  try {
    return sH(content, {
      allowedTags: sH.defaults.allowedTags,
      allowedAttributes: false,
      transformTags: {
        a: (_tagName, attribs) => {
          return {
            tagName: "a",
            attribs: {
              class: attribs.class || "",
              style: attribs.style || "",
              href: attribs.href,
              target: "_blank",
              rel: "noopener noreferrer",
            },
          };
        },
      },
      ...options,
    });
  } catch (e) {
    return sH(content, {
      allowedTags: sH.defaults.allowedTags,
      allowedAttributes: false,
    });
  }
}

export default sanitizeHtml;
