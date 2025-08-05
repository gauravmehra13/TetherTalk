import { Download, X } from "lucide-react";

const ImageViewerModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      const link = document.createElement("a");
      link.href = imageUrl;

      const filename = imageUrl.split("/").pop() || "image.jpg";
      link.download = filename;

      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in p-4 sm:p-8"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-3xl w-full h-[80vh] flex items-center justify-center">
        <div className="absolute top-0 right-0 flex items-center gap-2 z-10 m-2">
          <button
            onClick={handleDownload}
            className="p-2 bg-base-100 rounded-full hover:bg-base-200 transition-colors"
            title="Download image"
          >
            <Download size={20} />
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-base-100 rounded-full hover:bg-base-200 transition-colors"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <img
            src={imageUrl}
            alt="Full size"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageViewerModal;
