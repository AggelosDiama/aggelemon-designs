import ReactMarkdown from "react-markdown";
import { Highlight, themes } from "prism-react-renderer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ContentBlock {
  id: string;
  block_type: string;
  content: any;
}

interface ContentBlockRendererProps {
  blocks: ContentBlock[];
}

export const ContentBlockRenderer = ({ blocks }: ContentBlockRendererProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 space-y-12">
      {blocks.map((block) => (
        <div key={block.id}>
          {block.block_type === "text" && (
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-heading mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-heading mb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-heading mb-2">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-foreground leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-foreground space-y-2 mb-4">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-foreground space-y-2 mb-4">
                      {children}
                    </ol>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-heading">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {block.content.text}
              </ReactMarkdown>
            </div>
          )}

          {block.block_type === "image" && (
            <figure
              className={`
                ${block.content.alignment === "center" ? "mx-auto text-center" : ""}
                ${block.content.alignment === "left" ? "mr-auto text-left" : ""}
                ${block.content.alignment === "right" ? "ml-auto text-right" : ""}
                max-w-full
              `}
            >
              <img
                src={block.content.url}
                alt={block.content.caption || "Project image"}
                className="rounded-lg w-full object-cover"
              />
              {block.content.caption && (
                <figcaption className="text-sm text-muted-foreground mt-3">
                  {block.content.caption}
                </figcaption>
              )}
            </figure>
          )}

          {block.block_type === "gallery" && (
            <div>
              {block.content.layout === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {block.content.images?.map((img: any, index: number) => (
                    <figure key={index}>
                      <img
                        src={img.url}
                        alt={img.caption || `Gallery image ${index + 1}`}
                        className="rounded-lg w-full h-64 object-cover"
                      />
                      {img.caption && (
                        <figcaption className="text-sm text-muted-foreground mt-2">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              ) : (
                <Carousel className="w-full">
                  <CarouselContent>
                    {block.content.images?.map((img: any, index: number) => (
                      <CarouselItem key={index}>
                        <figure>
                          <img
                            src={img.url}
                            alt={img.caption || `Gallery image ${index + 1}`}
                            className="rounded-lg w-full h-96 object-cover"
                          />
                          {img.caption && (
                            <figcaption className="text-sm text-muted-foreground mt-3 text-center">
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </div>
          )}

          {block.block_type === "quote" && (
            <blockquote className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg">
              <p className="text-xl italic text-foreground mb-2">
                "{block.content.text}"
              </p>
              {block.content.author && (
                <cite className="text-sm text-muted-foreground not-italic">
                  — {block.content.author}
                </cite>
              )}
            </blockquote>
          )}

          {block.block_type === "code" && (
            <Highlight
              theme={themes.vsDark}
              code={(block.content.code || "").replace(/\n$/, "")}
              language={block.content.language || "javascript"}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <div className="rounded-lg overflow-hidden border border-border">
                  <div className="px-4 py-2 text-xs font-mono text-muted-foreground bg-muted border-b border-border">
                    {block.content.language || "javascript"}
                  </div>
                  <pre
                    className={`${className} p-4 overflow-x-auto text-sm`}
                    style={style}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                </div>
              )}
            </Highlight>
          )}

          {block.block_type === "callout" && (
            <div className="rounded-lg bg-lemon/10 border border-lemon/30 border-l-4 border-l-lemon p-6">
              {block.content.heading && (
                <h4 className="text-lg font-bold text-heading mb-2">
                  {block.content.heading}
                </h4>
              )}
              {block.content.text && (
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {block.content.text}
                </p>
              )}
              {block.content.note && (
                <p className="text-sm italic text-muted-foreground mt-4">
                  {block.content.note}
                </p>
              )}
            </div>
          )}

          {block.block_type === "separator" && (
            <div className={block.content.style === "line" ? "border-t border-border" : "h-12"} />
          )}
        </div>
      ))}
    </div>
  );
};
