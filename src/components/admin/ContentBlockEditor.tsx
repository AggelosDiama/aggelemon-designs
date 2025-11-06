import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, GripVertical, Plus } from "lucide-react";

export type BlockType = "text" | "image" | "gallery" | "quote" | "separator";

export interface ContentBlock {
  id: string;
  block_type: BlockType;
  order_index: number;
  content: any;
}

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  onImageUpload: (file: File) => Promise<string>;
}

export const ContentBlockEditor = ({ blocks, onChange, onImageUpload }: ContentBlockEditorProps) => {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  const addBlock = (type: BlockType) => {
    const newBlock: ContentBlock = {
      id: `temp-${Date.now()}`,
      block_type: type,
      order_index: blocks.length,
      content: getDefaultContent(type),
    };
    onChange([...blocks, newBlock]);
    setExpandedBlock(newBlock.id);
  };

  const getDefaultContent = (type: BlockType) => {
    switch (type) {
      case "text":
        return { text: "", format: "markdown" };
      case "image":
        return { url: "", caption: "", alignment: "center" };
      case "gallery":
        return { images: [], layout: "grid" };
      case "quote":
        return { text: "", author: "" };
      case "separator":
        return { style: "line" };
      default:
        return {};
    }
  };

  const updateBlock = (id: string, content: any) => {
    onChange(
      blocks.map((block) =>
        block.id === id ? { ...block, content } : block
      )
    );
  };

  const removeBlock = (id: string) => {
    const filtered = blocks.filter((block) => block.id !== id);
    onChange(filtered.map((block, index) => ({ ...block, order_index: index })));
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((block) => block.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [
      newBlocks[targetIndex],
      newBlocks[index],
    ];

    onChange(newBlocks.map((block, idx) => ({ ...block, order_index: idx })));
  };

  const handleImageFileUpload = async (
    blockId: string,
    file: File,
    imageIndex?: number
  ) => {
    try {
      const url = await onImageUpload(file);
      const block = blocks.find((b) => b.id === blockId);

      if (block?.block_type === "gallery" && imageIndex !== undefined) {
        const images = [...(block.content.images || [])];
        images[imageIndex] = { ...images[imageIndex], url };
        updateBlock(blockId, { ...block.content, images });
      } else if (block?.block_type === "image") {
        updateBlock(blockId, { ...block.content, url });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-heading">Content Blocks</h3>
        <Select onValueChange={(value) => addBlock(value as BlockType)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Add Block" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Rich Text</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="gallery">Image Gallery</SelectItem>
            <SelectItem value="quote">Quote</SelectItem>
            <SelectItem value="separator">Separator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {blocks.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No content blocks yet. Add one to get started.
        </div>
      )}

      <div className="space-y-3">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className="border border-border rounded-lg p-4 bg-card"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                <span className="font-medium text-heading capitalize">
                  {block.block_type.replace("_", " ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveBlock(block.id, "up")}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => moveBlock(block.id, "down")}
                  disabled={index === blocks.length - 1}
                >
                  ↓
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setExpandedBlock(expandedBlock === block.id ? null : block.id)
                  }
                >
                  {expandedBlock === block.id ? "Collapse" : "Expand"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBlock(block.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {expandedBlock === block.id && (
              <div className="space-y-3 pt-3 border-t border-border">
                {block.block_type === "text" && (
                  <div className="space-y-2">
                    <Label>Content (Markdown)</Label>
                    <Textarea
                      value={block.content.text || ""}
                      onChange={(e) =>
                        updateBlock(block.id, { ...block.content, text: e.target.value })
                      }
                      rows={6}
                      placeholder="Enter markdown content..."
                    />
                  </div>
                )}

                {block.block_type === "image" && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageFileUpload(block.id, file);
                        }}
                      />
                      {block.content.url && (
                        <img
                          src={block.content.url}
                          alt="Preview"
                          className="w-48 h-48 object-cover rounded"
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Caption (optional)</Label>
                      <Input
                        value={block.content.caption || ""}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            ...block.content,
                            caption: e.target.value,
                          })
                        }
                        placeholder="Image caption"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Alignment</Label>
                      <Select
                        value={block.content.alignment || "center"}
                        onValueChange={(value) =>
                          updateBlock(block.id, { ...block.content, alignment: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {block.block_type === "gallery" && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Layout</Label>
                      <Select
                        value={block.content.layout || "grid"}
                        onValueChange={(value) =>
                          updateBlock(block.id, { ...block.content, layout: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grid">Grid</SelectItem>
                          <SelectItem value="carousel">Carousel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Images</Label>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const images = block.content.images || [];
                            updateBlock(block.id, {
                              ...block.content,
                              images: [...images, { url: "", caption: "" }],
                            });
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add Image
                        </Button>
                      </div>

                      {(block.content.images || []).map((img: any, imgIndex: number) => (
                        <div key={imgIndex} className="p-3 border border-border rounded space-y-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageFileUpload(block.id, file, imgIndex);
                            }}
                          />
                          {img.url && (
                            <img
                              src={img.url}
                              alt="Preview"
                              className="w-32 h-32 object-cover rounded"
                            />
                          )}
                          <Input
                            value={img.caption || ""}
                            onChange={(e) => {
                              const images = [...block.content.images];
                              images[imgIndex] = { ...img, caption: e.target.value };
                              updateBlock(block.id, { ...block.content, images });
                            }}
                            placeholder="Caption"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              const images = block.content.images.filter(
                                (_: any, i: number) => i !== imgIndex
                              );
                              updateBlock(block.id, { ...block.content, images });
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {block.block_type === "quote" && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Quote Text</Label>
                      <Textarea
                        value={block.content.text || ""}
                        onChange={(e) =>
                          updateBlock(block.id, { ...block.content, text: e.target.value })
                        }
                        rows={4}
                        placeholder="Enter quote text..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Author (optional)</Label>
                      <Input
                        value={block.content.author || ""}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            ...block.content,
                            author: e.target.value,
                          })
                        }
                        placeholder="Quote author"
                      />
                    </div>
                  </div>
                )}

                {block.block_type === "separator" && (
                  <div className="space-y-2">
                    <Label>Style</Label>
                    <Select
                      value={block.content.style || "line"}
                      onValueChange={(value) =>
                        updateBlock(block.id, { ...block.content, style: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">Line</SelectItem>
                        <SelectItem value="space">Space</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
