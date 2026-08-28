import * as React from "react";
import { cn } from "@/lib/utils";
import { UploadCloud, File, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface AttachmentFile {
  id: string;
  name: string;
  size?: string;
  progress?: number; // 0 - 100
}

export interface AttachmentProps {
  files?: AttachmentFile[];
  onRemove?: (id: string) => void;
  dropzone?: boolean;
  onUpload?: (files: FileList) => void;
  className?: string;
}

export function Attachment({
  files = [],
  onRemove,
  dropzone = false,
  onUpload,
  className,
}: AttachmentProps) {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && onUpload) {
      onUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className={cn("w-full space-y-3", className)}>
      {dropzone && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center p-6 border border-dashed rounded-3xl cursor-pointer transition-all duration-200 text-center select-none",
            isDragOver
              ? "border-white bg-[#1c1c21]"
              : "border-zinc-800 bg-[#141418] hover:border-zinc-700 hover:bg-[#18181d]"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && onUpload?.(e.target.files)}
          />
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1c1c21] border border-zinc-800 text-white mb-2">
            <UploadCloud className="h-5 w-5" />
          </div>
          <span className="text-xs font-bold text-zinc-100">
            Upload files or drag and drop
          </span>
          <span className="text-[11px] text-zinc-500 mt-0.5">
            PNG, JPG, PDF up to 25MB
          </span>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <AnimatePresence>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-between p-3 rounded-2xl border border-zinc-800/80 bg-[#1c1c21] text-xs font-medium"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#25252c] text-white shrink-0">
                    <File className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-zinc-100">
                      {file.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      {file.size}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {file.progress !== undefined && file.progress < 100 ? (
                    <div className="w-16 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        style={{ width: `${file.progress}%` }}
                        className="h-full bg-white transition-all duration-200"
                      />
                    </div>
                  ) : (
                    <Check className="h-4 w-4 text-white" />
                  )}
                  {onRemove && (
                    <button
                      type="button"
                      onClick={() => onRemove(file.id)}
                      className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
